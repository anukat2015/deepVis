//deepVis api 

// var get_layer_canvas = function(L, isFilter, grads, index, scale) {
// var get_grad_magnitude = function(L, isFilter, index){
// var get_path_intensity = function(L, isFilter, index){

var api_example = function(net, elt) {
  console.log('api_example append');
  
  //clear 
  elt.innerHTML = "";

  var N = net.layers.length;

  for(var i=0; i<N; i++) {
    // layer start
    var L = net.layers[i];
    if(L.layer_type == 'fc') // do not show fc layer
      continue;
    
    var test_layer_div = document.createElement('div');
    test_layer_div.appendChild(document.createTextNode('layer: ' + i));
    test_layer_div.appendChild(document.createElement('br'));

    var num_element = get_number_of_elements_in_layer(L);

    for(var j=0; j<num_element; j++) {
      var canvas_img = get_canvas_img(L, j);
      test_layer_div.appendChild(canvas_img);
    }
    test_layer_div.appendChild(document.createElement('br'));
    // layer end

    elt.appendChild(test_layer_div);
  }

}