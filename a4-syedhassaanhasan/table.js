d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    console.log(JSON.stringify(data));

    var tr = d3.select('#country')
        //.append('table')
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .append('td')
        .text((d,i) => { 
            console.log("i:", i)
            return data[i]["country"] }
        )

    var tr = d3.select('#percentage')
    //.append('table')
    .selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .append('td')
    .text((d,i) => { 
        console.log("i:", i)
        return data[i]["percentage"] }
    )
})
