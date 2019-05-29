// please note the script tag including the d3 library from 
// the static folder

exports.graph = function graph() {
  return `

  <script src="static/d3.min.js"></script>

Test Widget<br>
<div id="d3mount"></div>
<style type="text/css">
  .line {
    fill: none;
    stroke: #ffab00;
    stroke-width: 3;
  }

  .overlay {
    fill: none;
    pointer-events: all;
  }

  .dot {
    fill: #ffab00;
    stroke: #fff;
  }

  .focus circle {
    fill: none;
    stroke: steelblue;
  }
</style>
<script>

  var margin = { top: 30, right: 30, bottom: 30, left: 30 }
    , width = 400
    , height = 400;

  var n = 21;

  var xScale = d3.scaleLinear()
    .domain([0, n - 1]) // input
    .range([0, width]); // output

  var yScale = d3.scaleLinear()
    .domain([0, 1]) // input 
    .range([height, 0]); // output 

  var line = d3.line()
    .x(function (d, i) { return xScale(i); }) // set the x values for the line generator
    .y(function (d) { return yScale(d.y); }) // set the y values for the line generator 
    .curve(d3.curveMonotoneX) // apply smoothing to the line

  var dataset = d3.range(n).map(function (d) { return { "y": d3.randomUniform(1)() } })

  var svg = d3.select("#d3mount").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale)); 

  svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(yScale));

  var path = svg.append("path")
    .datum(dataset) 
    .attr("class", "line")
    .attr("d", line);

  var totalLength = path.node().getTotalLength();

  path
    .attr("stroke-dasharray", totalLength + " " + totalLength)
    .attr("stroke-dashoffset", totalLength)
    .transition()
    .duration(4000)
    .ease(d3.easeLinear)
    .attr("stroke-dashoffset", 0)

  var points = svg.selectAll(".dot")
    .data(dataset)
    .enter().append("circle")
    .attr("class", "dot") 
    .attr("cx", function (d, i) { return xScale(i) })
    .attr("cy", function (d) { return yScale(d.y) })
    .attr("r", 5)
    .on("mouseover", function (a, b, c) {
      console.log(a);
      d3.select(this).attr('class', 'focus');
    })
    .on("mouseout", function () {
      d3.select(this).attr('class', 'dot');
    });

</script>
`;
}
