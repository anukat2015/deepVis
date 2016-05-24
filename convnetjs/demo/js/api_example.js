// api_example.js
// Called from images-demo.js
// Uses deepVis_api.js

var api_example = function(net, elt) {
  console.log('api_example append');
  
  //clear 
  elt.innerHTML = "";

  var example_layer_div = document.createElement('div');
  example_layer_div.appendChild(document.createTextNode('get_canvas_img API'));
  example_layer_div.appendChild(document.createElement('br'));

  var N = net.layers.length;
  N = N - 1; // do not show last layer

  // get_canvas_img API example START
  for(var i=0; i<N; i++) {
    // layer start
    var L = net.layers[i];

    example_layer_div.appendChild(document.createTextNode('layer: ' + i));
    example_layer_div.appendChild(document.createElement('br'));

    var num_element = get_number_of_elements_in_layer(L);

    for(var j=0; j<num_element; j++) {

      var canvas_img = get_canvas_img(L, j);
      example_layer_div.appendChild(canvas_img);
    }
    example_layer_div.appendChild(document.createElement('br'));
    // layer end

    elt.appendChild(example_layer_div);
  }
  // get_canvas_img API example END



  example_layer_div.appendChild(document.createElement('br'));
  example_layer_div.appendChild(document.createElement('br'));
  example_layer_div.appendChild(document.createTextNode('get_grad_magnitude API'));
  example_layer_div.appendChild(document.createElement('br'));



  // get_grad_magnitude API example START
  for(var i=0; i<N; i++) {
    // layer start
    var L = net.layers[i];

    example_layer_div.appendChild(document.createTextNode('layer: ' + i));
    example_layer_div.appendChild(document.createElement('br'));

    if(L.layer_type == 'conv') {// Only for conv layer

      var num_element = get_number_of_elements_in_layer(L);

      for(var j=0; j<num_element; j++) {

        var grad_mag = get_grad_magnitude(L, j);
        example_layer_div.appendChild(document.createTextNode(grad_mag + ', '));
      }
      example_layer_div.appendChild(document.createElement('br'));
      // layer end

      elt.appendChild(example_layer_div);
    }
  }
  // get_grad_magnitude API example END



  
  example_layer_div.appendChild(document.createElement('br'));
  example_layer_div.appendChild(document.createElement('br'));
  example_layer_div.appendChild(document.createTextNode('get_path_intensity API'));
  example_layer_div.appendChild(document.createElement('br'));



  // get_path_intensity API example START
  for(var i=0; i<N; i++) {
    // layer start
    var L = net.layers[i];

    example_layer_div.appendChild(document.createTextNode('layer: ' + i));
    example_layer_div.appendChild(document.createElement('br'));

    var num_element = get_number_of_elements_in_layer(L);

    for(var j=0; j<num_element; j++) {

      var grad_mag = get_path_intensity(L, j);
      example_layer_div.appendChild(document.createTextNode(grad_mag + ', '));
    }
    example_layer_div.appendChild(document.createElement('br'));
    // layer end

    elt.appendChild(example_layer_div);
  }
  // get_path_intensity API example END


}