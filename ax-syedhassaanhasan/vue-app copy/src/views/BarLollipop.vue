<template>
  <div class="smallMultiples">

    <BarLollipopComp/>
    
    <div v-if="datasets.length == 0">Looks like we have no data!</div>
    <div v-else>
      
      <h3 class="mt-4">Datasets</h3>

      We have {{datasets.length}} datasets:

      <!-- adding '1' to the key to avoid vue warning of duplicate keys in component -->
      <div style="text-alight: left" v-for="(item, index) in datasets" :key="index + '1'"> 
        Dataset at index {{index}} has {{item.length}} rows
      </div>

      <h3 class="mt-4">Plots</h3>
      <BarLollipopComp :data="datasets[0]" title="Adjusted net enrollment rate, primary (% of primary school age children)"/>
      <D3Lollipop :data="datasets[0]" title="Adjusted net enrollment rate, primary (% of primary school age children)"/>
      <ExampleTwo :data="datasets[1]" title="Planets (Gravity)"/>
      <ExampleThree :data="datasets[1]" title="Planets (Gravity)"/>
      
      <div class="title">Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)</div>
      <div class="item">
        <div class="label">Los Angeles</div>
        <div class="bar_" style="width: 78%">  <!-- 🎒 set to 78% and recompute others -->
          <span class="value">240,749</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Miami-Dade</div>
        <div class="bar_" style="width: 50.7%;">
          <span class="value">156,559</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Maricopa</div>
        <div class="bar_" style="width: 43.3%;">
          <span class="value">133,641</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Cook</div>
        <div class="bar_" style="width: 40.8%;">
          <span class="value">126,003</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Harris</div>
        <div class="bar_" style="width: 34.3%;">
          <span class="value">105,757</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Broward</div>
        <div class="bar_" style="width: 23.0%;">
          <span class="value">70,950</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Dallas</div>
        <div class="bar_" style="width: 22.9%;">
          <span class="value">70,810</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Queens</div>
        <div class="bar_" style="width: 22.5%;">
          <span class="value">69,370</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Kings</div>
        <div class="bar_" style="width: 20.7%;">
          <span class="value">63,974</span>
        </div>
      </div>
      
      <div class="item">
        <div class="label">Clark</div>
        <div class="bar_" style="width: 19.16%;">
          <span class="value">59,153</span>
        </div>
      </div>

    </div>

      <!-- plot datasets using v-for directive -->
      <!-- <BarChart v-for="(item, index) in datasets" :key="index" :data="item" :title="'Dataset ' + index + ': Top 10 COVID-19 confirmed in US, Aug 31 2020 (source Johns Hopkins University)'"/> -->
     
      

  </div>
    

</template>

<script>

import BarLollipopComp from '@/components/BarLollipopComp.vue'  // @ is an alias to /src
import D3Lollipop from '@/components/D3Lollipop.vue'  // @ is an alias to /src
import ExampleTwo from '@/components/ExampleTwo.vue'
import ExampleThree from '@/components/ExampleThree.vue'

import * as d3 from 'd3';
// import axios from "axios";  //uncomment if you want to use axios instead of d3 to load data

export default {
  name: 'smallMultiples',
  components: {
    BarLollipopComp,
    D3Lollipop,
    ExampleTwo,
    ExampleThree
  },
  data: function () {
    return {
      datasets: [],
    }
  },  
  mounted: function () {
    var promises = [];
    promises.push(d3.json('data.json'));
    promises.push(d3.json('planets.json'));
    //console.log("HASSAAN")

    var that = this;  //`this` points to the component instance, to use it inside Promises.all we set it to that

    //Using Promise.all and d3 to wait for all the promises to resolve
    Promise.all(promises).then(result => {
      that.datasets = result;
      console.log("datasets: ", result)
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

<style scoped >
      >>> .title {
        margin-bottom: 10px;
        font-size: 12px;  /* 🎒 set according to viewport width */
      }
      >>> .item {  /* wrapper for label + bar */
        text-align: left;  /* pull left of the page */
        margin-bottom: 5px;  /* bars separation, can stay fixed */
      }
      >>> .bar_ {
        display: inline-block;  /* turn bar div inline so it shows on the same line with the label */
        text-align: right;  /* pull value text to the end of the bar */
        vertical-align: middle;  /* align value text with middle of the bar */
        background-color:#7abcff;
        height: 20px;  /*bar height, this can stay fixed */
      }
      >>> .label {
        display: inline-block;  /* turn label div inline so it shows on the same line with the bar */
        text-align: right;  /* pull label where the bar starts */
        vertical-align: middle; /* align text to the middle of the bar */
        line-height: 20px;  /* trick to make sure the label height is the same as the bar height so it will align to the middle */
        width: 20%;  /* relative size of label */
        font-size: 1vw;  /* 🎒 set according to viewport width */
      }
      >>> .value {  /* the value label in the bar */
        color:#eee;
        font-family: 'Courier New', Courier, monospace;  /* use fixed font */
        font-weight: bolder;
        vertical-align: middle; /* align text to the middle of the bar */
        line-height: 20px;  /* trick to make sure the label height is the same as the bar height so it will align to the middle */
        margin-right: 5px;  /* move label 5px from the end of the bar */
        font-size: 1vw;  /* 🎒 set according to viewport width */
      }
      </style>