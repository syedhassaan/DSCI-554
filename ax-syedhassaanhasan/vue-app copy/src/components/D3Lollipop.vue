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
    d3Lollipop() {
      var data = this.data
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
        
        var svg = d3.select(this.$refs["svg"])
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
    },
  },
  mounted() {
    this.d3Lollipop();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
>>> svg.chart {
  background-color: aliceblue;
}

>>> text.label {
  text-anchor: end;
  alignment-baseline: middle;
  font-size: 12px;
  fill: black;
}

>>> text.value {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bolder;
  font-size: 12px;
  text-anchor: end;
  alignment-baseline: middle;
  fill: #eee;
}

>>> rect.bar {
  text-align: right;  /* pull value text to the end of the bar */
  vertical-align: middle;  /* align value text with middle of the bar */
  fill:#7abcff;
  height: 20px;  /* bar height, this can stay fixed */
}

>>> .title {
  margin-bottom: 0px;
  margin-top: 20px;
  font-size: 12px;
}
</style>
