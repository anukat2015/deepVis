var test = (function(){
  "use strict";
  var stepinter = function(input) {

    console.log('stepinter'+input);

  }

  var te = function($, inputdata, out, num) {

    var self = this;
    //init 
    var data = inputdata || {};
    var outdom = out;
    var number = num;

    var iid = setInterval(function () {
      stepinter(number);
    }, 1000);

  }

  return te;

})();
