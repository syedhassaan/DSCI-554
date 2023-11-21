d3.csv("data.csv", d => {
return {
    country: d.country,
    code: d.code,
    percentage: +d.percentage
};
}).then(data => {
    d3.select('#chart_title').text(`D3 Bar Chart`)

    var margin = { top: 50, right: 20, bottom: 50, left: 100 };
    var width = 1000 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    //🚧 set paddingInner so the padding between the bars is 1/3 the distance between tick marks 
    var x = d3.scaleBand()  //use scale band for bars
        .domain(data.map(d => d.country))  //🚧 set the domain using array.map() so it is not hard coded
        .range([0, width])
        .paddingInner(.3);	//padding in range [0; 1] defaults to 0; 
                                                //0 means no blank space between bands
                                                //1 means a bandwidth of zero
    
    var y = d3.scaleLinear()
        .domain([0, 100])  //🚧 set the domain using d3.max so it is not hard coded
        .range([height, 0]);
    
    var xAxis = d3.axisBottom()
        .scale(x);
    
    var yAxis = d3.axisLeft()
        .scale(y)
        .tickFormat(d3.format('.2s'))  //🚧 uncomment to format the tick label
        .ticks(10);  //limit the number of tick marks on y axis
    
    var svg = d3.select("#chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', function (d) { return x(d.country); })
        .attr('y', function (d) { return y(d.percentage); })
        .attr('width', x.bandwidth)
        .attr('height', function (d) { return height - y(d.percentage); })
        .style('fill', 'skyblue');
    
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    
    svg.append("g")
        .call(yAxis);

    svg.append("text")
    .attr("x", margin.left-160)             
    .attr("y", height/2)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Percent %");

    svg.append("text")
    .attr("x", width/2)             
    .attr("y", margin.bottom+290)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Country");

    svg.append("text")
    .attr("x", width/2)             
    .attr("y", margin.bottom-70)
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .text("Net Enrollment Rate (Primary School)");
})

d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
    }).then(data => {
        d3.select('#chart_title_').text(`D3 lollipop chart`)
    
        var margin = { top: 50, right: 20, bottom: 50, left: 100 };
        var width = 1200 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;
        
        //🚧 set paddingInner so the padding between the bars is 1/3 the distance between tick marks 
        var x = d3.scaleBand()  //use scale band for bars
            .domain(data.map(d => d.country))  //🚧 set the domain using array.map() so it is not hard coded
            .range([0, width])
            .paddingInner(.8);	//padding in range [0; 1] defaults to 0; 
                                                    //0 means no blank space between bands
                                                    //1 means a bandwidth of zero
        
        var y = d3.scaleLinear()
            .domain([0, 100])  //🚧 set the domain using d3.max so it is not hard coded
            .range([height, 0]);
        
        var xAxis = d3.axisBottom()
            .scale(x);
        
        var yAxis = d3.axisLeft()
            .scale(y)
            .tickFormat(d3.format('.2s'))  //🚧 uncomment to format the tick label
            .ticks(10);  //limit the number of tick marks on y axis
        
        var svg = d3.select("#chart_")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', function (d) { return x(d.country); })
            .attr('y', function (d) { return y(d.percentage); })
            .attr('width', 10)
            .attr('height', function (d) { return height - y(d.percentage); })
            .style('fill', 'skyblue');
        
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        svg.append("g")
            .call(yAxis);
    
        svg.append("text")
        .attr("x", margin.left-160)             
        .attr("y", height/2)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Percent %");
    
        svg.append("text")
        .attr("x", width/2)             
        .attr("y", margin.bottom+290)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Country");
    
        svg.append("text")
        .attr("x", width/2)             
        .attr("y", margin.bottom-70)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Net Enrollment Rate (Primary School)");

        svg.selectAll("mycircle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) { return x(d.country) + 5; })
            .attr("cy", function(d) { return y(d.percentage); })
            .attr("r", "15")
            .style("fill", "skyblue")
            //.attr("stroke", "black")
    })
    
d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    d3.select('#chart_title_3').text(`D3 Bubble Chart`)
    var width = 1400, height = 150;
    var dx = 45;  //distance between centers
    var margin = { top: 50, right: 20, bottom: 50, left: 100 };
    
    var x = d3.scaleBand()  //use scale band for bars
            .domain(data.map(d => d.country))  //🚧 set the domain using array.map() so it is not hard coded
            .range([25, width])
            .paddingInner(0.2);	//padding in range [0; 1] defaults to 0; 
                                                    //0 means no blank space between bands
                                                    //1 means a bandwidth of zero
    var xAxis = d3.axisBottom()
            .scale(x)
            .tickFormat(d3.format('.2s'))  //🚧 uncomment to format the tick label
            .ticks(20);  //limit the number of tick marks on y axis
            
    var svg = d3.select('#chart_3')
        .attr('width', width)
        .attr('height', height)
        .attr('background-color', 'red')

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => { return (dx + i * dx) * 1.5; })
        .attr('cy', (d) => { return height / 2; })
        .attr('r', (d, i) => { return 0.2 * data[i].percentage; })  //with bubbles map to diameter or area
        .attr('class', 'bubble')
        .style('fill', 'skyblue');

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => { return (dx + i * dx) * 1.5; })
        .attr('y', (d) => { return height / 2 + 35; })
        .attr('class', 'bubble')
        .text((d) => { return d.country; })

    svg.append("g")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis);

    svg.append("text")
        .attr("x", width/2)             
        .attr("y", margin.bottom+85)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Country");

    svg.append("text")
        .attr("x", width/2)             
        .attr("y", margin.bottom-30)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .text("Net Enrollment Rate (Primary School)");
});