//myDoodle v 0.0.negative1
var myDoodle = (function () {
    var svg;  //keep track of the svg!

    var api = {
        //select svg by id using ex2.7 code
        select: function (id) {
            this.svg = document.getElementById(id);
            return this;  //return this for chaining 🔗
        },

        //🛁 the bubble machine
        makeBubble: function (cx, cy, r, label, background_color, color) {
            background_color = background_color ? background_color : 'red';  //set defaults for arguments not provided
            color = color ? color : 'white';

            //using code from ex2.7 drawCircle() to draw the circle
            var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);
            circle.setAttribute('r', r);
            circle.setAttribute('fill', background_color);
            this.svg.appendChild(circle);  //append to selected svg using this.svg! 

            //use code from ex2.7 drawTextCentered() to draw the text in the bubble
            //🎒 finish-me!
            //🎒 on the text set the fill to color and do not set the stroke so the text look nicer!
            var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('style', 'text-anchor: middle; alignment-baseline: middle;');
            text.setAttribute('x', cx);
            text.setAttribute('y', cy);
            text.setAttribute('fill', background_color);
            text.setAttribute('stroke', color)
            text.setAttribute('stroke-width', 1)
            text.setAttribute('font-size', '14px')
            text.innerHTML = label
            this.svg.appendChild(text);  //append to selected svg using this.svg! 


            return this;  //return this for chaining 🔗
        }
    };
    return api;
})();