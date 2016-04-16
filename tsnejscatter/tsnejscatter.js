var tsnejscatter = (function(tsnejscatter, $, undefined, undefined){
  // "use strict";
  ////////////////////tsnejscatter
  var T, opt;
  var iid;
  var resultY; // tsne result stored here
  var data;
  var gs;

  var xscale;
  var yscale;
  var xCat, yCat, rCat, colorCat;
  var xMax, xMin, yMAX, yMin; 
  var xAxis, yAxis, color, tip, zoomBeh, svg, objects;
  var dotrain = true;
  var stepnum = 0;
  var dataok = false;
  var outdom;

  function preProData() {

    var txt = data;
    // console.log(txt);
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

  function step() {

    if(dotrain) {
      var cost = T.step(); // do a few steps
      if(T.iter % 100 == 0)
        console.log("iter: " + T.iter);
      // $("#cost").html("iteration " + T.iter + ", cost: " + cost);
      updateEmbedding();
    }
  }

  function updateEmbedding() {

    if(T.iter % 10 == 0) {
      // get current solution
      var resultY = T.getSolution();

      data = resultY;

      //update
      xMax = d3.max(data, function(d) { return d[xCat]; });
      xMin = d3.min(data, function(d) { return d[xCat]; });
      yMax = d3.max(data, function(d) { return d[yCat]; });
      yMin = d3.min(data, function(d) { return d[yCat]; });

      xscale.domain([xMin, xMax]);
      yscale.domain([yMin, yMax]);

      zoomBeh.x(xscale.domain([xMin, xMax])).y(yscale.domain([yMin, yMax]));

      svg = svg;
      svg.attr("d", data);

      svg.select(".x.axis").call(xAxis).select(".label").text(xCat);
      svg.select(".y.axis").call(yAxis).select(".label").text(yCat);

      gs.attr("d", data)
        .attr("transform", function(d, i) {
        return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";

      });
    }

  }

  function init_tSNE() {
    console.log('init');

    opt = {epsilon: parseFloat(10), perplexity: parseInt(3)};
    T = new tsnejs.tSNE(opt); // create a tSNE instance
    preProData();
    
    T.initDataRaw(data);
    // console.log(data);

    drawEmbedding();
    iid = setInterval(step, 0);
    // for(var k = 0; k < 300; k++) {
    //   step(); // every time you call this, solution gets better
    // }
      // drawEmbedding();

    $("#run").click(function() {

      console.log('run');
      dotrain = true;

    });

    $("#stop").click(function() {

      console.log('stop');
      // clearInterval(iid);
      dotrain = false;
    
    });

  }

  // $(window).load(function() {
  //   // ok lets do this
  //     // console.log('start');
  //     // init_tSNE();

  // });
  
  var tsnejscatter = function($, inputdata, out) {

    //init 
    data = inputdata || {};
    outdom = out;
    
    console.log('start');

    init_tSNE();
  }

  ////////////////////
  function drawEmbedding() {
  // $("#scatter").empty();

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        outerWidth = 500,
        outerHeight = 400,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    xscale = d3.scale.linear()
      .range([0, width]).nice();

    yscale = d3.scale.linear()
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

    xscale.domain([xMin, xMax]);
    yscale.domain([yMin, yMax]);

    xAxis = d3.svg.axis()
        .scale(xscale)
        .orient("bottom")
        .tickSize(-height);

    yAxis = d3.svg.axis()
        .scale(yscale)
        .orient("left")
        .tickSize(-width);

    color = d3.scale.category20();

    tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return xCat + ": " + d[xCat] + "<br>" + yCat + ": " + d[yCat];
        });

    zoomBeh = d3.behavior.zoom()
        .x(xscale)
        .y(yscale)
        .scaleExtent([0, 500])
        .on("zoom", zoom);

    svg = d3.select(outdom)
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

    objects = svg.append("svg")
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
        .attr("fill", color)
        // .style("fill", function(d) { return color(5); })
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

  }

  function change() {
    // xCat = "Carbs";
    xMax = d3.max(data, function(d) { return d[xCat]; });
    xMin = d3.min(data, function(d) { return d[xCat]; });
    zoomBeh.x(xscale.domain([xMin, xMax])).y(yscale.domain([yMin, yMax]));

    var svgupdate = svg.transition();

    svgupdate.select(".x.axis").duration(0).call(xAxis).select(".label").text(xCat);
    svgupdate.select(".y.axis").duration(0).call(yAxis).select(".label").text(yCat);

    gs.attr("d", data)
      .attr("transform", function(d, i) {
      return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";

    });

    // objects.selectAll(".dot").transition().duration(0).attr("transform", transform);
  }

  function zoom() {

    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    gs.attr("d", data)
      .attr("transform", function(d, i) {
        return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";

      });
  }

  function transform(d) {
    return "translate(" + xscale(d[xCat]) + "," + yscale(d[yCat]) + ")";
  }

  return tsnejscatter;

})(window.tsnejscatter || {},jQuery);
