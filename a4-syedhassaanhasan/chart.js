d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    var bar = d3.select('#chart-2')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div');

    bar.style('height', d => {
        return d.percentage * 4 + 'px';
    })
        .attr('class', 'bar');

    bar.append('div')  //append other div to add bar labels!
        .text(function (d) { return d.country; })
        .attr('class', 'text');
})

d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    var bar = d3.select('#chart-3')
        .selectAll('div')
        .data(data)
        .enter()
        .append('div');

    bar.style('height', d => {
        return d.percentage * 4 + 'px';
    })
        .attr('class', 'bar1');

    bar.append('div')  //append other div to add bar labels!
        .text(function (d) { return "."; })
        .attr('class', 'text1');

    bar.append('div')  //append other div to add bar labels!
        .text(function (d) { return d.country; })
        .attr('class', 'text2');
})

d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    var width = 5000, height = 300;
    var dx = 45;  //distance between centers

    var svg = d3.select('#ex_3_1')
        .attr('width', width)
        .attr('height', height)

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => { return (dx + i * dx) * 1.2; })
        .attr('cy', (d) => { return height / 2; })
        .attr('r', (d, i) => { return 0.2 * data[i].percentage; })  //with bubbles map to diameter or area
        .attr('class', 'bubble')

    svg.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', (d, i) => { return (dx + i * dx) * 1.2; })
        .attr('y', (d) => { return height / 2 + 25; })
        .attr('class', 'bubble')
        .text((d) => { return d.country; })

});
