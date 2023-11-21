<template>
  <div class="container">
  <div class=row>
  <div class="col-12">
    <div class="d3barchart">
      <div v-if='data'>
        <div class="title">{{ title }}</div>
        <svg class="chart" ref="svg" width="400" height="300"/>  <!-- ref is a vue reference! -->
      </div>
    </div>
  </div>
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
    bubblechart() {
        var data = this.data
        d3.select(this.$refs["svg"]).text(`D3 Bubble Chart`)
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
            
    var svg = d3.select(this.$refs["svg"])
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
    },
  },
  mounted() {
    this.bubblechart();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



</style>
