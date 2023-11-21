var xScale = d3.scaleTime();  //🎒  explain --> D3’s time scales operate on JavaScript Date objects. They can represent dates (day, month, year…)
var yScale = d3.scaleLinear();

var xAxis = d3.axisBottom()  //🎒  explain --> The d3.axisBottom() function in D3.js is used to create a bottom horizontal axis. This function will construct a new bottom-oriented axis generator for the given scale, with empty tick arguments, a tick size of 6 and padding of 3.
  .scale(xScale);
var yAxis = d3.axisLeft()
  .scale(yScale);

var line = d3.line() //d3-shape line generator
  .x(function (d) { return xScale(d.date); })
  .y(function (d) { return yScale(d.close); });

d3.csv('amzn.csv', d => {
  var format = d3.timeParse('%Y-%m-%d');
  return {  //🎒  explain --> getting the data in the correct format
    date: format(d.date),
    close: +d.close
  };
}).then(data => {
  //🎒  explain --> after getting the data, in the then part we will start drawing the svg
  var margin = { top: 20, left: 40, bottom: 40, right: 40 };
  var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right;
  var height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom;

  var svg = d3.select('#chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  xScale.range([0, width]);
  yScale.range([height, 0]);

  //🎒  explain --> setting range of x and y acis
  xScale.domain(d3.extent(data, d => { return d.date; }));
  yScale.domain(d3.extent(data, d => { return d.close; }));

  //🎒  explain --> appending x axis
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  //🎒  explain -- appending y axis
  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.7em')
    .style('text-anchor', 'end')
    .text('Price ($)');

  //sample the data using d3.array filter.
  var dataPerPixel = data.length / width;
  var sample = data.filter((d, i) => {  //d3.array filter returns data for which the specified filter is true.
      return i % Math.ceil(dataPerPixel) == 0;
    });

  //🎒  explain plotting the data
  svg.append('path')
    .datum(sample)
    .attr('class', 'curve')
    .attr('d', line);

  //🎒  explain taking diff bw first and last element
  var firstRecord = data[data.length - 1],
    lastRecord = data[0];

  var first = svg.append('g')
    .attr('class', 'first')
    .style('display', 'none');  //display: none hides the element

  first.append('text')
    .attr('x', -8)
    .attr('y', 4)
    .attr('text-anchor', 'end')
    .text('$' + firstRecord.close);
  first.append('circle')
    .attr('r', 3);

  //🎒  explain -- appending last
  var last = svg.append('g')
    .attr('class', 'last')
    .style('display', 'none');  //display: none hides the element

  last.append('text')
    .attr('x', 8)
    .attr('y', 4)
    .text('$' + lastRecord.close);

  last.append('circle')
    .attr('r', 3);

  svg.append('text')
    .attr('id', 'desc')
    .attr('x', 25)
    .attr('y', 10)
    .text(sample.length + ' points');

  resize();  //🎒  explain why we call resize -- so that the chart resizes with screen/window size

  //bind window resize event to call resize() 
  d3.select(window)
    .on('resize', resize);  //🎒  explain -- resize when window resizes

  function resize() {
    //🎒  explain
    var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right;
    var height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom;

    //🎒  explain
    xScale.range([0, width]).nice(d3.timeYear);
    yScale.range([height, 0]).nice();

    var type = '';
    if (width < 550 || height < 200) { //sparkline
      //🎒  explain
      type = 'sparkline';

      svg.select('.x.axis').style('display', 'none');
      svg.select('.y.axis').style('display', 'none');

      svg.select('.first')
        .attr('transform', 'translate(' + xScale(firstRecord.date) + ',' + yScale(firstRecord.close) + ')')
        .style('display', 'initial');

      svg.select('.last')
        .attr('transform', 'translate(' + xScale(lastRecord.date) + ',' + yScale(lastRecord.close) + ')')
        .style('display', 'initial');
    } else { //line chart
      //🎒  explain
      type = 'line chart';

      svg.select('.x.axis').style('display', 'initial');  //display: initial reset to the element's default display value
      svg.select('.y.axis').style('display', 'initial');  //this is equivalent to making the axes visible!
      svg.select('.last').style('display', 'none');
      svg.select('.first').style('display', 'none');
    }

    //🎒  explain -- drawing the tick marks
    yAxis.ticks(Math.max(height / 50, 2));  //every 50px
    xAxis.ticks(Math.max(width / 100, 2));  //every 100px

    //🎒  explain -- drawing the axis
    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);

    //🎒  explain -- samppling data
    dataPerPixel = data.length / width;
    sample = data.filter(  //use d3.array filter to sample the data
      function (d, i) {
        return i % Math.ceil(dataPerPixel) == 0;
      });

    svg.selectAll('.curve')
      .datum(sample) //replace with sampled data
      .attr('d', line);  //🎒  explain

    //🎒  explain -- writing number of points used
    svg.select('#desc')
      .text(width + 'x' + height + ' ' + type + ' with ' + sample.length + ' points');
  }
});