var promises = [];
var files = ['/lab/data/countries-50m.json', '/lab/data/population_.json'];
files.forEach(url => promises.push(d3.json(url)));  //🎒 explain: 
Promise.all(promises).then(function (values) {  //🎒 explain: 
    var us = values[0];
    var data = values[1];

    format = d3.format(',.0f')

    //🎒 explain:
    data = new Map(data.slice(1).map(([population, country]) => [country, +population]))

    //🎒 explain:
    radius = d3.scaleSqrt([0, d3.quantile([...data.values()].sort(d3.ascending), 0.985)], [0, 15]);

    svg = d3.select('#chart')
        //.attr("preserveAspectRatio", "xMinYMin meet")   
        .attr('viewBox', [-100, -620, 1100, 610]);
        //.attr('viewBox', [0, 0, 975, 610]);
        
    path = d3.geoPath()

    //🎒 explain:
    svg.append('path')
        .datum(topojson.feature(us, us.objects.land))
        .attr('fill', '#ccc')
        .attr('d', path)
        .attr('transform', 'scale(1,-1)')
        ;

    //🎒 explain:
    svg.append('path')
        .datum(topojson.mesh(us, us.objects.countries, (a, b) => a !== b))
        .attr('fill', 'none')
        .attr('stroke', 'white')
        .attr('stroke-linejoin', 'round')
        .attr('d', path)
        .attr('transform', 'scale(1,-1)');

    //🎒 explain:
    const legend = svg.append('g')
        .attr('fill', '#777')
        .attr('transform', 'translate(925,608)')
        .attr('text-anchor', 'middle')
        .attr('transform', 'scale(1,-1)')
        .style('font', '10px sans-serif')
        .selectAll('g')
        .data([1e6, 5e6, 1e7])
        .join('g');

    legend.append('circle')
        .attr('fill', 'none')
        .attr('stroke', '#ccc')
        .attr('cy', d => -radius(d)-100)
        .attr('r', radius)
        .attr('transform', 'scale(1,-1)');

    legend.append('text')
        .attr('y', d => -2 * radius(d)-100)
        .attr('dy', '1.3em')
        .text(d3.format('.1s'))
        .attr('transform', 'scale(1,-1)');

    //🎒 explain:
    svg.append('g')
        .attr('fill', 'brown')
        .attr('fill-opacity', 0.5)
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .attr('transform', 'scale(1,-1)')
        .selectAll('circle')
        .data(topojson.feature(us, us.objects.countries).features
            .map(d => (d.value = data.get(d.id), d))  //🎒 explain:
            .sort((a, b) => b.value - a.value))
        .join('circle')
        .attr('transform', d => `translate(${path.centroid(d)})`)  //🎒 explain:
        .attr('r', d => radius(d.value))
        .append('title')
        .text(d => `${d.properties.name} ${format(d.value)}`);
});


/////////////////////////////////////////////////////////////
//Color Legend code

function legend({
    color,
    title,
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 64,
    tickFormat,
    tickValues
} = {}) {  //🎒 explain:

    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .style("overflow", "visible")
        .style("display", "block");

    let x;

    // Continuous
    if (color.interpolator) {
        x = Object.assign(color.copy()
            .interpolator(d3.interpolateRound(marginLeft, width - marginRight)),
            { range() { return [marginLeft, width - marginRight]; } });

        svg.append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(color.interpolator()).toDataURL());

        //scaleSequentialQuantile doesn’t implement ticks or tickFormat.
        if (!x.ticks) {
            if (tickValues === undefined) {
                const n = Math.round(ticks + 1);
                tickValues = d3.range(n).map(i => d3.quantile(color.domain(), i / (n - 1)));
            }
            if (typeof tickFormat !== "function") {
                tickFormat = d3.format(tickFormat === undefined ? ",f" : tickFormat);
            }
        }
    }

    //discrete
    else if (color.invertExtent) {
        const thresholds
            = color.thresholds ? color.thresholds() // scaleQuantize
                : color.quantiles ? color.quantiles() // scaleQuantile
                    : color.domain(); // scaleThreshold

        const thresholdFormat
            = tickFormat === undefined ? d => d
                : typeof tickFormat === "string" ? d3.format(tickFormat)
                    : tickFormat;

        x = d3.scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([marginLeft, width - marginRight]);

        svg.append("g")
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", d => d);

        tickValues = d3.range(thresholds.length);
        tickFormat = i => thresholdFormat(thresholds[i], i);
    }

    svg.append("g")
        .attr("transform", `translate(0, ${height - marginBottom})`)
        .call(d3.axisBottom(x)
            .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
            .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
            .tickSize(tickSize)
            .tickValues(tickValues))
        .call(g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("y", marginTop + marginBottom - height - 6)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(title));

    return svg.node();
}

function ramp(color, n = 256) {
    const canvas = DOM.canvas(n, 1);
    const context = canvas.getContext("2d");
    for (let i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 1, 1);
    }
    return canvas;
}

/////////////////////////////////////////////////////////////
//Choropleth code

var promises = [];

promises.push(d3.json("lab/data/countries-50m.json"));
promises.push(d3.csv("lab/data/population.csv"));

Promise.all(promises).then(function (values) {  //🎒 explain:
    var us = values[0];
    var data = values[1];

    states = new Map(us.objects.countries.geometries.map(d => [d.id, d.properties]))  //🎒 explain:

    format = d => `${d}%`

    path = d3.geoPath()

    color = d3.scaleQuantize([1, 10], d3.schemeBlues[9])  //🎒 explain:

    //original line from Observable
    //data = Object.assign(new Map(await d3.csv("unemployment.csv", ({id, rate}) => [id, +rate])), {title: "Unemployment rate (%)"})
    data = Object.assign(new Map(data.map((d) => [d.id, +d.rate])));  //🎒 explain:
    data.title = "Urban population increase (%)";

    path = d3.geoPath()

    // const svg = d3.create("svg")
    svg = d3.select("#chart_2")
        //.attr("viewBox", [0, 0, 975, 610]);
        .attr('viewBox', [-100, -620, 1100, 610]);

    svg.append("g")
        .attr("transform", "translate(-50,-250)")
        .append(() => legend({ color, title: data.title, width: 260 }))
        //.attr('transform', 'scale(1,-1)')
        ;

    svg.append("g")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.countries).features)  //🎒 explain:
        .join("path")
        //.attr("fill", d => color(data.get(d.id)))  //🎒 explain:
        .attr("fill", function(d) { return (data.get(d.id) > 0 ? color(data.get(d.id)) : "lightgray"); })
        .attr('transform', 'scale(1,-1)')
        .attr("d", path)
        .append("title")
        .text(d => `${d.properties.name} ${format(data.get(d.id))}`);  //🎒 explain:

    //channge to countries
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.countries, (a, b) => a !== b))  //🎒 explain:
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr('transform', 'scale(1,-1)')
        .attr("stroke-linejoin", "round")
        .attr("d", path);
});

d3.json('/lab/data/Community Boundaries (CSA).geojson').then(json => {
    json.features = json.features.filter(d => {
        return (d.properties.objectid !== "" && //🎒 filter out Avalon island
            d.properties.objectid !== "" &&  //🎒 filter out Santa Catalina island
            d.properties.objectid !== "");  //🎒 filter out San Clemente island
    });

    var svg = d3.select('#svg3'),
        width = +svg.attr('width'),
        height = +svg.attr('height');

    var projection = d3.geoMercator()
        .fitSize([width, height], json);

    path = d3.geoPath()
        .projection(projection);

    svg.append('g')
        .attr('class', 'cities')
        .selectAll('path')
        .data(json.features)
        .enter()
        .append('path')
        .attr('d', path)
        //.attr('fill', d => 'blue')  //🎒  explain: setting all the states to white
        .attr('fill', d => d.properties.color != "" ? d.properties.color : 'blue')  //🎒 explain: chanign the color for CA
        ;

    //color = d3.scaleQuantize([1, 10], d3.schemeBlues[9])
    color = d3.scaleQuantize([1, 10], d3.schemeRdYlGn[9])
    svg.append("g")
            //.attr("transform", "translate(-50,-250)")
            .append(() => legend({ color, title: "Number of EV Stations", width: 260 }))
            //.attr('transform', 'scale(1,-1)')
            ;
});
