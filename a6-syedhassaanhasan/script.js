var margin = { top: 20, left: 75, bottom: 50, right: 50 },
        width = 850 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

      var svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

      var x = d3.scaleBand();
      var y = d3.scaleLinear();

      var delay = function (d, i) {
        return i * 50;
      };

      var all, highest, lowest, earth;
      var current, sortMode, filterMode;

      d3.json('data.json', d => {
        return {
          country: d.country,
          percentage: +d.percentage,
        };
      }).then(data => {
        all = data;
        console.log(JSON.stringify(data));

        all = all.sort((a, b) => d3.descending(a.percentage, b.percentage));
        console.log("Test: ", all)

        //🎒 set lowest to the 4 planets farthest from the sun using array.slice here
        lowest = all.slice(5,10)
        //console.log("lowest:", lowest)

        //console.log("all", all)

        //🎒 set highest to the 4 planets closest to the sun using array.slice here
        highest = all.slice(0,5)
        //console.log("highest:", highest)

        //console.log("all", all)

        filter('#all');
        sort('#alphabetic');

        toggleFilter('#all');
        toggleSort('#alphabetic');

        draw();
      });

      //reset event handlers
      d3.select('#reset')
        .on('click', () => {
            filter('#all');
            sort('#alphabetic');
            toggleFilter('#all');
            toggleSort('#alphabetic');
            redraw();
        });

      //sort event handlers
      d3.select('#alphabetic')
        .on('click', () => {
          sort('#alphabetic');
          transition();
          toggleSort('#alphabetic');
        });

      //🎒 implement click events to sort by asc_value and desc_value here (same as click event for alphabetic)
      d3.select('#asc_value')
        .on('click', () => {
          sort('#asc_value');
          transition();
          toggleSort('#asc_value');
        });

        d3.select('#desc_value')
        .on('click', () => {
          sort('#desc_value');
          transition();
          toggleSort('#desc_value');
        });
      ////

      //filter event handlers
      d3.select('#all')
        .on('click', () => {
          filter('#all');
        //   includeEarth(d3.select('input').property('checked'));
          sort(sortMode);

          toggleSort(sortMode);
          toggleFilter('#all');

          redraw();
        });

      d3.select('#highest')
        .on('click', () => {
          filter('#highest');
        //   includeEarth(d3.select('input').property('checked'));
          sort(sortMode);

          toggleSort(sortMode);
          toggleFilter('#highest');

          redraw();
        });

      d3.select('#lowest')
        .on('click', () => {
          filter('#lowest');
          sort(sortMode);

          toggleSort(sortMode);
          toggleFilter('#lowest');

          redraw();
        });

      d3.select('input')
        .on('change', () => {
        //   includeEarth(d3.select('input').property('checked'));

          sort(sortMode);
          toggleSort(sortMode);

          redraw();
        });

    //   function includeEarth(includeEarth) {
    //     if (filterMode === '#all') {
    //       var index = current
    //         .map(d => d.country)
    //         .indexOf('EARTH');

    //       if (index == -1 && includeEarth) {  //not found
    //         current.push(earth);
    //       } else if (!includeEarth) {
    //         current.splice(index, 1); //remove Earth
    //       }
    //     } else if (filterMode === '#highest') {
    //       if (!includeEarth) {
    //         current = JSON.parse(JSON.stringify(all));

    //         var index = current
    //           .map(d => d.lowest)
    //           .indexOf('EARTH');
    //         if (index != -1) {
    //           current.splice(index, 1); //remove Earth
    //         }

    //         current = current.slice(0, 4);
    //       } else {
    //         current = JSON.parse(JSON.stringify(highest));
    //       }
    //     }
    //   }

      function filter(mode) {
        if (mode === '#all') {
          current = JSON.parse(JSON.stringify(all));
          console.log("all filter: ", current)
        } else if (mode === '#highest') {
          current = JSON.parse(JSON.stringify(highest));
          console.log("highest filter: ", current)
        } else if (mode === '#lowest') {
          current = JSON.parse(JSON.stringify(lowest));
          console.log("lowest filter: ", current)
        }
        filterMode = mode;
      }

      function sort(mode) {
        if (mode === '#alphabetic') {
          current.sort((a, b) => d3.ascending(a.country, b.country));
          console.log("alphabetic sort: ", current)
        } else if (mode === '#desc_value') {
          current.sort((a, b) => d3.descending(a.percentage, b.percentage));
          console.log("desc_value sort: ", current)
        } else if (mode === '#asc_value') {
          current.sort((a, b) => d3.ascending(a.percentage, b.percentage));
          console.log("asc_value sort: ", current)
        }
        x.domain(current.map(d => d.country));
        sortMode = mode;
      }

      function toggleSort(id) {
        d3.selectAll('.sort')
          .style('background-color', '#eee');
        d3.select(id)
          .style('background-color', 'lightblue');
      }

      //🎒 implement toggleFilter to highlight buttons with class .filter here (same as toggleSort with class .sort)
      function toggleFilter(id) {
        d3.selectAll('.filter')
          .style('background-color', '#eee');
        d3.select(id)
          .style('background-color', 'lightblue');
      }
      ///

      function redraw() {
        //update scale
        x.domain(current.map(d => d.country));

        ////////////////////////////////
        // DATA JOIN FOR BARS.
        var bars = svg.selectAll('.bar')
          .data(current, d => d.country);

        // UPDATE.
        bars.transition()
          .duration(750)
          .delay(delay)
          .attr('x', d => x(d.country))
          .attr('width', x.bandwidth());

        // ENTER.
        bars.enter()
          .append('rect')
          .attr('x', d => x(d.country))
          .attr('y', d => y(0))
          .attr('width', x.bandwidth())
          .transition()
          .duration(750)
          .attr('class', 'bar')
          .attr('x', d => x(d.country))
          .attr('y', d => y(d.percentage))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.percentage));

        // EXIT.
        bars.exit()
          .transition()
          .duration(750)
          .style('opacity', 0)
          .remove();

        ////////////////////////////////
        // DATA JOIN FOR NAMES.
        var name = svg.selectAll('.name')
          .data(current, d => d.country);

        // UPDATE.
        name.transition()
          .duration(750)
          .delay(delay)
          .attr('x', (d, i) => x(d.country) + x.bandwidth() / 2);

        // ENTER.
        console.log("HERE")
        name.enter()
          .append('text')
          .attr('x', d => x(d.country) + x.bandwidth() / 2)
          .attr('y', d => y(d.percentage) + (height - y(d.percentage)) / 2)
          .style('opacity', 0)
          .transition()
          .duration(1000)
          .text(d => d.country)
          .attr('class', 'name')
          //.attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
          .attr('x', d => x(d.country) + x.bandwidth() / 2)
          .attr('y', d => y(d.percentage) + (height - y(d.percentage)) / 2)
          .style('opacity', 1);
        console.log("HERE 2")

        // EXIT.
        name.exit()
          .transition()
          .duration(750)
          .style('opacity', 0)
          .remove();
      }

      function transition() {
        var transition = svg.transition()
          .duration(750);

        transition.selectAll('.bar')
          .delay(delay)
          .attr('x', d => x(d.country));

        transition.selectAll('.name')
          .delay(delay)
          .attr('x', d => x(d.country) + x.bandwidth() / 2);
      }

      function draw() {
        x.domain(current.map(d => d.country))
          .range([0, width])
          .paddingInner(0.2);

        y.domain([0, d3.max(current, d => d.percentage)])
          .range([height, 0]);

        svg.selectAll('.bar')
          .data(current, d => d.country)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr('x', d => x(d.country))
          .attr('y', d => y(d.percentage))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.percentage));

        svg.selectAll('.name')
          .data(current, d => d.country)
          .enter()
          .append('text')
          .text(d => d.country)
          .attr('class', 'name')
          //.attr('style', d => d.name === 'EARTH' ? 'fill: red' : '')
          .attr('x', d => x(d.country) + x.bandwidth() / 2)
          .attr('y', d => y(d.percentage) + (height - y(d.percentage)) / 2);

        var xAxis;
        xAxis = d3.axisBottom()
          .scale(x)
          .ticks(0)
          .tickSize(0)
          .tickFormat('');

        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

        svg.append('text')
          .attr('class', 'xlabel')
          .text('Countries')
          .attr('x', width / 2)
          .attr('y', height + 20);

        var yAxis = d3.axisLeft()
          .scale(y)
          .ticks(5, 'd');

        svg.append('g')
          .attr('class', 'axis')
          .call(yAxis);

        svg.append('text')
          .attr('x', - height / 2)
          .attr('y', - margin.left * 0.7)
          .attr('transform', 'rotate(-90)')
          .attr('class', 'ylabel')
          .append('tspan').text('Percentage')
          .style('baseline-shift', 'super')
          .style('font-size', '0.7em');

          svg.append("text")
          .attr("x", (width / 2))             
          .attr("y", 0 - (margin.top / 2))
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Internet Usage (2017)");
      }