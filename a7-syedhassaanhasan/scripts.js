d3.json('data.json', d => {
    return {
    country: d.country,
    percentage: +d.percentage,
    };
}).then(data => {
    console.log("data_1: ", data)
    width = 1080
    height = width
    format = d3.format(",d")
    
    pack = data => d3.pack()
        .size([width, height])
        .padding(3)
        (
            d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value)
        )
    
    const root = pack(data);

    

    color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl)

    
    let focus = root;
    let view;

    var svg = d3.select('#chart1').append('svg')
        .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
        .style("display", "block")
        .style("margin", "0 -14px")
        .style("background", color(0))
        .style("cursor", "pointer")
        .on("click", (event) => zoom(event, root));

    const node = svg.append("g")
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    const label = svg.append("g")
        .style("font", "30px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(root.descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name);

    zoomTo([root.x, root.y, root.r * 2]);

    function zoomTo(v) {
        const k = width / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
        node.attr("r", d => d.r * k);
    }

    function zoom(event, d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(event.altKey ? 7500 : 750)
            .tween("zoom", d => {
            const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
            return t => zoomTo(i(t));
            });

        label
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }
})

// var slice = {  //a slice of pie
//     innerRadius: 0,
//     outerRadius: 100,
//     startAngle: 0,
//     endAngle: Math.PI / 2
// };

// var arc = d3.arc();
// console.log(arc(slice)); // 🎒 explain: 

// var svg = d3.select('#pie-chart'),
//     width = +svg.attr('width'),
//     height = +svg.attr('height'),
//     radius = Math.min(width, height) / 2,
//     g = svg.append('g')
//         .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


    

d3.csv('data2.csv', d => {
    d.population = +d.population;
    return d;
}).then(data => {
    console.log("data:", data)
    var svg = d3.select('#pie-chart'),
        width = +svg.attr('width'),
        height = +svg.attr('height'),
        radius = Math.min(width, height) / 2,
        g = svg.append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b']);  //🎒 explain:

    var pie = d3.pie()  //🎒 explain: 
        .value(d => d.population)
        .sort(null)  //🎒 explain: 
    // .sort(function(a, b) { return a.age.localeCompare(b.age); })  //🎒 explain: 
    .sortValues(d3.descending);  //🎒 explain: 

    var path = d3.arc()  //🎒 explain: computing the arches
        .outerRadius(radius)  //🎒 explain: 
        .innerRadius(0);  //🎒 explain: 

    //🎒 change to a donut chart


    var label = d3.arc()  //🎒 explain: 
        .outerRadius(radius - 40)  //🎒 explain: 
        .innerRadius(radius - 40);  //🎒 explain: 

    var arc = g.selectAll('.arc')  //🎒 explain: 
        .data(pie(data))  //🎒 explain: 
        .enter()
        .append('g')
        .attr('class', 'arc');

    arc.append('path')  //🎒 explain: 
        .attr('d', path)  //🎒 explain: 
        .attr('fill', d => color(d.data.country))  //🎒 explain: 
        .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('50')
                .attr('opacity', '.50')
        })
        .on('mouseout', function (d, i) {
            d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
        })

    arc.append('text')
        .attr('transform', d => 'translate(' + label.centroid(d) + ')')  //🎒 explain: 
        .text(d => d.data.country);

    
});

 

//Read the data
d3.csv("Book1.csv").then( function(data) {
    // set the dimensions and margin1s of the graph
 const margin1 = {top: 10, right: 30, bottom: 30, left: 60},
 width1 = 460 - margin1.left - margin1.right,
 height1 = 400 - margin1.top - margin1.bottom;

// // append the svg object to the body of the page
const svg1 = d3.select("#my_dataviz")
.append("svg")
 .attr("width", width1 + margin1.left + margin1.right)
 .attr("height", height1 + margin1.top + margin1.bottom)
.append("g")
 .attr("transform", `translate(${margin1.left},${margin1.top})`);
console.log("dataaaaaa: ", data)
// group the data: I want to draw one line per group
const sumstat = d3.group(data, d => d.country); // nest function allows to group the calculation per level of a factor

// Add X axis --> it is a date format
const x = d3.scaleLinear()
 .domain(d3.extent(data, function(d) { return d.year; }))
 .range([ 0, width1 ]);
svg1.append("g")
 .attr("transform", `translate(0, ${height1})`)
 .call(d3.axisBottom(x).ticks(5));

// Add Y axis
const y = d3.scaleLinear()
 .domain([0, d3.max(data, function(d) { return +d.percentage; })])
 .range([ height1, 0 ]);
svg1.append("g")
 .call(d3.axisLeft(y));

// color palette
const color = d3.scaleOrdinal()
 .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999', "#404080"])

// Draw the line
svg1.selectAll(".line")
   .data(sumstat)
   .join("path")
     .attr("fill", "none")
     .attr("stroke", function(d){ return color(d[0]) })
     .attr("stroke-width", 1.5)
     .attr("d", function(d){
       return d3.line()
         .x(function(d) { return x(d.year); })
         .y(function(d) { return y(+d.percentage); })
         (d[1])
     })
     .on('mouseover', function (d, i) {
             d3.select(this).transition()
                 .duration('50')
                 .attr('opacity', '.50')
         })
         .on('mouseout', function (d, i) {
             d3.select(this).transition()
             .duration('50')
             .attr('opacity', '1');
         })
         var svg11 = d3.select("#legend1")

        // Handmade legend
        svg11.append("circle").attr("cx",200).attr("cy",10).attr("r", 6).style("fill", "#e41a1c")
        svg11.append("circle").attr("cx",200).attr("cy",40).attr("r", 6).style("fill", "#377eb8")
        svg11.append("circle").attr("cx",200).attr("cy",70).attr("r", 6).style("fill", "#4daf4a")
        svg11.append("circle").attr("cx",200).attr("cy",100).attr("r", 6).style("fill", "#984ea3")
        svg11.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "#ff7f00")
        svg11.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "#ffff33")
        svg11.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "#a65628")
        svg11.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "#f781bf")
        svg11.append("circle").attr("cx",200).attr("cy",250).attr("r", 6).style("fill", "#999999")
        svg11.append("circle").attr("cx",200).attr("cy",280).attr("r", 6).style("fill", "#404080")
        svg11.append("text").attr("x", 220).attr("y", 10).text("Pakistan").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 40).text("India").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 70).text("Bangladesh").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 100).text("Iran").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 130).text("Afghanistan").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 160).text("China").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 190).text("USA").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 220).text("Canada").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 250).text("UK").style("font-size", "15px").attr("alignment-baseline","middle")
        svg11.append("text").attr("x", 220).attr("y", 280).text("Finland").style("font-size", "15px").attr("alignment-baseline","middle")

})

