var tsnejscatter = (function(){
  "use strict";
 
  var dotrain =  true;
  // var dataok = false;

  var preProData = function(data) {

    var txt = data;
    var d = ',';
    var lines = txt.split("\n");
    var raw_data = [];
    var dlen = -1;
    // dataok = true;
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
        // dataok = false;
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
      if(T.iter % 1 == 0)
        updateEmbedding(T, xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis);
    }
  }

  var updateEmbedding = function(T, xscale, yscale, zoomBeh, svg, gs, xAxis, yAxis) {

    // get current solution
    var data = T.getSolution();

    //update
    var xMax = d3.max(data, function(d) { return d[0]; }) * 1.2;
    var xMin = d3.min(data, function(d) { return d[0]; }) * 1.2;
    var yMax = d3.max(data, function(d) { return d[1]; }) * 1.2;
    var yMin = d3.min(data, function(d) { return d[1]; }) * 1.2;

    xscale.domain([xMin, xMax]);
    yscale.domain([yMin, yMax]);

    zoomBeh.x(xscale.domain([xMin, xMax])).y(yscale.domain([yMin, yMax]));
    zoomBeh.on("zoom", function () {
      zoom(data, svg, xscale, yscale, xAxis, yAxis, gs);
    });

    svg.attr("d", data);
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    gs.attr("d", data)
      .attr("transform", function(d, i) {
      return "translate(" + xscale(data[i][0]) + "," + yscale(data[i][1]) + ")";
    });
  }

  // var change_p = function(data) {
  //   var data = preProData(data);
  //   T.changeP(data);
  // }

  var init_tSNE = function(data, outdom, isArrData, showImg, L, isFilter, layer_num, tsne_width) {

    console.log('init' + layer_num);

    var opt = {epsilon: parseFloat(10), perplexity: parseInt(3)};
    var T = new tsnejs.tSNE(opt); // create a tSNE instance

    if(isArrData) {
      data = preProData(data);
    } else {

      if(isFilter) {

        // var filter_data1 = [];
        // for(var j=0; j< Lfilter.length; j++) {          
        //     var afilter = [];
        //     // console.log(Lfilter[j].w.length); //75(5x5x3) 400(5x5x16) 500(5x5x20)

        //     // same as
        //     // for(var y=0;y<A.sy;y++) {
        //     //  for(var x=0;x<A.sx;x++) {
        //     //    for(var d=0;d<A.depth;d++) {

        //     for(var k=0; k< Lfilter[j].w.length; k++) {
        //       var f_gd = Lfilter[j].w[k];
        //       afilter.push(f_gd);
        //     }
        //     filter_data1.push(afilter);
        // }
        // var data1 = filter_data1;

        var filter_data = [];
        for(var j=0; j< L.filters.length; j++) {  

          var A = L.filters[j];

          var afilter = [];
          
          for(var d=0;d<A.depth;d++) {
            for(var x=0;x<A.sx;x++) {
              for(var y=0;y<A.sy;y++) {
                var f_gd = A.get(x,y,d);
                afilter.push(f_gd);
              }
            }
          }
          filter_data.push(afilter);
        }

        data = filter_data;
        // debugger;

      } else {
        var A = L.out_act;
        var filter_data = [];

        for(var d=0;d<A.depth;d++) {

          var afilter = [];

          for(var x=0;x<A.sx;x++) {
            for(var y=0;y<A.sy;y++) {
              var f_gd = A.get(x,y,d);
              afilter.push(f_gd);
            }
          }
          filter_data.push(afilter);
        }

        data = filter_data;
      }

    }//else if showImg end

    // console.log(data);
    
    T.initDataRaw(data);

    var svgc = drawEmbedding(data, outdom, showImg, L, isFilter, tsne_width);
    // for(var k = 0; k < 200; k++) {
    //   step(); // every time you call this, solution gets better
    // }
    var iid = setInterval(function () {
      step(data, T, svgc.xscale, svgc.yscale, svgc.zoomBeh, 
        svgc.svg, svgc.gs, svgc.xAxis, svgc.yAxis);

      if(T.iter > 700) {
        clearInterval(iid);
      }

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

    $("#option1").click(function() {
      console.log('option1');
    });

  }

  var drawEmbedding = function(data, outdom, showImg, L, isFilter, tsne_width) {

    var margin = { top: 0, right: 50, bottom: 50, left: 50 },
        outerWidth = tsne_width,
        outerHeight = outerWidth * 0.8,
        width = outerWidth - margin.left - margin.right,
        height = outerHeight - margin.top - margin.bottom;

    var xscale = d3.scale.linear().range([0, width]).nice();
    var yscale = d3.scale.linear().range([height, 0]).nice();

    var xMax = d3.max(data, function(d) { return d[0]; }) * 1.2;
    var xMin = d3.min(data, function(d) { return d[0]; });
    // xMin = xMin > 0 ? 0 : xMin,
    var yMax = d3.max(data, function(d) { return d[1]; }) * 1.2;
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

    var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([0, 0])
        // .append(div)
        .html(function(d, i) {
          // return 'x' + ": " + d[0] + "<br>" + 'y' + ": " + d[1];
          // return '<img src="./download1.png" alt="Mountain View" style="width:100px;height:100px;">';
// var draw_activations = function(elt, A, scale, grads) {
          if(isFilter) {

            if(L.filters[0].depth == 3) {

              var fimg =  get_layer_canvas(L, isFilter, false, i, 20).toDataURL();
              var img_eval = '<img src=' + fimg + ' alt="Mountain View" style="width:100px;height:100px;">';
              return img_eval;
            }
            else {

              var tip_div = document.createElement('div');

              for(var j=0; j<L.filters.length; j++) {

                if(j>3 && j%5 == 0) {
                  tip_div.appendChild(document.createElement('br'));
                }
                // var get_filter_canvas = function(A, scale, grads, index)
                var fimg =  get_filter_canvas(L.filters[i], 6, false, j).toDataURL();
                var img_eval = '<img src=' + fimg + ' alt="Mountain View" style="width:100px;height:100px;">';
                
                var img_tag = document.createElement('img');
                img_tag.className = 'actmap';
                img_tag.setAttribute('src', fimg);
                tip_div.appendChild(img_tag);         
              }

              return tip_div.innerHTML;
            }

          }
          else {
            var fimg =  get_layer_canvas(L, isFilter, false, i, 10).toDataURL();
            var img_eval = '<img src=' + fimg + ' alt="Mountain View" style="width:100px;height:100px;">';
            return img_eval;
          }

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
        // .text('x');

    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
      .append("text")
        .classed("label", true)
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + margin.right)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        // .text('y');

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

    var color = d3.scale.category20();

    var gs = objects.selectAll(".dot")
        .data(data)
      .enter().append("g")

    if(showImg) {

      gs.append("rect")
          .classed("dot_rect", true)
          .attr("width", 18)
          .attr("height", 18)
          // .attr("transform", transform(data, xscale, yscale))
          // .attr("fill", color)
      gs.append("svg:image")
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 18)
        .attr('height', 18)
        // .attr("xlink:href", canv_img.toDataURL())
        .attr("xlink:href", function(d, i) {
            return get_layer_canvas(L, isFilter, false, i, 5).toDataURL(); 
        })
        // .attr("xlink:href", function(d) { return "./download1.png"; })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);
    }
    else {
      gs.append("circle")
      .classed("dot_circle", true)
      .attr("r", 7)
      // .attr("r", function (d) { return 7 * Math.sqrt(3 / Math.PI); })
      // .attr("transform", transform(data, xscale, yscale))
      .attr("fill", color)
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide);
    }

    gs.append("text")
      .attr("text-anchor", "top")
      .attr("font-size", 10)
      .attr('x', 3)
      .attr('y', -5)
      .attr("fill", "#333")
      .text(function(d, i) { return i; });

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
    //     .attr("width", 15)
    //     .attr("height", 15)
    //     // .classed("dots", true)
    //     // .attr("style", "fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9")
    //     .attr("cx", width + 20)
    //     .attr("fill", color);


    // legend.append("text")
    //     .attr("x", width + 26)
    //     .attr("dy", ".35em")
        // .text(function(d) { return d; });

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

  var tsnejsc = function($, inputdata, out, isArrData, showImg, isFilter, layer_num, tsne_width) {
    //constructor 
    console.log('start tsnejsc');

    var data = inputdata || {};
    var L = data;

    var outdom = out;

    var change_p = change_p;

    init_tSNE(data, outdom, isArrData, showImg, L, isFilter, layer_num, tsne_width);
  }

  tsnejsc.prototype = {

    change_p: function(data) {
      var data = preProData(data);
      // T.changeP(data);
      //console.log('changeP');
    }

  }

  return tsnejsc;
  
})();
