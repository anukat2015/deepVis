var get_layer_canvas = function(L, isFilter, grads, index, scale) {

  var A = {};
  if(isFilter) {
    A = L.filters[index];
  } else {
    A = L.out_act;
  }

  var isColor = false;
  if(A.depth == 3) { isColor = true; }
  
  var s = scale || 2; // scale
  if(isFilter) s = 4;

  var draw_grads = false;
  if(typeof(grads) !== 'undefined') draw_grads = grads;

  // get max and min activation to scale the maps automatically
  var w = draw_grads ? A.dw : A.w;
  var mm = maxmin(w);

  var canv = document.createElement('canvas');
  canv.className = 'actmap';
  var W = A.sx * s;
  var H = A.sy * s;
  canv.width = W;
  canv.height = H;
  var ctx = canv.getContext('2d');
  var g = ctx.createImageData(W, H);

  if(isColor) { // draw a color img
    for(var d=0;d<3;d++) {
      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          if(draw_grads) {
            var dval = Math.floor((A.get_grad(x,y,d)-mm.minv)/mm.dv*255);
          } else {
            var dval = Math.floor((A.get(x,y,d)-mm.minv)/mm.dv*255);  
          }
          for(var dx=0;dx<s;dx++) {
            for(var dy=0;dy<s;dy++) {
              var pp = ((W * (y*s+dy)) + (dx + x*s)) * 4;
              g.data[pp + d] = dval;
              if(d===0) g.data[pp+3] = 255; // alpha channel
            }
          }
        }
      }
    }
  }
  else { //draw a black & white img

    if(isFilter) {
      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          var dval = 0
          //calculate average of the filter weights
          for(var d=0;d<A.depth;d++) {
            if(draw_grads) {
              dval += Math.floor((A.get_grad(x,y,d)-mm.minv)/mm.dv*255);
            } else {
              dval += Math.floor((A.get(x,y,d)-mm.minv)/mm.dv*255);  
            }
          }
          dval = dval/A.depth;
          for(var dx=0;dx<s;dx++) {
            for(var dy=0;dy<s;dy++) {
              var pp = ((W * (y*s+dy)) + (dx + x*s)) * 4;
              for(var i=0;i<3;i++) { g.data[pp + i] = dval; } // rgb
              g.data[pp+3] = 255; // alpha channel
            }
          }
        }
      }
    } else {

      var d = index;

      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          if(draw_grads) {
            var dval = Math.floor((A.get_grad(x,y,d)-mm.minv)/mm.dv*255);
          } else {
            var dval = Math.floor((A.get(x,y,d)-mm.minv)/mm.dv*255);  
          }
          for(var dx=0;dx<s;dx++) {
            for(var dy=0;dy<s;dy++) {
              var pp = ((W * (y*s+dy)) + (dx + x*s)) * 4;
              for(var i=0;i<3;i++) { g.data[pp + i] = dval; } // rgb
              g.data[pp+3] = 255; // alpha channel
            }
          }
        }
      }
    } //else end
  } //else end
  
  ctx.putImageData(g, 0, 0);
  return canv;
}

var get_canvas_img = function(L, index, relu) {

  // var get_layer_canvas = function(L, isFilter, grads, index, 2) {
  if(L.layer_type == 'conv') {

    if(relu)
    return get_layer_canvas(L, false, false, index, 2);

    else
    return get_layer_canvas(L, true, false, index, 2);
  }
  else if(L.layer_type == 'relu') {
    return get_layer_canvas(L, false, false, index, 2);
  }
  else if(L.layer_type == 'pool') {
    return get_layer_canvas(L, false, false, index, 2);
  }
  else if(L.layer_type == 'softmax') {
    return get_layer_canvas(L, false, false, index, 10);
  }
  else if(L.layer_type == 'fc') {
    return get_layer_canvas(L, false, false, index, 10);
  }
  else if(L.layer_type == 'input') {
    return get_layer_canvas(L, false, false, index, 2);
  }
  else {
    console.log('Invalid layer');
  }

}

var get_number_of_elements_in_layer = function(L) {

  if(L.layer_type == 'conv') {
      return L.filters.length;
  }
  else {
    if(L.layer_type == 'input')
      return 1;
    else 
      return L.out_act.depth;
  }
}

var get_grad_magnitude = function(L, index){

  var isFilter = true;

  var A = {};
  if(isFilter) {
    A = L.filters[index];
  } else {
    A = L.out_act;
  }
  var grad_magnitude = 0.0;
  var area = A.sx * A.sy * A.depth;
  // console.log(A.depth);
  if(isFilter) {
    for(var d=0;d<A.depth ; d++) {
      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          var A_grad=A.get_grad(x,y,d);
          grad_magnitude+=A_grad*A_grad;  
        }
      }
    }
  }else {
    // var d = index;
    // for(var x=0;x<A.sx;x++) {
    //   for(var y=0;y<A.sy;y++) {
    //     var A_grad=A.get_grad(x,y,d);
    //     grad_magnitude+=A_grad*A_grad;
    //   }
    // }
  }

  return grad_magnitude / area * 200;
}

var get_path_intensity = function(L1, L2, index){

  var isFilter = false;

  if(L1.layer_type == 'conv') {
    isFilter = true;
  }

  var A = {};
  if(isFilter) {
    A = L1.filters[index];
  } else {
    A = L1.out_act;
  }
  var path_intensity = 0.0;
  var area = A.sx * A.sy / 100;

  if(isFilter) {
    for(var d=0;d<A.depth ; d++) {
      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          var act=A.get(x,y,d);
          if(act < 0) act = -1 * act;
          path_intensity+=act;  
        }
      }
    }
  } else {
     if(L1.layer_type == 'pool' && (L2.layer_type == 'conv' || L2.layer_type == 'fc')) {
      var num_out = get_number_of_elements_in_layer(L2);
      var path_arr = [];
      for(var i=0; i<num_out; i++) {

        path_intensity = 0.0;
        stride = L2.stride;
        var d = index;
        var B = L2.filters[i];
        for(var x=0;x<A.sx;x+=stride) {
          for(var y=0;y<A.sy;y+=stride) {
            for(var fx=0;fx<B.sx;fx++) {
              for(var fy=0;fy<B.sy;fy++) {

                var act=A.get(x,y,d);
                var weights = B.get(fx,fy,d);
                var conval = act*weights
                path_intensity+=conval;
              }
            }
          }
        }
        area = area * B.sx * B.sy;
        if(path_intensity < 0) path_intensity = -1 * path_intensity;
        path_arr.push(path_intensity / area);
      }
      return path_arr;
    } else {
      var d = index;
      for(var x=0;x<A.sx;x++) {
        for(var y=0;y<A.sy;y++) {
          var act=A.get(x,y,d);
          if(act < 0) act = -1 * act;
          path_intensity+=act;
        }
      }
    }
  }

  if(L1.layer_type == 'input') {
    var num_out = get_number_of_elements_in_layer(L2);
    var path_arr = [];
    for(var i=0; i<num_out; i++) {
      path_arr.push(path_intensity / area);
    }

    return path_arr;
  }

  var path_arr = [];
  path_arr.push(path_intensity / area);
  return path_arr;
}

var change_filter = function(net, layer_set_index, add_filter) {
  console.log('change_filter');
  toggle_pause();

  var net_json = this.net.toJSON();
  var num_conv = (layer_set_index) * 3 + 1;

  var net_conv = net_json.layers[num_conv];

  if(add_filter) {

    //Change conv out_depth
    net_conv.out_depth = net_conv.out_depth + 1;

    //Copy last object from filter
    var layer_filters = net_conv.filters;

    var filter_len = layer_filters.length;
    var last_filter = layer_filters[filter_len-1];
    last_filter = JSON.parse(JSON.stringify(last_filter)); //clone json object
    
    // initialize last obeject
    var lsx = last_filter.sx;
    var lsy = last_filter.sy;
    var ldepth = last_filter.depth;

    for(var i=0; i<lsx*lsy*ldepth; i++) {
      last_filter.w[i] = getRandomFloat(-0.2, 0.2);
    }
    //add new weight
    layer_filters.push(last_filter);
    // console.log(net_conv);

    //biases
    var layer_biases = net_conv.biases;

    var normalArray = [].slice.call(layer_biases.w);
    var last_bias = layer_biases.w[layer_biases.depth-1];
    normalArray.push(getRandomFloat(-0.2, 0.2));
    // console.log(normalArray);

    layer_biases.w = new Float64Array(normalArray);


    // var arr = new Float64Array([21,31]);
    // console.log(arr[1]); // 31

    // console.log(layer_biases);
    // console.log(last_bias);

    layer_biases.depth = layer_biases.depth + 1;

    // net_relu
    var net_relu = net_json.layers[num_conv+1];
    net_relu.out_depth = net_relu.out_depth + 1;

    //net_pool
    var net_pool = net_json.layers[num_conv+2];
    net_pool.in_depth = net_pool.in_depth + 1;
    net_pool.out_depth = net_pool.out_depth + 1;

    //next conv
    var next_conv = net_json.layers[num_conv+3];
    next_conv.in_depth = next_conv.in_depth + 1;

    //add weights to next_conv
    var next_filters = next_conv.filters;
    var num_next_filter = next_conv.out_depth;
    for(var i=0; i<num_next_filter; i++) {
      var afilter = next_filters[i];
      afilter.depth = afilter.depth+1;

      var normalArray = [].slice.call(afilter.w);

      for(var j=0; j<afilter.sx * afilter.sy; j++) {
        normalArray.push(getRandomFloat(-0.2, 0.2));
      }
      afilter.w = new Float64Array(normalArray);
    }


    this.net = new convnetjs.Net();
    this.net.fromJSON(net_json);
    reset_all();

  } else {

    if(net_conv.out_depth > 3) {

      //net_pool
      var net_pool = net_json.layers[num_conv+2];
      net_pool.out_depth = net_pool.out_depth - 1;
      net_pool.in_depth = net_pool.in_depth - 1;

      // net_relu
      var net_relu = net_json.layers[num_conv+1];
      net_relu.out_depth = net_relu.out_depth - 1;

      //biases
      var layer_biases = net_conv.biases;
      var bias_w = layer_biases.w;
      // var sub_bias_w = bias_w.subarray(0, layer_biases.depth-1);
      // console.log(layer_biases);
      // bias_w = sub_bias_w;
      layer_biases.depth = layer_biases.depth - 1;

      //conv
      var layer_filters = net_conv.filters;
      // console.log(layer_filters);
      // delete layer_filters[3];
      //       console.log(layer_filters);

      layer_filters.length = layer_filters.length -1;
      // var sub_layer_filters = layer_filters.slice(0, net_conv.out_depth -1);
      // layer_filters = sub_layer_filters;
      // console.log(layer_filters);
      net_conv.out_depth = net_conv.out_depth -1;

      // next conv
      var next_conv = net_json.layers[num_conv+3];
      next_conv_filters = next_conv.filters;
      if(next_conv.layer_type == 'fc') {
        
        var fc_valnum = net_pool.out_sx * net_pool.out_sy * net_pool.out_depth;
        for(var i=0; i<next_conv.out_depth; i++) {
          next_conv_filters[i].depth = fc_valnum;
        }

        
      } else {
        next_conv.in_depth = next_conv.in_depth - 1;
        var next_conv_filters = next_conv.filters;
        for(var i=0; i<next_conv.out_depth; i++) {
          next_conv_filters[i].depth = next_conv_filters[i].depth - 1;
        }
      }

      this.net = new convnetjs.Net();
      this.net.fromJSON(net_json);
      reset_all();

    }
    else {
      console.log('Not enough filter')
    }

  }
  toggle_pause();
}