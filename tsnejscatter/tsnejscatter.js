var tsnejscatter = (function(){
  "use strict";
 
  var dotrain =  true;
  var dataok = false;

  var preProData = function(data) {

    var txt = data;
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
    data = raw_data;
    return data; // set global
  }

  var step = function(data, T, xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis) {

    if(dotrain) {
      var cost = T.step(); // do a few steps
      if(T.iter % 100 == 0)
        console.log("iter: " + T.iter);

      // if(T.iter > 2000) {

      //   clearInterval(iid);
      //   dotrain = false;
      // }
      // $("#cost").html("iteration " + T.iter + ", cost: " + cost);
      updateEmbedding(T, xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis);
    }
  }

  var updateEmbedding = function(T, xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis) {

    if(T.iter % 1 == 0) {
      // get current solution
      var data = T.getSolution();

      //update
      var xMax = d3.max(data, function(d) { return d[0]; });
      var xMin = d3.min(data, function(d) { return d[0]; });
      var yMax = d3.max(data, function(d) { return d[1]; });
      var yMin = d3.min(data, function(d) { return d[1]; });

      xscale.domain([xMin, xMax]);
      yscale.domain([yMin, yMax]);

      zoomBeh.x(xscale.domain([xMin, xMax])).y(yscale.domain([yMin, yMax]));
      zoomBeh.on("zoom", function () {
        zoom(data, svg, xscale, yscale, xAxis, yAxis, gs);
      });

      svg.attr("d", data);
      svg.select(".x.axis").call(xAxis).select(".label").text(0);
      svg.select(".y.axis").call(yAxis).select(".label").text(1);

      gs.attr("d", data)
        .attr("transform", function(d, i) {
        return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";
      });
    }

  }

  var init_tSNE = function(data, outdom) {

    console.log('init');

    var opt = {epsilon: parseFloat(10), perplexity: parseInt(3)};
    var T = new tsnejs.tSNE(opt); // create a tSNE instance
    var data = preProData(data);
    
    T.initDataRaw(data);

    var svgc = drawEmbedding(data, outdom);
    // for(var k = 0; k < 200; k++) {
    //   step(); // every time you call this, solution gets better
    // }
    // iid = setInterval(step, 0);

    var iid = setInterval(function () {
      step(data, T, svgc.xscale, svgc.yscale, svgc.zoomBeh, 
        svgc.svg, svgc.gs, svgc.xAxis, svgc.yAxis);
    }, 0);

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

  var drawEmbedding = function(data, outdom) {

    var margin = { top: 50, right: 50, bottom: 50, left: 50 },
        outerWidth = 500,
        outerHeight = 400,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var xscale = d3.scale.linear().range([0, width]).nice();

    var yscale = d3.scale.linear().range([height, 0]).nice();

     var rCat = "Protein (g)",
      colorCat = "Manufacturer";

    var xMax = d3.max(data, function(d) { return d[0]; }) * 1.05;
    var xMin = d3.min(data, function(d) { return d[0]; });
    // xMin = xMin > 0 ? 0 : xMin,
    var yMax = d3.max(data, function(d) { return d[1]; }) * 1.05;
    var yMin = d3.min(data, function(d) { return d[1]; });
        // yMin = yMin > 0 ? 0 : yMin;

    xscale.domain([xMin, xMax]);
    yscale.domain([yMin, yMax]);

    var xAxis = d3.svg.axis()
        .scale(xscale)
        .orient("bottom")
        .tickSize(-height);

    var yAxis = d3.svg.axis()
        .scale(yscale)
        .orient("left")
        .tickSize(-width);

    var color = d3.scale.category20();

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
          return 0 + ": " + d[0] + "<br>" + 1 + ": " + d[1];
        });

    var zoomBeh = d3.behavior.zoom()
        .x(xscale)
        .y(yscale)
        .scaleExtent([0, 500])

    var svg = d3.select(outdom)
      .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoomBeh)

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
        .text(0);

    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
      .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text(1);

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

    var gs = objects.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .classed("dot", true)
        .attr("r", function (d) { return 6 * Math.sqrt(3 / Math.PI); })
        // .attr("transform", transform(data, xscale, yscale))
        .attr("fill", color)
        // .style("fill", function(d) { return color(5); })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    zoomBeh.on("zoom", function () {
      zoom(data, svg, xscale, yscale, xAxis, yAxis, gs);
    });

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

    // d3.select("#plotbtn").on("click", change);
    return {
      xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis
    };
  }

  var change = function() {
    // 0 = "Carbs";
    var xMax = d3.max(data, function(d) { return d[0]; });
    var xMin = d3.min(data, function(d) { return d[0]; });
    zoomBeh.x(xscale.domain([xMin, xMax])).y(yscale.domain([yMin, yMax]));

    var svgupdate = svg.transition();

    svgupdate.select(".x.axis").duration(0).call(xAxis).select(".label").text(0);
    svgupdate.select(".y.axis").duration(0).call(yAxis).select(".label").text(1);

    gs.attr("d", data)
      .attr("transform", function(d, i) {
      return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";

    });
    // objects.selectAll(".dot").transition().duration(0).attr("transform", transform);
  }

  var zoom = function(data, svg, xscale, yscale, xAxis, yAxis, gs) {

    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    gs.attr("d", data)
      .attr("transform", function(d, i) {
        return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";

      });
  }

  var transform = function(d, xscale, yscale) {

    return "translate(" + xscale(d[0]) + "," + yscale(d[1]) + ")";
  }

  var tsnejsc = function($, inputdata, out) {
    //constructor 
    console.log('start tsnejsc');

    var data = inputdata || {};
    var outdom = out;

    init_tSNE(data, outdom);
  }

  return tsnejsc;
  
})();
