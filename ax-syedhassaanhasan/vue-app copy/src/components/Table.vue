<template>
  <div class="table">

    <div v-if='data'>
      <div class="title">{{ title }}</div>
      <!-- <svg class="chart" ref="svg" width="400" height="300"/>  ref is a vue reference! -->
      <table class="center">
        <tr>
            <th id="country">Country</th>
            <th id="percentage">Percent</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'table',
  props: {
    title: String,
    data: {  //this.data in component
      type: Array
    }    
  },
  methods: {
    table() {
      d3.csv("data.csv", d => {
    return {
        country: d.country,
        code: d.code,
        percentage: +d.percentage
    };
}).then(data => {
    //console.log(JSON.stringify(data));

    var tr = d3.select('#country')
        //.append('table')
        .selectAll('tr')
        .data(data)
        .enter()
        .append('tr')
        .append('td')
        .text((d,i) => { 
            //console.log("i:", i)
            return data[i]["country"] }
        )
        console.log(tr)

    var tr_ = d3.select('#percentage')
    //.append('table')
    .selectAll('tr')
    .data(data)
    .enter()
    .append('tr')
    .append('td')
    .text((d,i) => { 
        //console.log("i:", i)
        return data[i]["percentage"] }
    )
    console.log(tr_)
  })
    },
  },
  mounted() {
    this.table();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  >>> .center {
  margin-left: auto;
  margin-right: auto;
}
</style>
