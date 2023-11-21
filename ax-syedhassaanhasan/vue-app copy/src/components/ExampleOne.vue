<template>
  <div class="d3barchart">

    <div v-if='data'>
      <div class="title">{{ title }}</div>
      <svg class="chart" ref="svg" width="400" height="300"/>  <!-- ref is a vue reference! -->
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'd3barchart',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    exone() {
      var data = this.data
      var format = d3.timeParse('%Y-%m-%d');
      for (let i = 0; i < data.length; i++) {
        data[i].date = format(data[i].date)
          data[i].close = parseFloat(data[i].close);
      }

      console.log("exone_data: ", data)
      var xScale = d3.scaleTime();  //🎒  explain
      var yScale = d3.scaleLinear();

      var xAxis = d3.axisBottom()  //🎒  explain
        .scale(xScale);
      var yAxis = d3.axisLeft()
        .scale(yScale);

      var line = d3.line() //d3-shape line generator
        .x(function (d) { return xScale(d.date); })
        .y(function (d) { return yScale(d.close); });

        var margin = { top: 20, left: 40, bottom: 40, right: 40 };
  var width = parseInt(d3.select(this.$refs["svg"]).style('width')) - margin.left - margin.right;
  var height = parseInt(d3.select(this.$refs["svg"]).style('height')) - margin.top - margin.bottom;

  var svg = d3.select(this.$refs["svg"])
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

  xScale.range([0, width]);
  yScale.range([height, 0]);

  //🎒  explain
  xScale.domain(d3.extent(data, d => { return d.date; }));
  yScale.domain(d3.extent(data, d => { return d.close; }));

  //🎒  explain
  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

  //🎒  explain
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

  //🎒  explain
  svg.append('path')
    .datum(sample)
    .attr('class', 'curve')
    .attr('d', line);

  //🎒  explain
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

  //🎒  explain
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

  resize();  //🎒  explain why we call resize

  //bind window resize event to call resize() 
  d3.select(window)
    .on('resize', resize);  //🎒  explain

  function resize() {
    //🎒  explain
    var width = parseInt(d3.select(this.$refs["svg"]).style('width')) - margin.left - margin.right;
    var height = parseInt(d3.select(this.$refs["svg"]).style('height')) - margin.top - margin.bottom;

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

    //🎒  explain
    yAxis.ticks(Math.max(height / 50, 2));  //every 50px
    xAxis.ticks(Math.max(width / 100, 2));  //every 100px

    //🎒  explain
    svg.select('.x.axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.select('.y.axis')
      .call(yAxis);

    //🎒  explain
    dataPerPixel = data.length / width;
    sample = data.filter(  //use d3.array filter to sample the data
      function (d, i) {
        return i % Math.ceil(dataPerPixel) == 0;
      });

    svg.selectAll('.curve')
      .datum(sample) //replace with sampled data
      .attr('d', line);  //🎒  explain

    //🎒  explain
    svg.select('#desc')
      .text(width + 'x' + height + ' ' + type + ' with ' + sample.length + ' points');
  }

      
    },
  },
  mounted() {
    this.exone();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
>>> text {
  font-family: 'PT Sans', sans-serif;
  font-size: 12px;
}

>>> .axis path,
>>> .axis line {
  fill: none;
  stroke: #444;
  shape-rendering: crispEdges;
}

>>> .axis text {
  fill: #444;
}

>>> .curve {
  fill: none;
  stroke: #ef0d0c;
  stroke-width: 1.5px;
}

>>> #desc {
  font-size: 0.65em;
  fill: #444;
}

>>> #chart {
  width: 100%;
  height: 100%;
  background-color: #ffeeee;
}


</style>
