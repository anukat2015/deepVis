//images-tsne.js
var visualize_tsne = function(net, elt) {

  // clear the element
  elt.innerHTML = "";

  var row_div = document.createElement('div');
  row_div.className = 'row';

  var col1_div = document.createElement('div');
  col1_div.className = 'col-sm-3';
  var col2_div = document.createElement('div');
  col2_div.className = 'col-sm-9';

    // create tsne panel
  var tsne_panel = document.createElement('div');
  var tsne_title_div = document.createElement('div');
  var tsne_body_div = document.createElement('div');

  tsne_panel.className = "panel panel-default"
  tsne_body_div.className = 'panel-body';
  tsne_title_div.className = 'panel-heading panel-heading-custom2';
  tsne_title_div.appendChild(document.createTextNode('t-SNE'));

  //chevron 
  var tsne_title_icon = document.createElement('i');
  tsne_title_icon.className = 'glyphicon glyphicon-chevron-up'
  var tsne_title_span = document.createElement('span');
  tsne_title_span.className = 'pull-right clickable';
  tsne_title_span.appendChild(tsne_title_icon);
  tsne_title_div.appendChild(tsne_title_span);
  tsne_title_div.addEventListener('click', function(){
  
    if ($(this).hasClass('panel-collapsed')) {
      // expand the panel
      $(this).parents('.panel').find('.panel-body').slideDown();
      $(this).removeClass('panel-collapsed');
      $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    }
    else {
      // collapse the panel
      $(this).parents('.panel').find('.panel-body').slideUp();
      $(this).addClass('panel-collapsed');
      $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    }

  });

  //////////////////////
  // test api
  // for(var m=0; m<12; m++) {
  //   var ttst = get_path_intensity(net.layers[11], false, m);
  //   console.log(ttst);
  // }
  //////////////////////

  // show activations in each layer
  var N = net.layers.length;
  for(var i=0;i<N;i++) {

    var L = net.layers[i];

    var layer_div = document.createElement('div');

    // visualize activations
    var activations_div = document.createElement('div');
    activations_div.appendChild(document.createTextNode('Activations:'));
    activations_div.appendChild(document.createElement('br'));
    activations_div.className = 'layer_act';
    var scale = 2;
    if(L.layer_type==='softmax' || L.layer_type==='fc') scale = 10; // for softmax
    
    // HACK to draw in color in input layer
    if(i===0) {
      draw_activations_COLOR(activations_div, L.out_act, scale);
      draw_activations_COLOR(activations_div, L.out_act, scale, true);

      /*
      // visualize what the network would like the image to look like more
      var dd = L.out_act.clone();
      var ni = L.out_act.w.length;
      for(var q=0;q<ni;q++) { var dwq = L.out_act.dw[q]; dd.w[q] -= 20*dwq; }
      draw_activations_COLOR(activations_div, dd, scale);
      */

      /*
      // visualize gradient magnitude
      var dd = L.out_act.clone();
      var ni = L.out_act.w.length;
      for(var q=0;q<ni;q++) { var dwq = L.out_act.dw[q]; dd.w[q] = dwq*dwq; }
      draw_activations_COLOR(activations_div, dd, scale);
      */

    } else {
      // draw_activations(activations_div, L.out_act, scale);
    } 

    // visualize data gradients
    if(L.layer_type !== 'softmax' && L.layer_type !== 'input' ) {
      var grad_div = document.createElement('div');
      grad_div.appendChild(document.createTextNode('Activation Gradients:'));
      grad_div.appendChild(document.createElement('br'));
      grad_div.className = 'layer_grad';
      var scale = 2;
      if(L.layer_type==='softmax' || L.layer_type==='fc') scale = 10; // for softmax
      // draw_activations(grad_div, L.out_act, scale, true);
      // activations_div.appendChild(grad_div);
    }

    // visualize filters if they are of reasonable size
    if(L.layer_type === 'conv') {
      var filters_div = document.createElement('div');
      if(L.filters[0].sx>3) {
        // actual weights

        // gradients

        //show filters
        // filters_div.appendChild(document.createTextNode('Filters list:'));

        // filterstring = filterstring.concat(L.filters[j].w);
        // filterstring = filterstring.concat("\n");

        // filters_div.appendChild(document.createTextNode(L.filters[j].w));
  

      // tSNE plot

      var scatterplot = document.createElement('scatter');
      // var tsnejsc = function($, inputdata, out, isArrData, showImg, isFilter, layer_num) {
      // i = layer_num
      var tsne_width = $(window).width();
      var tsnescatter = new tsnejscatter($, L, scatterplot, false, true, true, i, tsne_width);
        // tsnescatter.change_p(filterstring);
      
      tsne_body_div.appendChild(scatterplot);


      } else {
        filters_div.appendChild(document.createTextNode('Weights hidden, too small'));
      }
      activations_div.appendChild(filters_div);
    }
    // layer_div.appendChild(activations_div);


    var layer_t = L.layer_type
    var layer_panel = document.createElement('div');
    var title_div = document.createElement('div');
    var title_icon = document.createElement('i');
    title_icon.className = 'glyphicon glyphicon-chevron-down'

    // print some stats on left of the layer
    // layer_div.className = 'layer ' + 'lt' + L.layer_type;
    layer_div.className = 'panel-body collapse';

    // title_div.className = 'ltitle'
    title_div.className = 'panel-heading panel-collapsed'

    if(L.layer_type == 'conv') {
      layer_panel.className = "panel panel-info"
    }
    else if(L.layer_type == 'relu') {
      layer_panel.className = "panel panel-danger"
    }
    else if(L.layer_type == 'pool') {
      layer_panel.className = "panel panel-success"
    }
    else if(L.layer_type == 'softmax') {
      layer_panel.className = "panel panel-primary"
      // layer_div.className = 'panel-body';
      // title_div.className = 'panel-heading';
      // title_icon.className = 'glyphicon glyphicon-chevron-up'
    }
    else if(L.layer_type == 'fc') {
      layer_panel.className = "panel panel-warning"
    }
    else {
      layer_panel.className = "panel panel-primary"
      // layer_div.className = 'panel-body';
      // title_div.className = 'panel-heading';
      // title_icon.className = 'glyphicon glyphicon-chevron-up'
    }

    title_div.addEventListener('click', function(){
      
      if ($(this).hasClass('panel-collapsed')) {
        // expand the panel
        $(this).parents('.panel').find('.panel-body').slideDown();
        $(this).removeClass('panel-collapsed');
        $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
      }
      else {
        // collapse the panel
        $(this).parents('.panel').find('.panel-body').slideUp();
        $(this).addClass('panel-collapsed');
        $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
    }

    });

    var t = L.layer_type + ' (' + L.out_sx + 'x' + L.out_sy + 'x' + L.out_depth + ')';
    title_div.appendChild(document.createTextNode(t));

    // <span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span>
    var title_span = document.createElement('span');
    title_span.className = 'pull-right clickable';

    title_span.appendChild(title_icon);

    title_div.appendChild(title_span);
    layer_panel.appendChild(title_div);

    if(L.layer_type==='conv') {
      var t = 'filter size ' + L.filters[0].sx + 'x' + L.filters[0].sy + 'x' + L.filters[0].depth + ', stride ' + L.stride;
      layer_div.appendChild(document.createTextNode(t));
      layer_div.appendChild(document.createElement('br'));
    }
    if(L.layer_type==='pool') {
      var t = 'pooling size ' + L.sx + 'x' + L.sy + ', stride ' + L.stride;
      layer_div.appendChild(document.createTextNode(t));
      layer_div.appendChild(document.createElement('br'));
    }

    // find min, max activations and display them
    var mma = maxmin(L.out_act.w);
    var t = 'max activation: ' + f2t(mma.maxv) + ', min: ' + f2t(mma.minv);
    layer_div.appendChild(document.createTextNode(t));
    layer_div.appendChild(document.createElement('br'));

    var mma = maxmin(L.out_act.dw);
    var t = 'max gradient: ' + f2t(mma.maxv) + ', min: ' + f2t(mma.minv);
    layer_div.appendChild(document.createTextNode(t));
    layer_div.appendChild(document.createElement('br'));

    // number of parameters
    if(L.layer_type==='conv' || L.layer_type==='local') {
      var tot_params = L.sx*L.sy*L.in_depth*L.filters.length + L.filters.length;
      var t = 'parameters: ' + L.filters.length + 'x' + L.sx + 'x' + L.sy + 'x' + L.in_depth + '+' + L.filters.length + ' = ' + tot_params;
      layer_div.appendChild(document.createTextNode(t));
      layer_div.appendChild(document.createElement('br'));
    }
    if(L.layer_type==='fc') {
      var tot_params = L.num_inputs*L.filters.length + L.filters.length;
      var t = 'parameters: ' + L.filters.length + 'x' + L.num_inputs + '+' + L.filters.length + ' = ' + tot_params;
      layer_div.appendChild(document.createTextNode(t));
      layer_div.appendChild(document.createElement('br'));
    }

    // css madness needed here...
    var clear = document.createElement('hr');
    clear.className = 'clear';
    layer_div.appendChild(clear);

    ///////////////////////////////////
    ///////////////////////////////////
    //create option box
    var options_div = document.createElement('div');
    var options_div_id = 'options_div'+i;
    options_div.setAttribute('id', options_div_id);
    options_div.setAttribute('class', 'collapse');

    var checkbox_show_tsne_id = 'checkbox1_id' + i;
    create_checkbox_collapse(layer_div, checkbox_show_tsne_id, 'Show t-SNE', options_div_id);

    var checkbox_show_img = 'checkbox2_id' + i;
    create_checkbox(options_div, checkbox_show_img, 'Show Image', true);

    var radio_name = 'radio_name'+i;

    if(L.layer_type==='conv' || L.layer_type==='fc') {
      create_radio_btn(options_div, radio_name, 'option1', 'filter weight', true);

      checked="checked"

      create_radio_btn(options_div, radio_name, 'option1', 'filter grad', false);
      create_radio_btn(options_div, radio_name, 'option1', 'activation', false);
      create_radio_btn(options_div, radio_name, 'option1', 'activation grad', false);
    } else {
      create_radio_btn(options_div, radio_name, 'option1', 'activation', true);
      create_radio_btn(options_div, radio_name, 'option1', 'activation grad', false);
    }

    ///////////////////////////////////

    //close divs
    layer_div.appendChild(options_div);
    layer_panel.appendChild(layer_div);

    tsne_panel.appendChild(tsne_title_div);
    tsne_panel.appendChild(tsne_body_div);

    col1_div.appendChild(layer_panel);
    col2_div.appendChild(tsne_panel);

    row_div.appendChild(col1_div);
    row_div.appendChild(col2_div);
    elt.appendChild(row_div);

  }
}

var create_radio_btn = function(out_to, name, id, title, checked) {

  var radio_div = document.createElement('div');
  radio_div.setAttribute('class', 'radio');
  var radio_label = document.createElement('label');
  var radio_input = document.createElement('input');
  radio_input.setAttribute('type', 'radio');
  radio_input.setAttribute('name', name);
  radio_input.setAttribute('id', id);
  radio_label.appendChild(radio_input);

  if(checked) {
    radio_input.setAttribute('checked', 'checked');
  }
  
  radio_label.appendChild(document.createTextNode(title));
  radio_div.appendChild(radio_label);
  out_to.appendChild(radio_div);

}

var create_checkbox = function(out_to, id, title, checked) {

  var radio_div = document.createElement('div');
  radio_div.setAttribute('class', 'checkbox');

  var radio_label = document.createElement('label');
  var radio_input = document.createElement('input');
  radio_input.setAttribute('type', 'checkbox');
  radio_input.setAttribute('value', '');
  radio_input.setAttribute('id', id);
  radio_label.appendChild(radio_input);
  
    if(checked) {
    radio_input.setAttribute('checked', 'checked');
  }

  radio_label.appendChild(document.createTextNode(title));
  radio_div.appendChild(radio_label);
  out_to.appendChild(radio_div);

}

var create_checkbox_collapse = function(out_to, id, title, target) {

  var target_id = '#' + target;

  var radio_div = document.createElement('div');
  radio_div.setAttribute('class', 'checkbox');
  radio_div.setAttribute('data-toggle', 'collapse');
  radio_div.setAttribute('data-target', target_id);

  var radio_label = document.createElement('label');
  var radio_input = document.createElement('input');
  radio_input.setAttribute('type', 'checkbox');
  radio_input.setAttribute('value', '');
  radio_input.setAttribute('id', id);
  radio_label.appendChild(radio_input);
  
  radio_label.appendChild(document.createTextNode(title));
  radio_div.appendChild(radio_label);
  out_to.appendChild(radio_div);

}

