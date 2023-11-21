<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />

		<!-- added BootstrapVue buttons -->
    <div>
      <b-button class="m-2">Button</b-button>
      <b-button class="m-2" variant="danger">Button</b-button>
      <b-button class="m-2" variant="success">Button</b-button>
      <b-button class="m-2" variant="outline-primary">Button</b-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

import axios from "axios";

export default {
	name: 'Home',
	components: {
		HelloWorld,
	},
	data: function () {
		return {
			chartData: null,
		}
	},  
	mounted: function () {
    console.log("HASSAAN")
		axios.get('planets.json').then(result => {
			console.log(result.data);
			this.chartData = result.data;
		});
	}
  
};
</script>
