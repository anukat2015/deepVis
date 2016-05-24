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

var get_canvas_img = function(L, index) {

  // var get_layer_canvas = function(L, isFilter, grads, index, 2) {
  if(L.layer_type == 'conv') {
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
  var area = A.sx * A.sy / 25;

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
    var d = index;
    for(var x=0;x<A.sx;x++) {
      for(var y=0;y<A.sy;y++) {
        var A_grad=A.get_grad(x,y,d);
        grad_magnitude+=A_grad*A_grad;
      }
    }
  }

  return grad_magnitude / area;
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
     if(L1.layer_type == 'pool') {
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
                var weights = B.get(fx,fy,i);
                
                path_intensity+=act*weights;
              }
            }
          }
        }
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