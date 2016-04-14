
//for t-SNE
////////////////////
var T, opt;

var resultY; // tsne result stored here
var data;
var gs;

var x;
var y;
var xCat, yCat, rCat, colorCat;
var xMax, xMin, yMAX, yMin; 

dataok = false;
function preProData() {

  var txt = $("#incsv").val();

  var d = ',';
  var lines = txt.split("\n");
  var raw_data = [];
  var dlen = -1;
  dataok = true;
  for(var i=0;i<lines.length;i++) {
    var row = lines[i];
    if (! /\S/.test(row)) {
      // row is empty and only has whitespace
      continue;
    }
    var cells = row.split(d);
    var data_point = [];
    for(var j=0;j<cells.length;j++) {
      if(cells[j].length !== 0) {
        data_point.push(parseFloat(cells[j]));
      }
    }
    var dl = data_point.length;
    if(i === 0) { dlen = dl; }
    if(dlen !== dl) {
      // TROUBLE. Not all same length.
      console.log('TROUBLE: row ' + i + ' has bad length ' + dlen);
      dlen = dl; // hmmm... 
      dataok = false;
    }
    raw_data.push(data_point);
  }
  data = raw_data; // set global
}

dotrain = true;
var stepnum = 0;

function step() {

  if(dotrain) {
    var cost = T.step(); // do a few steps
    if(T.iter % 100 == 0)
      console.log("iter: " + T.iter);
    // $("#cost").html("iteration " + T.iter + ", cost: " + cost);
  }
  updateEmbedding();
  // updateEmbedding();
}

function updateEmbedding() {

  // get current solution
  var resultY = T.getSolution();

  // move the groups accordingly
  // if(T.iter % 100 == 0)
  //     console.log(Y);
  data = resultY;

  // gs.attr("transform", function(d, i) { return "translate(" +
  //                                         resultY[i][0] + "," +
  //                                         resultY[i][1] + ")"; });

  // change();
  // gs.empty();
  // data = resultY;

  //do the update
}

$(window).load(function() {
  // ok lets do this
    console.log('start');
    opt = {epsilon: parseFloat(10), perplexity: parseInt(3)};
    T = new tsnejs.tSNE(opt); // create a tSNE instance
    preProData();
    
    T.initDataRaw(data);
    console.log(data);

    // drawEmbedding();
    // iid = setInterval(step, 10);
    for(var k = 0; k < 300; k++) {
      step(); // every time you call this, solution gets better
    }
      drawEmbedding();

    $("#inbut").click(function() {

    console.log('start');
    opt = {epsilon: parseFloat(10), perplexity: parseInt(2)};
    T = new tsnejs.tSNE(opt); // create a tSNE instance
    preProData();
    
    T.initDataRaw(data);
    console.log(data);

    // drawEmbedding();
    // iid = setInterval(step, 10);
    for(var k = 0; k < 1300; k++) {
      step(); // every time you call this, solution gets better
    }
      drawEmbedding();
  
  });

});

////////////////////
////////////////////
function drawEmbedding() {
// $("#scatter").empty();

var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    outerWidth = 500,
    outerHeight = 400,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

  x = d3.scale.linear()
    .range([0, width]).nice();

  y = d3.scale.linear()
    .range([height, 0]).nice();

    xCat = 0;
    yCat = 1;
    rCat = "Protein (g)";
    colorCat = "Manufacturer";

// d3.csv("cereal.csv", function(data) {

  // data.forEach(function(d) {
  //   d.Calories = +d.Calories;
  //   d.Carbs = +d.Carbs;
  //   d["Cups per Serving"] = +d["Cups per Serving"];
  //   d["Dietary Fiber"] = +d["Dietary Fiber"];
  //   d["Display Shelf"] = +d["Display Shelf"];
  //   d.Fat = +d.Fat;
  //   d.Potassium = +d.Potassium;
  //   d["Protein (g)"] = +d["Protein (g)"];
  //   d["Serving Size Weight"] = +d["Serving Size Weight"];
  //   d.Sodium = +d.Sodium;
  //   d.Sugars = +d.Sugars;
  //   d["Vitamins and Minerals"] = +d["Vitamins and Minerals"];
  // });

      xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05;
      xMin = d3.min(data, function(d) { return d[xCat]; });
      // xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05;
      yMin = d3.min(data, function(d) { return d[yCat]; });
      // yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();

  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
      });

  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

  svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10)
      .style("text-anchor", "end")
      .text(xCat);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(yCat);

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  gs = objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      .attr("r", function (d) { return 6 * Math.sqrt(3 / Math.PI); })
      .attr("transform", transform)
      .style("fill", function(d) { return color(5); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);

  // var legend = svg.selectAll(".legend")
  //     .data(color.domain())
  //   .enter().append("g")
  //     .classed("legend", true)
  //     .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  // legend.append("circle")
  //     .attr("r", 3.5)
  //     .attr("cx", width + 20)
  //     .attr("fill", color);

  // legend.append("text")
  //     .attr("x", width + 26)
  //     .attr("dy", ".35em")
  //     .text(function(d) { return d; });

  d3.select("#plotbtn").on("click", change);

  function change() {
    // xCat = "Carbs";
    // xMax = d3.max(data, function(d) { return d[xCat]; });
    // xMin = d3.min(data, function(d) { return d[xCat]; });

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg = d3.select("#scatter").transition();

    svg.select(".x.axis").duration(325).call(xAxis).select(".label").text(xCat);

    objects.selectAll(".dot").transition().duration(500).attr("transform", transform);

    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);
  }

  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }

}
//)
//}