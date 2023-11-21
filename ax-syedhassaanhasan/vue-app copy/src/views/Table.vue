<template>
  <div class="smallMultiples">

    <Table/>
    
    <div v-if="datasets.length == 0">Looks like we have no data!</div>
    <div v-else>
      


      <h3 class="mt-4">Table</h3>

      <Table :data="datasets[0]" title="Adjusted net enrollment rate, primary (% of primary school age children)"/>
      
      <!-- plot datasets using v-for directive -->
      <!-- <BarChart v-for="(item, index) in datasets" :key="index" :data="item" :title="'Dataset ' + index + ': Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)'"/> -->
    </div>

  </div>
</template>

<script>

import Table from '@/components/Table.vue'  // @ is an alias to /src

import * as d3 from 'd3';
// import axios from "axios";  //uncomment if you want to use axios instead of d3 to load data

export default {
  name: 'smallMultiples',
  components: {
    Table
  },
  data: function () {
    return {
      datasets: [],
    }
  },  
  mounted: function () {
    var promises = [];
    promises.push(d3.json('data.json'));
    
    var that = this;  //`this` points to the component instance, to use it inside Promises.all we set it to that

    //Using Promise.all and d3 to wait for all the promises to resolve
    Promise.all(promises).then(result => {
      that.datasets = result;
    });
    
    //alternatively you can use axios with a bit more work!
    // var promises = [];
    // promises.push(axios.get('covid-19-confirmed-083120.json'));
    // promises.push(axios.get('covid-19-confirmed-083120.json'));

    // axios.all(promises).then(result => {
    //   result.forEach(d => {
    //     that.datasets.push(d.data);
    //   });
    // });
  }
}
</script>
