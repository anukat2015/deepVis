//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.weblas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function sgemm(e,t,l,a,r,c,u,n){if(null!=n&&n.length!=t)throw new Error("Only vector C with length matching rows in A is currently supported.");var o,s=r,i=n;o=transpose(l,t,c);var g=gl.createDataTexture(e,l,s),p=gl.createDataTexture(t,l,o),x=null;null!=i&&(x=gl.createDataTexture(1,t,i));var d=gl.createOutputTexture(e,t);return sgemmcalculator.calculate(e,t,l,a,g,p,u,x,d),rawBuffer=gl.readData(e,t),gl.context.deleteTexture(g),gl.context.deleteTexture(p),null!=x&&gl.context.deleteTexture(x),gl.context.deleteTexture(d),new Float32Array(rawBuffer)}function saxpy(e,t,l,a){var r,c,u=l;isFloat32Array(a)?c=a:(c=new Float32Array(e),c.fill(a));var n=gl.createDataTexture(1,e,u),o=gl.createDataTexture(1,e,c),s=gl.createOutputTexture(1,e);return saxpycalculator.calculate(e,t,n,o,s),r=gl.readData(1,e),gl.context.deleteTexture(n),gl.context.deleteTexture(o),gl.context.deleteTexture(s),new Float32Array(r)}function isFloat32Array(e){return"[object Float32Array]"===Object.prototype.toString.call(e)}function sscal(e,t,l,a,r){var c,u=r,n=gl.createDataTexture(e,t,u),o=gl.createOutputTexture(e,t);return sscalcalculator.calculate(e,t,l,a,n,o),c=gl.readData(e,t),gl.context.deleteTexture(n),gl.context.deleteTexture(o),new Float32Array(c)}function sstd(e,t,l,a,r){var c,u=r,n=gl.createDataTexture(e,t,u),o=gl.createOutputTexture(e,t);return sscalcalculator.calculate(e,t,1/a,-1*l/a,n,o),c=gl.readData(e,t),gl.context.deleteTexture(n),gl.context.deleteTexture(o),new Float32Array(c)}function sdwns(e,t,l,a,r,c){var u=gl.createDataTexture(e,t*l,c),n=Math.floor((t-a)/r)+1,o=Math.floor((e-a)/r)+1,s=gl.createOutputTexture(o,n*l);return sdwnscalculator.calculate(e,t,l,a,r,u,s),rawBuffer=gl.readData(o,n*l),gl.context.deleteTexture(u),gl.context.deleteTexture(s),new Float32Array(rawBuffer)}function sclmp(e,t,l,a,r){l=null!=l?l:Number.MIN_VALUE,a=null!=a?a:Number.MAX_VALUE;var c,u=r,n=gl.createDataTexture(e,t,u),o=gl.createOutputTexture(e,t);return sclmpcalculator.calculate(e,t,l,a,n,o),c=gl.readData(e,t),gl.context.deleteTexture(n),gl.context.deleteTexture(o),new Float32Array(c)}function isNumeric(e){return e-parseFloat(e)+1>=0}function fromArray(e,t,l){var a,r,c=[];l?(c[1]=e.length,c[0]=e[0].length):(c[0]=e.length,c[1]=e[0].length),r=c[1],t=t||Float32Array,a=new t(c[0]*c[1]);for(var u=0;u<c[0];++u)for(var n=0;n<c[1];++n)l?a[u*r+n]=e[n][u]:a[u*r+n]=e[u][n];return a}function transpose(e,t,l){for(var a=new l.constructor(e*t),r=0;e>r;r++)for(var c=0;t>c;c++)a[c*e+r]=l[r*t+c];return a}var globals=require("./lib/globals"),pipeline=require("./lib/pipeline"),SGEMMCalculator=require("./lib/sgemmcalculator"),SAXPYCalculator=require("./lib/saxpycalculator"),SSCALCalculator=require("./lib/sscalcalculator"),SDWNSCalculator=require("./lib/sdwnscalculator"),SCLMPCalculator=require("./lib/sclmpcalculator"),test=require("./lib/test"),gl=globals.gl,sgemmcalculator=new SGEMMCalculator(gl),saxpycalculator=new SAXPYCalculator(gl),sscalcalculator=new SSCALCalculator(gl),sdwnscalculator=new SDWNSCalculator(gl),sclmpcalculator=new SCLMPCalculator(gl);module.exports={saxpy:saxpy,sscal:sscal,sgemm:sgemm,sstd:sstd,sdwns:sdwns,sclmp:sclmp,pipeline:pipeline,gpu:{gl:gl,sgemm:pipeline.sgemmcalculator.calculate.bind(pipeline.sgemmcalculator),sscal:pipeline.sscalcalculator.calculate.bind(pipeline.sscalcalculator),sclmp:pipeline.sclmpcalculator.calculate.bind(pipeline.sclmpcalculator),sdwns:pipeline.sdwnscalculator.calculate.bind(pipeline.sdwnscalculator),encode:gl.encode.bind(gl)},util:{fromArray:fromArray,transpose:transpose},test:test},String.prototype.format||(String.prototype.format=function(){var e=arguments;return this.replace(/{(\d+)}/g,function(t,l){return"undefined"!=typeof e[l]?e[l]:t})});
},{"./lib/globals":2,"./lib/pipeline":3,"./lib/saxpycalculator":4,"./lib/sclmpcalculator":5,"./lib/sdwnscalculator":6,"./lib/sgemmcalculator":7,"./lib/sscalcalculator":9,"./lib/test":11}],2:[function(require,module,exports){
var WebGL=require("./webgl"),gl=new WebGL;module.exports={gl:gl};
},{"./webgl":12}],3:[function(require,module,exports){
function sscal(l,a,e){var r=e.shape[0],c=e.shape[1],s=new Tensor([r,c],null);return sscalcalculator.calculate(r,c,l,a,e.texture,s.texture),s}function sgemm(l,a,e,r,c){if(e.shape[1]!==a.shape[1])throw new Error("Second dimension must be of same size for input Tensors (second Tensor is transposed).");var s,t=a.shape[0],o=e.shape[0],u=a.shape[1];s=c?c.texture:null;var n=new Tensor([t,o],null);return sgemmcalculator.calculate(t,o,u,l,a.texture,e.texture,r,s,n.texture),n}function sdwns(l,a,e,r){if(r.shape[1]%l!==0)throw new Error("Second dimension of tensor must be a multiple of channels");var c=r.shape[0],s=r.shape[1]/l,t=Math.floor((c-a)/e)+1,o=Math.floor((s-a)/e)+1,u=new Tensor([t,o*l],null);return sdwnscalculator.calculate(c,s,l,a,e,r.texture,u.texture),u}function sclmp(l,a,e){l=null!=l?l:Number.MIN_VALUE,a=null!=a?a:Number.MAX_VALUE;var r=e.shape[0],c=e.shape[1],s=new Tensor([r,c],null);return sclmpcalculator.calculate(r,c,l,a,e.texture,s.texture),s}function slokn(l,a,e,r,c){if(c.shape[1]%l!==0)throw new Error("Second dimension of tensor must be a multiple of channels");var s,t,o=c.shape[0],u=c.shape[1]/l;r?(s=Math.ceil((u+2*r-a)/e)+1,t=Math.ceil((o+2*r-a)/e)+1):(r=0,s=Math.ceil((u-a)/e)+1,t=Math.ceil((o-a)/e)+1);var n=a*a*l,m=t*s,p=n,i=new Tensor([m,p],null);return slokncalculator.calculate(o,u,l,m,p,s,a,e,r,c.texture,i.texture),i}var globals=require("./globals"),SGEMMCalculator=require("./sgemmcalculator"),SAXPYCalculator=require("./saxpycalculator"),SSCALCalculator=require("./sscalcalculator"),SDWNSCalculator=require("./sdwnscalculator"),SCLMPCalculator=require("./sclmpcalculator"),SLOKNCalculator=require("./slokncalculator"),Tensor=require("./tensor"),gl=globals.gl,sgemmcalculator=new SGEMMCalculator(gl,!1),saxpycalculator=new SAXPYCalculator(gl,!1),sscalcalculator=new SSCALCalculator(gl,!1),sdwnscalculator=new SDWNSCalculator(gl,!1),sclmpcalculator=new SCLMPCalculator(gl,!1),slokncalculator=new SLOKNCalculator(gl,!1);module.exports={Tensor:Tensor,sscal:sscal,sgemm:sgemm,sdwns:sdwns,sclmp:sclmp,slokn:slokn,sgemmcalculator:sgemmcalculator,saxpycalculator:saxpycalculator,sscalcalculator:sscalcalculator,sdwnscalculator:sdwnscalculator,sclmpcalculator:sclmpcalculator,slokncalculator:slokncalculator};
},{"./globals":2,"./saxpycalculator":4,"./sclmpcalculator":5,"./sdwnscalculator":6,"./sgemmcalculator":7,"./slokncalculator":8,"./sscalcalculator":9,"./tensor":10}],4:[function(require,module,exports){
function SAXPYCalculator(t,n){this.webgl=t,this.standalone=n||!0;var e="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded A\nuniform sampler2D Y;    // texture with data from padded transpose of B\nuniform int       N;\nuniform float     a;     // coefficient to multiplication\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row = outTex.y;\n float col = outTex.x;\n\n // direct usage of col requires output be padded exactly like input\n vec4 x = texture2D( X, vec2(col, row));\n vec4 y = texture2D( Y, vec2(col, row));\n vec4 sum_v = (a * x) + y;\n int channel = int(mod(col * float(N), 4.0 ));\n float sum = select_index_1604150559(sum_v, channel);\n\n  if (sum == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n   // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1540259130(sum);\n}\n";this.standalone?this.program=this.webgl.createProgram(e):this.program=this.webgl.createProgram(p)}var WebGL=require("./webgl");module.exports=SAXPYCalculator,SAXPYCalculator.TEXTURE_UNIFORM_NAME_0="X",SAXPYCalculator.TEXTURE_UNIFORM_NAME_1="Y",SAXPYCalculator.LENGTH_UNIFORM_NAME="N",SAXPYCalculator.COEFFICIENT_UNIFORM_NAME="a",SAXPYCalculator.prototype.calculate=function(t,n,e,o,a){var l=this.webgl.context;this.webgl.selectProgram(this.program),this.bindInputTexture(e,l.TEXTURE0,SAXPYCalculator.TEXTURE_UNIFORM_NAME_0),this.bindInputTexture(o,l.TEXTURE1,SAXPYCalculator.TEXTURE_UNIFORM_NAME_1);var i=this.webgl.getPad(t);this.bindUniforms(t+i,n),this.webgl.bindOutputTexture(1,t+i,a),l.drawElements(l.TRIANGLES,6,l.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(l.TEXTURE0),this.webgl.unbindInputTexture(l.TEXTURE1)},SAXPYCalculator.prototype.bindInputTexture=function(t,n,e){var o=this.webgl.context,a=this.program;o.activeTexture(n),o.bindTexture(o.TEXTURE_2D,t);var l=o.getUniformLocation(a,e);o.uniform1i(l,n-o.TEXTURE0)},SAXPYCalculator.prototype.bindUniforms=function(t,n){var e=this.webgl.context,o=e.getUniformLocation(this.program,SAXPYCalculator.LENGTH_UNIFORM_NAME),a=e.getUniformLocation(this.program,SAXPYCalculator.COEFFICIENT_UNIFORM_NAME);e.uniform1i(o,t),e.uniform1f(a,n)};
},{"./webgl":12}],5:[function(require,module,exports){
function SCLMPCalculator(n,t){this.webgl=n,this.standalone=null!=t?t:!0;var e="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded A\nuniform int       N;    // number of columns\nuniform int       pad;    // additional columns to nearest multiple of four\nuniform float     a;     // lower bound\nuniform float     b;    // upper bound\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row = outTex.y;\n float col = outTex.x;\n\n // return 0.0 if in padded region of output texture\n if(col * float(N + pad) > float(N) ) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n // direct usage of col requires output be padded exactly like input\n vec4 x = texture2D( X, vec2(col, row));\n vec4 val = clamp(x, a, b);\n\n  // select and output channel (standalone version only)\n  int channel = int(mod(col * float(N + pad), 4.0));\n  float sum = select_index_1604150559(val, channel);\n\n  if (sum == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1540259130(sum);\n}\n",o="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded A\nuniform int       N;    // number of columns\nuniform int       pad;    // additional columns to nearest multiple of four\nuniform float     a;     // lower bound\nuniform float     b;    // upper bound\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n  v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n float col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\n // direct usage of col requires output be padded exactly like input\n vec4 x = texture2D( X, vec2(col_t, row_t));\n vec4 val_v = clamp(x, a, b);\n\n  // is last element in pixel past row length?\n  if(pad > 0 && (col + 4.0) > float(N) ) {\n    // fix elements in padded region\n    fix_pad_1540259130(val_v, pad);\n }\n\n gl_FragColor = val_v;\n}\n";this.standalone?this.program=this.webgl.createProgram(e):this.program=this.webgl.createProgram(o)}var WebGL=require("./webgl");module.exports=SCLMPCalculator,SCLMPCalculator.TEXTURE_UNIFORM_NAME_0="X",SCLMPCalculator.LENGTH_UNIFORM_NAME="N",SCLMPCalculator.LOWER_UNIFORM_NAME="a",SCLMPCalculator.UPPER_UNIFORM_NAME="b",SCLMPCalculator.prototype.calculate=function(n,t,e,o,a,l){e=null!=e?e:Number.MIN_VALUE,o=null!=o?o:Number.MAX_VALUE;var i=this.webgl.context;this.webgl.selectProgram(this.program),this.bindInputTexture(a,i.TEXTURE0,SCLMPCalculator.TEXTURE_UNIFORM_NAME_0);var r=this.webgl.getPad(t);this.bindUniforms(t,r,e,o),this.standalone?this.webgl.bindOutputTexture(n,t+r,l):this.webgl.bindOutputTexture(n,(t+r)/4,l),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(i.TEXTURE0)},SCLMPCalculator.prototype.bindInputTexture=function(n,t,e){var o=this.webgl.context,a=this.program;o.activeTexture(t),o.bindTexture(o.TEXTURE_2D,n);var l=o.getUniformLocation(a,e);o.uniform1i(l,t-o.TEXTURE0)},SCLMPCalculator.prototype.bindUniforms=function(n,t,e,o){var a=this.webgl.context,l=a.getUniformLocation(this.program,SCLMPCalculator.LENGTH_UNIFORM_NAME),i=a.getUniformLocation(this.program,SCLMPCalculator.UPPER_UNIFORM_NAME),r=a.getUniformLocation(this.program,SCLMPCalculator.LOWER_UNIFORM_NAME),u=a.getUniformLocation(this.program,"pad");a.uniform1i(l,n),a.uniform1i(u,t),a.uniform1f(r,e),a.uniform1f(i,o)};
},{"./webgl":12}],6:[function(require,module,exports){
function DownsampleCalculator(n,o){this.webgl=n,this.standalone=null!=o?o:!0;var t="#define GLSLIFY 1\n// TODO: unroll loop for stride == factor and small values (2, 3)\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform int       factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     C;       // number of channels\nuniform float     M;\nuniform float     N;\nuniform float     N_out;\nuniform float     M_out;\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate and translate to output pixel space.\n  float row = floor(outTex.y * M_out);   // row on output texture (matrix space)\n  float col = floor(outTex.x * N_out); // column on output texture (matrix space)\n float vcol = floor(col / C);   // virtual column on output texture (matrix space)\n float vchannel = floor(mod(col, C)); // virtual channel on output texture\n\n const float min = -1.0e+08;\n vec4 currentMax = vec4(min, min, min, min);\n\n float deltaY = 1.0/M;\n float deltaX = 1.0/N;\n float y = ((row * stride) + 0.5)*deltaY; // texture position of input row\n float x;\n  float z = vchannel * deltaX;\n  for (int i = 0; i < 100; i += 1) {\n    if (i >= factor) {\n      break;\n    }\n   x = ((vcol * stride * C) + 0.5) * deltaX; // texture position of input column\n\n   for (int j = 0; j < 100; j += 1) {\n      if (j >= factor) {\n        break;\n      }\n\n     vec2 coords = vec2(x + z, y);\n     vec4 x_v = texture2D(X, coords);\n      currentMax = max(currentMax, x_v);\n\n      x += (deltaX * C);\n    }\n   y += deltaY;\n  }\n int chan = int(mod(outTex.x * N_out, 4.0 ));\n  float val = select_index_1540259130(currentMax, int(chan));\n if (val == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n gl_FragColor = encode_float_1604150559(val);\n}\n";p="#define GLSLIFY 1\n// TODO: unroll loop for stride == factor and small values (2, 3)\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform int       factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     C;       // number of channels\nuniform float     M;\nuniform float     N;\nuniform float     N_out;\nuniform float     M_out;\n\nvoid main(void) {\n\n  // get the implied row and column from .y and .x of passed (output)\n // texture coordinate and translate to output pixel space.\n  float row = floor(outTex.y * M_out);   // row on output texture (pixel space)\n float col = floor(outTex.x * N_out); // column on output texture (matrix space)\n float vcol = floor(col / C);   // virtual column on output texture (matrix space)\n float vchannel = floor(mod(col, C)); // virtual channel on output texture\n\n const float min = -1.0e+08;\n vec4 currentMax = vec4(min, min, min, min);\n\n float deltaY = 1.0/M;\n float deltaX = 1.0/N;\n float y = ((row * stride) + 0.5)*deltaY; // texture position of input row\n float x;\n  float z = vchannel * deltaX;\n  for (int i = 0; i < 100; i += 1) {\n    if (i >= factor) {\n      break;\n    }\n   x = ((vcol * stride * C) + 0.5) * deltaX; // texture position of input column\n\n   for (int j = 0; j < 100; j += 1) {\n      if (j >= factor) {\n        break;\n      }\n\n     vec2 coords = vec2(x + z, y);\n     vec4 x_v = texture2D(X, coords);\n      currentMax = max(currentMax, x_v);\n\n      x += (deltaX * C);\n    }\n   y += deltaY;\n  }\n\n gl_FragColor = currentMax;\n}\n",this.standalone?this.program=this.webgl.createProgram(t):this.program=this.webgl.createProgram(p)}var WebGL=require("./webgl");module.exports=DownsampleCalculator,DownsampleCalculator.TEXTURE_UNIFORM_NAME_0="X",DownsampleCalculator.INPUT_ROW_COUNT_UNIFORM_NAME="M",DownsampleCalculator.INPUT_COLUMN_COUNT_UNIFORM_NAME="N",DownsampleCalculator.OUTPUT_ROW_COUNT_UNIFORM_NAME="M_out",DownsampleCalculator.OUTPUT_COLUMN_COUNT_UNIFORM_NAME="N_out",DownsampleCalculator.FACTOR_UNIFORM_NAME="factor",DownsampleCalculator.STRIDE_UNIFORM_NAME="stride",DownsampleCalculator.CHANNEL_COUNT_UNIFORM_NAME="C",DownsampleCalculator.prototype.calculate=function(n,o,t,a,e,l,r){if(t%WebGL.COMPONENTS_PER_TEXEL!=0)throw new Error("Channel count must be a multiple of "+WebGL.COMPONENTS_PER_TEXEL);var i=this.webgl.context,u=(Math.floor((o-a)/e)+1)*t,f=Math.floor((n-a)/e)+1;this.webgl.selectProgram(this.program),this.bindInputTexture(l,i.TEXTURE0,DownsampleCalculator.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(n,o*t,f,u,a,e,t),this.standalone?this.webgl.bindOutputTexture(f,u,r):this.webgl.bindOutputTexture(f,u/WebGL.COMPONENTS_PER_TEXEL,r),i.drawElements(i.TRIANGLES,6,i.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(i.TEXTURE0)},DownsampleCalculator.prototype.bindInputTexture=function(n,o,t){var a=this.webgl.context,e=this.program;a.activeTexture(o),a.bindTexture(a.TEXTURE_2D,n);var l=a.getUniformLocation(e,t);a.uniform1i(l,o-a.TEXTURE0)},DownsampleCalculator.prototype.bindUniforms=function(n,o,t,a,e,l,r){var i=this.webgl.context,u=i.getUniformLocation(this.program,DownsampleCalculator.INPUT_ROW_COUNT_UNIFORM_NAME),f=i.getUniformLocation(this.program,DownsampleCalculator.INPUT_COLUMN_COUNT_UNIFORM_NAME),m=i.getUniformLocation(this.program,DownsampleCalculator.OUTPUT_ROW_COUNT_UNIFORM_NAME),c=i.getUniformLocation(this.program,DownsampleCalculator.OUTPUT_COLUMN_COUNT_UNIFORM_NAME),s=i.getUniformLocation(this.program,DownsampleCalculator.FACTOR_UNIFORM_NAME),p=i.getUniformLocation(this.program,DownsampleCalculator.STRIDE_UNIFORM_NAME),d=i.getUniformLocation(this.program,DownsampleCalculator.CHANNEL_COUNT_UNIFORM_NAME);i.uniform1f(u,n),i.uniform1f(f,o),i.uniform1f(m,t),i.uniform1f(c,a),i.uniform1i(s,e),i.uniform1f(p,l),i.uniform1f(d,r)};
},{"./webgl":12}],7:[function(require,module,exports){
function SGEMMCalculator(t,e){this.webgl=t,this.standalone=null!=e?e:!0;var n="#define GLSLIFY 1\n// fragment shader that calculates the matrix product and renders each\n// element to the bytes representing a 32-bit IEEE754 floating point in\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform sampler2D B_t;    // texture with data from padded transpose of B\nuniform int       K;   // number of elements in shared dimension\nuniform int       N;   // number of columns in output\nuniform int       pad;    //\nuniform float     alpha;  // coefficient to multiplication\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n float delta_t = 1./float(K);// space (on texture) between elements\n  float sum = 0.;     // sum for this row/column pair\n float z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n for (int l=0 ; l<4096 ; ++l) {\n    if(l >= K / 4) break;    // stop when we finish the row/column\n    // l is in pixel space, so we divide by four\n\n    // retrieve next four elements from each texture\n    vec4 a_ik = texture2D(  A, vec2(z, y));\n   vec4 b_kj = texture2D(B_t, vec2(z, x));\n\n // use `dot` to process four elements at a time\n   sum +=  dot(a_ik, b_kj);\n    z += (4.0 * delta_t);      // (z + 0.5)*delta\n }\n return sum;\n}\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\nvoid main(void) {\n\n  // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n\n // sum row x col for the passed pixel\n float sum = alpha * dot_rowcol_1540259130(row_t, col_t * float(N + pad)/float(N), A, B_t, K);\n\n if (sum == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1604150559(sum);\n}\n",o="#define GLSLIFY 1\n// fragment shader that calculates the matrix product (with additive 'C' term)\n// and renders each element to the bytes representing a 32-bit IEEE754 floating\n// point in the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform sampler2D B_t;    // texture with data from padded transpose of B\nuniform sampler2D C;   // texture with data from C\nuniform int       K;   // number of elements in shared dimension\nuniform int       N;   // number of columns in output\nuniform int       pad;    //\nuniform float     alpha;  // coefficient to multiplication\nuniform float     beta;   // coefficient to additive term\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n  float delta_t = 1./float(K);// space (on texture) between elements\n  float sum = 0.;     // sum for this row/column pair\n float z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n for (int l=0 ; l<4096 ; ++l) {\n    if(l >= K / 4) break;    // stop when we finish the row/column\n    // l is in pixel space, so we divide by four\n\n    // retrieve next four elements from each texture\n    vec4 a_ik = texture2D(  A, vec2(z, y));\n   vec4 b_kj = texture2D(B_t, vec2(z, x));\n\n // use `dot` to process four elements at a time\n   sum +=  dot(a_ik, b_kj);\n    z += (4.0 * delta_t);      // (z + 0.5)*delta\n }\n return sum;\n}\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1117569599(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n vec4 c_vec = texture2D(C, vec2(col_t, 0.5));\n\n  // should be -0.5, but that subtly breaks at zero\n float col = col_t * float(N + pad); // index of first element in pixel (matrix space)\n int channel = int(mod(col, 4.0 ));\n  float c = select_index_1117569599(c_vec, channel);\n\n  // sum row x col for the passed pixel\n float sum = alpha * dot_rowcol_1540259130(row_t, col_t * float(N + pad)/float(N), A, B_t, K);\n sum += beta * c;\n\n  if (sum == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1604150559(sum);\n}\n",a="#define GLSLIFY 1\n// fragment shader that calculates the matrix product and writes each\n// element to a pixel component in a floating point texture.\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform sampler2D B_t;    // texture with data from padded transpose of B\nuniform int       K;   // number of elements in shared dimension\nuniform int       N;   // number of columns in output\nuniform int       pad;    //\nuniform float     alpha;  // coefficient to multiplication\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n float delta_t = 1./float(K);// space (on texture) between elements\n  float sum = 0.;     // sum for this row/column pair\n float z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n for (int l=0 ; l<4096 ; ++l) {\n    if(l >= K / 4) break;    // stop when we finish the row/column\n    // l is in pixel space, so we divide by four\n\n    // retrieve next four elements from each texture\n    vec4 a_ik = texture2D(  A, vec2(z, y));\n   vec4 b_kj = texture2D(B_t, vec2(z, x));\n\n // use `dot` to process four elements at a time\n   sum +=  dot(a_ik, b_kj);\n    z += (4.0 * delta_t);      // (z + 0.5)*delta\n }\n return sum;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n\n vec4 sum_v = vec4(0.0, 0.0, 0.0, 0.0);\n  float col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n sum_v.r = alpha * dot_rowcol_1540259130(row_t, (col + 0.5)/float(N), A, B_t, K);\n  // is last element in pixel past row length?\n  if(pad > 0 && (col + 4.0) > float(N) ) {\n    // compute elements in padded region\n    if(pad < 3){\n      sum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n    }\n   if(pad < 2){\n      sum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n    }\n } else {\n    sum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n    sum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n    sum_v.a = alpha * dot_rowcol_1540259130(row_t, (col + 3.5)/float(N), A, B_t, K);\n  }\n\n gl_FragColor = sum_v;\n}\n",r="#define GLSLIFY 1\n// fragment shader that calculates the matrix product and writes each\n// element to a pixel component in a floating point texture.\n// the output RGBA canvas.\n// readPixel is used to read the bytes.\n\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform sampler2D B_t;    // texture with data from padded transpose of B\nuniform sampler2D C;   // texture with data from C\nuniform int       K;   // number of elements in shared dimension\nuniform int       N;   // number of columns in output\nuniform int       pad;    //\nuniform float     alpha;  // coefficient to multiplication\nuniform float     beta;   // coefficient to addition\n\n// sum of products between elements in row i (from A) x col j (from B)\n\n// Calculate the dot product between the row (from A) and column (from B)\n// identified by the passed indeces (output texture coordinate space).\n// We loop over elements in the row and column and sum the product\n// using the glsl `dot` function to process four elements at a time.\n// This four element optimization requires that the matrix B be\n// transposed before texel packing and that both matrices be padded\n// (with zeros) to a multiple of four (4) in their shared dimension.\nfloat dot_rowcol_1540259130(float y, float x, sampler2D A, sampler2D B_t, int K) {\n float delta_t = 1./float(K);// space (on texture) between elements\n  float sum = 0.;     // sum for this row/column pair\n float z = 0.5 * (4.0 * delta_t);// position for shared dimension on source textures\n\n for (int l=0 ; l<4096 ; ++l) {\n    if(l >= K / 4) break;    // stop when we finish the row/column\n    // l is in pixel space, so we divide by four\n\n    // retrieve next four elements from each texture\n    vec4 a_ik = texture2D(  A, vec2(z, y));\n   vec4 b_kj = texture2D(B_t, vec2(z, x));\n\n // use `dot` to process four elements at a time\n   sum +=  dot(a_ik, b_kj);\n    z += (4.0 * delta_t);      // (z + 0.5)*delta\n }\n return sum;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n vec4 c_v = texture2D(C, vec2(col_t, 0.5));\n\n  vec4 sum_v = vec4(0.0, 0.0, 0.0, 0.0);\n  float col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n sum_v.r = alpha * dot_rowcol_1540259130(row_t, (col + 0.5)/float(N), A, B_t, K);\n  // in the padding region?\n if(pad > 0 && (col + 4.0) > float(N) ) {\n    // pad\n    if(pad < 3){\n      sum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n    }\n   if(pad < 2){\n      sum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n    }\n } else {\n    sum_v.g = alpha * dot_rowcol_1540259130(row_t, (col + 1.5)/float(N), A, B_t, K);\n    sum_v.b = alpha * dot_rowcol_1540259130(row_t, (col + 2.5)/float(N), A, B_t, K);\n    sum_v.a = alpha * dot_rowcol_1540259130(row_t, (col + 3.5)/float(N), A, B_t, K);\n  }\n\n gl_FragColor = sum_v + beta*c_v;\n}\n";this.standalone?(this.program_=this.webgl.createProgram(n),this.program_c=this.webgl.createProgram(o)):(this.program_=this.webgl.createProgram(a),this.program_c=this.webgl.createProgram(r))}var WebGL=require("./webgl");module.exports=SGEMMCalculator,SGEMMCalculator.TEXTURE_UNIFORM_NAME_0="A",SGEMMCalculator.TEXTURE_UNIFORM_NAME_1="B_t",SGEMMCalculator.TEXTURE_UNIFORM_NAME_2="C",SGEMMCalculator.SHARED_LENGTH_UNIFORM_NAME="K",SGEMMCalculator.COLUMN_COUNT_UNIFORM_NAME="N",SGEMMCalculator.PAD_UNIFORM_NAME="pad",SGEMMCalculator.ALPHA_UNIFORM_NAME="alpha",SGEMMCalculator.BETA_UNIFORM_NAME="beta",SGEMMCalculator.prototype.calculate=function(t,e,n,o,a,r,i,l,s){var u=this.webgl.context;null!=l?this.program=this.program_c:(i=null,this.program=this.program_),this.webgl.selectProgram(this.program),this.bindInputTexture(a,u.TEXTURE0,SGEMMCalculator.TEXTURE_UNIFORM_NAME_0),this.bindInputTexture(r,u.TEXTURE1,SGEMMCalculator.TEXTURE_UNIFORM_NAME_1),null!=l&&this.bindInputTexture(l,u.TEXTURE2,SGEMMCalculator.TEXTURE_UNIFORM_NAME_2);var m=this.webgl.getPad(n),d=this.webgl.getPad(e);this.bindUniforms(e,n+m,d,o,i),this.standalone?this.webgl.bindOutputTexture(t,e+d,s):this.webgl.bindOutputTexture(t,(e+d)/4,s),u.drawElements(u.TRIANGLES,6,u.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(u.TEXTURE0),this.webgl.unbindInputTexture(u.TEXTURE1),this.webgl.unbindInputTexture(u.TEXTURE2)},SGEMMCalculator.prototype.bindInputTexture=function(t,e,n){var o=this.webgl.context,a=this.program;o.activeTexture(e),o.bindTexture(o.TEXTURE_2D,t);var r=o.getUniformLocation(a,n);o.uniform1i(r,e-o.TEXTURE0)},SGEMMCalculator.prototype.bindUniforms=function(t,e,n,o,a){var r=this.webgl.context,i=r.getUniformLocation(this.program,SGEMMCalculator.SHARED_LENGTH_UNIFORM_NAME),l=r.getUniformLocation(this.program,SGEMMCalculator.ALPHA_UNIFORM_NAME),s=r.getUniformLocation(this.program,SGEMMCalculator.BETA_UNIFORM_NAME),u=r.getUniformLocation(this.program,SGEMMCalculator.COLUMN_COUNT_UNIFORM_NAME),m=m=r.getUniformLocation(this.program,SGEMMCalculator.PAD_UNIFORM_NAME);r.uniform1f(s,a),r.uniform1i(u,t),r.uniform1i(m,n),r.uniform1i(i,e),r.uniform1f(l,o)};
},{"./webgl":12}],8:[function(require,module,exports){
function SLOKNCalculator(n,o){this.webgl=n,this.standalone=null!=o?o:!0;var e="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;       // texture with data from padded A\nuniform float     factor;  // width of image patch\nuniform float     stride;  // width between image patches\nuniform float     margin;\nuniform float     N_p;     // patches across\nuniform float     M;\nuniform float     N;\nuniform float     pad;\nuniform float     M_in;\nuniform float     N_in;\nuniform float     C;       // number of channels in input\nuniform float     pad_in;\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n  float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1604150559(float linear_index, float row_length){\n  vec2 coords;\n\n  coords.x = floor(mod(linear_index + 0.5, row_length)); // column\n  coords.y = floor((linear_index + 0.5) / row_length); // row\n\n return coords;\n}\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1117569599(inout vec4 v, int pad){\n v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate\n float row_t = outTex.y;\n float col_t = outTex.x;\n\n // row corresponds to patch\n float row = floor(row_t * M) + 0.5;\n // column corresponds to placement in patch\n float col_0 = floor(col_t * (N + pad) - 1.5); // index of first element in output pixel (matrix space)\n\n  // N_p = patches across\n float col_patch = floor(mod(row, N_p)); // column index in grid of patches\n  float row_patch = floor(row / N_p); // row index in grid of patches\n float col_in_0 = (col_patch * stride - margin) * C; // input column index of left element in patch\n  float row_in_0 = row_patch * stride - margin; // input row index of top element in patch\n\n  vec4 pixel_in;\n  vec4 result = vec4(0.0, 0.0, 0.0, 0.0);\n vec2 coords = linear_index_coords_1604150559(col_0, factor * C); // coords inside patch\n vec2 ncoords;\n int channel_in = int(mod(col_in_0 + coords.x, 4.0));\n  vec2 scale_in = vec2(1.0/(N_in + pad_in), 1.0/M_in); // scale from matrix to input texture coords\n vec2 offset_in = vec2(col_in_0 + 2.0 - float(channel_in), row_in_0 + 0.5); // offset into patch (and pixel)\n\n const vec2 pixel_scale = vec2(1.0/4.0, 1.0); // scale from matrix to pixel coords\n\n pixel_in = texture2D(X, (coords + offset_in) * scale_in);\n\n // go through channels for current output pixel\n for(int channel = 0; channel < 4; channel++){\n\n   // are we on a new input pixel?\n   ncoords = linear_index_coords_1604150559(col_0 + float(channel), factor * C);\n\n   // are we in the margin or outside the input texture?\n   if((col_in_0 + ncoords.x + 0.5 < 0.0) || (row_in_0 + ncoords.y + 0.5 < 0.0) ||\n       (col_in_0 + ncoords.x + 0.5) > (N_in) || row_in_0 + ncoords.y + 0.5 > M_in){\n     // yes, create a virtual pixel\n      pixel_in = vec4(0.0, 0.0, 0.0, 0.0);\n    } else if(floor(ncoords * pixel_scale) != floor(coords * pixel_scale)){\n     // no, get the get the next real pixel\n      coords = ncoords;\n     offset_in.x += float(channel_in);\n     channel_in = 0;\n     pixel_in = texture2D(X, (coords + offset_in) * scale_in);\n   }\n\n   if(channel == 0){\n     result.r = select_index_1540259130(pixel_in, channel_in);\n   } else if(channel == 1){\n      result.g = select_index_1540259130(pixel_in, channel_in);\n   } else if(channel == 2){\n      result.b = select_index_1540259130(pixel_in, channel_in);\n   } else {\n      result.a = select_index_1540259130(pixel_in, channel_in);\n   }\n\n   channel_in++;\n   offset_in.x -= 1.0;\n }\n\n // fix padded region\n  if(pad > 0.0 && col_0 + 4.0 > N ) {\n   fix_pad_1117569599(result, int(pad));\n }\n\n //gl_FragColor = vec4(row_in_0, col_in_0, channel_in, N_p);\n gl_FragColor = result;\n}\n";this.standalone?this.program=this.webgl.createProgram(s):this.program=this.webgl.createProgram(e)}var WebGL=require("./webgl");module.exports=SLOKNCalculator,SLOKNCalculator.TEXTURE_UNIFORM_NAME_0="X",SLOKNCalculator.STRIDE_UNIFORM_NAME="stride",SLOKNCalculator.KERNEL_WIDTH_UNIFORM_NAME="factor",SLOKNCalculator.prototype.calculate=function(n,o,e,i,t,r,a,l,c,f,s){var _=this.webgl.context,d=this.webgl.getPad(o*e),u=this.webgl.getPad(t);this.webgl.selectProgram(this.program),this.bindInputTexture(f,_.TEXTURE0,SLOKNCalculator.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(i,t,u,n,o*e,e,d,r,a,l,c),this.standalone?this.webgl.bindOutputTexture(i,t+u,s):this.webgl.bindOutputTexture(i,(t+u)/4,s),_.drawElements(_.TRIANGLES,6,_.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(_.TEXTURE0)},SLOKNCalculator.prototype.bindInputTexture=function(n,o,e){var i=this.webgl.context,t=this.program;i.activeTexture(o),i.bindTexture(i.TEXTURE_2D,n);var r=i.getUniformLocation(t,e);i.uniform1i(r,o-i.TEXTURE0)},SLOKNCalculator.prototype.bindUniforms=function(n,o,e,i,t,r,a,l,c,f,s){var _=this.webgl.context,d=_.getUniformLocation(this.program,"M"),u=_.getUniformLocation(this.program,"N"),p=_.getUniformLocation(this.program,"C"),m=_.getUniformLocation(this.program,"M_in"),h=_.getUniformLocation(this.program,"N_in"),x=_.getUniformLocation(this.program,SLOKNCalculator.STRIDE_UNIFORM_NAME),g=_.getUniformLocation(this.program,SLOKNCalculator.KERNEL_WIDTH_UNIFORM_NAME),v=_.getUniformLocation(this.program,"pad"),w=_.getUniformLocation(this.program,"pad_in"),N=_.getUniformLocation(this.program,"N_p");margin_gl=_.getUniformLocation(this.program,"margin"),_.uniform1f(d,n),_.uniform1f(u,o),_.uniform1f(v,e),_.uniform1f(m,i),_.uniform1f(h,t),_.uniform1f(p,r),_.uniform1f(w,a),_.uniform1f(N,l),_.uniform1f(g,c),_.uniform1f(x,f),_.uniform1f(margin_gl,s)};
},{"./webgl":12}],9:[function(require,module,exports){
function SSCALCalculator(n,t){this.webgl=n,this.standalone=null!=t?t:!0;var e="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded X\nuniform int       N;    // number of columns\nuniform int       pad;    // additional columns to nearest multiple of four\nuniform float     b;     // additive term\nuniform float     a;    // multiplicative term\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1540259130(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1604150559(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row = outTex.y;\n float col = outTex.x;\n\n // direct usage of col requires output be padded exactly like input\n vec4 x = texture2D( X, vec2(col, row));\n vec4 sum_v = (a * x) + b;\n int channel = int(mod(col * float(N + pad), 4.0 ));\n float sum = select_index_1604150559(sum_v, channel);\n\n  if (sum == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n   // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1540259130(sum);\n}\n",o="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded X\nuniform int       N;    // number of columns\nuniform int       pad;    // additional columns to nearest multiple of four\nuniform float     b;     // additive term\nuniform float     a;    // multiplicative term\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n  v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n float col = (col_t * float(N + pad) - 2.0); // index of first element in pixel (matrix space)\n\n // direct usage of col requires output be padded exactly like input\n vec4 x = texture2D( X, vec2(col_t, row_t));\n vec4 sum_v = (a * x) + b;\n\n // fix padded region\n  if(pad > 0 && col + 4.0 > float(N) ) {\n    fix_pad_1540259130(sum_v, pad);\n }\n\n gl_FragColor = sum_v;\n}\n";this.standalone?this.program=this.webgl.createProgram(e):this.program=this.webgl.createProgram(o)}var WebGL=require("./webgl");module.exports=SSCALCalculator,SSCALCalculator.TEXTURE_UNIFORM_NAME_0="X",SSCALCalculator.LENGTH_UNIFORM_NAME="N",SSCALCalculator.ADD_UNIFORM_NAME="b",SSCALCalculator.MUL_UNIFORM_NAME="a",SSCALCalculator.prototype.calculate=function(n,t,e,o,a,i){var l=this.webgl.context,r=this.webgl.getPad(t);this.webgl.selectProgram(this.program),this.bindInputTexture(a,l.TEXTURE0,SSCALCalculator.TEXTURE_UNIFORM_NAME_0),this.bindUniforms(t,r,e,o),this.standalone?this.webgl.bindOutputTexture(n,t+r,i):this.webgl.bindOutputTexture(n,(t+r)/4,i),l.drawElements(l.TRIANGLES,6,l.UNSIGNED_SHORT,0),this.webgl.unbindInputTexture(l.TEXTURE0)},SSCALCalculator.prototype.bindInputTexture=function(n,t,e){var o=this.webgl.context,a=this.program;o.activeTexture(t),o.bindTexture(o.TEXTURE_2D,n);var i=o.getUniformLocation(a,e);o.uniform1i(i,t-o.TEXTURE0)},SSCALCalculator.prototype.bindUniforms=function(n,t,e,o){var a=this.webgl.context,i=a.getUniformLocation(this.program,SSCALCalculator.LENGTH_UNIFORM_NAME),l=a.getUniformLocation(this.program,SSCALCalculator.ADD_UNIFORM_NAME),r=a.getUniformLocation(this.program,SSCALCalculator.MUL_UNIFORM_NAME),u=a.getUniformLocation(this.program,"pad");a.uniform1i(i,n),a.uniform1i(u,t),a.uniform1f(r,e),a.uniform1f(l,o)};
},{"./webgl":12}],10:[function(require,module,exports){
function Tensor(e,t){if(2!=e.length)throw new Error("Only Tensor of order two (matrix) is supported right now.");var r=e[0],s=e[1];this.texture=gl.createDataTexture(r,s,t),this.shape=[r,s]}var globals=require("./globals"),gl=globals.gl;module.exports=Tensor,Tensor.prototype["delete"]=function(){gl.context.deleteTexture(this.texture),this.texture=null,this.shape=null},Tensor.prototype.transfer=function(e){var t,r,s=this.shape[0],o=this.shape[1];return t=gl.createOutputTexture(s,o),gl.encode(s,o,this.texture,t),r=new Float32Array(gl.readData(s,o)),gl.context.deleteTexture(t),e||this["delete"](),r},Tensor.prototype.reshape=function(e,t){var r=this.shape[0],s=this.shape[1],o=e[0],n=e[1],u=new Tensor(e,null);return gl.reshape(r,s,o,n,this.texture,u.texture),t||this["delete"](),u},Tensor.prototype.transpose=function(e){var t=this.shape[0],r=this.shape[1],s=new Tensor([r,t],null);return gl.transpose(t,r,this.texture,s.texture),e||this["delete"](),s},Tensor.prototype.split=function(e,t){var r=this.shape[0],s=this.shape[1];if(s%2!==0)throw new Error("row count must be multiple of two.");var o=new Tensor([r,s/2],null),n=new Tensor([r,s/2],null);return gl.submatrix(s,r,s/2,e,0,this.texture,o.texture),gl.submatrix(s,r,s/2,e,1,this.texture,n.texture),t||this["delete"](),[o,n]},Tensor.combine=function(e,t,r,s){var o=e.shape[0],n=e.shape[1];if(e.shape[1]!==t.shape[1]||e.shape[0]!==t.shape[0])throw new Error("row and column counts must be equal.");if(r%4!==0)throw new Error("stride must be a multiple of four");var u=new Tensor([o,2*n],null);return gl.combine(o,n,r,e.texture,t.texture,u.texture),s||(e["delete"](),t["delete"]()),u};
},{"./globals":2}],11:[function(require,module,exports){
function loadFloat32Array(e,t){return loader.load(e,Float32Array,t)}var async=require("async"),loader=require("arrayloader");test={},test.allclose=function(e,t,r,a){if(r=r||1e-5,a=a||1e-8,e.length!=t.length)return console.log("lengths not equal: "+e.length+", "+t.length),{result:!1,index:null};for(var n,l=0;l<e.length;l++)if(n=Math.abs(e[l]-t[l])<=a+r*Math.abs(t[l]),!n)return{result:!1,index:l};return{result:!0,index:l}},test.randomArray=function(e,t){for(var r=[],a=0;e>a;a++){for(var n=[],l=0;t>l;l++)n[l]=Math.random()/Math.sqrt(e);r.push(n)}return r},test.padData=function(e,t,r,a){for(var n=new Float32Array(e*(t+r)),l=0;e>l;l++)n.set(a.subarray(l*t,(l+1)*t),l*(t+r));return n},test.submatrix=function(e,t,r,a,n){for(var l=new n.constructor(t*r),o=0;t>o;o++)for(var s=0;r>s;s++)l[o*r+s]=n[o*e+s+a];return l},test.load=function(e,t,r){var a=t.map(function(t){return e+t});async.map(a,loadFloat32Array,function(e,t){return e?r(e):void r(e,t)})},test.assert={},test.assert.allclose=function(e,t,r,a,n,l){var o=test.allclose(t,r,n,l),s="[",u="[";if(!o.result){o.index>1&&(s+="..., ",u+="..., "),o.index>0&&(s+=t[o.index-1]+", ",u+=r[o.index-1]+", "),s+="-->",u+="-->";for(var i=o.index;i<o.index+4&&i<t.length;i++)s+=t[i]+", ",u+=r[i]+", ";i<t.length?(s+="...]",u+="...]"):(s+="]",u+="]"),a=a||"should be allclose at "+o.index}e._assert(o.result,{message:a||"should be allclose",operator:"allclose",actual:s,expected:u,extra:null})},module.exports=test;
},{"arrayloader":13,"async":14}],12:[function(require,module,exports){
function WebGL(n){var e,t;if(n=n||{},"undefined"==typeof n.canvas?this.canvas=document.createElement("canvas"):this.canvas=n.canvas,e={premultipliedAlpha:!1,preserveDrawingBuffer:!1},this.context=this.canvas.getContext("experimental-webgl",e),"undefined"==typeof this.context)throw new Error("No support for Webgl.");try{t=this.context.getExtension("OES_texture_float")}catch(o){}t?this.hasFloat=!0:(console.log("No support for OES_texture_float extension."),this.hasFloat=!1);var i=this.context.getShaderPrecisionFormat(this.context.FRAGMENT_SHADER,this.context.HIGH_FLOAT);this.hasHighPrecision=0!=i.precision,this.hasHighPrecision&&(this.highp=i);var r="#define GLSLIFY 1\n// vertex shader for a single quad\n// work is performed in the operation specific texture shader\n\nprecision highp float;\n\nattribute vec3 pos;\nattribute vec2 tex;\nvarying vec2   outTex;\nvoid main(void)\n{\n // just pass the position and texture coords\n  gl_Position = vec4(pos, 1.0);\n outTex = tex;\n}\n";this.vertexShader=this.context.createShader(this.context.VERTEX_SHADER),this.context.shaderSource(this.vertexShader,r),this.context.compileShader(this.vertexShader);var a="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform int       N;    // number of columns in output\nuniform int       pad;    //\n\n// Render float to bytes according to IEEE 754 Floating Point\nvec4 encode_float_1604150559(float val) {\n\n  // TODO: correctly handle denormal numbers\n  // http://www.2ality.com/2012/04/number-encoding.html\n float a = abs(val);                           // encode absolute value + sign\n float exp = floor(log2(a));                 // number of powers of 2\n  float mant = pow(2.,log2(a)-exp) * pow(2.,23.);  // multiply to fill 24 bits (implied leading 1)\n  float mant1 = floor(mant / 256. / 256.);    // first 8 bits of mantissa\n float mant2 = mod(floor(mant / 256.),256.); // second 8 bits\n  float mant3 = mod(mant,256.);               // third 8 bits\n\n highp float sign = 128.-128.*(a/val);     // sign bit is 256 or 0\n highp float e = (sign+exp+127.)/510.;   // exponent and sign\n  highp float m1 = (mant1-(128.*(1.-mod(exp+127.,2.))))/255.; // handle leading bit\n highp float m2 = (mant2)/255.;        // middle part\n  highp float m3 = (mant3+.5)/255.;     // scale to 0 - 255\n\n return vec4(m3,m2,m1,e);\n}\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n\n vec4 val_v = texture2D(A, vec2(col_t * float(N)/float(N + pad), row_t));\n  int channel = int(mod(col_t * float(N), 4.0 ));\n float val = select_index_1540259130(val_v, channel);\n\n  if (val == 0.) {\n    gl_FragColor = vec4(0.,0.,0.,0.);\n   return;\n }\n\n   // output vec4 with bytes for an IEEE754 32-bit floating point number\n gl_FragColor = encode_float_1604150559(val);\n}\n",l="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform int       M;    // number of rows in output\nuniform int       N;   // number of columns in output\nuniform int       mpad;   //\nuniform int       npad;   //\n\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n  float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n float col = (col_t * float(N + npad) - 2.0); // index of first element in pixel (matrix space)\n\n  // get rows in the input, each containing one element in the output\n vec4 row_1 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 0.5)/float(N)));\n  vec4 row_2 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 1.5)/float(N)));\n  vec4 row_3 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 2.5)/float(N)));\n  vec4 row_4 = texture2D(A, vec2((row_t * float(M))/float(M + mpad), (col + 3.5)/float(N)));\n\n  // package into output vector\n int channel = int(mod(row_t * float(M), 4.0 ));\n\n vec4 col_v = vec4(0.0, 0.0, 0.0, 0.0); // vec4 representing four elements in a column in the input\n\n  // extract relevent element from each input row\n col_v.r = select_index_1540259130(row_1, channel);\n  if(npad > 0 && (col + 4.0) > float(N) ) {\n   // compute elements in padded region\n    if(npad < 3){\n     col_v.g = select_index_1540259130(row_2, channel);\n    }\n   if(npad < 2){\n     col_v.b = select_index_1540259130(row_3, channel);\n    }\n } else {\n    col_v.g = select_index_1540259130(row_2, channel);\n    col_v.b = select_index_1540259130(row_3, channel);\n    col_v.a = select_index_1540259130(row_4, channel);\n  }\n\n gl_FragColor = col_v;\n}\n",s="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform float     M;    // number of rows in output\nuniform float     N;   // number of columns in output\nuniform float     pad;    // column padding in output\nuniform float     M_in;    // number of rows in input\nuniform float     N_in;   // number of columns in input\nuniform float     pad_in;  // column padding in input\n\n/* number of input pixels\n   origin index (channel) for each\n   termination index (channel) for each\n   destination origin index (channel) for each\n */\n// select an element from a vector based on index\nfloat select_index_1540259130(vec4 v, int index){\n float val;\n  if (index == 0) {\n   val = v.r;\n  } else if(index == 1) {\n   val = v.g;\n  } else if(index == 2) {\n   val = v.b;\n  } else if(index == 3){\n    val = v.a;\n  } else {\n    // should never be here\n   val = 0.0;\n  }\n\n return val;\n}\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1117569599(inout vec4 v, int pad){\n  v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1604150559(float linear_index, float row_length){\n  vec2 coords;\n\n  coords.x = floor(mod(linear_index + 0.5, row_length)); // column\n  coords.y = floor((linear_index + 0.5) / row_length); // row\n\n return coords;\n}\n\nvoid main(void) {\n\n  // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n\n float row = floor(row_t * M);\n float col_0 = (col_t * (N + pad) - 2.0); // index of first element in pixel (matrix space)\n  //float col_0 = floor(col_t * (N + pad)/4.0)*4.0; // index of first element in pixel (matrix space)\n float lin_index_0 = row * N + col_0; // linearized index of first element in pixel in output\n\n  vec4 pixel_in = vec4(0.0, 0.0, 0.0, 0.0);\n vec4 result = vec4(0.0, 0.0, 0.0, 0.0);\n vec2 coords = linear_index_coords_1604150559(lin_index_0, N_in);\n  vec2 ncoords;\n int channel_in = int(mod(coords.x, 4.0));\n\n vec2 scale_in = vec2(1.0/(N_in + pad_in), 1.0/M_in); // scale from matrix to input texture coords\n vec2 offset_in = vec2(0.5, 0.5); // move away from edge of pixel\n  const vec2 pixel_scale = vec2(1.0/4.0, 1.0); // scale from matrix to pixel coords\n\n pixel_in = texture2D(A, (coords + offset_in) * scale_in);\n\n // go through channels for current output pixel\n for(int channel = 0; channel < 4; channel++){\n\n   // are we on a new input pixel?\n   ncoords = linear_index_coords_1604150559(lin_index_0 + float(channel), N_in);\n   if(floor(ncoords * pixel_scale) != floor(coords * pixel_scale)){\n      coords = ncoords;\n     pixel_in = texture2D(A, (coords + offset_in) * scale_in);\n     channel_in = 0;\n   }\n\n   if(channel == 0){\n     result.r = select_index_1540259130(pixel_in, channel_in);\n   } else if(channel == 1){\n      result.g = select_index_1540259130(pixel_in, channel_in);\n   } else if(channel == 2){\n      result.b = select_index_1540259130(pixel_in, channel_in);\n   } else {\n      result.a = select_index_1540259130(pixel_in, channel_in);\n   }\n\n   channel_in++;\n }\n\n // are we in the padded (output) region?\n  if(pad > 0.0 && col_0 + 3.5 > N ) {\n   fix_pad_1117569599(result, int(pad));\n }\n\n gl_FragColor = result;\n}\n",c="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform float     M;    // number of rows in output\nuniform float     N;   // number of columns in output\nuniform float     M_in;   // number of rows in input\nuniform float     N_in;   // number of columns in input\n\n// translate a linear index into x, y coordinates for a matrix\nvec2 linear_index_coords_1540259130(float linear_index, float row_length){\n vec2 coords;\n\n  coords.x = floor(mod(linear_index + 0.5, row_length)); // column\n  coords.y = floor((linear_index + 0.5) / row_length); // row\n\n return coords;\n}\n\nvoid main(void) {\n\n  // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n\n float row = floor(row_t * M);\n float col_0 = floor(col_t * N - 1.5); // index of first element in pixel (matrix space)\n float lin_index_0 = row * N + col_0; // linearized index of first element in pixel in output\n\n  vec4 result;\n  vec2 coords = linear_index_coords_1540259130(lin_index_0, N_in);\n\n  vec2 scale_in = vec2(1.0/N_in, 1.0/M_in); // scale from matrix to input texture coords\n  vec2 offset_in = vec2(0.5, 0.5); // move away from edge of pixel\n\n  result = texture2D(A, (coords + offset_in) * scale_in);\n\n gl_FragColor = result;\n}\n",f="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex;  // texture coords of row/column to calculate\nuniform sampler2D X;    // texture with data from padded X\nuniform float     N;    // number of columns\nuniform float     pad;    // additional columns to nearest multiple of four\nuniform float     N_in;    // number of columns (input)\nuniform float     pad_in; // additional columns to nearest multiple of four (input)\nuniform float     stride;\nuniform float     offset;   // zero or one\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n  v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\n/* join parts of two pixels into one, selecting four continguous elements\n  starting at channel.\n*/\nvoid join_pixels_1604150559(inout vec4 x, vec4 x0, vec4 x1, float channel){\n  if(channel == 1.0){\n   x.rgb = x0.gba;\n   x.a = x1.r;\n } else if(channel == 2.0){\n    x.rg = x0.ba;\n   x.ba = x1.rg;\n } else if(channel == 3.0){\n    x.r = x0.a;\n   x.gba = x1.rgb;\n }\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n float col = floor(col_t * (N + pad) - 1.5); // index of first element in pixel (output matrix space)\n\n  float stripe = floor(col / stride);\n float sub_col = floor(mod(col, stride));\n\n  float col_in = (offset + (2.0 * stripe)) * stride + sub_col;\n\n  vec4 x;\n float channel = mod(col_in, 4.0); // channel in the input of first element in output\n\n  // are we at the beggining of an input pixel?\n if(channel == 0.0){\n   // yes, select the whole thing\n    x = texture2D( X, vec2((col_in + 2.0 - channel) / (N_in + pad_in) , row_t));\n  } else {\n    // no, select parts from two pixels\n   vec4 x0, x1;\n    x0 = texture2D( X, vec2((col_in + 2.0 - channel) / (N_in + pad_in) , row_t));\n   x1 = texture2D( X, vec2((col_in + 6.0 - channel) / (N_in + pad_in) , row_t));\n\n   join_pixels_1604150559(x, x0, x1, channel);\n\n }\n\n // fix padded region\n  if(pad > 0.0 && col + 4.0 > N ) {\n   fix_pad_1540259130(x, int(pad));\n  }\n\n gl_FragColor = x;\n}\n",u="#define GLSLIFY 1\nprecision highp float;\n\nvarying vec2      outTex; // texture coords of row/column to calculate\nuniform sampler2D A;    // texture with data from padded A\nuniform sampler2D B;    // texture with data from padded B\nuniform float     N_in;   // number of columns\nuniform float     pad_in; // additional columns to nearest multiple of four\nuniform float     stride;\n\n// set pad values to 0.0, if in padded region of output texture\nvoid fix_pad_1540259130(inout vec4 v, int pad){\n  v.a = 0.0;\n  if(pad == 2){\n   v.b = 0.0;\n  } else if(pad == 3){\n    v.b = 0.0;\n    v.g = 0.0;\n  }\n}\n\nvoid main(void) {\n\n // get the implied row and column from .y and .x of passed (output)\n // texture coordinate. These map directly to input texture space when\n // the relevant dimensions are the same.\n  float row_t = outTex.y;\n float col_t = outTex.x;\n float N = N_in * 2.0;\n float pad = mod(N, 4.0);\n  float col = floor(col_t * (N + pad) - 1.5); // index of first element in pixel (output matrix space)\n\n  float stripe = floor(col / stride);\n float sub_col = floor(mod(col, stride));\n\n  float tex_select = mod(stripe, 2.0);\n  float col_in = floor(stripe / 2.0) * stride + sub_col;\n\n  vec4 x;\n float channel = mod(col_in, 4.0); // channel in the input of first element in output\n\n  // which input texture are we getting this pixel from?\n  if(tex_select == 0.0){\n    x = texture2D( A, vec2((col_in + 2.0) / (N_in + pad_in) , row_t));\n  } else {\n    x = texture2D( B, vec2((col_in + 2.0) / (N_in + pad_in) , row_t));\n  }\n\n // fix padded region\n  if(pad > 0.0 && col + 4.0 > N ) {\n   fix_pad_1540259130(x, int(pad));\n  }\n\n gl_FragColor = x;\n}\n";this.encode_program=this.createProgram(a),this.transpose_program=this.createProgram(l),this.reshape_program=this.createProgram(s),this.reshape_simple_program=this.createProgram(c),this.submatrix_program=this.createProgram(f),this.combine_program=this.createProgram(u)}module.exports=WebGL,WebGL.COMPONENTS_PER_TEXEL=4,WebGL.POSITION_UNIFORM_NAME="pos",WebGL.TEXTURE_UNIFORM_NAME="tex",WebGL.prototype.encode=function(n,e,t,o){this.program=this.encode_program,this.selectProgram(this.program);var i=this.getPad(e),r=this.context.getUniformLocation(this.program,"N"),a=this.context.getUniformLocation(this.program,"pad");this.context.uniform1i(r,e),this.context.uniform1i(a,i),this.bindInputTexture(t,this.context.TEXTURE0,"A"),this.bindOutputTexture(n,e,o),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},WebGL.prototype.transpose=function(n,e,t,o){this.program=this.transpose_program,this.selectProgram(this.program);var i=this.getPad(e),r=this.getPad(n),a=this.context.getUniformLocation(this.program,"N"),l=this.context.getUniformLocation(this.program,"npad"),s=this.context.getUniformLocation(this.program,"M"),c=this.context.getUniformLocation(this.program,"mpad");this.context.uniform1i(a,n),this.context.uniform1i(l,r),this.context.uniform1i(s,e),this.context.uniform1i(c,i),this.bindInputTexture(t,this.context.TEXTURE0,"A"),this.bindOutputTexture(e,(n+r)/4,o),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},WebGL.prototype.reshape=function(n,e,t,o,i,r){var a=this.getPad(e),l=this.getPad(o);0==a&&0==l?this.program=this.reshape_simple_program:(this.program=this.reshape_program,console.log("# WARNING: using slow reshape shader.")),this.selectProgram(this.program);var s=this.context.getUniformLocation(this.program,"M"),c=this.context.getUniformLocation(this.program,"N"),f=this.context.getUniformLocation(this.program,"pad"),u=this.context.getUniformLocation(this.program,"M_in"),d=this.context.getUniformLocation(this.program,"N_in"),x=this.context.getUniformLocation(this.program,"pad_in");this.context.uniform1f(s,t),this.context.uniform1f(c,o),this.context.uniform1f(f,l),this.context.uniform1f(u,n),this.context.uniform1f(d,e),this.context.uniform1f(x,a),this.bindInputTexture(i,this.context.TEXTURE0,"A"),this.bindOutputTexture(t,(o+l)/4,r),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},WebGL.prototype.submatrix=function(n,e,t,o,i,r,a){this.program=this.submatrix_program,this.selectProgram(this.program);var l=this.getPad(n),s=this.getPad(t),c=this.context.getUniformLocation(this.program,"N"),f=this.context.getUniformLocation(this.program,"pad"),u=this.context.getUniformLocation(this.program,"N_in"),d=this.context.getUniformLocation(this.program,"pad_in"),x=this.context.getUniformLocation(this.program,"offset");stride_gl=this.context.getUniformLocation(this.program,"stride"),this.context.uniform1f(c,t),this.context.uniform1f(f,s),this.context.uniform1f(u,n),this.context.uniform1f(d,l),this.context.uniform1f(stride_gl,o),this.context.uniform1f(x,i),this.bindInputTexture(r,this.context.TEXTURE0,"X"),this.bindOutputTexture(e,(t+s)/4,a),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},WebGL.prototype.combine=function(n,e,t,o,i,r){this.program=this.combine_program,this.selectProgram(this.program);var a=2*e,l=this.getPad(e),s=this.getPad(a),c=this.context.getUniformLocation(this.program,"N_in"),f=this.context.getUniformLocation(this.program,"pad_in"),u=this.context.getUniformLocation(this.program,"stride");this.context.uniform1f(c,e),this.context.uniform1f(f,l),this.context.uniform1f(u,t),this.bindInputTexture(o,this.context.TEXTURE0,"A"),this.bindInputTexture(i,this.context.TEXTURE1,"B"),this.bindOutputTexture(n,(a+s)/4,r),this.context.drawElements(this.context.TRIANGLES,6,this.context.UNSIGNED_SHORT,0),this.unbindInputTexture(this.context.TEXTURE0)},WebGL.prototype.bindInputTexture=function(n,e,t){var o=this.context,i=this.program;o.activeTexture(e),o.bindTexture(o.TEXTURE_2D,n);var r=o.getUniformLocation(i,t);o.uniform1i(r,e-o.TEXTURE0)},WebGL.prototype.createProgram=function(n){var e,t=this.context;if(e=t.createShader(t.FRAGMENT_SHADER),t.shaderSource(e,n),t.compileShader(e),0==t.getShaderParameter(e,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(e));var o=t.createProgram();return t.attachShader(o,this.vertexShader),t.attachShader(o,e),t.linkProgram(o),o},WebGL.prototype.selectProgram=function(n){var e=this.context;e.useProgram(n),this.bindVertices(n)},WebGL.prototype.bindVertices=function(n){var e=this.context,t=n,o=e.getAttribLocation(t,WebGL.POSITION_UNIFORM_NAME),i=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,i);var r=[-1,-1,0,1,-1,0,1,1,0,-1,1,0];e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),e.vertexAttribPointer(o,3,e.FLOAT,!1,0,0),e.enableVertexAttribArray(o);var a=e.getAttribLocation(t,WebGL.TEXTURE_UNIFORM_NAME),l=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,l);var s=[0,0,1,0,1,1,0,1];e.bufferData(e.ARRAY_BUFFER,new Float32Array(s),e.STATIC_DRAW),e.vertexAttribPointer(a,2,e.FLOAT,!1,0,0),e.enableVertexAttribArray(a);var c=e.createBuffer();e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,c);var f=[0,1,2,0,2,3];e.bufferData(e.ELEMENT_ARRAY_BUFFER,new Uint16Array(f),e.STATIC_DRAW)},WebGL.prototype.createDataTexture=function(n,e,t){var o=this.context,i=[0,0,0,0],r=e%WebGL.COMPONENTS_PER_TEXEL,a=0==r?0:WebGL.COMPONENTS_PER_TEXEL-r,l=o.createTexture();if(o.bindTexture(o.TEXTURE_2D,l),0==a||null==t||"undefined"==typeof t)o.texImage2D(o.TEXTURE_2D,0,o.RGBA,(e+a)/WebGL.COMPONENTS_PER_TEXEL,n,0,o.RGBA,o.FLOAT,t);else{o.texImage2D(o.TEXTURE_2D,0,o.RGBA,(e+a)/WebGL.COMPONENTS_PER_TEXEL,n,0,o.RGBA,o.FLOAT,null);for(var s,c,f=e-r,u=f/WebGL.COMPONENTS_PER_TEXEL,d=0,x=new Float32Array(i),p=0;n>p;p++)d=p*e,full_texel_row_end=d+f,s=new Float32Array(t.buffer,d*t.BYTES_PER_ELEMENT,f),f>0&&o.texSubImage2D(o.TEXTURE_2D,0,0,p,u,1,o.RGBA,o.FLOAT,s),c=new Float32Array(t.buffer,full_texel_row_end*t.BYTES_PER_ELEMENT,r),x.set(c),o.texSubImage2D(o.TEXTURE_2D,0,u,p,1,1,o.RGBA,o.FLOAT,x)}return o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.NEAREST),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.NEAREST),o.bindTexture(o.TEXTURE_2D,null),l},WebGL.prototype.createOutputTexture=function(n,e){var t=this.context,o=this.getPad(e),i=t.createTexture();return t.bindTexture(t.TEXTURE_2D,i),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,e+o,n,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.bindTexture(t.TEXTURE_2D,null),i},WebGL.prototype.bindOutputTexture=function(n,e,t){var o=this.context;if(this.canvas.height=n,this.canvas.width=e,o.viewport(0,0,e,n),this.framebuffer=this.framebuffer||o.createFramebuffer(),o.bindFramebuffer(o.FRAMEBUFFER,this.framebuffer),o.framebufferTexture2D(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,t,0),o.checkFramebufferStatus(o.FRAMEBUFFER)!=o.FRAMEBUFFER_COMPLETE)throw new Error("Bound framebuffer is not complete.");return this.framebuffer},WebGL.prototype.unbindInputTexture=function(n){var e=this.context;e.activeTexture(n),e.bindTexture(e.TEXTURE_2D,null)},WebGL.prototype.readData=function(n,e){var t=this.context;return rawbuffer=new ArrayBuffer(n*e*Float32Array.BYTES_PER_ELEMENT),prod=new Uint8Array(rawbuffer),t.readPixels(0,0,e,n,t.RGBA,t.UNSIGNED_BYTE,prod),rawbuffer},WebGL.prototype.getPad=function(n){var e=n%WebGL.COMPONENTS_PER_TEXEL,t=0==e?0:WebGL.COMPONENTS_PER_TEXEL-e;return t};
},{}],13:[function(require,module,exports){
exports.load=function(e,r,t){var n=new XMLHttpRequest;n.onreadystatechange=function(){if(4===n.readyState)if(n.status>=200&&n.status<300){var a=n.response;if(!a)return t("empty response");try{var s=new r(a);return t(null,s)}catch(o){return t(o)}}else{var u=new Error("failed to request file '"+e+"'");u.errno=34,t(u)}};try{n.open("GET",e,!0),n.responseType="arraybuffer",n.send(null)}catch(a){t(a)}};
},{}],14:[function(require,module,exports){
(function (process,global){
!function(){function n(){}function t(n){return n}function e(n){return!!n}function r(n){return!n}function u(n){return function(){if(null===n)throw new Error("Callback was already called.");n.apply(this,arguments),n=null}}function i(n){return function(){null!==n&&(n.apply(this,arguments),n=null)}}function o(n){return M(n)||"number"==typeof n.length&&n.length>=0&&n.length%1===0}function c(n,t){for(var e=-1,r=n.length;++e<r;)t(n[e],e,n)}function a(n,t){for(var e=-1,r=n.length,u=Array(r);++e<r;)u[e]=t(n[e],e,n);return u}function f(n){return a(Array(n),function(n,t){return t})}function l(n,t,e){return c(n,function(n,r,u){e=t(e,n,r,u)}),e}function s(n,t){c(W(n),function(e){t(n[e],e)})}function p(n,t){for(var e=0;e<n.length;e++)if(n[e]===t)return e;return-1}function h(n){var t,e,r=-1;return o(n)?(t=n.length,function(){return r++,t>r?r:null}):(e=W(n),t=e.length,function(){return r++,t>r?e[r]:null})}function m(n,t){return t=null==t?n.length-1:+t,function(){for(var e=Math.max(arguments.length-t,0),r=Array(e),u=0;e>u;u++)r[u]=arguments[u+t];switch(t){case 0:return n.call(this,r);case 1:return n.call(this,arguments[0],r)}}}function y(n){return function(t,e,r){return n(t,r)}}function v(t){return function(e,r,o){o=i(o||n),e=e||[];var c=h(e);if(0>=t)return o(null);var a=!1,f=0,l=!1;!function s(){if(a&&0>=f)return o(null);for(;t>f&&!l;){var n=c();if(null===n)return a=!0,void(0>=f&&o(null));f+=1,r(e[n],n,u(function(n){f-=1,n?(o(n),l=!0):s()}))}}()}}function d(n){return function(t,e,r){return n(C.eachOf,t,e,r)}}function g(n){return function(t,e,r,u){return n(v(e),t,r,u)}}function k(n){return function(t,e,r){return n(C.eachOfSeries,t,e,r)}}function b(t,e,r,u){u=i(u||n),e=e||[];var c=o(e)?[]:{};t(e,function(n,t,e){r(n,function(n,r){c[t]=r,e(n)})},function(n){u(n,c)})}function w(n,t,e,r){var u=[];n(t,function(n,t,r){e(n,function(e){e&&u.push({index:t,value:n}),r()})},function(){r(a(u.sort(function(n,t){return n.index-t.index}),function(n){return n.value}))})}function O(n,t,e,r){w(n,t,function(n,t){e(n,function(n){t(!n)})},r)}function S(n,t,e){return function(r,u,i,o){function c(){o&&o(e(!1,void 0))}function a(n,r,u){return o?void i(n,function(r){o&&t(r)&&(o(e(!0,n)),o=i=!1),u()}):u()}arguments.length>3?n(r,u,a,c):(o=i,i=u,n(r,a,c))}}function E(n,t){return t}function L(t,e,r){r=r||n;var u=o(e)?[]:{};t(e,function(n,t,e){n(m(function(n,r){r.length<=1&&(r=r[0]),u[t]=r,e(n)}))},function(n){r(n,u)})}function I(n,t,e,r){var u=[];n(t,function(n,t,r){e(n,function(n,t){u=u.concat(t||[]),r(n)})},function(n){r(n,u)})}function x(t,e,r){function i(t,e,r,u){if(null!=u&&"function"!=typeof u)throw new Error("task callback must be a function");return t.started=!0,M(e)||(e=[e]),0===e.length&&t.idle()?C.setImmediate(function(){t.drain()}):(c(e,function(e){var i={data:e,callback:u||n};r?t.tasks.unshift(i):t.tasks.push(i),t.tasks.length===t.concurrency&&t.saturated()}),void C.setImmediate(t.process))}function o(n,t){return function(){f-=1;var e=!1,r=arguments;c(t,function(n){c(l,function(t,r){t!==n||e||(l.splice(r,1),e=!0)}),n.callback.apply(n,r)}),n.tasks.length+f===0&&n.drain(),n.process()}}if(null==e)e=1;else if(0===e)throw new Error("Concurrency must not be zero");var f=0,l=[],s={tasks:[],concurrency:e,payload:r,saturated:n,empty:n,drain:n,started:!1,paused:!1,push:function(n,t){i(s,n,!1,t)},kill:function(){s.drain=n,s.tasks=[]},unshift:function(n,t){i(s,n,!0,t)},process:function(){if(!s.paused&&f<s.concurrency&&s.tasks.length)for(;f<s.concurrency&&s.tasks.length;){var n=s.payload?s.tasks.splice(0,s.payload):s.tasks.splice(0,s.tasks.length),e=a(n,function(n){return n.data});0===s.tasks.length&&s.empty(),f+=1,l.push(n[0]);var r=u(o(s,n));t(e,r)}},length:function(){return s.tasks.length},running:function(){return f},workersList:function(){return l},idle:function(){return s.tasks.length+f===0},pause:function(){s.paused=!0},resume:function(){if(s.paused!==!1){s.paused=!1;for(var n=Math.min(s.concurrency,s.tasks.length),t=1;n>=t;t++)C.setImmediate(s.process)}}};return s}function j(n){return m(function(t,e){t.apply(null,e.concat([m(function(t,e){"object"==typeof console&&(t?console.error&&console.error(t):console[n]&&c(e,function(t){console[n](t)}))})]))})}function A(n){return function(t,e,r){n(f(t),e,r)}}function T(n){return m(function(t,e){var r=m(function(e){var r=this,u=e.pop();return n(t,function(n,t,u){n.apply(r,e.concat([u]))},u)});return e.length?r.apply(this,e):r})}function z(n){return m(function(t){var e=t.pop();t.push(function(){var n=arguments;r?C.setImmediate(function(){e.apply(null,n)}):e.apply(null,n)});var r=!0;n.apply(this,t),r=!1})}var q,C={},P="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this;null!=P&&(q=P.async),C.noConflict=function(){return P.async=q,C};var H=Object.prototype.toString,M=Array.isArray||function(n){return"[object Array]"===H.call(n)},U=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},W=Object.keys||function(n){var t=[];for(var e in n)n.hasOwnProperty(e)&&t.push(e);return t},B="function"==typeof setImmediate&&setImmediate,D=B?function(n){B(n)}:function(n){setTimeout(n,0)};"object"==typeof process&&"function"==typeof process.nextTick?C.nextTick=process.nextTick:C.nextTick=D,C.setImmediate=B?D:C.nextTick,C.forEach=C.each=function(n,t,e){return C.eachOf(n,y(t),e)},C.forEachSeries=C.eachSeries=function(n,t,e){return C.eachOfSeries(n,y(t),e)},C.forEachLimit=C.eachLimit=function(n,t,e,r){return v(t)(n,y(e),r)},C.forEachOf=C.eachOf=function(t,e,r){function o(n){f--,n?r(n):null===c&&0>=f&&r(null)}r=i(r||n),t=t||[];for(var c,a=h(t),f=0;null!=(c=a());)f+=1,e(t[c],c,u(o));0===f&&r(null)},C.forEachOfSeries=C.eachOfSeries=function(t,e,r){function o(){var n=!0;return null===a?r(null):(e(t[a],a,u(function(t){if(t)r(t);else{if(a=c(),null===a)return r(null);n?C.setImmediate(o):o()}})),void(n=!1))}r=i(r||n),t=t||[];var c=h(t),a=c();o()},C.forEachOfLimit=C.eachOfLimit=function(n,t,e,r){v(t)(n,e,r)},C.map=d(b),C.mapSeries=k(b),C.mapLimit=g(b),C.inject=C.foldl=C.reduce=function(n,t,e,r){C.eachOfSeries(n,function(n,r,u){e(t,n,function(n,e){t=e,u(n)})},function(n){r(n,t)})},C.foldr=C.reduceRight=function(n,e,r,u){var i=a(n,t).reverse();C.reduce(i,e,r,u)},C.transform=function(n,t,e,r){3===arguments.length&&(r=e,e=t,t=M(n)?[]:{}),C.eachOf(n,function(n,r,u){e(t,n,r,u)},function(n){r(n,t)})},C.select=C.filter=d(w),C.selectLimit=C.filterLimit=g(w),C.selectSeries=C.filterSeries=k(w),C.reject=d(O),C.rejectLimit=g(O),C.rejectSeries=k(O),C.any=C.some=S(C.eachOf,e,t),C.someLimit=S(C.eachOfLimit,e,t),C.all=C.every=S(C.eachOf,r,r),C.everyLimit=S(C.eachOfLimit,r,r),C.detect=S(C.eachOf,t,E),C.detectSeries=S(C.eachOfSeries,t,E),C.detectLimit=S(C.eachOfLimit,t,E),C.sortBy=function(n,t,e){function r(n,t){var e=n.criteria,r=t.criteria;return r>e?-1:e>r?1:0}C.map(n,function(n,e){t(n,function(t,r){t?e(t):e(null,{value:n,criteria:r})})},function(n,t){return n?e(n):void e(null,a(t.sort(r),function(n){return n.value}))})},C.auto=function(t,e,r){function u(n){d.unshift(n)}function o(n){var t=p(d,n);t>=0&&d.splice(t,1)}function a(){h--,c(d.slice(0),function(n){n()})}r||(r=e,e=null),r=i(r||n);var f=W(t),h=f.length;if(!h)return r(null);e||(e=h);var y={},v=0,d=[];u(function(){h||r(null,y)}),c(f,function(n){function i(){return e>v&&l(g,function(n,t){return n&&y.hasOwnProperty(t)},!0)&&!y.hasOwnProperty(n)}function c(){i()&&(v++,o(c),h[h.length-1](d,y))}for(var f,h=M(t[n])?t[n]:[t[n]],d=m(function(t,e){if(v--,e.length<=1&&(e=e[0]),t){var u={};s(y,function(n,t){u[t]=n}),u[n]=e,r(t,u)}else y[n]=e,C.setImmediate(a)}),g=h.slice(0,h.length-1),k=g.length;k--;){if(!(f=t[g[k]]))throw new Error("Has inexistant dependency");if(M(f)&&p(f,n)>=0)throw new Error("Has cyclic dependencies")}i()?(v++,h[h.length-1](d,y)):u(c)})},C.retry=function(n,t,e){function r(n,t){if("number"==typeof t)n.times=parseInt(t,10)||i;else{if("object"!=typeof t)throw new Error("Unsupported argument type for 'times': "+typeof t);n.times=parseInt(t.times,10)||i,n.interval=parseInt(t.interval,10)||o}}function u(n,t){function e(n,e){return function(r){n(function(n,t){r(!n||e,{err:n,result:t})},t)}}function r(n){return function(t){setTimeout(function(){t(null)},n)}}for(;a.times;){var u=!(a.times-=1);c.push(e(a.task,u)),!u&&a.interval>0&&c.push(r(a.interval))}C.series(c,function(t,e){e=e[e.length-1],(n||a.callback)(e.err,e.result)})}var i=5,o=0,c=[],a={times:i,interval:o},f=arguments.length;if(1>f||f>3)throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");return 2>=f&&"function"==typeof n&&(e=t,t=n),"function"!=typeof n&&r(a,n),a.callback=e,a.task=t,a.callback?u():u},C.waterfall=function(t,e){function r(n){return m(function(t,u){if(t)e.apply(null,[t].concat(u));else{var i=n.next();i?u.push(r(i)):u.push(e),z(n).apply(null,u)}})}if(e=i(e||n),!M(t)){var u=new Error("First argument to waterfall must be an array of functions");return e(u)}return t.length?void r(C.iterator(t))():e()},C.parallel=function(n,t){L(C.eachOf,n,t)},C.parallelLimit=function(n,t,e){L(v(t),n,e)},C.series=function(n,t){L(C.eachOfSeries,n,t)},C.iterator=function(n){function t(e){function r(){return n.length&&n[e].apply(null,arguments),r.next()}return r.next=function(){return e<n.length-1?t(e+1):null},r}return t(0)},C.apply=m(function(n,t){return m(function(e){return n.apply(null,t.concat(e))})}),C.concat=d(I),C.concatSeries=k(I),C.whilst=function(t,e,r){if(r=r||n,t()){var u=m(function(n,i){n?r(n):t.apply(this,i)?e(u):r(null)});e(u)}else r(null)},C.doWhilst=function(n,t,e){var r=0;return C.whilst(function(){return++r<=1||t.apply(this,arguments)},n,e)},C.until=function(n,t,e){return C.whilst(function(){return!n.apply(this,arguments)},t,e)},C.doUntil=function(n,t,e){return C.doWhilst(n,function(){return!t.apply(this,arguments)},e)},C.during=function(t,e,r){r=r||n;var u=m(function(n,e){n?r(n):(e.push(i),t.apply(this,e))}),i=function(n,t){n?r(n):t?e(u):r(null)};t(i)},C.doDuring=function(n,t,e){var r=0;C.during(function(n){r++<1?n(null,!0):t.apply(this,arguments)},n,e)},C.queue=function(n,t){var e=x(function(t,e){n(t[0],e)},t,1);return e},C.priorityQueue=function(t,e){function r(n,t){return n.priority-t.priority}function u(n,t,e){for(var r=-1,u=n.length-1;u>r;){var i=r+(u-r+1>>>1);e(t,n[i])>=0?r=i:u=i-1}return r}function i(t,e,i,o){if(null!=o&&"function"!=typeof o)throw new Error("task callback must be a function");return t.started=!0,M(e)||(e=[e]),0===e.length?C.setImmediate(function(){t.drain()}):void c(e,function(e){var c={data:e,priority:i,callback:"function"==typeof o?o:n};t.tasks.splice(u(t.tasks,c,r)+1,0,c),t.tasks.length===t.concurrency&&t.saturated(),C.setImmediate(t.process)})}var o=C.queue(t,e);return o.push=function(n,t,e){i(o,n,t,e)},delete o.unshift,o},C.cargo=function(n,t){return x(n,1,t)},C.log=j("log"),C.dir=j("dir"),C.memoize=function(n,e){var r={},u={};e=e||t;var i=m(function(t){var i=t.pop(),o=e.apply(null,t);o in r?C.setImmediate(function(){i.apply(null,r[o])}):o in u?u[o].push(i):(u[o]=[i],n.apply(null,t.concat([m(function(n){r[o]=n;var t=u[o];delete u[o];for(var e=0,i=t.length;i>e;e++)t[e].apply(null,n)})])))});return i.memo=r,i.unmemoized=n,i},C.unmemoize=function(n){return function(){return(n.unmemoized||n).apply(null,arguments)}},C.times=A(C.map),C.timesSeries=A(C.mapSeries),C.timesLimit=function(n,t,e,r){return C.mapLimit(f(n),t,e,r)},C.seq=function(){var t=arguments;return m(function(e){var r=this,u=e[e.length-1];"function"==typeof u?e.pop():u=n,C.reduce(t,e,function(n,t,e){t.apply(r,n.concat([m(function(n,t){e(n,t)})]))},function(n,t){u.apply(r,[n].concat(t))})})},C.compose=function(){return C.seq.apply(null,Array.prototype.reverse.call(arguments))},C.applyEach=T(C.eachOf),C.applyEachSeries=T(C.eachOfSeries),C.forever=function(t,e){function r(n){return n?i(n):void o(r)}var i=u(e||n),o=z(t);r()},C.ensureAsync=z,C.constant=m(function(n){var t=[null].concat(n);return function(n){return n.apply(this,t)}}),C.wrapSync=C.asyncify=function(n){return m(function(t){var e,r=t.pop();try{e=n.apply(this,t)}catch(u){return r(u)}U(e)&&"function"==typeof e.then?e.then(function(n){r(null,n)})["catch"](function(n){r(n.message?n:new Error(n))}):r(null,e)})},"object"==typeof module&&module.exports?module.exports=C:"function"==typeof define&&define.amd?define([],function(){return C}):P.async=C}();
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":15}],15:[function(require,module,exports){
function cleanUpNextTick(){draining=!1,currentQueue.length?queue=currentQueue.concat(queue):queueIndex=-1,queue.length&&drainQueue()}function drainQueue(){if(!draining){var e=setTimeout(cleanUpNextTick);draining=!0;for(var n=queue.length;n;){for(currentQueue=queue,queue=[];++queueIndex<n;)currentQueue&&currentQueue[queueIndex].run();queueIndex=-1,n=queue.length}currentQueue=null,draining=!1,clearTimeout(e)}}function Item(e,n){this.fun=e,this.array=n}function noop(){}var process=module.exports={},queue=[],draining=!1,currentQueue,queueIndex=-1;process.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)n[r-1]=arguments[r];queue.push(new Item(e,n)),1!==queue.length||draining||setTimeout(drainQueue,0)},Item.prototype.run=function(){this.fun.apply(null,this.array)},process.title="browser",process.browser=!0,process.env={},process.argv=[],process.version="",process.versions={},process.on=noop,process.addListener=noop,process.once=noop,process.off=noop,process.removeListener=noop,process.removeAllListeners=noop,process.emit=noop,process.binding=function(e){throw new Error("process.binding is not supported")},process.cwd=function(){return"/"},process.chdir=function(e){throw new Error("process.chdir is not supported")},process.umask=function(){return 0};
},{}]},{},[1])(1)
});


//# sourceMappingURL=./weblas.map.json
(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate, context) {
    predicate = lookupIterator(predicate);
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate.call(context, elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
/*
@karpathy note:
This is concatenation of the important files from 
the excellent JPCNN library written by Pete Warden
and distributed under DeepBeliefSDK here:
https://github.com/jetpacapp/DeepBeliefSDK

- I catted all the dependencies together (except underscore, which I kept separate)
- I had to remove "use strict" from jpcnn
- I hard-coded g_useWebGL = true so that it's not an option
- I had to append global.matrixInsertMargin = matrixInsertMargin; at the end to export this function

TODO for future it to properly extract and nicely integrate
the shaders defined here into convnetjs. There is a lot of code
being included here for now that is never used and adds a lot of
bloat to ConvNetJS.
*/

var jpcnn = {};
(function(global) {

  /* 
 * glMatrix.js - High performance matrix and vector operations for WebGL
 * version 0.9.6
 */
 
/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

// Fallback for systems that don't support WebGL
if(typeof Float32Array != 'undefined') {
  glMatrixArrayType = Float32Array;
} else if(typeof WebGLFloatArray != 'undefined') {
  glMatrixArrayType = WebGLFloatArray; // This is officially deprecated and should dissapear in future revisions.
} else {
  glMatrixArrayType = Array;
}

/*
 * vec3 - 3 Dimensional Vector
 */
var vec3 = {};

/*
 * vec3.create
 * Creates a new instance of a vec3 using the default array type
 * Any javascript array containing at least 3 numeric elements can serve as a vec3
 *
 * Params:
 * vec - Optional, vec3 containing values to initialize with
 *
 * Returns:
 * New vec3
 */
vec3.create = function(vec) {
  var dest = new glMatrixArrayType(3);
  
  if(vec) {
    dest[0] = vec[0];
    dest[1] = vec[1];
    dest[2] = vec[2];
  }
  
  return dest;
};

/*
 * vec3.set
 * Copies the values of one vec3 to another
 *
 * Params:
 * vec - vec3 containing values to copy
 * dest - vec3 receiving copied values
 *
 * Returns:
 * dest
 */
vec3.set = function(vec, dest) {
  dest[0] = vec[0];
  dest[1] = vec[1];
  dest[2] = vec[2];
  
  return dest;
};

/*
 * vec3.add
 * Performs a vector addition
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.add = function(vec, vec2, dest) {
  if(!dest || vec == dest) {
    vec[0] += vec2[0];
    vec[1] += vec2[1];
    vec[2] += vec2[2];
    return vec;
  }
  
  dest[0] = vec[0] + vec2[0];
  dest[1] = vec[1] + vec2[1];
  dest[2] = vec[2] + vec2[2];
  return dest;
};

/*
 * vec3.subtract
 * Performs a vector subtraction
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.subtract = function(vec, vec2, dest) {
  if(!dest || vec == dest) {
    vec[0] -= vec2[0];
    vec[1] -= vec2[1];
    vec[2] -= vec2[2];
    return vec;
  }
  
  dest[0] = vec[0] - vec2[0];
  dest[1] = vec[1] - vec2[1];
  dest[2] = vec[2] - vec2[2];
  return dest;
};

/*
 * vec3.negate
 * Negates the components of a vec3
 *
 * Params:
 * vec - vec3 to negate
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.negate = function(vec, dest) {
  if(!dest) { dest = vec; }
  
  dest[0] = -vec[0];
  dest[1] = -vec[1];
  dest[2] = -vec[2];
  return dest;
};

/*
 * vec3.scale
 * Multiplies the components of a vec3 by a scalar value
 *
 * Params:
 * vec - vec3 to scale
 * val - Numeric value to scale by
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.scale = function(vec, val, dest) {
  if(!dest || vec == dest) {
    vec[0] *= val;
    vec[1] *= val;
    vec[2] *= val;
    return vec;
  }
  
  dest[0] = vec[0]*val;
  dest[1] = vec[1]*val;
  dest[2] = vec[2]*val;
  return dest;
};

/*
 * vec3.normalize
 * Generates a unit vector of the same direction as the provided vec3
 * If vector length is 0, returns [0, 0, 0]
 *
 * Params:
 * vec - vec3 to normalize
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.normalize = function(vec, dest) {
  if(!dest) { dest = vec; }
  
  var x = vec[0], y = vec[1], z = vec[2];
  var len = Math.sqrt(x*x + y*y + z*z);
  
  if (!len) {
    dest[0] = 0;
    dest[1] = 0;
    dest[2] = 0;
    return dest;
  } else if (len == 1) {
    dest[0] = x;
    dest[1] = y;
    dest[2] = z;
    return dest;
  }
  
  len = 1 / len;
  dest[0] = x*len;
  dest[1] = y*len;
  dest[2] = z*len;
  return dest;
};

/*
 * vec3.cross
 * Generates the cross product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.cross = function(vec, vec2, dest){
  if(!dest) { dest = vec; }
  
  var x = vec[0], y = vec[1], z = vec[2];
  var x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
  
  dest[0] = y*z2 - z*y2;
  dest[1] = z*x2 - x*z2;
  dest[2] = x*y2 - y*x2;
  return dest;
};

/*
 * vec3.length
 * Caclulates the length of a vec3
 *
 * Params:
 * vec - vec3 to calculate length of
 *
 * Returns:
 * Length of vec
 */
vec3.length = function(vec){
  var x = vec[0], y = vec[1], z = vec[2];
  return Math.sqrt(x*x + y*y + z*z);
};

/*
 * vec3.dot
 * Caclulates the dot product of two vec3s
 *
 * Params:
 * vec - vec3, first operand
 * vec2 - vec3, second operand
 *
 * Returns:
 * Dot product of vec and vec2
 */
vec3.dot = function(vec, vec2){
  return vec[0]*vec2[0] + vec[1]*vec2[1] + vec[2]*vec2[2];
};

/*
 * vec3.direction
 * Generates a unit vector pointing from one vector to another
 *
 * Params:
 * vec - origin vec3
 * vec2 - vec3 to point to
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.direction = function(vec, vec2, dest) {
  if(!dest) { dest = vec; }
  
  var x = vec[0] - vec2[0];
  var y = vec[1] - vec2[1];
  var z = vec[2] - vec2[2];
  
  var len = Math.sqrt(x*x + y*y + z*z);
  if (!len) { 
    dest[0] = 0; 
    dest[1] = 0; 
    dest[2] = 0;
    return dest; 
  }
  
  len = 1 / len;
  dest[0] = x * len; 
  dest[1] = y * len; 
  dest[2] = z * len;
  return dest; 
};

/*
 * vec3.lerp
 * Performs a linear interpolation between two vec3
 *
 * Params:
 * vec - vec3, first vector
 * vec2 - vec3, second vector
 * lerp - interpolation amount between the two inputs
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
vec3.lerp = function(vec, vec2, lerp, dest){
    if(!dest) { dest = vec; }
    
    dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
    dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
    dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);
    
    return dest;
}

/*
 * vec3.str
 * Returns a string representation of a vector
 *
 * Params:
 * vec - vec3 to represent as a string
 *
 * Returns:
 * string representation of vec
 */
vec3.str = function(vec) {
  return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']'; 
};

/*
 * mat3 - 3x3 Matrix
 */
var mat3 = {};

/*
 * mat3.create
 * Creates a new instance of a mat3 using the default array type
 * Any javascript array containing at least 9 numeric elements can serve as a mat3
 *
 * Params:
 * mat - Optional, mat3 containing values to initialize with
 *
 * Returns:
 * New mat3
 */
mat3.create = function(mat) {
  var dest = new glMatrixArrayType(9);
  
  if(mat) {
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    dest[8] = mat[8];
  }
  
  return dest;
};

/*
 * mat3.set
 * Copies the values of one mat3 to another
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - mat3 receiving copied values
 *
 * Returns:
 * dest
 */
mat3.set = function(mat, dest) {
  dest[0] = mat[0];
  dest[1] = mat[1];
  dest[2] = mat[2];
  dest[3] = mat[3];
  dest[4] = mat[4];
  dest[5] = mat[5];
  dest[6] = mat[6];
  dest[7] = mat[7];
  dest[8] = mat[8];
  return dest;
};

/*
 * mat3.identity
 * Sets a mat3 to an identity matrix
 *
 * Params:
 * dest - mat3 to set
 *
 * Returns:
 * dest
 */
mat3.identity = function(dest) {
  dest[0] = 1;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 1;
  dest[5] = 0;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 1;
  return dest;
};

/*
 * mat4.transpose
 * Transposes a mat3 (flips the values over the diagonal)
 *
 * Params:
 * mat - mat3 to transpose
 * dest - Optional, mat3 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat3.transpose = function(mat, dest) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if(!dest || mat == dest) { 
    var a01 = mat[1], a02 = mat[2];
    var a12 = mat[5];
    
        mat[1] = mat[3];
        mat[2] = mat[6];
        mat[3] = a01;
        mat[5] = mat[7];
        mat[6] = a02;
        mat[7] = a12;
    return mat;
  }
  
  dest[0] = mat[0];
  dest[1] = mat[3];
  dest[2] = mat[6];
  dest[3] = mat[1];
  dest[4] = mat[4];
  dest[5] = mat[7];
  dest[6] = mat[2];
  dest[7] = mat[5];
  dest[8] = mat[8];
  return dest;
};

/*
 * mat3.toMat4
 * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
 *
 * Params:
 * mat - mat3 containing values to copy
 * dest - Optional, mat4 receiving copied values
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat3.toMat4 = function(mat, dest) {
  if(!dest) { dest = mat4.create(); }
  
  dest[0] = mat[0];
  dest[1] = mat[1];
  dest[2] = mat[2];
  dest[3] = 0;

  dest[4] = mat[3];
  dest[5] = mat[4];
  dest[6] = mat[5];
  dest[7] = 0;

  dest[8] = mat[6];
  dest[9] = mat[7];
  dest[10] = mat[8];
  dest[11] = 0;

  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 0;
  dest[15] = 1;
  
  return dest;
}

/*
 * mat3.str
 * Returns a string representation of a mat3
 *
 * Params:
 * mat - mat3 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat3.str = function(mat) {
  return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + 
    ', ' + mat[3] + ', '+ mat[4] + ', ' + mat[5] + 
    ', ' + mat[6] + ', ' + mat[7] + ', '+ mat[8] + ']';
};

/*
 * mat4 - 4x4 Matrix
 */
var mat4 = {};

/*
 * mat4.create
 * Creates a new instance of a mat4 using the default array type
 * Any javascript array containing at least 16 numeric elements can serve as a mat4
 *
 * Params:
 * mat - Optional, mat4 containing values to initialize with
 *
 * Returns:
 * New mat4
 */
mat4.create = function(mat) {
  var dest = new glMatrixArrayType(16);
  
  if(mat) {
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    dest[8] = mat[8];
    dest[9] = mat[9];
    dest[10] = mat[10];
    dest[11] = mat[11];
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
  }
  
  return dest;
};

/*
 * mat4.set
 * Copies the values of one mat4 to another
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - mat4 receiving copied values
 *
 * Returns:
 * dest
 */
mat4.set = function(mat, dest) {
  dest[0] = mat[0];
  dest[1] = mat[1];
  dest[2] = mat[2];
  dest[3] = mat[3];
  dest[4] = mat[4];
  dest[5] = mat[5];
  dest[6] = mat[6];
  dest[7] = mat[7];
  dest[8] = mat[8];
  dest[9] = mat[9];
  dest[10] = mat[10];
  dest[11] = mat[11];
  dest[12] = mat[12];
  dest[13] = mat[13];
  dest[14] = mat[14];
  dest[15] = mat[15];
  return dest;
};

/*
 * mat4.identity
 * Sets a mat4 to an identity matrix
 *
 * Params:
 * dest - mat4 to set
 *
 * Returns:
 * dest
 */
mat4.identity = function(dest) {
  dest[0] = 1;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = 1;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 0;
  dest[9] = 0;
  dest[10] = 1;
  dest[11] = 0;
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 0;
  dest[15] = 1;
  return dest;
};

/*
 * mat4.transpose
 * Transposes a mat4 (flips the values over the diagonal)
 *
 * Params:
 * mat - mat4 to transpose
 * dest - Optional, mat4 receiving transposed values. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.transpose = function(mat, dest) {
  // If we are transposing ourselves we can skip a few steps but have to cache some values
  if(!dest || mat == dest) { 
    var a01 = mat[1], a02 = mat[2], a03 = mat[3];
    var a12 = mat[6], a13 = mat[7];
    var a23 = mat[11];
    
    mat[1] = mat[4];
    mat[2] = mat[8];
    mat[3] = mat[12];
    mat[4] = a01;
    mat[6] = mat[9];
    mat[7] = mat[13];
    mat[8] = a02;
    mat[9] = a12;
    mat[11] = mat[14];
    mat[12] = a03;
    mat[13] = a13;
    mat[14] = a23;
    return mat;
  }
  
  dest[0] = mat[0];
  dest[1] = mat[4];
  dest[2] = mat[8];
  dest[3] = mat[12];
  dest[4] = mat[1];
  dest[5] = mat[5];
  dest[6] = mat[9];
  dest[7] = mat[13];
  dest[8] = mat[2];
  dest[9] = mat[6];
  dest[10] = mat[10];
  dest[11] = mat[14];
  dest[12] = mat[3];
  dest[13] = mat[7];
  dest[14] = mat[11];
  dest[15] = mat[15];
  return dest;
};

/*
 * mat4.determinant
 * Calculates the determinant of a mat4
 *
 * Params:
 * mat - mat4 to calculate determinant of
 *
 * Returns:
 * determinant of mat
 */
mat4.determinant = function(mat) {
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];

  return  a30*a21*a12*a03 - a20*a31*a12*a03 - a30*a11*a22*a03 + a10*a31*a22*a03 +
      a20*a11*a32*a03 - a10*a21*a32*a03 - a30*a21*a02*a13 + a20*a31*a02*a13 +
      a30*a01*a22*a13 - a00*a31*a22*a13 - a20*a01*a32*a13 + a00*a21*a32*a13 +
      a30*a11*a02*a23 - a10*a31*a02*a23 - a30*a01*a12*a23 + a00*a31*a12*a23 +
      a10*a01*a32*a23 - a00*a11*a32*a23 - a20*a11*a02*a33 + a10*a21*a02*a33 +
      a20*a01*a12*a33 - a00*a21*a12*a33 - a10*a01*a22*a33 + a00*a11*a22*a33;
};

/*
 * mat4.inverse
 * Calculates the inverse matrix of a mat4
 *
 * Params:
 * mat - mat4 to calculate inverse of
 * dest - Optional, mat4 receiving inverse matrix. If not specified result is written to mat
 *
 * Returns:
 * dest is specified, mat otherwise
 */
mat4.inverse = function(mat, dest) {
  if(!dest) { dest = mat; }
  
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
  
  var b00 = a00*a11 - a01*a10;
  var b01 = a00*a12 - a02*a10;
  var b02 = a00*a13 - a03*a10;
  var b03 = a01*a12 - a02*a11;
  var b04 = a01*a13 - a03*a11;
  var b05 = a02*a13 - a03*a12;
  var b06 = a20*a31 - a21*a30;
  var b07 = a20*a32 - a22*a30;
  var b08 = a20*a33 - a23*a30;
  var b09 = a21*a32 - a22*a31;
  var b10 = a21*a33 - a23*a31;
  var b11 = a22*a33 - a23*a32;
  
  // Calculate the determinant (inlined to avoid double-caching)
  var invDet = 1/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);
  
  dest[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
  dest[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
  dest[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
  dest[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
  dest[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
  dest[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
  dest[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
  dest[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
  dest[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
  dest[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
  dest[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
  dest[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
  dest[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
  dest[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
  dest[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
  dest[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;
  
  return dest;
};

/*
 * mat4.toRotationMat
 * Copies the upper 3x3 elements of a mat4 into another mat4
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - Optional, mat4 receiving copied values
 *
 * Returns:
 * dest is specified, a new mat4 otherwise
 */
mat4.toRotationMat = function(mat, dest) {
  if(!dest) { dest = mat4.create(); }
  
  dest[0] = mat[0];
  dest[1] = mat[1];
  dest[2] = mat[2];
  dest[3] = mat[3];
  dest[4] = mat[4];
  dest[5] = mat[5];
  dest[6] = mat[6];
  dest[7] = mat[7];
  dest[8] = mat[8];
  dest[9] = mat[9];
  dest[10] = mat[10];
  dest[11] = mat[11];
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 0;
  dest[15] = 1;
  
  return dest;
};

/*
 * mat4.toMat3
 * Copies the upper 3x3 elements of a mat4 into a mat3
 *
 * Params:
 * mat - mat4 containing values to copy
 * dest - Optional, mat3 receiving copied values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toMat3 = function(mat, dest) {
  if(!dest) { dest = mat3.create(); }
  
  dest[0] = mat[0];
  dest[1] = mat[1];
  dest[2] = mat[2];
  dest[3] = mat[4];
  dest[4] = mat[5];
  dest[5] = mat[6];
  dest[6] = mat[8];
  dest[7] = mat[9];
  dest[8] = mat[10];
  
  return dest;
};

/*
 * mat4.toInverseMat3
 * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
 * The resulting matrix is useful for calculating transformed normals
 *
 * Params:
 * mat - mat4 containing values to invert and copy
 * dest - Optional, mat3 receiving values
 *
 * Returns:
 * dest is specified, a new mat3 otherwise
 */
mat4.toInverseMat3 = function(mat, dest) {
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10];
  
  var b01 = a22*a11-a12*a21;
  var b11 = -a22*a10+a12*a20;
  var b21 = a21*a10-a11*a20;
    
  var d = a00*b01 + a01*b11 + a02*b21;
  if (!d) { return null; }
  var id = 1/d;
  
  if(!dest) { dest = mat3.create(); }
  
  dest[0] = b01*id;
  dest[1] = (-a22*a01 + a02*a21)*id;
  dest[2] = (a12*a01 - a02*a11)*id;
  dest[3] = b11*id;
  dest[4] = (a22*a00 - a02*a20)*id;
  dest[5] = (-a12*a00 + a02*a10)*id;
  dest[6] = b21*id;
  dest[7] = (-a21*a00 + a01*a20)*id;
  dest[8] = (a11*a00 - a01*a10)*id;
  
  return dest;
};

/*
 * mat4.multiply
 * Performs a matrix multiplication
 *
 * Params:
 * mat - mat4, first operand
 * mat2 - mat4, second operand
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.multiply = function(mat, mat2, dest) {
  if(!dest) { dest = mat }
  
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  var a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
  
  var b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3];
  var b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7];
  var b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11];
  var b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
  
  dest[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
  dest[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
  dest[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
  dest[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
  dest[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
  dest[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
  dest[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
  dest[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
  dest[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
  dest[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
  dest[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
  dest[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
  dest[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
  dest[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
  dest[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
  dest[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
  
  return dest;
};

/*
 * mat4.multiplyVec3
 * Transforms a vec3 with the given matrix
 * 4th vector component is implicitly '1'
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec3 = function(mat, vec, dest) {
  if(!dest) { dest = vec }
  
  var x = vec[0], y = vec[1], z = vec[2];
  
  dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
  dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
  dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
  
  return dest;
};

/*
 * mat4.multiplyVec4
 * Transforms a vec4 with the given matrix
 *
 * Params:
 * mat - mat4 to transform the vector with
 * vec - vec4 to transform
 * dest - Optional, vec4 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
mat4.multiplyVec4 = function(mat, vec, dest) {
  if(!dest) { dest = vec }
  
  var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
  
  dest[0] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12]*w;
  dest[1] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13]*w;
  dest[2] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14]*w;
  dest[3] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15]*w;
  
  return dest;
};

/*
 * mat4.translate
 * Translates a matrix by the given vector
 *
 * Params:
 * mat - mat4 to translate
 * vec - vec3 specifying the translation
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.translate = function(mat, vec, dest) {
  var x = vec[0], y = vec[1], z = vec[2];
  
  if(!dest || mat == dest) {
    mat[12] = mat[0]*x + mat[4]*y + mat[8]*z + mat[12];
    mat[13] = mat[1]*x + mat[5]*y + mat[9]*z + mat[13];
    mat[14] = mat[2]*x + mat[6]*y + mat[10]*z + mat[14];
    mat[15] = mat[3]*x + mat[7]*y + mat[11]*z + mat[15];
    return mat;
  }
  
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  
  dest[0] = a00;
  dest[1] = a01;
  dest[2] = a02;
  dest[3] = a03;
  dest[4] = a10;
  dest[5] = a11;
  dest[6] = a12;
  dest[7] = a13;
  dest[8] = a20;
  dest[9] = a21;
  dest[10] = a22;
  dest[11] = a23;
  
  dest[12] = a00*x + a10*y + a20*z + mat[12];
  dest[13] = a01*x + a11*y + a21*z + mat[13];
  dest[14] = a02*x + a12*y + a22*z + mat[14];
  dest[15] = a03*x + a13*y + a23*z + mat[15];
  return dest;
};

/*
 * mat4.scale
 * Scales a matrix by the given vector
 *
 * Params:
 * mat - mat4 to scale
 * vec - vec3 specifying the scale for each axis
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.scale = function(mat, vec, dest) {
  var x = vec[0], y = vec[1], z = vec[2];
  
  if(!dest || mat == dest) {
    mat[0] *= x;
    mat[1] *= x;
    mat[2] *= x;
    mat[3] *= x;
    mat[4] *= y;
    mat[5] *= y;
    mat[6] *= y;
    mat[7] *= y;
    mat[8] *= z;
    mat[9] *= z;
    mat[10] *= z;
    mat[11] *= z;
    return mat;
  }
  
  dest[0] = mat[0]*x;
  dest[1] = mat[1]*x;
  dest[2] = mat[2]*x;
  dest[3] = mat[3]*x;
  dest[4] = mat[4]*y;
  dest[5] = mat[5]*y;
  dest[6] = mat[6]*y;
  dest[7] = mat[7]*y;
  dest[8] = mat[8]*z;
  dest[9] = mat[9]*z;
  dest[10] = mat[10]*z;
  dest[11] = mat[11]*z;
  dest[12] = mat[12];
  dest[13] = mat[13];
  dest[14] = mat[14];
  dest[15] = mat[15];
  return dest;
};

/*
 * mat4.rotate
 * Rotates a matrix by the given angle around the specified axis
 * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * axis - vec3 representing the axis to rotate around 
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotate = function(mat, angle, axis, dest) {
  var x = axis[0], y = axis[1], z = axis[2];
  var len = Math.sqrt(x*x + y*y + z*z);
  if (!len) { return null; }
  if (len != 1) {
    len = 1 / len;
    x *= len; 
    y *= len; 
    z *= len;
  }
  
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  var t = 1-c;
  
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  
  // Construct the elements of the rotation matrix
  var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
  var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
  var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
  
  if(!dest) { 
    dest = mat 
  } else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
  }
  
  // Perform rotation-specific matrix multiplication
  dest[0] = a00*b00 + a10*b01 + a20*b02;
  dest[1] = a01*b00 + a11*b01 + a21*b02;
  dest[2] = a02*b00 + a12*b01 + a22*b02;
  dest[3] = a03*b00 + a13*b01 + a23*b02;
  
  dest[4] = a00*b10 + a10*b11 + a20*b12;
  dest[5] = a01*b10 + a11*b11 + a21*b12;
  dest[6] = a02*b10 + a12*b11 + a22*b12;
  dest[7] = a03*b10 + a13*b11 + a23*b12;
  
  dest[8] = a00*b20 + a10*b21 + a20*b22;
  dest[9] = a01*b20 + a11*b21 + a21*b22;
  dest[10] = a02*b20 + a12*b21 + a22*b22;
  dest[11] = a03*b20 + a13*b21 + a23*b22;
  return dest;
};

/*
 * mat4.rotateX
 * Rotates a matrix by the given angle around the X axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateX = function(mat, angle, dest) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  
  // Cache the matrix values (makes for huge speed increases!)
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];

  if(!dest) { 
    dest = mat 
  } else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
    dest[0] = mat[0];
    dest[1] = mat[1];
    dest[2] = mat[2];
    dest[3] = mat[3];
    
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
  }
  
  // Perform axis-specific matrix multiplication
  dest[4] = a10*c + a20*s;
  dest[5] = a11*c + a21*s;
  dest[6] = a12*c + a22*s;
  dest[7] = a13*c + a23*s;
  
  dest[8] = a10*-s + a20*c;
  dest[9] = a11*-s + a21*c;
  dest[10] = a12*-s + a22*c;
  dest[11] = a13*-s + a23*c;
  return dest;
};

/*
 * mat4.rotateY
 * Rotates a matrix by the given angle around the Y axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateY = function(mat, angle, dest) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11];
  
  if(!dest) { 
    dest = mat 
  } else if(mat != dest) { // If the source and destination differ, copy the unchanged rows
    dest[4] = mat[4];
    dest[5] = mat[5];
    dest[6] = mat[6];
    dest[7] = mat[7];
    
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
  }
  
  // Perform axis-specific matrix multiplication
  dest[0] = a00*c + a20*-s;
  dest[1] = a01*c + a21*-s;
  dest[2] = a02*c + a22*-s;
  dest[3] = a03*c + a23*-s;
  
  dest[8] = a00*s + a20*c;
  dest[9] = a01*s + a21*c;
  dest[10] = a02*s + a22*c;
  dest[11] = a03*s + a23*c;
  return dest;
};

/*
 * mat4.rotateZ
 * Rotates a matrix by the given angle around the Z axis
 *
 * Params:
 * mat - mat4 to rotate
 * angle - angle (in radians) to rotate
 * dest - Optional, mat4 receiving operation result. If not specified result is written to mat
 *
 * Returns:
 * dest if specified, mat otherwise
 */
mat4.rotateZ = function(mat, angle, dest) {
  var s = Math.sin(angle);
  var c = Math.cos(angle);
  
  // Cache the matrix values (makes for huge speed increases!)
  var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3];
  var a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7];
  
  if(!dest) { 
    dest = mat 
  } else if(mat != dest) { // If the source and destination differ, copy the unchanged last row
    dest[8] = mat[8];
    dest[9] = mat[9];
    dest[10] = mat[10];
    dest[11] = mat[11];
    
    dest[12] = mat[12];
    dest[13] = mat[13];
    dest[14] = mat[14];
    dest[15] = mat[15];
  }
  
  // Perform axis-specific matrix multiplication
  dest[0] = a00*c + a10*s;
  dest[1] = a01*c + a11*s;
  dest[2] = a02*c + a12*s;
  dest[3] = a03*c + a13*s;
  
  dest[4] = a00*-s + a10*c;
  dest[5] = a01*-s + a11*c;
  dest[6] = a02*-s + a12*c;
  dest[7] = a03*-s + a13*c;
  
  return dest;
};

/*
 * mat4.frustum
 * Generates a frustum matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.frustum = function(left, right, bottom, top, near, far, dest) {
  if(!dest) { dest = mat4.create(); }
  var rl = (right - left);
  var tb = (top - bottom);
  var fn = (far - near);
  dest[0] = (near*2) / rl;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = (near*2) / tb;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = (right + left) / rl;
  dest[9] = (top + bottom) / tb;
  dest[10] = -(far + near) / fn;
  dest[11] = -1;
  dest[12] = 0;
  dest[13] = 0;
  dest[14] = -(far*near*2) / fn;
  dest[15] = 0;
  return dest;
};

/*
 * mat4.perspective
 * Generates a perspective projection matrix with the given bounds
 *
 * Params:
 * fovy - scalar, vertical field of view
 * aspect - scalar, aspect ratio. typically viewport width/height
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.perspective = function(fovy, aspect, near, far, dest) {
  var top = near*Math.tan(fovy*Math.PI / 360.0);
  var right = top*aspect;
  return mat4.frustum(-right, right, -top, top, near, far, dest);
};

/*
 * mat4.ortho
 * Generates a orthogonal projection matrix with the given bounds
 *
 * Params:
 * left, right - scalar, left and right bounds of the frustum
 * bottom, top - scalar, bottom and top bounds of the frustum
 * near, far - scalar, near and far bounds of the frustum
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.ortho = function(left, right, bottom, top, near, far, dest) {
  if(!dest) { dest = mat4.create(); }
  var rl = (right - left);
  var tb = (top - bottom);
  var fn = (far - near);
  dest[0] = 2 / rl;
  dest[1] = 0;
  dest[2] = 0;
  dest[3] = 0;
  dest[4] = 0;
  dest[5] = 2 / tb;
  dest[6] = 0;
  dest[7] = 0;
  dest[8] = 0;
  dest[9] = 0;
  dest[10] = -2 / fn;
  dest[11] = 0;
  dest[12] = -(left + right) / rl;
  dest[13] = -(top + bottom) / tb;
  dest[14] = -(far + near) / fn;
  dest[15] = 1;
  return dest;
};

/*
 * mat4.ortho
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * Params:
 * eye - vec3, position of the viewer
 * center - vec3, point the viewer is looking at
 * up - vec3 pointing "up"
 * dest - Optional, mat4 frustum matrix will be written into
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
mat4.lookAt = function(eye, center, up, dest) {
  if(!dest) { dest = mat4.create(); }
  
  var eyex = eye[0],
    eyey = eye[1],
    eyez = eye[2],
    upx = up[0],
    upy = up[1],
    upz = up[2],
    centerx = center[0],
    centery = center[1],
    centerz = center[2];

  if (eyex == centerx && eyey == centery && eyez == centerz) {
    return mat4.identity(dest);
  }
  
  var z0,z1,z2,x0,x1,x2,y0,y1,y2,len;
  
  //vec3.direction(eye, center, z);
  z0 = eyex - center[0];
  z1 = eyey - center[1];
  z2 = eyez - center[2];
  
  // normalize (no check needed for 0 because of early return)
  len = 1/Math.sqrt(z0*z0 + z1*z1 + z2*z2);
  z0 *= len;
  z1 *= len;
  z2 *= len;
  
  //vec3.normalize(vec3.cross(up, z, x));
  x0 = upy*z2 - upz*z1;
  x1 = upz*z0 - upx*z2;
  x2 = upx*z1 - upy*z0;
  len = Math.sqrt(x0*x0 + x1*x1 + x2*x2);
  if (!len) {
    x0 = 0;
    x1 = 0;
    x2 = 0;
  } else {
    len = 1/len;
    x0 *= len;
    x1 *= len;
    x2 *= len;
  };
  
  //vec3.normalize(vec3.cross(z, x, y));
  y0 = z1*x2 - z2*x1;
  y1 = z2*x0 - z0*x2;
  y2 = z0*x1 - z1*x0;
  
  len = Math.sqrt(y0*y0 + y1*y1 + y2*y2);
  if (!len) {
    y0 = 0;
    y1 = 0;
    y2 = 0;
  } else {
    len = 1/len;
    y0 *= len;
    y1 *= len;
    y2 *= len;
  }
  
  dest[0] = x0;
  dest[1] = y0;
  dest[2] = z0;
  dest[3] = 0;
  dest[4] = x1;
  dest[5] = y1;
  dest[6] = z1;
  dest[7] = 0;
  dest[8] = x2;
  dest[9] = y2;
  dest[10] = z2;
  dest[11] = 0;
  dest[12] = -(x0*eyex + x1*eyey + x2*eyez);
  dest[13] = -(y0*eyex + y1*eyey + y2*eyez);
  dest[14] = -(z0*eyex + z1*eyey + z2*eyez);
  dest[15] = 1;
  
  return dest;
};

/*
 * mat4.str
 * Returns a string representation of a mat4
 *
 * Params:
 * mat - mat4 to represent as a string
 *
 * Returns:
 * string representation of mat
 */
mat4.str = function(mat) {
  return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + 
    ', '+ mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + 
    ', '+ mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] + 
    ', '+ mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
};

/*
 * quat4 - Quaternions 
 */
quat4 = {};

/*
 * quat4.create
 * Creates a new instance of a quat4 using the default array type
 * Any javascript array containing at least 4 numeric elements can serve as a quat4
 *
 * Params:
 * quat - Optional, quat4 containing values to initialize with
 *
 * Returns:
 * New quat4
 */
quat4.create = function(quat) {
  var dest = new glMatrixArrayType(4);
  
  if(quat) {
    dest[0] = quat[0];
    dest[1] = quat[1];
    dest[2] = quat[2];
    dest[3] = quat[3];
  }
  
  return dest;
};

/*
 * quat4.set
 * Copies the values of one quat4 to another
 *
 * Params:
 * quat - quat4 containing values to copy
 * dest - quat4 receiving copied values
 *
 * Returns:
 * dest
 */
quat4.set = function(quat, dest) {
  dest[0] = quat[0];
  dest[1] = quat[1];
  dest[2] = quat[2];
  dest[3] = quat[3];
  
  return dest;
};

/*
 * quat4.calculateW
 * Calculates the W component of a quat4 from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length. 
 * Any existing W component will be ignored. 
 *
 * Params:
 * quat - quat4 to calculate W component of
 * dest - Optional, quat4 receiving calculated values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.calculateW = function(quat, dest) {
  var x = quat[0], y = quat[1], z = quat[2];

  if(!dest || quat == dest) {
    quat[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
    return quat;
  }
  dest[0] = x;
  dest[1] = y;
  dest[2] = z;
  dest[3] = -Math.sqrt(Math.abs(1.0 - x*x - y*y - z*z));
  return dest;
}

/*
 * quat4.inverse
 * Calculates the inverse of a quat4
 *
 * Params:
 * quat - quat4 to calculate inverse of
 * dest - Optional, quat4 receiving inverse values. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.inverse = function(quat, dest) {
  if(!dest || quat == dest) {
    quat[0] *= -1;
    quat[1] *= -1;
    quat[2] *= -1;
    return quat;
  }
  dest[0] = -quat[0];
  dest[1] = -quat[1];
  dest[2] = -quat[2];
  dest[3] = quat[3];
  return dest;
}

/*
 * quat4.length
 * Calculates the length of a quat4
 *
 * Params:
 * quat - quat4 to calculate length of
 *
 * Returns:
 * Length of quat
 */
quat4.length = function(quat) {
  var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
  return Math.sqrt(x*x + y*y + z*z + w*w);
}

/*
 * quat4.normalize
 * Generates a unit quaternion of the same direction as the provided quat4
 * If quaternion length is 0, returns [0, 0, 0, 0]
 *
 * Params:
 * quat - quat4 to normalize
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.normalize = function(quat, dest) {
  if(!dest) { dest = quat; }
  
  var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
  var len = Math.sqrt(x*x + y*y + z*z + w*w);
  if(len == 0) {
    dest[0] = 0;
    dest[1] = 0;
    dest[2] = 0;
    dest[3] = 0;
    return dest;
  }
  len = 1/len;
  dest[0] = x * len;
  dest[1] = y * len;
  dest[2] = z * len;
  dest[3] = w * len;
  
  return dest;
}

/*
 * quat4.multiply
 * Performs a quaternion multiplication
 *
 * Params:
 * quat - quat4, first operand
 * quat2 - quat4, second operand
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.multiply = function(quat, quat2, dest) {
  if(!dest) { dest = quat; }
  
  var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3];
  var qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
  
  dest[0] = qax*qbw + qaw*qbx + qay*qbz - qaz*qby;
  dest[1] = qay*qbw + qaw*qby + qaz*qbx - qax*qbz;
  dest[2] = qaz*qbw + qaw*qbz + qax*qby - qay*qbx;
  dest[3] = qaw*qbw - qax*qbx - qay*qby - qaz*qbz;
  
  return dest;
}

/*
 * quat4.multiplyVec3
 * Transforms a vec3 with the given quaternion
 *
 * Params:
 * quat - quat4 to transform the vector with
 * vec - vec3 to transform
 * dest - Optional, vec3 receiving operation result. If not specified result is written to vec
 *
 * Returns:
 * dest if specified, vec otherwise
 */
quat4.multiplyVec3 = function(quat, vec, dest) {
  if(!dest) { dest = vec; }
  
  var x = vec[0], y = vec[1], z = vec[2];
  var qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3];

  // calculate quat * vec
  var ix = qw*x + qy*z - qz*y;
  var iy = qw*y + qz*x - qx*z;
  var iz = qw*z + qx*y - qy*x;
  var iw = -qx*x - qy*y - qz*z;
  
  // calculate result * inverse quat
  dest[0] = ix*qw + iw*-qx + iy*-qz - iz*-qy;
  dest[1] = iy*qw + iw*-qy + iz*-qx - ix*-qz;
  dest[2] = iz*qw + iw*-qz + ix*-qy - iy*-qx;
  
  return dest;
}

/*
 * quat4.toMat3
 * Calculates a 3x3 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat3 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat3 otherwise
 */
quat4.toMat3 = function(quat, dest) {
  if(!dest) { dest = mat3.create(); }
  
  var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x*x2;
  var xy = x*y2;
  var xz = x*z2;

  var yy = y*y2;
  var yz = y*z2;
  var zz = z*z2;

  var wx = w*x2;
  var wy = w*y2;
  var wz = w*z2;

  dest[0] = 1 - (yy + zz);
  dest[1] = xy - wz;
  dest[2] = xz + wy;

  dest[3] = xy + wz;
  dest[4] = 1 - (xx + zz);
  dest[5] = yz - wx;

  dest[6] = xz - wy;
  dest[7] = yz + wx;
  dest[8] = 1 - (xx + yy);
  
  return dest;
}

/*
 * quat4.toMat4
 * Calculates a 4x4 matrix from the given quat4
 *
 * Params:
 * quat - quat4 to create matrix from
 * dest - Optional, mat4 receiving operation result
 *
 * Returns:
 * dest if specified, a new mat4 otherwise
 */
quat4.toMat4 = function(quat, dest) {
  if(!dest) { dest = mat4.create(); }
  
  var x = quat[0], y = quat[1], z = quat[2], w = quat[3];

  var x2 = x + x;
  var y2 = y + y;
  var z2 = z + z;

  var xx = x*x2;
  var xy = x*y2;
  var xz = x*z2;

  var yy = y*y2;
  var yz = y*z2;
  var zz = z*z2;

  var wx = w*x2;
  var wy = w*y2;
  var wz = w*z2;

  dest[0] = 1 - (yy + zz);
  dest[1] = xy - wz;
  dest[2] = xz + wy;
  dest[3] = 0;

  dest[4] = xy + wz;
  dest[5] = 1 - (xx + zz);
  dest[6] = yz - wx;
  dest[7] = 0;

  dest[8] = xz - wy;
  dest[9] = yz + wx;
  dest[10] = 1 - (xx + yy);
  dest[11] = 0;

  dest[12] = 0;
  dest[13] = 0;
  dest[14] = 0;
  dest[15] = 1;
  
  return dest;
}

/*
 * quat4.slerp
 * Performs a spherical linear interpolation between two quat4
 *
 * Params:
 * quat - quat4, first quaternion
 * quat2 - quat4, second quaternion
 * slerp - interpolation amount between the two inputs
 * dest - Optional, quat4 receiving operation result. If not specified result is written to quat
 *
 * Returns:
 * dest if specified, quat otherwise
 */
quat4.slerp = function(quat, quat2, slerp, dest) {
    if(!dest) { dest = quat; }
    
  var cosHalfTheta =  quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
  
  if (Math.abs(cosHalfTheta) >= 1.0){
      if(dest != quat) {
        dest[0] = quat[0];
        dest[1] = quat[1];
        dest[2] = quat[2];
        dest[3] = quat[3];
    }
    return dest;
  }
  
  var halfTheta = Math.acos(cosHalfTheta);
  var sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta*cosHalfTheta);

  if (Math.abs(sinHalfTheta) < 0.001){
    dest[0] = (quat[0]*0.5 + quat2[0]*0.5);
    dest[1] = (quat[1]*0.5 + quat2[1]*0.5);
    dest[2] = (quat[2]*0.5 + quat2[2]*0.5);
    dest[3] = (quat[3]*0.5 + quat2[3]*0.5);
    return dest;
  }
  
  var ratioA = Math.sin((1 - slerp)*halfTheta) / sinHalfTheta;
  var ratioB = Math.sin(slerp*halfTheta) / sinHalfTheta; 
  
  dest[0] = (quat[0]*ratioA + quat2[0]*ratioB);
  dest[1] = (quat[1]*ratioA + quat2[1]*ratioB);
  dest[2] = (quat[2]*ratioA + quat2[2]*ratioB);
  dest[3] = (quat[3]*ratioA + quat2[3]*ratioB);
  
  return dest;
}


/*
 * quat4.str
 * Returns a string representation of a quaternion
 *
 * Params:
 * quat - quat4 to represent as a string
 *
 * Returns:
 * string representation of quat
 */
quat4.str = function(quat) {
  return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']'; 
}


// Copyright 2014 Jetpac Inc
// All rights reserved.
// Pete Warden <pete@jetpac.com>
// Requires underscore, glMatrix
//
// To make initialization and calling easier, this library assumes some
// conventions in the way programs are laid out:
//
// - Transformation matrices are in uniforms called projection and modelView
// - There's a single vertex buffer attrib called vertexPosition

// The public API is:
//  new WebGL(pointWidth, pointHeight[, pixelScale])
//  createShaderProgram(name)
//  setUniforms(shaderName, uniforms)
//  createVertexBuffer(name, vertexValues, positionsPerVertex, texCoordsPerVertex) {
//  drawVertexBuffer(options)
//  createTextureFromUrl(name, url)
//  createTextureFromImage(name, image)
//  isTextureReady(textureName)
//  areAllTexturesReady()
//  setOneToOneProjection()
//  clearScreen()
//  enable(name)
//  disable(name)
//  blendFunc(arg0, arg1)

function WebGL(options) {

  var pointWidth = options.width;
  var pointHeight = options.height;

  var pixelScale = 1;
  if (typeof options.pixelScale === 'undefined') {
    var isRetina = ((typeof window.devicePixelRatio !== 'undefined') && (window.devicePixelRatio >= 2));
    pixelScale = isRetina ? 2.0 : 1.0;
  } else {
    pixelScale = options.pixelScale;
  }

  var canvas;
  if (typeof options.canvas !== 'undefined') {
    canvas = options.canvas;
  } else {
    var canvas = document.createElement('canvas');
  }

  var pixelWidth = (pointWidth * pixelScale);
  var pixelHeight = (pointHeight * pixelScale);

  canvas.width = pixelWidth;
  canvas.height = pixelHeight;

  canvas.style.width = pointWidth;
  canvas.style.height = pointHeight;

  var context;
  try {
    var contextOptions = {};
    if (typeof options.antialias !== 'undefined') {
      contextOptions.antialias = true;
    }
    context = canvas.getContext('experimental-webgl', contextOptions);
    if (typeof WebGLDebugUtils !== 'undefined') {
      function throwOnGLError(err, funcName, args) {
        throw WebGLDebugUtils.glEnumToString(err) + " was caused by call to: " + funcName;
      };
      context = WebGLDebugUtils.makeDebugContext(context, throwOnGLError);
    }
    context.viewportWidth = pixelWidth;
    context.viewportHeight = pixelHeight;
  } catch (e) {
    this.error = 'Exception in WebGL.createCanvas()' + e.message;
  }
  if (!context) {
    if (!this.error) {
      this.error = 'Unknown error initializing WebGL';
    }
  }

  this.canvas = canvas;
  this.pixelScale = pixelScale;
  this.pointWidth = pointWidth;
  this.pointHeight = pointHeight;
  this.programs = {};
  this.vertexBuffers = {};
  this.textures = {};
  this.gl = context;
  this.nameIndex = 0;

  // Used to be '_.bindAll(this)', see
  // https://github.com/jashkenas/underscore/commit/bf657be243a075b5e72acc8a83e6f12a564d8f55
  _.bindAll.apply(_, [this].concat(_.functions(this)))
};

WebGL.prototype = {
  createShaderProgram: function(vertexShaderText, fragmentShaderText) {
    var gl = this.gl;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.log('Vertex shader compilation failed - ' + gl.getShaderInfoLog(vertexShader));
      return null;
    }

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.log('Fragment shader compilation failed - ' + gl.getShaderInfoLog(fragmentShader));
      return null;
    }

    var name = this.uniqueName('shader');

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.log('Could not initialise shaders for ' + name);
    }

    this.programs[name] = shaderProgram;
    shaderProgram.attribLocations = {};
    shaderProgram.uniformLocations = {};

//    gl.useProgram(shaderProgram);

    return name;
  },
  
  setUniforms: function(shaderName, uniforms) {
    var gl = this.gl;
    if (typeof uniforms === 'undefined') {
      return;
    }
    _.each(uniforms, _.bind(function(values, uniformName) {
      this.setUniform(shaderName, uniformName, values);
    }, this));
  },

  createVertexBuffer: function(vertexValues, positionsPerVertex, texCoordsPerVertex) {
    var name = this.uniqueName('vertex buffer');
    var gl = this.gl;
    if (typeof this.vertexBuffers[name] !== 'undefined') {
      var buffer = this.vertexBuffers[name];
      gl.deleteBuffer(buffer);
    }
    if (typeof texCoordsPerVertex === 'undefined') {
      texCoordsPerVertex = 0;
    }
    var valuesPerVertex = (positionsPerVertex + texCoordsPerVertex);
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexValues), gl.STATIC_DRAW);
    buffer.valuesPerVertex = valuesPerVertex;
    buffer.positionsPerVertex = positionsPerVertex;
    buffer.texCoordsPerVertex = texCoordsPerVertex;
    buffer.vertexCount = Math.floor(vertexValues.length / valuesPerVertex);
    this.vertexBuffers[name] = buffer;
    return name;
  },

  drawVertexBuffer: function(options) {
    var gl = this.gl;
    var shaderName = options.shader;
    var vertexBufferName = options.vertexBuffer;
    var inputTextures = options.inputTextures || {};
    var uniforms = options.uniforms || {};
    var bufferParts = options.bufferParts;
    var mode = options.mode;
    var lineWidth = options.lineWidth;

    this.useShaderProgram(shaderName);
    this.setUniforms(shaderName, uniforms);
    var buffer = this.vertexBuffers[vertexBufferName];
    if (isGLError(buffer)) {
      console.log('Couldn\'t find vertex buffer "' + vertexBufferName + '"');
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    var textureUnitIndex = 0;
    _.each(inputTextures, _.bind(function(textureId, samplerName) {
      var texture = this.textures[textureId];
      gl.activeTexture(gl.TEXTURE0 + textureUnitIndex);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameterf(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      var samplerLocation = this.getUniformLocation(shaderName, samplerName);
      gl.uniform1i(samplerLocation, textureUnitIndex);
      textureUnitIndex += 1;
    }, this));

    var stride = (buffer.valuesPerVertex * 4);
    var vertexPositionLocation = this.getAttribLocation(shaderName, 'vertexPosition');
    var positionsPerVertex = buffer.positionsPerVertex;
    gl.vertexAttribPointer(vertexPositionLocation,
      positionsPerVertex,
      gl.FLOAT,
      false,
      stride,
      0);
    var texCoordsPerVertex = buffer.texCoordsPerVertex;
    if (texCoordsPerVertex > 0) {
      var texCoordsLocation = this.getAttribLocation(shaderName, 'texCoords');
      var texCoordsOffset = (positionsPerVertex * 4);
      gl.vertexAttribPointer(texCoordsLocation,
        texCoordsPerVertex,
        gl.FLOAT,
        false,
        stride,
        texCoordsOffset);
    }

    if (typeof bufferParts === 'undefined') {
      bufferParts = [{ startOffset: 0, vertexCount: buffer.vertexCount}];
    }
    if (typeof mode === 'undefined') {
      mode = 'TRIANGLE_STRIP';
    }
    if (typeof lineWidth !== 'undefined') {
      gl.lineWidth(lineWidth);
    }
    _.each(bufferParts, _.bind(function(part) {
      this.setUniforms(shaderName, part.uniforms);
      gl.drawArrays(gl[mode], part.startOffset, part.vertexCount);
    }, this));

//    this.stopUsingShaderProgram(shaderName);
  },

  createTextureFromUrl: function(name, url) {
    var gl = this.gl;
    var texture = gl.createTexture();
    texture.image = document.createElement('img');
    texture.isReady = false;
    this.textures[name] = texture;
    var loadInfo = {
      gl: gl,
      texture: texture
    };
    texture.image.onload = _.bind(function() {
      var gl = this.gl;
      var texture = this.texture;
      var image = texture.image;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.bindTexture(gl.TEXTURE_2D, null);
      texture.isReady = true;
    }, loadInfo);
    texture.image.src = url;
  },
  
  createTextureFromImage: function(name, image) {
    var gl = this.gl;
    var texture = gl.createTexture();
    this.textures[name] = texture;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.isReady = true;
  },

  createEmptyTexture: function(width, height, channels, bitDepth, debugInfo) {
    return this.createDataTexture(width, height, channels, bitDepth, null);
  },

  createDataTexture: function(width, height, channels, bitDepth, data, debugInfo) {
    if (_.isUndefined(data)) {
      data = null;
    }
    var namePrefix = 'texture';
    if (!_.isUndefined(debugInfo)) {
      namePrefix += ' ' + debugInfo;
    }
    var gl = this.gl;
    var name = this.uniqueName(namePrefix);
    var texture = gl.createTexture();
    this.textures[name] = texture;
    var dataType;
    var convertedData;
    if (_.isUndefined(bitDepth) || (bitDepth === 8)) {
      dataType = gl.UNSIGNED_BYTE;
      convertedData = data;
    } else if (bitDepth === 16) {
      var hasFloat = gl.getExtension('OES_texture_float');
      console.assert(hasFloat);
      dataType = gl.FLOAT;
      convertedData = new Float32Array(data);
    } else if (bitDepth === 32) {
      var hasFloat = gl.getExtension('OES_texture_float');
      console.assert(hasFloat);
      dataType = gl.FLOAT;
      convertedData = data;
    } else {
      console.assert(false, 'webgl.createDataTexture() - bad bit depth ' + bitDepth);
      return null;
    }
    var channelType;
    if (channels === 1) {
      channelType = gl.LUMINANCE;
    } else if (channels === 3) {
      channelType = gl.RGB;
    } else if (channels === 4) {
      channelType = gl.RGBA;
    } else {
      console.assert('false', 'Bad channel number ' + channels);
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.texImage2D(gl.TEXTURE_2D, 0, channelType, width, height, 0, channelType, dataType, convertedData);
    gl.bindTexture(gl.TEXTURE_2D, null);
    texture.isReady = true;
    texture.width = width;
    texture.height = height;
    texture.bitDepth = bitDepth;
    return name;
  },

  deleteTexture: function(name) {
    var gl = this.gl;
    var texture = this.textures[name];
    gl.deleteTexture(texture);
    delete this.textures[name];
  },

  isTextureReady: function(name) {
    var texture = this.textures[name];
    return texture.isReady;
  },

  areAllTexturesReady: function() {
    var result = true;
    _.each(this.textures, _.bind(function(texture, name) {
      if (!this.isTextureReady(name)) {
        result = false;
      }
    }, this));
    return result;
  },

  setOneToOneProjection: function() {
    var gl = this.gl;
    var width = gl.viewportWidth;
    var height = gl.viewportHeight;
    var halfWidth = (width / 2);
    var halfHeight = (height / 2);
    gl.viewport(0, 0, width, height);

    var pointWidth = this.pointWidth;
    var pointHeight = this.pointHeight;
    var projection = mat4.ortho(0, pointWidth, pointHeight, 0, -1.0, 1.0);
    var modelView = mat4.identity(mat4.create());
  
    _.each(this.programs, _.bind(function(program, name) {
      var projectionLocation = this.getUniformLocation(name, 'projection');
      if (!isGLError(projectionLocation)) {
        this.useShaderProgram(name);
        gl.uniformMatrix4fv(projectionLocation, false, projection);
        this.stopUsingShaderProgram(name);
      }
      var modelViewLocation = this.getUniformLocation(name, 'modelView');
      if (!isGLError(modelViewLocation)) {
        this.useShaderProgram(name);
        gl.uniformMatrix4fv(modelViewLocation, false, modelView);
        this.stopUsingShaderProgram(name);
      }
    }, this));
  },
  
  clearScreen: function(red, green, blue, alpha) {
    if (typeof red === 'undefined') {
      red = 0.0;
    }
    if (typeof green === 'undefined') {
      green = 0.0;
    }
    if (typeof blue === 'undefined') {
      blue = 0.0;
    }
    if (typeof alpha === 'undefined') {
      alpha = 0.0;
    }
    var gl = this.gl;
    gl.clearColor(red, green, blue, alpha);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  },
  
  enable: function(name) {
    var gl = this.gl;
    gl.enable(gl[name]);
  },
  
  disable: function(name) {
    var gl = this.gl;
    gl.disable(gl[name]);
  },

  blendFunc: function(arg0, arg1) {
    var gl = this.gl;
    gl.blendFunc(gl[arg0], gl[arg1]);
  },

  // Internal functions

  useTexture: function(shaderName, textureName) {
    var gl = this.gl;
    gl.activeTexture(gl.TEXTURE0);
    if (!this.isTextureReady(textureName)) {
      console.log('Attempting to render before texture "' + name + '" is loaded');
      gl.bindTexture(gl.TEXTURE_2D, null);
    } else {
      var texture = this.textures[textureName];
      if (isGLError(texture)) {
        console.log('Couldn\'t find texture "' + textureName + '"');
      }
      gl.bindTexture(gl.TEXTURE_2D, texture);
    }
    var textureSamplerLocation = this.getUniformLocation(shaderName, 'textureSampler');
    gl.uniform1i(textureSamplerLocation, 0);
  },

  getShader: function(id, type) {
    var gl = this.gl;
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
      return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
      if (k.nodeType == 3) {
        str += k.textContent;
      }
      k = k.nextSibling;
    }

    var shader = gl.createShader(type);
    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(shader));
      return null;
    }

    return shader;
  },

  useShaderProgram: function(name) {
    var gl = this.gl;
    var program = this.programs[name];
    gl.useProgram(program);

    var vertexPositionLocation = this.getAttribLocation(name, 'vertexPosition');
    gl.enableVertexAttribArray(vertexPositionLocation);
    
    var texCoordsLocation = this.getAttribLocation(name, 'texCoords');
    if (!isGLError(texCoordsLocation)) {
      gl.enableVertexAttribArray(texCoordsLocation);
    }
  },

  stopUsingShaderProgram: function(name) {
    var gl = this.gl;
    var vertexPositionLocation = this.getAttribLocation(name, 'vertexPosition');
    gl.disableVertexAttribArray(vertexPositionLocation);    
    var texCoordsLocation = this.getAttribLocation(name, 'texCoords');
    if (!isGLError(texCoordsLocation)) {
      gl.disableVertexAttribArray(texCoordsLocation);
    }
  },

  getAttribLocation: function(shaderName, attribName) {
    var gl = this.gl;
    var program = this.programs[shaderName];
    var attribLocations = program.attribLocations;
    if (typeof attribLocations[attribName] === 'undefined') {
      gl.useProgram(program);
      var attribLocation = gl.getAttribLocation(program, attribName);
      if (isGLError(attribLocation)) {
        console.log('Attrib "' + attribName + '" not found for program "' + shaderName + '"');
      }
      attribLocations[attribName] = attribLocation;
    }
    var result = attribLocations[attribName];
    return result;
  },

  getUniformLocation: function(shaderName, uniformName) {
    var gl = this.gl;
    var program = this.programs[shaderName];
    var uniformLocations = program.uniformLocations;
    if (typeof uniformLocations[uniformName] === 'undefined') {
      gl.useProgram(program);
      var uniformLocation = gl.getUniformLocation(program, uniformName);
      if (isGLError(uniformLocation)) {
        console.assert(false, 'Uniform "' + uniformName + '" not found for program "' + shaderName + '"');
      }
      uniformLocations[uniformName] = uniformLocation;
    }
    var result = uniformLocations[uniformName];
    return result;
  },

  setUniform: function(shaderName, uniformName, values) {
    var gl = this.gl;
    if (typeof values.length === 'undefined') {
      values = [values];
    }
    var uniformLocation = this.getUniformLocation(shaderName, uniformName);
    if (isGLError(uniformLocation)) {
      console.log('Couldn\'t find uniform "' + uniformName + '" for program "' + shaderName + '"');
      return;
    }
    this.useShaderProgram(shaderName);
    var functionName = 'uniform' + values.length + 'fv';
    gl[functionName](uniformLocation, values);
  },

  uniqueName: function(prefix) {
    if (_.isUndefined(prefix)) {
      prefix = 'gl object';
    }
    var name = prefix + ' ' + this.nameIndex;
    this.nameIndex += 1;
    return name;
  },

  renderIntoTexture: function(textureName) {
    console.assert(!_.isUndefined(textureName));
    var gl = this.gl;
    var texture = this.textures[textureName];
    var framebuffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE) {
        throw new Error("gl.checkFramebufferStatus(gl.FRAMEBUFFER) != gl.FRAMEBUFFER_COMPLETE");
    }
    var textureWidth = texture.width;
    var textureHeight = texture.height;
    gl.viewportWidth = textureWidth;
    gl.viewportHeight = textureHeight;
    this.pixelScale = 1.0;
    this.pointWidth = textureWidth;
    this.pointHeight = textureHeight;
    this.setOneToOneProjection();
  },

  readRenderedData: function() {
    var gl = this.gl;
    var pixels = new Uint8Array(gl.viewportWidth * gl.viewportHeight * 4);
    gl.readPixels(0, 0, gl.viewportWidth, gl.viewportHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return pixels;
  }
};

function GPUCalculator(options) {
  options = options || {};
  this.webgl = new WebGL({
    width: 1,
    height: 1
  });
  this.shadersByText = {};
  this.vertexBuffersBySize = {};
  this.framebufferTexturesBySizeAndDepth = {};
}
GPUCalculator.prototype = {

  applyShader: function(options) {
    var webgl = this.webgl;
    var gl = webgl.gl;

    var fragmentShaderText = options.shaderText;
    var width = options.width;
    var height = options.height;
    var inputBuffers = options.inputBuffers || [];
    var bitDepth = options.bitDepth || 32;
    var uniforms = options.uniforms || {};

    if (_.isUndefined(this.shadersByText[fragmentShaderText])) {
      var passthruVertexShader = '' +
        '  precision mediump float;\n' +
        '  uniform mat4 modelView;\n' +
        '  uniform mat4 projection;\n' +
        '  attribute vec2 vertexPosition;\n' +
        '  attribute vec2 texCoords;\n' +
        '  varying vec2 outTexCoord;\n' +
        '  void main(void) {\n' +
        '    gl_Position = projection * modelView * vec4(vertexPosition, 0.0, 1.0);\n' +
        '    outTexCoord = texCoords;\n' +
        '  }\n';

      var shaderProgram = webgl.createShaderProgram(passthruVertexShader, fragmentShaderText);
      this.shadersByText[fragmentShaderText] = shaderProgram;
    }
    var shaderProgram = this.shadersByText[fragmentShaderText];

    var sizeKey = width + 'x' + height;
    if (_.isUndefined(this.vertexBuffersBySize[sizeKey])) {
      var viewBottom = 0;
      var viewTop = height;
      var viewLeft = 0;
      var viewRight = width;

      var vertices = [
        viewRight,  viewBottom,   viewRight,  viewBottom,
        viewLeft,   viewBottom,   viewLeft,   viewBottom,
        viewRight,  viewTop,      viewRight,  viewTop,
        viewLeft,   viewTop,      viewLeft,   viewTop
      ];
      var vertexBuffer = webgl.createVertexBuffer(vertices, 2, 2);
      this.vertexBuffersBySize[sizeKey] = vertexBuffer;
    }
    var vertexBuffer = this.vertexBuffersBySize[sizeKey];

    var framebufferTexture = webgl.createEmptyTexture(width, height, 4, bitDepth);

    _.each(inputBuffers, _.bind(function(textureId, samplerName) {
      var webgl = this.webgl;
      var texture = webgl.textures[textureId];
      var textureScaleX = (1.0 / texture.width);
      var textureScaleY = (1.0 / texture.height);
      var scaleName = samplerName + 'Scale';
      var offsetName = samplerName + 'Offset';
      uniforms[scaleName] = [textureScaleX, textureScaleY];
    }, this));

    webgl.renderIntoTexture(framebufferTexture);
    webgl.setOneToOneProjection();
    webgl.disable('BLEND');

    webgl.drawVertexBuffer({
      shader: shaderProgram,
      vertexBuffer: vertexBuffer,
      uniforms: uniforms,
      inputTextures: inputBuffers
    });

    return framebufferTexture;
  },

  getResult: function(output, channels) {
    if (_.isUndefined(channels)) {
      channels = 4;
    }

    var webgl = this.webgl;
    var outputTexture = webgl.textures[output];

    var encodedOutput;
    if (channels == 4) {
      var encode4xShaderText = '\n' +
        'precision mediump float;\n' +
        'float shiftRight(float v, float amt) {\n' +
        '  v = floor(v) + 0.5;\n' +
        '  return floor(v / exp2(amt));\n' +
        '}\n' +
        'float shiftLeft(float v, float amt) {\n' +
        '  return floor(v * exp2(amt) + 0.5);\n' +
        '}\n' +
        '\n' +
        'float maskLast(float v, float bits) {\n' +
        '  return mod(v, shiftLeft(1.0, bits));\n' +
        '}\n' +
        'float extractBits(float num, float from, float to) {\n' +
        '  from = floor(from + 0.5);\n' +
        '  to = floor(to + 0.5);\n' +
        '  return maskLast(shiftRight(num, from), to - from);\n' +
        '}\n' +
        'vec4 encodeFloat(float val) {\n' +
        '  if (val == 0.0)\n' +
        '    return vec4(0, 0, 0, 0);\n' +
        '  float sign = val > 0.0 ? 0.0 : 1.0;\n' +
        '  val = abs(val);\n' +
        '  float exponent = floor(log2(val));\n' +
        '  float biased_exponent = exponent + 127.0;\n' +
        '  float fraction = ((val / exp2(exponent)) - 1.0) * 8388608.0;\n' +
        '  \n' +
        '  float t = biased_exponent / 2.0;\n' +
        '  float last_bit_of_biased_exponent = fract(t) * 2.0;\n' +
        '  float remaining_bits_of_biased_exponent = floor(t);\n' +
        '  \n' +
        '  float byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;\n' +
        '  float byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;\n' +
        '  float byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;\n' +
        '  float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;\n' +
        '  return vec4(byte4, byte3, byte2, byte1);\n' +
        '}\n' +
        '\n' +
        'uniform sampler2D input0;\n' +
        'uniform vec2 input0Scale;\n' +
        'uniform vec2 input0Offset;\n' +
        'varying vec2 outTexCoord;\n' +
        '\n' +
        'void main(void) {\n' +
        '  vec2 originalCoord0 = outTexCoord;\n' +
        '  float component = floor(mod(originalCoord0.x, 4.0));\n' +
        '  vec2 texCoord0 = (originalCoord0 + input0Offset);\n' +
        '  texCoord0 *= input0Scale;\n' +
        '  texCoord0 *= vec2(0.25, 1.0);\n' +
        '  vec4 inputColor = texture2D(input0, texCoord0);\n' +
        '  float inputChannel;\n' +
        '  if (component < 1.0) {\n' +
        '    inputChannel = inputColor.r;\n' +
        '  } else if (component < 2.0) {\n' +
        '    inputChannel = inputColor.g;\n' +
        '  } else if (component < 3.0) {\n' +
        '    inputChannel = inputColor.b;\n' +
        '  } else {\n' +
        '    inputChannel = inputColor.a;\n' +
        '  }\n' +
        '  gl_FragColor = encodeFloat(inputChannel);\n' +
        '}\n';

      encodedOutput = this.applyShader({
        shaderText: encode4xShaderText,
        inputBuffers: { input0: output },
        uniforms: {},
        width: (outputTexture.width * 4),
        height: outputTexture.height
      });

    } else if (channels === 1) {
      var encode1xShaderText = '\n' +
        'precision mediump float;\n' +
        'float shiftRight(float v, float amt) {\n' +
        '  v = floor(v) + 0.5;\n' +
        '  return floor(v / exp2(amt));\n' +
        '}\n' +
        'float shiftLeft(float v, float amt) {\n' +
        '  return floor(v * exp2(amt) + 0.5);\n' +
        '}\n' +
        '\n' +
        'float maskLast(float v, float bits) {\n' +
        '  return mod(v, shiftLeft(1.0, bits));\n' +
        '}\n' +
        'float extractBits(float num, float from, float to) {\n' +
        '  from = floor(from + 0.5);\n' +
        '  to = floor(to + 0.5);\n' +
        '  return maskLast(shiftRight(num, from), to - from);\n' +
        '}\n' +
        'vec4 encodeFloat(float val) {\n' +
        '  if (val == 0.0)\n' +
        '    return vec4(0, 0, 0, 0);\n' +
        '  float sign = val > 0.0 ? 0.0 : 1.0;\n' +
        '  val = abs(val);\n' +
        '  float exponent = floor(log2(val));\n' +
        '  float biased_exponent = exponent + 127.0;\n' +
        '  float fraction = ((val / exp2(exponent)) - 1.0) * 8388608.0;\n' +
        '  \n' +
        '  float t = biased_exponent / 2.0;\n' +
        '  float last_bit_of_biased_exponent = fract(t) * 2.0;\n' +
        '  float remaining_bits_of_biased_exponent = floor(t);\n' +
        '  \n' +
        '  float byte4 = extractBits(fraction, 0.0, 8.0) / 255.0;\n' +
        '  float byte3 = extractBits(fraction, 8.0, 16.0) / 255.0;\n' +
        '  float byte2 = (last_bit_of_biased_exponent * 128.0 + extractBits(fraction, 16.0, 23.0)) / 255.0;\n' +
        '  float byte1 = (sign * 128.0 + remaining_bits_of_biased_exponent) / 255.0;\n' +
        '  return vec4(byte4, byte3, byte2, byte1);\n' +
        '}\n' +
        '\n' +
        'uniform sampler2D input0;\n' +
        'uniform vec2 input0Scale;\n' +
        'uniform vec2 input0Offset;\n' +
        'varying vec2 outTexCoord;\n' +
        '\n' +
        'void main(void) {\n' +
        '  vec2 texCoord0 = (outTexCoord * input0Scale);\n' +
        '  vec4 inputColor = texture2D(input0, texCoord0);\n' +
        '  gl_FragColor = encodeFloat(inputColor.r);\n' +
        '}\n';

      encodedOutput = this.applyShader({
        shaderText: encode1xShaderText,
        inputBuffers: { input0: output },
        uniforms: {},
        width: outputTexture.width,
        height: outputTexture.height
      });

    } else {
      console.assert(false, 'Bad number of channels ' + channels);
    }

    var byteData = webgl.readRenderedData();
    var floatData = new Float32Array(byteData.buffer);

    webgl.deleteTexture(encodedOutput);

    return floatData;
  },

  createBuffer: function(options) {
    var width = options.width;
    var height = options.height;
    var channels = options.channels || 4;
    var bitDepth = options.bitDepth || 32;
    var data = options.data || null;
    var debugInfo = options.debugInfo;
    var webgl = this.webgl;
    var texture = webgl.createDataTexture(width, height, channels, bitDepth, data, debugInfo);
    return texture;
  },

  deleteBuffer: function(output) {
    var webgl = this.webgl;
    webgl.deleteTexture(output);
  }
};

function isGLError(value) {
  return ((value === -1) || (value === null) || (value === 'undefined'));
}

if ( !window.requestAnimationFrame ) {
  window.requestAnimationFrame = ( function() {
    return window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback, element) {
      window.setTimeout( callback, 1000 / 60 );
    };
  } )();
}

// Copyright 2014 Jetpac Inc
// All rights reserved.
// Pete Warden <pete@jetpac.com>

/**
 * @constructor
 */
Dimensions = function(input) {
  if (input instanceof Array) {
    this._dims = _.clone(input);
  } else if (input instanceof Dimensions) {
    this._dims = _.clone(input._dims);
  } else {
    var argsAsArray = Array.prototype.slice.call(arguments, 0);
    this._dims = _.clone(argsAsArray);
  }

  // See http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  _.each(this._dims, function(dim) {
    if (!isNumber(dim)) {
      throw "Unknown input type to Dimensions() - " + input;
    }
  });
};
window['Dimensions'] = Dimensions;
Dimensions.prototype.elementCount = function() {
  var result = 1;
  for (var index = 0; index < this._dims.length; index += 1) {
    result *= this._dims[index];
  }
  return result;
};
Dimensions.prototype.offset = function(indices) {
  if (!(indices instanceof Array)) {
    var argsAsArray = Array.prototype.slice.call(arguments, 0);
    indices = argsAsArray;
  }
  var reverseIndices = _.clone(indices).reverse();
  var reverseDims = _.clone(this._dims).reverse();
  var size = 1;
  var total = 0;
  _.each(reverseDims, function(dim, loopIndex) {
    var index = reverseIndices[loopIndex];
    total += (index * size);
    size *= dim;
  });
  return total;
};
Dimensions.prototype.toString = function() {
  return '(' + this._dims.join(', ') + ')';
};
Dimensions.prototype.removeDimensions = function(howMany) {
  return new Dimensions(this._dims.slice(howMany));
};
Dimensions.prototype.areEqualTo = function(other) {
  if (this._dims.length != other._dims.length) {
    return false;
  }
  for (var index = 0; index < this._dims.length; index += 1) {
    if (this._dims[index] != other._dims[index]) {
      return false;
    }
  }
  return true;
}

/**
 * @constructor
 */
Buffer = function(dims, data, options) {
  if (_.isUndefined(options)) {
    options = {
      bitsPerFloat: 32,
      min: 0,
      max: 0
    };
  }
  var bitsPerFloat = options.bitsPerFloat;
  var min = options.min;
  var max = options.max;

  this._dims = new Dimensions(dims);
  this._bitsPerFloat = bitsPerFloat;
  this._min = min;
  this._max = max;

  var intRange = (1 << bitsPerFloat);
  var spread = ((max - min) / intRange);
  this._spread = spread;

  if (_.isUndefined(data)) {
    var elementCount = this._dims.elementCount();
    if (bitsPerFloat === 32) {
      this._data = new Float32Array(elementCount);
    } else if (bitsPerFloat === 16) {
      this._quantizedData = new Uint16Array(elementCount);
    } else if (bitsPerFloat === 8) {
      this._quantizedData = new Uint8Array(elementCount);
    } else {
      console.log('Bad bitsPerFloat ' + bitsPerFloat);
    }
   } else {
    if (bitsPerFloat === 32) {
      this._data = data;
    } else if (bitsPerFloat === 16) {
      this._quantizedData = new Uint16Array(data);
    } else if (bitsPerFloat === 8) {
      this._quantizedData = new Uint8Array(data);
    } else {
      console.log('Bad bitsPerFloat ' + bitsPerFloat);
    }
  }
  this._name = 'None';
  this._tensor = null;
  this._Ttensor = null;
};
window['Buffer'] = Buffer;
Buffer.prototype.canReshapeTo = function(newDims) {
  // TO DO
};
Buffer.prototype.reshape = function(newDims) {
  console.assert((newDims.elementCount() === this._dims.elementCount()), 'reshape() must have the same number of elements');
  this._dims = newDims;
  return this;
};
Buffer.prototype.copyDataFrom = function(other) {
  // TO DO
};
Buffer.prototype.convertFromChannelMajor = function(expectedDims) {
  // TO DO
};
Buffer.prototype.populateWithRandomValues = function(min, max) {
  // TO DO
};
Buffer.prototype.view = function() {
  var result;
  if (this._bitsPerFloat === 32) {
    result = new Buffer(this._dims, this._data);
  } else {
    result = new Buffer(this._dims, this._quantizedData, {
      bitsPerFloat: this._bitsPerFloat,
      min: this._min,
      max: this._max});
  }
  result.setName(this._name + ' view');
  return result;
};
Buffer.prototype.toString = function() {
  return 'Buffer "' + this._name + '" ' + this._dims;
};
Buffer.prototype.printContents = function(maxElements) {
  // TO DO
};
Buffer.prototype.showDebugImage = function() {
  var dims = this._dims._dims;
  if (dims.length == 3) {
    var width = dims[1];
    var height = dims[0];
    var channels = dims[2];
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    for (var y = 0; y < height; y += 1) {
      for (var x = 0; x < width; x += 1) {
        var pixelColors = [0, 0, 0, 1];
        for (var channel = 0; channel < channels; channel += 1) {
          var value = Math.floor(this.valueAt(imageCount, y, x, channel));
          pixelColors[channel] = value;
        }
        var color = 'rgba(' + pixelColors.join(',') + ')';
        context.fillStyle = color;
        context.fillStyle = 'rgba(' + pixelColors.join(',') + ')';
        context.fillRect(x, y, 1, 1);
      }
    }
    var dataURL = canvas.toDataURL('image/png');
    console.log(dataURL);
    document.write('<img src="' + dataURL + '"/><br/>');
    window.open(dataURL, '_blank');
  } else if (dims.length == 4) {
    var imageCount = dims[0];
    for (var imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
      var width = dims[2];
      var height = dims[1];
      var channels = dims[3];
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext("2d");
      for (var y = 0; y < height; y += 1) {
        for (var x = 0; x < width; x += 1) {
          var pixelColors = [0, 0, 0, 1];
          for (var channel = 0; channel < channels; channel += 1) {
            var value = Math.floor(this.valueAt(imageIndex, y, x, channel));
            pixelColors[channel] = value;
          }
          var color = 'rgba(' + pixelColors.join(',') + ')';
          context.fillStyle = color;
          context.fillRect(x, y, 1, 1);
        }
      }
      var dataURL = canvas.toDataURL("image/png");
      console.log(dataURL);
      document.write('<img src="' + dataURL + '"/><br/>');
      window.open(dataURL, '_blank');
    }
  } else {
    console.log('Unknown image size');
  }
};
Buffer.prototype.setName = function(name) {
  this._name = name;
};
Buffer.prototype.areAllClose = function(b, tolerance) {
  if (_.isUndefined(tolerance)) {
    tolerance = 0.000001;
  }
  var a = this;
  if (!a) {
    console.log('Buffer a is empty or undefined');
    return false;
  }

  if (!b) {
    console.log('Buffer b is empty or undefined');
    return false;
  }

  if (a._dims._dims.length != b._dims._dims.length) {
    console.log('Buffers have different numbers of dimensions - ' + a + ' vs ' + b);
    return false;
  }

  if (!a._dims.areEqualTo(b._dims)) {
    console.log('Buffers are different sizes - ' + a + ' vs ' + b);
    return false;
  }

  if (a._data.length !== a._dims.elementCount()) {
    console.log('The length of a\'s data buffer doesn\'t match the required number of elements - a._data.length = ' + a._data.length + ', a._dims.elementCount() = ' + a._dims.elementCount() );
    return false;
  }

  if (b._data.length !== b._dims.elementCount()) {
    console.log('The length of b\'s data buffer doesn\'t match the required number of elements - b._data.length = ' + b._data.length + ', b._dims.elementCount() = ' + b._dims.elementCount() );
    return false;
  }

  var differentCount = 0.0;
  var totalDelta = 0.0;
  var aData = a._data;
  var bData = b._data;
  var offset = 0;
  var aNaNCount = 0;
  var elementCount = a._dims.elementCount();
  while (offset < elementCount) {
    var aValue = aData[offset];
    if (isNaN(aValue)) {
      aNaNCount += 1;
    }
    var bValue = bData[offset];
    if (isNaN(bValue)) {
      bNaNCount += 1;
    }
    var delta = (aValue - bValue);
    var absDelta = Math.abs(delta);
    if (absDelta > tolerance) {
      differentCount += 1;
    }
    totalDelta += absDelta;
    offset += 1;
  }

  var differentPercentage = (100 * (differentCount / elementCount));
  var meanDelta = (totalDelta / elementCount);
  console.log('Buffers contained ' +
  differentPercentage + '% different values' +
  ' (' + differentCount + ')' +
  ' mean delta = ' + meanDelta +
  ' ' + a + ' vs' +
  ' ' + b);
  if (differentCount > 0) {
    return false;
  }

  return true;
};
Buffer.prototype.extractSubregion = function(originY, originX, size) {
  var inputDims = this._dims._dims;

  var inputWidth = inputDims[1];
  var inputChannels = inputDims[2];

  var regionWidth = size._dims[1];
  var regionChannels = size._dims[2];

  var output;
  if (this._bitsPerFloat === 32) {
    output = new Buffer(size);
  } else {
    output = new Buffer(size, undefined, {
      bitsPerFloat: this._bitsPerFloat,
      min: this._min,
      max: this._max});
  }
  output._name = this._name + ' subregion';

  var elementsPerInputRow = (inputWidth * inputChannels);
  var elementsPerRegionRow = (regionWidth * regionChannels);

  var inputData;
  var regionData;
  if (this._bitsPerFloat === 32) {
    inputData = this._data;
    regionData = output._data;
  } else {
    inputData = this._quantizedData;
    regionData = output._quantizedData;
  }
  var inputOffset = this._dims.offset(originY, originX, 0);
  var regionOffset = 0;
  var elementCount = size.elementCount();
  while (regionOffset < elementCount) {
    var inputRow = inputData.subarray(inputOffset, (inputOffset + elementsPerRegionRow));
    var regionRow = regionData.subarray(regionOffset, (regionOffset + elementsPerRegionRow));
    regionRow.set(inputRow);
    inputOffset += elementsPerInputRow;
    regionOffset += elementsPerRegionRow;
  }

  return output;
};
Buffer.prototype.valueAt = function() {
  var argsAsArray = Array.prototype.slice.call(arguments, 0);
  var elementOffset = this._dims.offset(argsAsArray);
  return this._data[elementOffset];
};
Buffer.prototype.viewAtTopIndex = function(index) {
  var inputDims = this._dims;
  console.assert(inputDims._dims.length > 1);
  console.assert(index < inputDims._dims[0]);
  var outputDims = inputDims.removeDimensions(1);
  var topStride = outputDims.elementCount();
  var viewData = this._data.subarray((topStride * index), (topStride * (index + 1)));
  var output = new Buffer(outputDims, viewData);
  return output;
};
// get weblas data from GPU memory (not cheap)
Buffer.prototype.getTensorData = function(){

    var result = this._tensor.transfer();

    this._tensor = null;

    return result;
};
function bufferFromTagDict(tagDict, useWebGL, transpose) {
  console.assert(tagDict.type === JP_DICT);
  var bitsPerFloat = tagDict.getUintFromDict('float_bits');
  console.assert((bitsPerFloat === 32) || (bitsPerFloat === 16) || (bitsPerFloat === 8));
  var dimsTag = tagDict.getTagFromDict('dims');
  var dimsSubTags = dimsTag.getSubTags();
  var dimsValues = [];
  _.each(dimsSubTags, function(subTag) {
    console.assert(subTag.type === JP_UINT);
    dimsValues.push(subTag.value);
  });
  var dims = new Dimensions(dimsValues);
  var elementCount = dims.elementCount();

  if (bitsPerFloat === 32) {
    var dataTag = tagDict.getTagFromDict("data");
    console.assert(dataTag.type === JP_FARY);
    console.assert(dataTag.length === (elementCount * 4));

    var dataTagArray = dataTag.value;
    var buffer = new Buffer(dims, dataTagArray);
  } else if ((bitsPerFloat === 16) || (bitsPerFloat == 8)) {
    var dataTag = tagDict.getTagFromDict("quantized_data");
    console.assert(dataTag.type === JP_BLOB);
    var bytesPerElement = (bitsPerFloat / 8);
    var expectedByteCount = (Math.floor(((elementCount * bytesPerElement) + 3) / 4) * 4);
    console.assert(dataTag.length === expectedByteCount);

    var min = tagDict.getFloatFromDict('min');
    var max = tagDict.getFloatFromDict('max');

    var buffer = new Buffer(dims, dataTag.value, {bitsPerFloat: bitsPerFloat, min: min, max: max});

    if (useWebGL) {
    // preload a texture into GPU memory
    // this is cheating just a tiny bit, without this step the first image
    // would take about 3 seconds to classify

      var texels1,
          M = dims._dims[0], N = dims._dims[1];

        texels1 = new Float32Array(buffer._quantizedData);

        var tB = new weblas.pipeline.Tensor([M, N], texels1);

        var tOut = weblas.pipeline.sscal(buffer._spread, buffer._min, tB);
        tB.delete();

      if(transpose){
          buffer._Ttensor = tOut.transpose();
      } else {
          buffer._tensor = tOut;
      }
    }
  }
  return buffer;
}
// Warning - only use this function for debugging, since it's synchronous
function bufferFromFileAtURL(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  var isDone = false;
  xhr.onload = function(e) {
    isDone = true;
    console.log('loaded');
  };
  xhr.onerror = function(e) {
    alert("Error " + e.target.status + " occurred while receiving the document.");
    isDone = true;
  };
  xhr.send();
  // Here be dragons! Faking a synchronous XHR call, since we need the
  // responseType, and that's not supported with modern sync requests.
  while (!isDone) {
    // The flag for this should be set in the callbacks.
  }
  var tag = tagFromMemory(xhr.response, 0);
  var buffer = bufferFromTagDict(tag, false);
  buffer.setName(url);
  return buffer;
}

function delayedBufferFromFileAtURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function(e) {
    var tag = tagFromMemory(xhr.response, 0);
    var buffer = bufferFromTagDict(tag, false);
    buffer.setName(url);
    callback(buffer)
  };
  xhr.onerror = function(e) {
    alert("Error " + e.target.status + " occurred while receiving the document.");
  };
  xhr.send();
}


/**
 * @constructor
 */
Network = function(filename, onLoad, options) {
  if (_.isUndefined(options)) {
    options = {};
  }
  this._isLoaded = false;
  this._isHomebrewed = true;
  this._fileTag = null;
  //this._testResults = true;
  //this._runOnlyLayer = 20;
  //this._doProfile = true;
  this._onLoad = onLoad;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', filename, true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function (myThis) {
    var myNetwork = myThis;
    return function(e) {
      if (this.status == 200) {
        myNetwork.initializeFromArrayBuffer(this.response, options.useWebGL);
      }
    };
  }(this);
  xhr.onerror = function(e) {
    alert("Error " + e.target.status + " occurred while receiving the document.");
  };
  if (options.progress) {
    this.onprogress = options.progress;
    xhr.onprogress = function (myThis) {
      return function(event) {
        var total;
        if (event.lengthComputable) {
          total = event.total;
        } else {
          total = 64140288; // Known length of our network file, and a good guess for similar ones
        }
        var percentComplete = (event.loaded / total) * 100;
        myThis.onprogress(percentComplete);
      };
    }(this);
  }
  xhr.send();
};
window['Network'] = Network;
Network.prototype.classifyImage = function(input, doMultiSample, layerOffset, useWebGL) {

  if (useWebGL) {
    g_useWebGL = true;
  } else {
    g_useWebGL = false;
  }

  var doFlip;
  var imageSize;
  var isMeanChanneled;
  if (this._isHomebrewed) {
    imageSize = 224;
    doFlip = false;
    isMeanChanneled = true;
  } else {
    imageSize = 227;
    doFlip = true;
    isMeanChanneled = false;
  }
  var rescaledSize = 256;

  var prepareInput = new PrepareInputNode(this._dataMean, !doMultiSample, doFlip, imageSize, rescaledSize, isMeanChanneled);
  var rescaledInput = prepareInput.run(input);
  if(useWebGL){
      var M = rescaledInput._dims._dims[1],
          N = rescaledInput._dims._dims[2] * rescaledInput._dims._dims[3];

      rescaledInput._tensor = new weblas.pipeline.Tensor([M, N], rescaledInput._data);
  }

  var predictions = this.run(rescaledInput, layerOffset);

  var result = [];
  for (var index = 0; index < predictions._data.length; index += 1) {
    result.push({value: predictions._data[index], label: this._labelNames[index]});
  }

  return result;
};
Network.prototype.initializeFromArrayBuffer = function(arrayBuffer, useWebGL) {
  this.binaryFormat = new BinaryFormat(arrayBuffer);
  var graphDict = this.binaryFormat.firstTag();
  this._fileTag = graphDict;
  var dataMeanTag = graphDict.getTagFromDict('data_mean');
  console.assert(dataMeanTag != null);
  this._dataMean = bufferFromTagDict(dataMeanTag, false);

  var layersTag = graphDict.getTagFromDict('layers');
  var layerSubTags = layersTag.getSubTags();
  var layers = [];
  var previousClassName;
  _.each(layerSubTags, function(layerSubTag) {
    var layerNode = nodeFromTag(layerSubTag, useWebGL);

    var className = layerNode._className;
    var shouldSkip = ((className === 'relu') && (previousClassName === 'relu'));
    previousClassName = className;
    if (shouldSkip) {
      return;
    }
    layers.push(layerNode);
  });
  this._layers = layers;

  var labelNamesTag = graphDict.getTagFromDict('label_names');
  var labelNameSubTags = labelNamesTag.getSubTags();
  var labelNames = [];
  _.each(labelNameSubTags, function(labelNameTag) {
    labelNames.push(labelNameTag.value);
  });
  this._labelNames = labelNames;

  if (graphDict.getTagFromDict('copyright')) {
    console.log('Neural network parameters ' + graphDict.getStringFromDict('copyright'));
  }

  this._onLoad(this);
};
Network.prototype.run = function(input, layerOffset) {
  if (_.isUndefined(layerOffset)) {
    layerOffset = 0;
  }
  var filePath = 'data/c_dog_blobs/';
  var currentInput = input;
  var howManyLayers = (this._layers.length + layerOffset);
  for (var index = 0; index < howManyLayers; index += 1) {
    if (!_.isUndefined(this._runOnlyLayer) && (index != this._runOnlyLayer)) {
      continue;
    }
    var layer = this._layers[index];

    if (this._testResults) {
      var inputIndexString = ('000' + ((index * 2) + 1)).slice(-3);
      var expectedInputFilename = filePath + inputIndexString + '_input.blob';
      var expectedInput = bufferFromFileAtURL(expectedInputFilename);
      if (!expectedInput.areAllClose(currentInput)) {
        console.log('inputs differ for ' + index + ' - ' + layer.constructor.name);
        currentInput = expectedInput;
      } else {
        console.log('inputs are equal for ' + index);
      }
    }

    if (this._doProfile) {
      console.log('Running ' + layer.constructor.name)
      var startTime = new Date().getTime();
    }
    var currentOutput = layer.run(currentInput);
    if (this._doProfile) {
      var endTime = new Date().getTime();
      var duration = (endTime - startTime);
      console.log(layer._name + ' took ' + duration + ' ms');
    }
    currentOutput.setName(layer.constructor.name + ' output');
//    console.log('currentOutput = ' + currentOutput);

    if (this._testResults) {
      var outputIndexString = ('000' + ((index * 2) + 1)).slice(-3);
      var expectedOutputFilename = filePath + outputIndexString + '_output.blob';
      var expectedOutput = bufferFromFileAtURL(expectedOutputFilename);
      if (!expectedOutput.areAllClose(currentOutput)) {
        console.log('outputs differ for ' + index + ' - ' + layer.constructor.name);
        currentOutput = expectedOutput;
      } else {
        console.log('outputs are equal for ' + index);
      }
    }

    if (!_.isUndefined(this._runOnlyLayer)) {
      return null;
    }

    currentInput = currentOutput;
  }
  return currentInput;
};

/**
 * @constructor
 */
BinaryFormat = function(arrayBuffer) {
  this.arrayBuffer = arrayBuffer;
  this.cursor = 0;
};
window['BinaryFormat'] = BinaryFormat;
JP_CHAR = 0x52414843; // 'CHAR'
JP_UINT = 0x544E4955; // 'UINT'
JP_FL32 = 0x32334C46; // 'FL32'
JP_FARY = 0x59524146; // 'FARY'
JP_DICT = 0x54434944; // 'DICT'
JP_LIST = 0x5453494C; // 'LIST'
JP_BLOB = 0x424F4C42; // 'BLOB'
BinaryFormat.prototype.firstTag = function() {
  return tagFromMemory(this.arrayBuffer, 0);
};

function tagFromMemory(arrayBuffer, offset) {
  var header = new Uint32Array(arrayBuffer, offset, 2);
  var type = header[0];
  var length = header[1];
  var valuesBuffer = arrayBuffer.slice((offset + 8), (offset + 8 + length));
  return new BinaryTag(type, length, valuesBuffer);
};

/**
 * @constructor
 */
BinaryTag = function(type, length, valuesBuffer) {
  var value;
  if (type === JP_CHAR) {
    var stringBytes = new Uint8Array(valuesBuffer, 0, (length-1));
    value = '';
    var index = 0;
    while (index < (length - 1)) {
      var charCode = stringBytes[index];
      if (charCode === 0) {
        break;
      }
      value += String.fromCharCode(charCode);
      index += 1;
    }
  } else if (type === JP_UINT) {
    var array = new Uint32Array(valuesBuffer, 0, 1);
    value = array[0];
  } else if (type === JP_FL32) {
    var array = new Float32Array(valuesBuffer, 0, 1);
    value = array[0];
  } else if (type === JP_FARY) {
    var array = new Float32Array(valuesBuffer, 0, (length / 4));
    value = array;
  } else if (type === JP_DICT) {
    value = valuesBuffer;
  } else if (type === JP_LIST) {
    value = valuesBuffer;
  } else if (type === JP_BLOB) {
    value = valuesBuffer;
  } else {
    console.log('Unknown type ' + type);
    return null;
  }
  this.type = type;
  this.length = length;
  this.value = value;
};
window['BinaryTag'] = BinaryTag;
BinaryTag.prototype.toString = function() {
  var type = this.type;
  var length = this.length;
  var name;
  if (type === JP_CHAR) {
    name = 'CHAR';
  } else if (type === JP_UINT) {
    name = 'UINT';
  } else if (type === JP_FL32) {
    name = 'FL32';
  } else if (type === JP_FARY) {
    name = 'FARY';
  } else if (type === JP_DICT) {
    name = 'DICT';
  } else if (type === JP_LIST) {
    name = 'LIST';
  } else {
    console.log('Unknown type ' + type);
    return null;
  }
  return 'Tag ' + name + ', length=' + this.length + ', value = ' + this.value;
};
BinaryTag.prototype.sizeInBytes = function() {
  return (8 + this.length);
};
BinaryTag.prototype.getSubTags = function() {
  console.assert((this.type === JP_DICT) || (this.type === JP_LIST));
  var valuesBuffer = this.value;
  var length = this.length;
  var readOffset = 0;
  var result = [];
  while (readOffset < length) {
    var tag = tagFromMemory(valuesBuffer, readOffset);
    result.push(tag);
    readOffset += tag.sizeInBytes();
  }
  return result;
}
BinaryTag.prototype.getTagFromDict = function(wantedKey) {
  var result = null;
  var subTags = this.getSubTags();
  console.assert((subTags.length % 2) == 0);
  for (var index = 0; index < subTags.length; index += 2) {
    var key = subTags[index + 0];
    console.assert((key.type === JP_CHAR), 'Key must be a string');
    if (key.value == wantedKey) {
      result = subTags[index + 1];
    }
  }
  return result;
};
BinaryTag.prototype.getStringFromDict = function(wantedKey) {
  var tag = this.getTagFromDict(wantedKey);
  console.assert(tag && tag.type == JP_CHAR);
  return tag.value;
};
BinaryTag.prototype.getUintFromDict = function(wantedKey) {
  var tag = this.getTagFromDict(wantedKey);
  console.assert(tag && tag.type == JP_UINT);
  return tag.value;
};
BinaryTag.prototype.getFloatFromDict = function(wantedKey) {
  var tag = this.getTagFromDict(wantedKey);
  console.assert(tag && tag.type == JP_FL32);
  return tag.value;
};

function nodeFromTag(tag, useWebGL) {
  var classLookup = {
    'conv': ConvNode,
    'dropout': DropoutNode,
    'flat': FlatNode,
    'gconv': GConvNode,
    'neuron': NeuronNode,
    'normalize': NormalizeNode,
    'pool': PoolNode,
    'relu': ReluNode,
    'max': MaxNode
  };
  var tagClass = tag.getStringFromDict('class');
  var jsClass = classLookup[tagClass];
  var result = new jsClass(tag, useWebGL);
  var tagName = tag.getStringFromDict('name');
  result._className = tagClass;
  result._name = tagName;
  return result;
}

/**
 * @constructor
 */
function ConvNode(tag, useWebGL) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'conv', 'Wrong class name in tag');

  var specDict = tag.getTagFromDict('spec');
  this._kernelCount = specDict.getUintFromDict('num_kernels');
  this._kernelWidth = specDict.getUintFromDict('ksize');
  this._sampleStride = specDict.getUintFromDict('stride');

  var kernelsTag = tag.getTagFromDict('kernels');
  this._kernels = bufferFromTagDict(kernelsTag, useWebGL, true);

  this._useBias = tag.getUintFromDict('has_bias');
  if (this._useBias) {
    var biasTag = tag.getTagFromDict('bias');
    this._bias = bufferFromTagDict(biasTag, useWebGL);
  }

  this._marginSize = tag.getUintFromDict('padding');
}
window['ConvNode'] = ConvNode;
ConvNode.prototype.run = function(input) {


  var inputDims = input._dims;
  var inputChannels = inputDims._dims[inputDims._dims.length - 1];
  var valuesPerKernel = (inputChannels * this._kernelWidth * this._kernelWidth);
  var expectedKernelsDims = new Dimensions(valuesPerKernel, this._kernelCount);
  console.assert(expectedKernelsDims.areEqualTo(this._kernels._dims));

  this._output = matrixCorrelate(input, this._kernels, this._kernelWidth, this._kernelCount, this._sampleStride, this._bias, this._marginSize);
  this._output.setName(this._name);

  if(this._output._tensor === null){
      matrixAddInplace(this._output, this._bias, 1.0);
  }

  return this._output;
};

/**
 * @constructor
 */
function DropoutNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'dropout', 'Wrong class name in tag');
}
window['DropoutNode'] = DropoutNode;
DropoutNode.prototype.run = function(input) {
  return input;
};

/**
 * @constructor
 */
function FlatNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'flat', 'Wrong class name in tag');
}
window['FlatNode'] = FlatNode;
FlatNode.prototype.run = function(input) {
  var inputDims = input._dims;
  // We're expecting (# of images, height, width, # of channels)
  console.assert(inputDims._dims.length == 4);

  var imageCount = inputDims._dims[0];
  var inputWidth = inputDims._dims[2];
  var inputHeight = inputDims._dims[1];
  var inputChannels = inputDims._dims[3];

  var outputElementCount = (inputHeight * inputWidth * inputChannels);
  var outputDims = new Dimensions(imageCount, outputElementCount);

  // Doesn't do a data copy, just returns a new view with a different shape.
  this._output = new Buffer(outputDims, input._data);

  return this._output;
};

/**
 * @constructor
 */
function GConvNode(tag, useWebGL) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'gconv', 'Wrong class name in tag');

  this._subnodesCount = tag.getUintFromDict('layers_count');
  var subnodesTag = tag.getTagFromDict('layers');
  var subnodeSubTags = subnodesTag.getSubTags();
  var subnodes = [];
  _.each(subnodeSubTags, function(subnodeSubTag) {
    var subnode = nodeFromTag(subnodeSubTag, useWebGL);
    subnodes.push(subnode);
  });
  this._subnodes = subnodes;

  this._kernelCount = tag.getUintFromDict('kernels_count');
}
window['GConvNode'] = GConvNode;
GConvNode.prototype.run = function(input) {

  var inputDims = input._dims;

  console.assert(inputDims._dims.length === 4);

  var imageCount = inputDims._dims[0];
  var inputWidth = inputDims._dims[2];
  var inputHeight = inputDims._dims[1];
  var inputChannels = inputDims._dims[3];

  console.assert((inputChannels % this._subnodesCount) === 0);
  var subnodeChannels = (inputChannels / this._subnodes.length);

  var subnodeInputDimensions = new Dimensions(imageCount, inputHeight, inputWidth, subnodeChannels);
  var subnodeOutputBuffers = [];

  if(this._subnodes.length == 2 && input._tensor){
      // fast weblas version for group size of 2

      var submatrices = input._tensor.split(subnodeChannels);
      var outputs = [null, null];
      var input;

      var subnode = this._subnodes[0];
      input = new Buffer(subnodeInputDimensions, null);
      input._tensor = submatrices[0];
      outputs[0] = subnode.run(input);

      subnodeInputDimensions = new Dimensions(imageCount, inputHeight, inputWidth, subnodeChannels);
      var subnode = this._subnodes[1];
      input = new Buffer(subnodeInputDimensions, null);
      input._tensor = submatrices[1];
      outputs[1] = subnode.run(input);

      var subnodeOutputDims = outputs[0]._dims;
      var subnodeOutputChannels = subnodeOutputDims._dims[subnodeOutputDims._dims.length - 1];
      var outputChannels = (subnodeOutputChannels * 2);

      var outputDims = new Dimensions(subnodeOutputDims._dims);
      outputDims._dims[outputDims._dims.length - 1] = outputChannels;

      this._output = new Buffer(outputDims, null);

      this._output._tensor = weblas.pipeline.Tensor.combine(outputs[0]._tensor, outputs[1]._tensor, subnodeOutputChannels);

  } else {

      for (var index = 0; index < this._subnodes.length; index += 1) {
        var startChannel = (index * subnodeChannels);
        var endChannel = ((index + 1) * subnodeChannels);
        var subnodeInputBuffer = matrixExtractChannels(input, startChannel, endChannel);

        var subnode = this._subnodes[index];
        var subnodeOutputBuffer = subnode.run(subnodeInputBuffer);
        subnodeOutputBuffers.push(subnodeOutputBuffer);
      }

      this._output = matrixJoinChannels(subnodeOutputBuffers);

  }
  return this._output;
};

/**
 * @constructor
 */
function NeuronNode(tag, useWebGL) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'neuron', 'Wrong class name in tag');

  var specDict = tag.getTagFromDict('spec');
  this._outputsCount = specDict.getUintFromDict('num_output');

  var weightsTag = tag.getTagFromDict('weight');
  this._weights = bufferFromTagDict(weightsTag, useWebGL, true);

  this._useBias = tag.getUintFromDict('has_bias');
  if (this._useBias) {
    var biasTag = tag.getTagFromDict('bias');
    this._bias = bufferFromTagDict(biasTag, useWebGL);
  }

  if (tag.getTagFromDict('dropout')) {
    this._dropout = tag.getFloatFromDict('dropout');
  }
}
window['NeuronNode'] = NeuronNode;
NeuronNode.prototype.run = function(input) {

  var inputDims = input._dims;
  var numberOfImages = inputDims._dims[0];
  var inputImageDims = inputDims.removeDimensions(1);
  var elementCount = inputImageDims.elementCount();
  var flattenedDimensions = new Dimensions(numberOfImages, elementCount);
  var flattenedInput;
  var dimsNotEqual = (input._tensor && numberOfImages !== input._tensor.shape[0] && elementCount !== input._tensor.shape[1]);

    if(input._tensor && dimsNotEqual){
        input._tensor = input._tensor.reshape(flattenedDimensions._dims);
        flattenedInput = input;
    } else {
        flattenedInput = input;
    }

  flattenedInput.reshape(flattenedDimensions);

  var expectedWeightsDimensions = new Dimensions(elementCount, this._outputsCount);
  console.assert(expectedWeightsDimensions.areEqualTo(this._weights._dims));

  // interesting note: removing the dropout term here appears to increase both
  // certainty and *accuracy*
  this._output = matrixDot(flattenedInput, this._weights, this._bias, this._dropout);
  this._output.setName(this._name);

  if(this._output._tensor === null){
    matrixAddInplace(this._output, this._bias, 1.0);


    if (this._dropout > 0.0) {
      var scale = (1.0 - this._dropout);
      matrixScaleInplace(this._output, scale);
    }
  }

  return this._output;
};

/**
 * @constructor
 */
function NormalizeNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'normalize', 'Wrong class name in tag');

  this._windowSize = tag.getUintFromDict('size');
  this._k = tag.getFloatFromDict('k');
  this._alpha = tag.getFloatFromDict('alpha');
  this._beta = tag.getFloatFromDict('beta');
}
window['NormalizeNode'] = NormalizeNode;
NormalizeNode.prototype.run = function(input) {

    var usingWeblas = false;
    if(input._tensor && input._data === null){
        usingWeblas = true;
        input._data = input.getTensorData();
    }

  this._output = matrixLocalResponse(input, this._windowSize, this._k, this._alpha, this._beta);

  if(usingWeblas){
      // if the input had a tensor, we're using weblas, so create an output one
      var M = this._output._dims._dims[1],
          N = this._output._dims._dims[2],
          channels = this._output._dims._dims[3];

      this._output._tensor = new weblas.pipeline.Tensor([M, N * channels], this._output._data);
  }

  return this._output;
};


/**
 * @constructor
 */
function PoolNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'pool', 'Wrong class name in tag');

  this._patchWidth = tag.getUintFromDict('psize');
  this._stride = tag.getUintFromDict('stride');
  this._mode = tag.getStringFromDict('mode');
}
window['PoolNode'] = PoolNode;
PoolNode.prototype.run = function(input) {

  this._output = matrixMaxPatch(input, this._patchWidth, this._stride);
  return this._output;
};

/**
 * @constructor
 */
function ReluNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'relu', 'Wrong class name in tag');
}
window['ReluNode'] = ReluNode;
ReluNode.prototype.run = function(input) {
  this._output = matrixMax(input, 0.0);
  return this._output;
};

/**
 * @constructor
 */
function MaxNode(tag) {
  var className = tag.getStringFromDict('class');
  console.assert(className === 'max', 'Wrong class name in tag');
}
window['MaxNode'] = MaxNode;
MaxNode.prototype.run = function(input) {

    if(input._tensor && input._data === null){
        input._data = input.getTensorData();
    }

  this._output = matrixSoftmax(input);
  return this._output;
};

/**
 * @constructor
 */
function PrepareInputNode(dataMean, useCenterOnly, needsFlip, imageSize, rescaledSize, isMeanChanneled) {
  this._useCenterOnly = useCenterOnly;
  this._needsFlip = needsFlip;
  this._imageSize = imageSize;
  this._rescaledSize = rescaledSize;
  var expectedDims = new Dimensions(this._rescaledSize, this._rescaledSize, 3);
  dataMean.reshape(expectedDims);
  var outputDims = new Dimensions(this._imageSize, this._imageSize, 3);
  this._dataMean = new Buffer(outputDims);
  var deltaX = (this._rescaledSize - this._imageSize);
  var deltaY = (this._rescaledSize - this._imageSize);
  var marginX = (deltaX / 2);
  var marginY = (deltaY / 2);
  if (isMeanChanneled) {
    var fromChanneled = convertFromChanneledRGBImage(dataMean);
    cropAndFlipImage(this._dataMean, fromChanneled, marginX, marginY, false);
  } else {
    cropAndFlipImage(this._dataMean, dataMean, marginX, marginY, false);
  }
  this._dataMean.setName('_dataMean');
}
window['PrepareInputNode'] = PrepareInputNode;
PrepareInputNode.prototype.run = function(input) {
  var rescaledDims = new Dimensions(this._rescaledSize, this._rescaledSize, 3);
  console.assert(input._dims.areEqualTo(rescaledDims));
  console.assert(!this._needsFlip);

  input.setName("input");

  var deltaX = (this._rescaledSize - this._imageSize);
  var deltaY = (this._rescaledSize - this._imageSize);
  var marginX = (deltaX / 2);
  var marginY = (deltaY / 2);

  if (this._useCenterOnly) {

    var outputDims = new Dimensions(1, this._imageSize, this._imageSize, 3);
    this._output = new Buffer(outputDims);
    this._output.setName("prepareInput_output");

    var sourceX = marginX;
    var sourceY = marginY;

    var blitDestination = this._output.viewAtTopIndex(0);
    cropAndFlipImage(blitDestination, input, sourceX, sourceY, false);

    matrixAddInplace(blitDestination, this._dataMean, -1.0);

  } else {

    var outputDims = new Dimensions(10, this._imageSize, this._imageSize, 3);
    this._output = new Buffer(outputDims);
    this._output.setName('prepareInput_output');

    for (var flipPass = 0; flipPass < 2; flipPass += 1) {
      var doFlip = (flipPass == 1);
      var blitDestination = this._output.viewAtTopIndex(this._output, (flipPass * 5));
      cropAndFlipImage(blitDestination, rescaled, marginX, marginY, doFlip);
      for (var yIndex = 0; yIndex < 2; yIndex += 1) {
        for (var xIndex = 0; xIndex < 2; xIndex += 1) {
          var viewIndex = ((flipPass * 5) + (yIndex * 2) + xIndex + 1);
          var blitDestination = bufferViewAtTopIndex(this._output, viewIndex);

          var sourceX = (xIndex * deltaX);
          var sourceY = (yIndex * deltaY);

          cropAndFlipImage(blitDestination, input, sourceX, sourceY, doFlip);
        }
      }
    }
  }

  return this._output;
};

function cropAndFlipImage(destBuffer, sourceBuffer, offsetX, offsetY, doFlipHorizontal) {

  var destDims = destBuffer._dims;
  var sourceDims = sourceBuffer._dims;
  console.assert((destDims._dims.length == 3) && (sourceDims._dims.length == 3));

  var destWidth = destDims._dims[1];
  var destHeight = destDims._dims[0];
  var destChannels = destDims._dims[2];

  var sourceWidth = sourceDims._dims[1];
  var sourceHeight = sourceDims._dims[0];
  var sourceChannels = sourceDims._dims[2];
  console.assert(destChannels == sourceChannels);

  var sourceEndX = (offsetX + destWidth);
  console.assert(sourceEndX <= sourceWidth);
  var sourceEndY = (offsetY + destHeight);
  console.assert(sourceEndY <= sourceHeight);

  var destRowDims = destDims.removeDimensions(1);
  var destRowElementCount = destRowDims.elementCount();

  var destData = destBuffer._data;
  var sourceData = sourceBuffer._data;

  if (!doFlipHorizontal) {
    for (var destY = 0; destY < destHeight; destY += 1) {
      var sourceX = offsetX;
      var sourceY = (destY + offsetY);
      var sourceOffset = sourceDims.offset(sourceY, sourceX, 0);
      var sourceRow = sourceData.subarray(sourceOffset, (sourceOffset + destRowElementCount));
      var destOffset = destDims.offset(destY, 0, 0);
      var destRow = destData.subarray(destOffset, (destOffset + destRowElementCount));
      destRow.set(sourceRow);
    }
  } else {
    for (var destY = 0; destY < destHeight; destY += 1) {
      var sourceX = offsetX;
      var sourceY = (destY + offsetY);
      var sourceOffset = sourceDims.offset(sourceY, sourceX, 0);
      var sourceRow = sourceData.subarray(sourceOffset, (sourceOffset + destRowElementCount));
      var destOffset = destDims.offset(destY, 0, 0);
      var destRow = destData.subarray(destOffset, destRowElementCount);
      for (var destX = 0; destX < destWidth; destX += 1) {
        var sourceX = ((destWidth - 1) - destX);
        var sourcePixel = sourceRow.subarray((sourceX * sourceChannels), ((sourceX * sourceChannels) + destChannels));
        var destPixel = sourceRow.subarray((destX * destChannels), ((destX * destChannels) + destChannels));
        destPixel.set(sourcePixel);
      }
    }
  }
}

function convertFromChanneledRGBImage(input) {
  var dims = input._dims;
  console.assert(dims._dims.length == 3);
  var width = dims._dims[1];
  var height = dims._dims[0];
  var channels = dims._dims[2];
  console.assert(channels == 3);

  var result = new Buffer(dims);

  var inputData = input._data;
  var outputData = result._data;

  var elementsPerChannel = (width * height);
  var elementsPerImage = dims.elementCount();

  var redOffset = (0 * elementsPerChannel);
  var greenOffset = (1 * elementsPerChannel);
  var blueOffset = (2 * elementsPerChannel);

  var destOffset = 0;
  while (destOffset < elementsPerImage) {
    outputData[destOffset] = inputData[redOffset];
    redOffset += 1;
    destOffset += 1;
    outputData[destOffset] = inputData[greenOffset];
    greenOffset += 1;
    destOffset += 1;
    outputData[destOffset] = inputData[blueOffset];
    blueOffset += 1;
    destOffset += 1;
  }

  return result;
}

function matrixAddInplace(output, input, inputScale) {
  console.assert((output._dims.elementCount() % input._dims.elementCount()) == 0);
  var outputData = output._data;
  var outputDataLength = output._dims.elementCount();
  var inputData = input._data;
  var inputDataLength = input._dims.elementCount();

  var outputOffset = 0;
  var inputOffset = 0;
  while (outputOffset < outputDataLength) {
    var inputValue = inputData[inputOffset];
    outputData[outputOffset] += (inputValue * inputScale);
    outputOffset += 1;
    inputOffset += 1;
    if (inputOffset >= inputDataLength) {
      inputOffset = 0;
    }
  }
}

function matrixInsertMargin(input, marginWidth, marginHeight) {

  var inputDims = input._dims;
  // We're expecting (# of images, height, width, # of channels)
  console.assert(inputDims._dims.length == 4);

  var imageCount = inputDims._dims[0];
  var inputWidth = inputDims._dims[2];
  var inputHeight = inputDims._dims[1];
  var inputChannels = inputDims._dims[3];

  var outputWidth = (inputWidth + (marginWidth * 2));
  var outputHeight = (inputHeight + (marginHeight * 2));
  var outputDims = new Dimensions(imageCount, outputHeight, outputWidth, inputChannels);
  var output = new Buffer(outputDims);

  var valuesPerInputRow = (inputWidth * inputChannels);
  var valuesPerOutputRow = (outputWidth * inputChannels);

  var valuesPerOutputMargin = (marginWidth * inputChannels);

  var outputData = output._data;
  var outputOffset = 0;
  var inputData = input._data;
  var inputOffset = 0;

  for (var imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
    for (var outputY = 0; outputY < outputHeight; outputY += 1) {
      var inputOriginY = (outputY - marginHeight);
      if ((inputOriginY < 0) || (inputOriginY >= inputHeight)) {
        outputOffset += valuesPerOutputRow;
      } else {
        outputOffset += valuesPerOutputMargin;
        var inputRow = inputData.subarray(inputOffset, (inputOffset + valuesPerInputRow));
        outputData.set(inputRow, outputOffset);
        outputOffset += valuesPerInputRow;
        inputOffset += valuesPerInputRow;
        outputOffset += valuesPerOutputMargin;
      }
    }
  }

  return output;
}

function patchesIntoRows(input, kernelWidth, stride) {

  var inputDims = input._dims;
  // We're expecting (# of images, height, width, # of channels)
  console.assert(inputDims._dims.length == 4);

  var imageCount = inputDims._dims[0];
  var inputWidth = inputDims._dims[2];
  var inputHeight = inputDims._dims[1];
  var inputChannels = inputDims._dims[3];

  var pixelsPerKernel = (kernelWidth * kernelWidth);
  var valuesPerKernel = (pixelsPerKernel * inputChannels);

  var patchesAcross = Math.round(Math.ceil((inputWidth - kernelWidth) / stride) + 1);
  var patchesDown = Math.round(Math.ceil((inputHeight - kernelWidth) / stride) + 1);
  var outputDims = new Dimensions(imageCount, (patchesDown * patchesAcross), valuesPerKernel);
  var output = new Buffer(outputDims);

  var inputData = input._data;
  var outputData = output._data;
  var outputOffset = 0;

  var valuesPerInputRow = inputDims.removeDimensions(2).elementCount();
  var valuesPerKernelRow = (kernelWidth * inputChannels);

  for (var imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
    for (var patchY = 0; patchY < patchesDown; patchY += 1) {
      var inputOriginY = (patchY * stride);
      var inputEndY = (inputOriginY + kernelWidth);
      for (var patchX = 0; patchX < patchesAcross; patchX += 1) {
        var inputOriginX = (patchX * stride);
        var inputEndX = (inputOriginX + kernelWidth);
        var inputOffset = inputDims.offset(imageIndex, inputOriginY, inputOriginX, 0);
        if ((inputEndY <= inputHeight) && (inputEndX <= inputWidth)) {
          for (var row = 0; row < kernelWidth; row += 1) {
            var inputRow = inputData.subarray(inputOffset, (inputOffset + valuesPerKernelRow));
            outputData.set(inputRow, outputOffset);
            outputOffset += valuesPerKernelRow;
            inputOffset += valuesPerInputRow;
          }
        } else {
          var valuesToCopy;
          if (inputEndX > inputWidth) {
              var valuesToZero = ((inputEndX - inputWidth) * inputChannels);
            valuesToCopy = (valuesPerKernelRow - valuesToZero);
          } else {
            valuesToCopy = valuesPerKernelRow;
          }
          var rowsToCopy;
          if (inputEndY > inputHeight) {
            rowsToCopy = (kernelWidth - (inputEndY - inputHeight));
          } else {
            rowsToCopy = kernelWidth;
          }
          for (var row = 0; row < kernelWidth; row += 1) {
            if (row < rowsToCopy) {
              var inputRow = inputData.subarray(inputOffset, (inputOffset + valuesToCopy));
              outputData.set(inputRow, outputOffset);
              outputOffset += valuesPerKernelRow;
              inputOffset += valuesPerInputRow;
            } else {
              outputOffset += valuesPerKernelRow;
            }
          }
        }
      }
    }
  }

  return output;
}

function matrixCorrelate(input, kernels, kernelWidth, kernelCount, stride, bias, marginSize) {

  //console.log("Correlate");


    var imageCount;
    var inputWidth;
    var inputHeight;
    var inputChannels;

    var output;

    if(input._tensor){
      // run the weblas version
      var inputDims = input._dims;

      var channels = inputDims._dims[3],
          factor = kernelWidth,
          margin = marginSize;

      var t0 = input._tensor;
      // linearize into rows matching the kernels
      t3 = weblas.pipeline.slokn(channels, factor, stride, margin, t0);
      var patches = new Buffer(new Dimensions([1, t3.shape[0], t3.shape[1]]), null);
      patches._tensor = t3;

      imageCount = inputDims._dims[0];
      inputWidth = inputDims._dims[2] + (2 * margin);
      inputHeight = inputDims._dims[1] + (2 * margin);
      inputChannels = channels;

    } else {
        // run the javascript version

      var inputWithMargin;
      if (marginSize == 0) {
        inputWithMargin = input;
      } else {
        inputWithMargin = matrixInsertMargin(input, marginSize, marginSize);
      }

        var patches = patchesIntoRows(inputWithMargin, kernelWidth, stride);

        var inputDims = inputWithMargin._dims;

        // We're expecting (# of images, height, width, # of channels)
        console.assert(inputDims._dims.length == 4);

        var imageCount = inputDims._dims[0];
        var inputWidth = inputDims._dims[2];
        var inputHeight = inputDims._dims[1];
        var inputChannels = inputDims._dims[3];

    }

    var pixelsPerKernel = (kernelWidth * kernelWidth);
    var valuesPerKernel = (pixelsPerKernel * inputChannels);
    var expectedKernelsDims = new Dimensions(valuesPerKernel, kernelCount);
    console.assert(expectedKernelsDims.areEqualTo(kernels._dims));

    var outputWidth = Math.round(Math.ceil((inputWidth - kernelWidth) / stride) + 1);
    var outputHeight = Math.round(Math.ceil((inputHeight - kernelWidth) / stride) + 1);
    var outputChannels = kernelCount;
    var outputDims = new Dimensions(imageCount, outputHeight, outputWidth, outputChannels);

    if(!input._tensor){
        // javascript version expectes a zero'd output
        output = new Buffer(outputDims);
    }




  var m = kernelCount;
  var n = (patches._dims._dims[1] * patches._dims._dims[0]);
  var k = patches._dims._dims[2];
  var alpha = 1.0;
  var lda = m;
  var ldb = k;
  var ldc = m;
  var beta = 0.0;

  if (kernels._bitsPerFloat === 32) {
    output = matrixGemm(
      m,
      n,
      k,
      alpha,
      kernels,
      lda,
      patches,
      ldb,
      beta,
      output,
      ldc
    );
  } else {
    output = matrixGemmScaleA(
      m,
      n,
      k,
      alpha,
      kernels,
      lda,
      patches,
      ldb,
      beta,
      output,
      ldc,
      null,
      null,
      null,
      bias,
      1.0
    );

  }
  output.reshape(outputDims);
  if(output._tensor){
      var M = outputDims._dims[1],
          N = outputDims._dims[2],
          channels = outputDims._dims[3];

      output._tensor = output._tensor.reshape([M, N * channels]);
  }

  if(patches._tensor){
      patches._tensor.delete();
      patches._tensor = null;
  }

  return output;
}

var g_useWebGL = false;

function matrixGemm(
  m,
  n,
  k,
  alpha,
  aBuffer,
  lda,
  bBuffer,
  ldb,
  beta,
  cBuffer,
  ldc) {

  if (g_useWebGL){

      /*
    return glGemm(
      m,
      n,
      k,
      alpha,
      aBuffer,
      lda,
      bBuffer,
      ldb,
      beta,
      cBuffer,
      ldc
  );*/
  } else {
    return naiveGemm(
      m,
      n,
      k,
      alpha,
      aBuffer._data,
      lda,
      bBuffer._data,
      ldb,
      beta,
      cBuffer._data,
      ldc
    );
  }

}

function naiveGemm(
  m,
  n,
  k,
  alpha,
  a,
  lda,
  b,
  ldb,
  beta,
  c,
  ldc) {

  var outputDims = new Dimensions(n, m);
  var outputBuffer = new Buffer(outputDims, c);

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      var total = 0.0;
      for (var l = 0; l < k; l++) {
        var aIndex = ((lda * l) + i);
        var aValue = a[aIndex];
        var bIndex = ((ldb * j) + l);
        var bValue = b[bIndex];
        total += (aValue * bValue);
      }
      var cIndex = ((ldc * j) + i);
      var oldCValue = c[cIndex];
      c[cIndex] = ((alpha * total) + (beta * oldCValue));
    }
  }

  return outputBuffer;
}

function matrixGemmScaleA(
  m,
  n,
  k,
  alpha,
  aBuffer,
  lda,
  bBuffer,
  ldb,
  beta,
  cBuffer,
  ldc,
  aScale,
  aOffset,
  aBitDepth,
  bias,
  scale) {

  if (g_useWebGL) {

      // naiveGemm uses column major ordering, this can be emulated by
      // swapping A and B (and m and n) and taking the transpose of the result
      return sgemm(n, m, k, scale, bBuffer, aBuffer, scale, bias);

  } else {
      var expectedC =  naiveGemmScaleA(
      m,
      n,
      k,
      alpha,
      aBuffer._quantizedData,
      lda,
      bBuffer._data,
      ldb,
      beta,
      cBuffer._data,
      ldc,
      aBuffer._spread,
      aBuffer._min
    );

    return expectedC;
  }

}

/* sgemm wrapper function for Deep Belief buffers, calls directly into
    weblas texture level code

    A - a Buffer
    B - a Buffer
    C - a Buffer
*/
function sgemm(M, N, K, alpha, A, B, beta, C){

  if(C != null && C._data.length != N){
    throw new Error("Only vector C with length matching columns in B is currently supported.");
  }

    // pack each matrix into a single RGBA texel array, with the second transposed
    var texels0,
        texels1;

    var t0, t1, t2;

    // create input textures from data

    // cached texture for A?
    if(A._tensor === null){
        // nope, create and cache it

        if (A._bitsPerFloat === 32) {
          texels0 = A._data;
          A._tensor = new weblas.pipeline.Tensor([M, K], texels0);
        } else {
            texels0 = new Float32Array(A._quantizedData);

            var tA = new weblas.pipeline.Tensor([M, K], texels0);

            A._tensor = weblas.pipeline.sscal(A._spread, A._min, tA);
            tA.delete();
        }
    }

    // cached texture for transpose of B?
    if(B._Ttensor === null){
        // nope, create and cache it

        if (B._bitsPerFloat === 32) {
          texels1 = weblas.util.transpose(K, N, B._data);
          B._Ttensor = new weblas.pipeline.Tensor([N, K], texels1);
        } else {
            // pipeline sscal for tranpose of B
            texels1 = weblas.util.transpose(K, N, new Float32Array(B._quantizedData));

            var tB = new weblas.pipeline.Tensor([N, K], texels1);

            B._Ttensor = weblas.pipeline.sscal(B._spread, B._min, tB);
            tB.delete();
        };

    }

    // cached texture for transpose C?
    if(C._tensor === null){
        C._tensor = new weblas.pipeline.Tensor([1, N], C._data);
    }

    t0 = A._tensor;
    t1 = B._Ttensor;
    t2 = C._tensor;

    //console.log(M, N, K, alpha, beta);
    var t3 = weblas.pipeline.sgemm(alpha, t0, t1, beta, t2);

    var out = new Buffer([M, N], null);
    out._tensor = t3;
    return out;

}


function naiveGemmScaleA(
  m,
  n,
  k,
  alpha,
  a,
  lda,
  b,
  ldb,
  beta,
  c,
  ldc,
  aScale,
  aOffset) {

  var outputDims = new Dimensions(n, m);
  var outputBuffer = new Buffer(outputDims, c);

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      var total = 0.0;
      for (var l = 0; l < k; l++) {
        var aIndex = ((lda * l) + i);
        var aValue = ((a[aIndex] * aScale) + aOffset);
        var bIndex = ((ldb * j) + l);
        var bValue = b[bIndex];
        total += (aValue * bValue);
      }
      var cIndex = ((ldc * j) + i);
      var oldCValue = c[cIndex];
      c[cIndex] = ((alpha * total) + (beta * oldCValue));
    }
  }

  return outputBuffer;
}

function matrixExtractChannels(input, startChannel, endChannel) {

  var inputDims = input._dims;
  var inputChannels = inputDims._dims[inputDims._dims.length - 1];
  var outputChannels = (endChannel - startChannel);

  console.assert((inputChannels % outputChannels) == 0);

  var outputDims = new Dimensions(inputDims);
  outputDims._dims[outputDims._dims.length - 1] = outputChannels;
  var output = new Buffer(outputDims);

  var inputData = input._data;
  var inputOffset = startChannel;
  var inputElementCount = inputDims.elementCount();
  var outputData = output._data;
  var outputOffset = 0;

  while (inputOffset < inputElementCount) {
    var sourceRow = inputData.subarray(inputOffset, (inputOffset + outputChannels));
    outputData.set(sourceRow, outputOffset);
    inputOffset += inputChannels;
    outputOffset += outputChannels;
  }

  return output;
}

function matrixJoinChannels(inputs) {
  var inputsCount = inputs.length;
  var firstInput = inputs[0];
  var inputDims = firstInput._dims;
  var inputChannels = inputDims._dims[inputDims._dims.length - 1];
  var outputChannels = (inputChannels * inputsCount);

  var outputDims = new Dimensions(inputDims);
  outputDims._dims[outputDims._dims.length - 1] = outputChannels;
  var output = new Buffer(outputDims);

  var inputDatas = [];
  var input;
  for (var index = 0; index < inputsCount; index += 1) {
    input = inputs[index];
    console.assert(input._dims.areEqualTo(inputDims));

    if(input._tensor && input._data === null){
        input._data = input.getTensorData();
    }

    inputDatas.push({data: input._data, offset: 0});
  }

  var outputData = output._data;
  var outputOffset = 0;
  var outputElementCount = outputDims.elementCount();

  while (outputOffset < outputElementCount) {
    for (var index = 0; index < inputsCount; index += 1) {
      input = inputDatas[index];
      var sourceRow = input.data.subarray(input.offset, (input.offset + inputChannels));
      outputData.set(sourceRow, outputOffset);
      input.offset += inputChannels;
      outputOffset += inputChannels;
    }
  }

  return output;
}

function matrixDot(input, weights, bias, dropout) {

  //console.log("Dot");

  var inputDims = input._dims;
  // We're expecting (# of images, # of values)
  console.assert(inputDims._dims.length == 2);

  var imageCount = inputDims._dims[0];
  var inputValuesCount = inputDims._dims[1];

  var weightsDims = weights._dims;
  // We're expecting (# of values in input, # of output channels)
  console.assert(inputDims._dims.length == 2);
  console.assert(weightsDims._dims[0] == inputValuesCount);
  var outputChannels = weightsDims._dims[1];

  var outputDims = new Dimensions(imageCount, outputChannels);
  var output = new Buffer(outputDims);

  var scale;

  if (!g_dk && dropout > 0.0) {
    scale = (1.0 - dropout);
  } else {
    scale = 1.0;
  }


  var m = outputChannels;
  var n = inputDims._dims[0];
  var k = inputDims._dims[1];
  var alpha = 1.0;
  var lda = m;
  var ldb = k;
  var ldc = m;
  var beta = 0.0;

  if (weights._bitsPerFloat === 32) {
    output = matrixGemm(
      m,
      n,
      k,
      alpha,
      weights,
      lda,
      input,
      ldb,
      beta,
      output,
      ldc
    );
  } else {
    output = matrixGemmScaleA(
      m,
      n,
      k,
      alpha,
      weights,
      lda,
      input,
      ldb,
      beta,
      output,
      ldc,
      weights._spread,
      weights._min,
      weights._bitsPerFloat,
      bias,
      scale
    );

  }

    if(input._tensor){
        input._tensor.delete();
        input._tensor = null;
    }
  output.reshape(outputDims);

  return output;
}

function matrixScaleInplace(output, scale) {
  var outputData = output._data;
  var outputDataLength = output._dims.elementCount();
  var outputOffset = 0;
  while (outputOffset < outputDataLength) {
    outputData[outputOffset] *= scale;
    outputOffset += 1;
  }
}

function matrixLocalResponse(input, windowSize, k, alpha, beta) {

  var inputDims = input._dims;
  // We're expecting (# of images, height, width, # of channels)
  console.assert(inputDims._dims.length == 4);

  var inputChannels = inputDims._dims[3];

  var magnitude = new Buffer(inputDims);

  var magBuffer = new Buffer(new Dimensions(inputChannels));
  var magBufferData = magBuffer._data;

  var inputData = input._data;
  var inputOffset = 0;
  var inputElementCount = inputDims.elementCount();
  var magnitudeData = magnitude._data;
  var magnitudeOffset = 0;

  var alphaOverSize = (alpha / windowSize);
  var prereadCount = Math.floor((windowSize / 2) - 0);

  while (inputOffset < inputElementCount) {

    for (var channel = 0; channel < inputChannels; channel += 1) {
      var inputValue = inputData[inputOffset + channel];
      magBufferData[channel] = (inputValue * inputValue * alphaOverSize);
    }

    var averagedScale = 0;
    for (var index = 0; index < prereadCount; index += 1) {
      averagedScale += magBufferData[index];
    }

    for (var channel = 0; channel < inputChannels; channel += 1) {
      var rightIndex = (channel + Math.floor(windowSize / 2));
      if (rightIndex < inputChannels) {
        averagedScale += magBufferData[rightIndex];
      }
      magnitudeData[magnitudeOffset + channel] = (averagedScale + k);
      var leftIndex = (channel - Math.floor(windowSize / 2));
      if (leftIndex >= 0) {
        averagedScale -= magBufferData[leftIndex];
      }
    }

    inputOffset += inputChannels;
    magnitudeOffset += inputChannels;
  }

  var output = new Buffer(inputDims);

  inputOffset = 0;
  magnitudeOffset = 0;
  var outputData = output._data;
  while (inputOffset < inputElementCount) {

    var inputValue = inputData[inputOffset];
    var magnitudeValue = magnitudeData[magnitudeOffset];

    var outputValue = (Math.pow(magnitudeValue, -beta) * inputValue);
    if (isNaN(outputValue)) {
      outputValue = 0.0;
    }
    outputData[inputOffset] = outputValue;

    inputOffset += 1;
    magnitudeOffset += 1;
  }

  return output;
}

function matrixMaxPatch(input, patchWidth, stride) {

    var inputDims = input._dims._dims;
    var imageCount = inputDims[0];

    var N = inputDims[2],
        M = inputDims[1],
        factor = patchWidth,
        channels = inputDims[3];

    var N_out = Math.floor((N - factor) / stride) + 1;
    var M_out = Math.floor((M - factor) / stride) + 1;

    var outputDims = new Dimensions(imageCount, M_out , N_out, channels);
    var output;

    console.assert((imageCount === 1), 'Only handles the single-image case');

  if (g_useWebGL) {
      output = new Buffer(outputDims, null);

    var t3;

    if(input._tensor === null){
      //console.log("creating texture for sdwns.");
      input._tensor = new weblas.pipeline.Tensor([M, N * channels], input._data);
  } else if(input._tensor.shape[0] !== M || input._tensor.shape[1] !== N * channels) {
      input._tensor = input._tensor.reshape([M, N * channels]);
  }

    t3 = weblas.pipeline.sdwns(channels, factor, stride, input._tensor);

    input._tensor.delete();
    output._tensor = t3;

  } else {

/*
  if(input._tensor && input._data === null){
      input._data = input.getTensorData();
  }
  */
    outputData = naiveMaxPatch(input, patchWidth, stride);

    outputData.reshape(outputDims);
    output = outputData;


  }
  return output;
}

function naiveMaxPatch(input, patchWidth, stride) {

  var inputDims = input._dims;
  // We're expecting (# of images, height, width, # of channels)
  console.assert(inputDims._dims.length == 4);

  var imageCount = inputDims._dims[0];
  var inputWidth = inputDims._dims[2];
  var inputHeight = inputDims._dims[1];
  var inputChannels = inputDims._dims[3];

  var outputWidth = Math.round(Math.floor((inputWidth - patchWidth) / stride) + 1);
  var outputHeight = Math.round(Math.floor((inputHeight - patchWidth) / stride) + 1);
  var outputChannels = inputChannels;
  var outputDims = new Dimensions(imageCount, outputHeight, outputWidth, outputChannels);
  var output = new Buffer(outputDims);

  var inputData = input._data;
  var outputData = output._data;

  for (var imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
    for (var outputY = 0; outputY < outputHeight; outputY += 1) {
      var inputOriginY = (outputY * stride);
      for (var outputX = 0; outputX < outputWidth; outputX += 1) {
        var inputOriginX = (outputX * stride);
        for (var outputChannel = 0; outputChannel < outputChannels; outputChannel += 1) {
          var patchMax = -Number.MAX_VALUE;
          for (var patchY = 0; patchY < patchWidth; patchY += 1) {
            var inputY = Math.round(Math.min((inputHeight - 1), (inputOriginY + patchY)));
            for (var patchX = 0; patchX < patchWidth; patchX += 1) {
              var inputX = Math.round(Math.min((inputWidth - 1), (inputOriginX + patchX)));
              var inputOffset = inputDims.offset(imageIndex, inputY, inputX, outputChannel);
              var inputValue = input._data[inputOffset];
              patchMax = Math.max(patchMax, inputValue);
            }
          }
          var outputOffset = outputDims.offset(imageIndex, outputY, outputX, outputChannel);
          outputData[outputOffset] = patchMax;
        }
      }
    }
  }

  return output;
}

function matrixMax(input, maxValue) {
  if (g_useWebGL) {
    var inputDims = input._dims._dims;

    var M, N;

    var t3;

    if(input._tensor === null){
        //console.log("creating texture for sclmp.");

        M = inputDims[1];
        n = inputDims.length >= 3 ? inputDims[2] : 1;
        c = inputDims.length >= 4 ? inputDims[3] : 1;

        if (n === 1) {
          n = M;
          M = 1;
        }
        N = n * c;
        input._tensor = new weblas.pipeline.Tensor([M, N], input._data);
    }

    t3 = weblas.pipeline.sclmp(maxValue, null, input._tensor);

    input._tensor.delete();
    var output = new Buffer(inputDims, null);
    output._tensor = t3;

    return output;
  } else {

    return naiveMax(input, maxValue);

  }
}

function naiveMax(input, maxValue) {
  var inputDims = input._dims;
  var output = new Buffer(inputDims);

  var inputData = input._data;
  var inputOffset = 0;
  var inputElementCount = inputDims.elementCount();
  var outputData = output._data;

  while (inputOffset < inputElementCount) {
    var inputValue = inputData[inputOffset];
    outputData[inputOffset] = Math.max(inputValue, maxValue);
    inputOffset += 1;
  }

  return output;
}

function matrixSoftmax(input) {

  var inputDims = input._dims;
  // We're expecting (# of images, # of values)
  console.assert(inputDims._dims.length == 2);

  var imageCount = inputDims._dims[0];
  var inputValuesCount = inputDims._dims[1];

  var output = new Buffer(inputDims);

  var inputData = input._data;
  var outputData = output._data;

  for (var imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
    var imageOffsetStart = (imageIndex * inputValuesCount);

    // Rescales the array to accentuate the positive, see here for details:
    // http://stackoverflow.com/questions/9906136/implementation-of-a-softmax-activation-function-for-neural-networks
    var max = -Number.MAX_VALUE;
    var inputOffset = imageOffsetStart;
    while (inputOffset < inputValuesCount) {
      var inputValue = inputData[inputOffset];
      max = Math.max(max, inputValue);
      inputOffset += 1;
    }

    var sum = 0;
    inputOffset = imageOffsetStart;
    while (inputOffset < inputValuesCount) {
      var inputValue = inputData[inputOffset];
      var normalized = (inputValue - max);
      var outputValue = Math.exp(normalized);
      outputData[inputOffset] = outputValue;
      sum += outputValue;
      inputOffset += 1;
    }

    var recipSum = (1.0 / sum);

    inputOffset = imageOffsetStart;
    while (inputOffset < inputValuesCount) {
      outputData[inputOffset] *= recipSum;
      inputOffset += 1;
    }
  }

  return output;
}

// Shim for Internet Explorer's missing slice(), see
// http://stackoverflow.com/questions/21440050/arraybuffer-prototype-slice-shim-for-ie
if (!ArrayBuffer.prototype.slice) {
  //Returns a new ArrayBuffer whose contents are a copy of this ArrayBuffer's
  //bytes from `begin`, inclusive, up to `end`, exclusive
  ArrayBuffer.prototype.slice = function (begin, end) {
    //If `begin` is unspecified, Chrome assumes 0, so we do the same
    if (begin === void 0) {
      begin = 0;
    }

    //If `end` is unspecified, the new ArrayBuffer contains all
    //bytes from `begin` to the end of this ArrayBuffer.
    if (end === void 0) {
      end = this.byteLength;
    }

    //Chrome converts the values to integers via flooring
    begin = Math.floor(begin);
    end = Math.floor(end);

    //If either `begin` or `end` is negative, it refers to an
    //index from the end of the array, as opposed to from the beginning.
    if (begin < 0) {
      begin += this.byteLength;
    }
    if (end < 0) {
      end += this.byteLength;
    }

    //The range specified by the `begin` and `end` values is clamped to the
    //valid index range for the current array.
    begin = Math.min(Math.max(0, begin), this.byteLength);
    end = Math.min(Math.max(0, end), this.byteLength);

    //If the computed length of the new ArrayBuffer would be negative, it
    //is clamped to zero.
    if (end - begin <= 0) {
      return new ArrayBuffer(0);
    }

    var result = new ArrayBuffer(end - begin);
    var resultBytes = new Uint8Array(result);
    var sourceBytes = new Uint8Array(this, begin, end - begin);

    resultBytes.set(sourceBytes);

    return result;
  };
}

  
  // exports
  global.Buffer = Buffer;
  global.matrixCorrelate = matrixCorrelate;
  global.matrixAddInplace = matrixAddInplace;
  global.matrixInsertMargin = matrixInsertMargin;
})(jpcnn);
var convnetjs = convnetjs || { REVISION: 'ALPHA' };
(function(global) {
  "use strict";

  // Random number utilities
  var return_v = false;
  var v_val = 0.0;
  var gaussRandom = function() {
    if(return_v) { 
      return_v = false;
      return v_val; 
    }
    var u = 2*Math.random()-1;
    var v = 2*Math.random()-1;
    var r = u*u + v*v;
    if(r == 0 || r > 1) return gaussRandom();
    var c = Math.sqrt(-2*Math.log(r)/r);
    v_val = v*c; // cache this
    return_v = true;
    return u*c;
  }
  var randf = function(a, b) { return Math.random()*(b-a)+a; }
  var randi = function(a, b) { return Math.floor(Math.random()*(b-a)+a); }
  var randn = function(mu, std){ return mu+gaussRandom()*std; }

  // Array utilities
  var zeros = function(n) {
    if(typeof(n)==='undefined' || isNaN(n)) { return []; }
    if(typeof ArrayBuffer === 'undefined') {
      // lacking browser support
      var arr = new Array(n);
      for(var i=0;i<n;i++) { arr[i]= 0; }
      return arr;
    } else {
      return new Float64Array(n);
    }
  }

  var arrContains = function(arr, elt) {
    for(var i=0,n=arr.length;i<n;i++) {
      if(arr[i]===elt) return true;
    }
    return false;
  }

  var arrUnique = function(arr) {
    var b = [];
    for(var i=0,n=arr.length;i<n;i++) {
      if(!arrContains(b, arr[i])) {
        b.push(arr[i]);
      }
    }
    return b;
  }

  // return max and min of a given non-empty array.
  var maxmin = function(w) {
    if(w.length === 0) { return {}; } // ... ;s
    var maxv = w[0];
    var minv = w[0];
    var maxi = 0;
    var mini = 0;
    var n = w.length;
    for(var i=1;i<n;i++) {
      if(w[i] > maxv) { maxv = w[i]; maxi = i; } 
      if(w[i] < minv) { minv = w[i]; mini = i; } 
    }
    return {maxi: maxi, maxv: maxv, mini: mini, minv: minv, dv:maxv-minv};
  }

  // create random permutation of numbers, in range [0...n-1]
  var randperm = function(n) {
    var i = n,
        j = 0,
        temp;
    var array = [];
    for(var q=0;q<n;q++)array[q]=q;
    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  // sample from list lst according to probabilities in list probs
  // the two lists are of same size, and probs adds up to 1
  var weightedSample = function(lst, probs) {
    var p = randf(0, 1.0);
    var cumprob = 0.0;
    for(var k=0,n=lst.length;k<n;k++) {
      cumprob += probs[k];
      if(p < cumprob) { return lst[k]; }
    }
  }

  // syntactic sugar function for getting default parameter values
  var getopt = function(opt, field_name, default_value) {
    return typeof opt[field_name] !== 'undefined' ? opt[field_name] : default_value;
  }

  function assert(condition, message) {
    if (!condition) {
      message = message || "Assertion failed";
      if (typeof Error !== "undefined") {
        throw new Error(message);
      }
      throw message; // Fallback
    }
  }

  global.randf = randf;
  global.randi = randi;
  global.randn = randn;
  global.zeros = zeros;
  global.maxmin = maxmin;
  global.randperm = randperm;
  global.weightedSample = weightedSample;
  global.arrUnique = arrUnique;
  global.arrContains = arrContains;
  global.getopt = getopt;
  global.assert = assert;
  
})(convnetjs);
(function(global) {
  "use strict";

  // Vol is the basic building block of all data in a net.
  // it is essentially just a 3D volume of numbers, with a
  // width (sx), height (sy), and depth (depth).
  // it is used to hold data for all filters, all volumes,
  // all weights, and also stores all gradients w.r.t. 
  // the data. c is optionally a value to initialize the volume
  // with. If c is missing, fills the Vol with random numbers.
  var Vol = function(sx, sy, depth, c) {
    // this is how you check if a variable is an array. Oh, Javascript :)
    if(Object.prototype.toString.call(sx) === '[object Array]') {
      // we were given a list in sx, assume 1D volume and fill it up
      this.sx = 1;
      this.sy = 1;
      this.depth = sx.length;
      // we have to do the following copy because we want to use
      // fast typed arrays, not an ordinary javascript array
      this.w = global.zeros(this.depth);
      this.dw = global.zeros(this.depth);
      for(var i=0;i<this.depth;i++) {
        this.w[i] = sx[i];
      }
    } else {
      // we were given dimensions of the vol
      this.sx = sx;
      this.sy = sy;
      this.depth = depth;
      var n = sx*sy*depth;
      this.w = global.zeros(n);
      this.dw = global.zeros(n);
      if(typeof c === 'undefined') {
        // weight normalization is done to equalize the output
        // variance of every neuron, otherwise neurons with a lot
        // of incoming connections have outputs of larger variance
        var scale = Math.sqrt(1.0/(sx*sy*depth));
        for(var i=0;i<n;i++) { 
          this.w[i] = global.randn(0.0, scale);
        }
      } else {
        for(var i=0;i<n;i++) { 
          this.w[i] = c;
        }
      }
    }
  }

  Vol.prototype = {
    get: function(x, y, d) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      return this.w[ix];
    },
    set: function(x, y, d, v) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      this.w[ix] = v; 
    },
    add: function(x, y, d, v) { 
      var ix=((this.sx * y)+x)*this.depth+d;
      this.w[ix] += v; 
    },
    get_grad: function(x, y, d) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      return this.dw[ix]; 
    },
    set_grad: function(x, y, d, v) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      this.dw[ix] = v; 
    },
    add_grad: function(x, y, d, v) { 
      var ix = ((this.sx * y)+x)*this.depth+d;
      this.dw[ix] += v; 
    },
    cloneAndZero: function() { return new Vol(this.sx, this.sy, this.depth, 0.0)},
    clone: function() {
      var V = new Vol(this.sx, this.sy, this.depth, 0.0);
      var n = this.w.length;
      for(var i=0;i<n;i++) { V.w[i] = this.w[i]; }
      return V;
    },
    addFrom: function(V) { for(var k=0;k<this.w.length;k++) { this.w[k] += V.w[k]; }},
    addFromScaled: function(V, a) { for(var k=0;k<this.w.length;k++) { this.w[k] += a*V.w[k]; }},
    setConst: function(a) { for(var k=0;k<this.w.length;k++) { this.w[k] = a; }},

    toJSON: function() {
      // todo: we may want to only save d most significant digits to save space
      var json = {}
      json.sx = this.sx; 
      json.sy = this.sy;
      json.depth = this.depth;
      json.w = this.w;
      return json;
      // we wont back up gradients to save space
    },
    fromJSON: function(json) {
      this.sx = json.sx;
      this.sy = json.sy;
      this.depth = json.depth;

      var n = this.sx*this.sy*this.depth;
      this.w = global.zeros(n);
      this.dw = global.zeros(n);
      // copy over the elements.
      for(var i=0;i<n;i++) {
        this.w[i] = json.w[i];
      }
    }
  }

  global.Vol = Vol;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // Volume utilities
  // intended for use with data augmentation
  // crop is the size of output
  // dx,dy are offset wrt incoming volume, of the shift
  // fliplr is boolean on whether we also want to flip left<->right
  var augment = function(V, crop, dx, dy, fliplr) {
    // note assumes square outputs of size crop x crop
    if(typeof(fliplr)==='undefined') var fliplr = false;
    if(typeof(dx)==='undefined') var dx = global.randi(0, V.sx - crop);
    if(typeof(dy)==='undefined') var dy = global.randi(0, V.sy - crop);
    
    // randomly sample a crop in the input volume
    var W;
    if(crop !== V.sx || dx!==0 || dy!==0) {
      W = new Vol(crop, crop, V.depth, 0.0);
      for(var x=0;x<crop;x++) {
        for(var y=0;y<crop;y++) {
          if(x+dx<0 || x+dx>=V.sx || y+dy<0 || y+dy>=V.sy) continue; // oob
          for(var d=0;d<V.depth;d++) {
           W.set(x,y,d,V.get(x+dx,y+dy,d)); // copy data over
          }
        }
      }
    } else {
      W = V;
    }

    if(fliplr) {
      // flip volume horziontally
      var W2 = W.cloneAndZero();
      for(var x=0;x<W.sx;x++) {
        for(var y=0;y<W.sy;y++) {
          for(var d=0;d<W.depth;d++) {
           W2.set(x,y,d,W.get(W.sx - x - 1,y,d)); // copy data over
          }
        }
      }
      W = W2; //swap
    }
    return W;
  }

  // img is a DOM element that contains a loaded image
  // returns a Vol of size (W, H, 4). 4 is for RGBA
  var img_to_vol = function(img, convert_grayscale) {

    if(typeof(convert_grayscale)==='undefined') var convert_grayscale = false;

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");

    // due to a Firefox bug
    try {
      ctx.drawImage(img, 0, 0);
    } catch (e) {
      if (e.name === "NS_ERROR_NOT_AVAILABLE") {
        // sometimes happens, lets just abort
        return false;
      } else {
        throw e;
      }
    }

    try {
      var img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
      if(e.name === 'IndexSizeError') {
        return false; // not sure what causes this sometimes but okay abort
      } else {
        throw e;
      }
    }

    // prepare the input: get pixels and normalize them
    var p = img_data.data;
    var W = img.width;
    var H = img.height;
    var pv = []
    for(var i=0;i<p.length;i++) {
      pv.push(p[i]/255.0-0.5); // normalize image pixels to [-0.5, 0.5]
    }
    var x = new Vol(W, H, 4, 0.0); //input volume (image)
    x.w = pv;

    if(convert_grayscale) {
      // flatten into depth=1 array
      var x1 = new Vol(W, H, 1, 0.0);
      for(var i=0;i<W;i++) {
        for(var j=0;j<H;j++) {
          x1.set(i,j,0,x.get(i,j,0));
        }
      }
      x = x1;
    }

    return x;
  }
  
  global.augment = augment;
  global.img_to_vol = img_to_vol;

})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // This file contains all layers that do dot products with input,
  // but usually in a different connectivity pattern and weight sharing
  // schemes: 
  // - FullyConn is fully connected dot products 
  // - ConvLayer does convolutions (so weight sharing spatially)
  // putting them together in one file because they are very similar
  var ConvLayer = function(opt) {
    var opt = opt || {};

    // required
    this.out_depth = opt.filters;
    this.sx = opt.sx; // filter size. Should be odd if possible, it's cleaner.
    this.in_depth = opt.in_depth;
    this.in_sx = opt.in_sx;
    this.in_sy = opt.in_sy;
    
    // optional
    this.sy = typeof opt.sy !== 'undefined' ? opt.sy : this.sx;
    this.stride = typeof opt.stride !== 'undefined' ? opt.stride : 1; // stride at which we apply filters to input volume
    this.pad = typeof opt.pad !== 'undefined' ? opt.pad : 0; // amount of 0 padding to add around borders of input volume
    this.l1_decay_mul = typeof opt.l1_decay_mul !== 'undefined' ? opt.l1_decay_mul : 0.0;
    this.l2_decay_mul = typeof opt.l2_decay_mul !== 'undefined' ? opt.l2_decay_mul : 1.0;

    // computed
    // note we are doing floor, so if the strided convolution of the filter doesnt fit into the input
    // volume exactly, the output volume will be trimmed and not contain the (incomplete) computed
    // final application.
    this.out_sx = Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
    this.out_sy = Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
    this.layer_type = 'conv';

    // initializations
    var bias = typeof opt.bias_pref !== 'undefined' ? opt.bias_pref : 0.0;
    this.filters = [];
    for(var i=0;i<this.out_depth;i++) { this.filters.push(new Vol(this.sx, this.sy, this.in_depth)); }
    this.biases = new Vol(1, 1, this.out_depth, bias);
  }
  ConvLayer.prototype = {
    forward: function(V, is_training) {
      // optimized code by @mdda that achieves 2x speedup over previous version

      this.in_act = V;
      var A = new Vol(this.out_sx |0, this.out_sy |0, this.out_depth |0, 0.0);
      
      var V_sx = V.sx |0;
      var V_sy = V.sy |0;
      var xy_stride = this.stride |0;

      for(var d=0;d<this.out_depth;d++) {
        var f = this.filters[d];
        var x = -this.pad |0;
        var y = -this.pad |0;
        for(var ay=0; ay<this.out_sy; y+=xy_stride,ay++) {  // xy_stride
          x = -this.pad |0;
          for(var ax=0; ax<this.out_sx; x+=xy_stride,ax++) {  // xy_stride

            // convolve centered at this particular location
            var a = 0.0;
            for(var fy=0;fy<f.sy;fy++) {
              var oy = y+fy; // coordinates in the original input array coordinates
              for(var fx=0;fx<f.sx;fx++) {
                var ox = x+fx;
                if(oy>=0 && oy<V_sy && ox>=0 && ox<V_sx) {
                  for(var fd=0;fd<f.depth;fd++) {
                    // avoid function call overhead (x2) for efficiency, compromise modularity :(
                    a += f.w[((f.sx * fy)+fx)*f.depth+fd] * V.w[((V_sx * oy)+ox)*V.depth+fd];
                  }
                }
              }
            }
            a += this.biases.w[d];
            A.set(ax, ay, d, a);
          }
        }
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() {

      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt bottom data, we're about to fill it

      var V_sx = V.sx |0;
      var V_sy = V.sy |0;
      var xy_stride = this.stride |0;

      for(var d=0;d<this.out_depth;d++) {
        var f = this.filters[d];
        var x = -this.pad |0;
        var y = -this.pad |0;
        for(var ay=0; ay<this.out_sy; y+=xy_stride,ay++) {  // xy_stride
          x = -this.pad |0;
          for(var ax=0; ax<this.out_sx; x+=xy_stride,ax++) {  // xy_stride

            // convolve centered at this particular location
            var chain_grad = this.out_act.get_grad(ax,ay,d); // gradient from above, from chain rule
            for(var fy=0;fy<f.sy;fy++) {
              var oy = y+fy; // coordinates in the original input array coordinates
              for(var fx=0;fx<f.sx;fx++) {
                var ox = x+fx;
                if(oy>=0 && oy<V_sy && ox>=0 && ox<V_sx) {
                  for(var fd=0;fd<f.depth;fd++) {
                    // avoid function call overhead (x2) for efficiency, compromise modularity :(
                    var ix1 = ((V_sx * oy)+ox)*V.depth+fd;
                    var ix2 = ((f.sx * fy)+fx)*f.depth+fd;
                    f.dw[ix2] += V.w[ix1]*chain_grad;
                    V.dw[ix1] += f.w[ix2]*chain_grad;
                  }
                }
              }
            }
            this.biases.dw[d] += chain_grad;
          }
        }
      }
    },
    getParamsAndGrads: function() {
      var response = [];
      for(var i=0;i<this.out_depth;i++) {
        response.push({params: this.filters[i].w, grads: this.filters[i].dw, l2_decay_mul: this.l2_decay_mul, l1_decay_mul: this.l1_decay_mul});
      }
      response.push({params: this.biases.w, grads: this.biases.dw, l1_decay_mul: 0.0, l2_decay_mul: 0.0});
      return response;
    },
    toJSON: function() {
      var json = {};
      json.sx = this.sx; // filter size in x, y dims
      json.sy = this.sy;
      json.stride = this.stride;
      json.in_depth = this.in_depth;
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.l1_decay_mul = this.l1_decay_mul;
      json.l2_decay_mul = this.l2_decay_mul;
      json.pad = this.pad;
      json.filters = [];
      for(var i=0;i<this.filters.length;i++) {
        json.filters.push(this.filters[i].toJSON());
      }
      json.biases = this.biases.toJSON();
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.sx = json.sx; // filter size in x, y dims
      this.sy = json.sy;
      this.stride = json.stride;
      this.in_depth = json.in_depth; // depth of input volume
      this.filters = [];
      this.l1_decay_mul = typeof json.l1_decay_mul !== 'undefined' ? json.l1_decay_mul : 1.0;
      this.l2_decay_mul = typeof json.l2_decay_mul !== 'undefined' ? json.l2_decay_mul : 1.0;
      this.pad = typeof json.pad !== 'undefined' ? json.pad : 0;
      for(var i=0;i<json.filters.length;i++) {
        var v = new Vol(0,0,0,0);
        v.fromJSON(json.filters[i]);
        this.filters.push(v);
      }
      this.biases = new Vol(0,0,0,0);
      this.biases.fromJSON(json.biases);
    }
  }

  var FullyConnLayer = function(opt) {
    var opt = opt || {};

    // required
    // ok fine we will allow 'filters' as the word as well
    this.out_depth = typeof opt.num_neurons !== 'undefined' ? opt.num_neurons : opt.filters;

    // optional 
    this.l1_decay_mul = typeof opt.l1_decay_mul !== 'undefined' ? opt.l1_decay_mul : 0.0;
    this.l2_decay_mul = typeof opt.l2_decay_mul !== 'undefined' ? opt.l2_decay_mul : 1.0;

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'fc';

    // initializations
    var bias = typeof opt.bias_pref !== 'undefined' ? opt.bias_pref : 0.0;
    this.filters = [];
    for(var i=0;i<this.out_depth ;i++) { this.filters.push(new Vol(1, 1, this.num_inputs)); }
    this.biases = new Vol(1, 1, this.out_depth, bias);
  }

  FullyConnLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var A = new Vol(1, 1, this.out_depth, 0.0);
      var Vw = V.w;
      for(var i=0;i<this.out_depth;i++) {
        var a = 0.0;
        var wi = this.filters[i].w;
        for(var d=0;d<this.num_inputs;d++) {
          a += Vw[d] * wi[d]; // for efficiency use Vols directly for now
        }
        a += this.biases.w[i];
        A.w[i] = a;
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out the gradient in input Vol
      
      // compute gradient wrt weights and data
      for(var i=0;i<this.out_depth;i++) {
        var tfi = this.filters[i];
        var chain_grad = this.out_act.dw[i];
        for(var d=0;d<this.num_inputs;d++) {
          V.dw[d] += tfi.w[d]*chain_grad; // grad wrt input data
          tfi.dw[d] += V.w[d]*chain_grad; // grad wrt params
        }
        this.biases.dw[i] += chain_grad;
      }
    },
    getParamsAndGrads: function() {
      var response = [];
      for(var i=0;i<this.out_depth;i++) {
        response.push({params: this.filters[i].w, grads: this.filters[i].dw, l1_decay_mul: this.l1_decay_mul, l2_decay_mul: this.l2_decay_mul});
      }
      response.push({params: this.biases.w, grads: this.biases.dw, l1_decay_mul: 0.0, l2_decay_mul: 0.0});
      return response;
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      json.l1_decay_mul = this.l1_decay_mul;
      json.l2_decay_mul = this.l2_decay_mul;
      json.filters = [];
      for(var i=0;i<this.filters.length;i++) {
        json.filters.push(this.filters[i].toJSON());
      }
      json.biases = this.biases.toJSON();
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
      this.l1_decay_mul = typeof json.l1_decay_mul !== 'undefined' ? json.l1_decay_mul : 1.0;
      this.l2_decay_mul = typeof json.l2_decay_mul !== 'undefined' ? json.l2_decay_mul : 1.0;
      this.filters = [];
      for(var i=0;i<json.filters.length;i++) {
        var v = new Vol(0,0,0,0);
        v.fromJSON(json.filters[i]);
        this.filters.push(v);
      }
      this.biases = new Vol(0,0,0,0);
      this.biases.fromJSON(json.biases);
    }
  }

  global.ConvLayer = ConvLayer;
  global.FullyConnLayer = FullyConnLayer;
  
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  var PoolLayer = function(opt) {

    var opt = opt || {};

    // required
    this.sx = opt.sx; // filter size
    this.in_depth = opt.in_depth;
    this.in_sx = opt.in_sx;
    this.in_sy = opt.in_sy;

    // optional
    this.sy = typeof opt.sy !== 'undefined' ? opt.sy : this.sx;
    this.stride = typeof opt.stride !== 'undefined' ? opt.stride : 2;
    this.pad = typeof opt.pad !== 'undefined' ? opt.pad : 0; // amount of 0 padding to add around borders of input volume

    // computed
    this.out_depth = this.in_depth;
    this.out_sx = Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
    this.out_sy = Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
    this.layer_type = 'pool';
    // store switches for x,y coordinates for where the max comes from, for each output neuron
    this.switchx = global.zeros(this.out_sx*this.out_sy*this.out_depth);
    this.switchy = global.zeros(this.out_sx*this.out_sy*this.out_depth);
  }

  PoolLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);
      
      var n=0; // a counter for switches
      for(var d=0;d<this.out_depth;d++) {
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {

            // convolve centered at this particular location
            var a = -99999; // hopefully small enough ;\
            var winx=-1,winy=-1;
            for(var fx=0;fx<this.sx;fx++) {
              for(var fy=0;fy<this.sy;fy++) {
                var oy = y+fy;
                var ox = x+fx;
                if(oy>=0 && oy<V.sy && ox>=0 && ox<V.sx) {
                  var v = V.get(ox, oy, d);
                  // perform max pooling and store pointers to where
                  // the max came from. This will speed up backprop 
                  // and can help make nice visualizations in future
                  if(v > a) { a = v; winx=ox; winy=oy;}
                }
              }
            }
            this.switchx[n] = winx;
            this.switchy[n] = winy;
            n++;
            A.set(ax, ay, d, a);
          }
        }
      }
      this.out_act = A;
      return this.out_act;
    },
    backward: function() { 
      // pooling layers have no parameters, so simply compute 
      // gradient wrt data here
      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data
      var A = this.out_act; // computed in forward pass 

      var n = 0;
      for(var d=0;d<this.out_depth;d++) {
        var x = -this.pad;
        var y = -this.pad;
        for(var ax=0; ax<this.out_sx; x+=this.stride,ax++) {
          y = -this.pad;
          for(var ay=0; ay<this.out_sy; y+=this.stride,ay++) {

            var chain_grad = this.out_act.get_grad(ax,ay,d);
            V.add_grad(this.switchx[n], this.switchy[n], d, chain_grad);
            n++;

          }
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.sx = this.sx;
      json.sy = this.sy;
      json.stride = this.stride;
      json.in_depth = this.in_depth;
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.pad = this.pad;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.sx = json.sx;
      this.sy = json.sy;
      this.stride = json.stride;
      this.in_depth = json.in_depth;
      this.pad = typeof json.pad !== 'undefined' ? json.pad : 0; // backwards compatibility
      this.switchx = global.zeros(this.out_sx*this.out_sy*this.out_depth); // need to re-init these appropriately
      this.switchy = global.zeros(this.out_sx*this.out_sy*this.out_depth);
    }
  }

  global.PoolLayer = PoolLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  var InputLayer = function(opt) {
    var opt = opt || {};

    // this is a bit silly but lets allow people to specify either ins or outs
    this.out_sx = typeof opt.out_sx !== 'undefined' ? opt.out_sx : opt.in_sx;
    this.out_sy = typeof opt.out_sy !== 'undefined' ? opt.out_sy : opt.in_sy;
    this.out_depth = typeof opt.out_depth !== 'undefined' ? opt.out_depth : opt.in_depth;
    this.layer_type = 'input';
  }
  InputLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V;
      return this.out_act; // dummy identity function for now
    },
    backward: function() { },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  global.InputLayer = InputLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Layers that implement a loss. Currently these are the layers that 
  // can initiate a backward() pass. In future we probably want a more 
  // flexible system that can accomodate multiple losses to do multi-task
  // learning, and stuff like that. But for now, one of the layers in this
  // file must be the final layer in a Net.

  // This is a classifier, with N discrete classes from 0 to N-1
  // it gets a stream of N incoming numbers and computes the softmax
  // function (exponentiate and normalize to sum to 1 as probabilities should)
  var SoftmaxLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'softmax';
  }

  SoftmaxLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = new Vol(1, 1, this.out_depth, 0.0);

      // compute max activation
      var as = V.w;
      var amax = V.w[0];
      for(var i=1;i<this.out_depth;i++) {
        if(as[i] > amax) amax = as[i];
      }

      // compute exponentials (carefully to not blow up)
      var es = global.zeros(this.out_depth);
      var esum = 0.0;
      for(var i=0;i<this.out_depth;i++) {
        var e = Math.exp(as[i] - amax);
        esum += e;
        es[i] = e;
      }

      // normalize and output to sum to one
      for(var i=0;i<this.out_depth;i++) {
        es[i] /= esum;
        A.w[i] = es[i];
      }

      this.es = es; // save these for backprop
      this.out_act = A;
      return this.out_act;
    },
    backward: function(y) {

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol

      for(var i=0;i<this.out_depth;i++) {
        var indicator = i === y ? 1.0 : 0.0;
        var mul = -(indicator - this.es[i]);
        x.dw[i] = mul;
      }

      // loss is the class negative log likelihood
      return -Math.log(this.es[y]);
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }

  // implements an L2 regression cost layer,
  // so penalizes \sum_i(||x_i - y_i||^2), where x is its input
  // and y is the user-provided array of "correct" values.
  var RegressionLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'regression';
  }

  RegressionLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V;
      return V; // identity function
    },
    // y is a list here of size num_inputs
    backward: function(y) { 

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol
      var loss = 0.0;
      if(y instanceof Array || y instanceof Float64Array) {
        for(var i=0;i<this.out_depth;i++) {
          var dy = x.w[i] - y[i];
          x.dw[i] = dy;
          loss += 2*dy*dy;
        }
      } else {
        // assume it is a struct with entries .dim and .val
        // and we pass gradient only along dimension dim to be equal to val
        var i = y.dim;
        var yi = y.val;
        var dy = x.w[i] - yi;
        x.dw[i] = dy;
        loss += 2*dy*dy;
      }
      return loss;
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }

  var SVMLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.num_inputs = opt.in_sx * opt.in_sy * opt.in_depth;
    this.out_depth = this.num_inputs;
    this.out_sx = 1;
    this.out_sy = 1;
    this.layer_type = 'svm';
  }

  SVMLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      this.out_act = V; // nothing to do, output raw scores
      return V;
    },
    backward: function(y) {

      // compute and accumulate gradient wrt weights and bias of this layer
      var x = this.in_act;
      x.dw = global.zeros(x.w.length); // zero out the gradient of input Vol

      var yscore = x.w[y]; // score of ground truth
      var margin = 1.0;
      var loss = 0.0;
      for(var i=0;i<this.out_depth;i++) {
        if(-yscore + x.w[i] + margin > 0) {
          // violating example, apply loss
          // I love hinge loss, by the way. Truly.
          // Seriously, compare this SVM code with Softmax forward AND backprop code above
          // it's clear which one is superior, not only in code, simplicity
          // and beauty, but also in practice.
          x.dw[i] += 1;
          x.dw[y] -= 1;
          loss += -yscore + x.w[i] + margin;
        }
      }

      return loss;
    },
    getParamsAndGrads: function() { 
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.num_inputs = this.num_inputs;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.num_inputs = json.num_inputs;
    }
  }
  
  global.RegressionLayer = RegressionLayer;
  global.SoftmaxLayer = SoftmaxLayer;
  global.SVMLayer = SVMLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Implements ReLU nonlinearity elementwise
  // x -> max(0, x)
  // the output is in [0, inf)
  var ReluLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'relu';
  }
  ReluLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.clone();
      var N = V.w.length;
      var V2w = V2.w;
      for(var i=0;i<N;i++) { 
        if(V2w[i] < 0) V2w[i] = 0; // threshold at 0
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        if(V2.w[i] <= 0) V.dw[i] = 0; // threshold
        else V.dw[i] = V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  // Implements Sigmoid nnonlinearity elementwise
  // x -> 1/(1+e^(-x))
  // so the output is between 0 and 1.
  var SigmoidLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'sigmoid';
  }
  SigmoidLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.cloneAndZero();
      var N = V.w.length;
      var V2w = V2.w;
      var Vw = V.w;
      for(var i=0;i<N;i++) { 
        V2w[i] = 1.0/(1.0+Math.exp(-Vw[i]));
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        var v2wi = V2.w[i];
        V.dw[i] =  v2wi * (1.0 - v2wi) * V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }

  // Implements Maxout nnonlinearity that computes
  // x -> max(x)
  // where x is a vector of size group_size. Ideally of course,
  // the input size should be exactly divisible by group_size
  var MaxoutLayer = function(opt) {
    var opt = opt || {};

    // required
    this.group_size = typeof opt.group_size !== 'undefined' ? opt.group_size : 2;

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = Math.floor(opt.in_depth / this.group_size);
    this.layer_type = 'maxout';

    this.switches = global.zeros(this.out_sx*this.out_sy*this.out_depth); // useful for backprop
  }
  MaxoutLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var N = this.out_depth; 
      var V2 = new Vol(this.out_sx, this.out_sy, this.out_depth, 0.0);

      // optimization branch. If we're operating on 1D arrays we dont have
      // to worry about keeping track of x,y,d coordinates inside
      // input volumes. In convnets we do :(
      if(this.out_sx === 1 && this.out_sy === 1) {
        for(var i=0;i<N;i++) {
          var ix = i * this.group_size; // base index offset
          var a = V.w[ix];
          var ai = 0;
          for(var j=1;j<this.group_size;j++) {
            var a2 = V.w[ix+j];
            if(a2 > a) {
              a = a2;
              ai = j;
            }
          }
          V2.w[i] = a;
          this.switches[i] = ix + ai;
        }
      } else {
        var n=0; // counter for switches
        for(var x=0;x<V.sx;x++) {
          for(var y=0;y<V.sy;y++) {
            for(var i=0;i<N;i++) {
              var ix = i * this.group_size;
              var a = V.get(x, y, ix);
              var ai = 0;
              for(var j=1;j<this.group_size;j++) {
                var a2 = V.get(x, y, ix+j);
                if(a2 > a) {
                  a = a2;
                  ai = j;
                }
              }
              V2.set(x,y,i,a);
              this.switches[n] = ix + ai;
              n++;
            }
          }
        }

      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = this.out_depth;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data

      // pass the gradient through the appropriate switch
      if(this.out_sx === 1 && this.out_sy === 1) {
        for(var i=0;i<N;i++) {
          var chain_grad = V2.dw[i];
          V.dw[this.switches[i]] = chain_grad;
        }
      } else {
        // bleh okay, lets do this the hard way
        var n=0; // counter for switches
        for(var x=0;x<V2.sx;x++) {
          for(var y=0;y<V2.sy;y++) {
            for(var i=0;i<N;i++) {
              var chain_grad = V2.get_grad(x,y,i);
              V.set_grad(x,y,this.switches[n],chain_grad);
              n++;
            }
          }
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.group_size = this.group_size;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
      this.group_size = json.group_size;
      this.switches = global.zeros(this.group_size);
    }
  }

  // a helper function, since tanh is not yet part of ECMAScript. Will be in v6.
  function tanh(x) {
    var y = Math.exp(2 * x);
    return (y - 1) / (y + 1);
  }
  // Implements Tanh nnonlinearity elementwise
  // x -> tanh(x) 
  // so the output is between -1 and 1.
  var TanhLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'tanh';
  }
  TanhLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      var V2 = V.cloneAndZero();
      var N = V.w.length;
      for(var i=0;i<N;i++) { 
        V2.w[i] = tanh(V.w[i]);
      }
      this.out_act = V2;
      return this.out_act;
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        var v2wi = V2.w[i];
        V.dw[i] = (1.0 - v2wi * v2wi) * V2.dw[i];
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
    }
  }
  
  global.TanhLayer = TanhLayer;
  global.MaxoutLayer = MaxoutLayer;
  global.ReluLayer = ReluLayer;
  global.SigmoidLayer = SigmoidLayer;

})(convnetjs);

(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  // An inefficient dropout layer
  // Note this is not most efficient implementation since the layer before
  // computed all these activations and now we're just going to drop them :(
  // same goes for backward pass. Also, if we wanted to be efficient at test time
  // we could equivalently be clever and upscale during train and copy pointers during test
  // todo: make more efficient.
  var DropoutLayer = function(opt) {
    var opt = opt || {};

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'dropout';
    this.drop_prob = typeof opt.drop_prob !== 'undefined' ? opt.drop_prob : 0.5;
    this.dropped = global.zeros(this.out_sx*this.out_sy*this.out_depth);
  }
  DropoutLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;
      if(typeof(is_training)==='undefined') { is_training = false; } // default is prediction mode
      var V2 = V.clone();
      var N = V.w.length;
      if(is_training) {
        // do dropout
        for(var i=0;i<N;i++) {
          if(Math.random()<this.drop_prob) { V2.w[i]=0; this.dropped[i] = true; } // drop!
          else {this.dropped[i] = false;}
        }
      } else {
        // scale the activations during prediction
        for(var i=0;i<N;i++) { V2.w[i]*=this.drop_prob; }
      }
      this.out_act = V2;
      return this.out_act; // dummy identity function for now
    },
    backward: function() {
      var V = this.in_act; // we need to set dw of this
      var chain_grad = this.out_act;
      var N = V.w.length;
      V.dw = global.zeros(N); // zero out gradient wrt data
      for(var i=0;i<N;i++) {
        if(!(this.dropped[i])) { 
          V.dw[i] = chain_grad.dw[i]; // copy over the gradient
        }
      }
    },
    getParamsAndGrads: function() {
      return [];
    },
    toJSON: function() {
      var json = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.drop_prob = this.drop_prob;
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type; 
      this.drop_prob = json.drop_prob;
    }
  }
  

  global.DropoutLayer = DropoutLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // a bit experimental layer for now. I think it works but I'm not 100%
  // the gradient check is a bit funky. I'll look into this a bit later.
  // Local Response Normalization in window, along depths of volumes
  var LocalResponseNormalizationLayer = function(opt) {
    var opt = opt || {};

    // required
    this.k = opt.k;
    this.n = opt.n;
    this.alpha = opt.alpha;
    this.beta = opt.beta;

    // computed
    this.out_sx = opt.in_sx;
    this.out_sy = opt.in_sy;
    this.out_depth = opt.in_depth;
    this.layer_type = 'lrn';

    // checks
    if(this.n%2 === 0) { console.log('WARNING n should be odd for LRN layer'); }
  }
  LocalResponseNormalizationLayer.prototype = {
    forward: function(V, is_training) {
      this.in_act = V;

      var A = V.cloneAndZero();
      this.S_cache_ = V.cloneAndZero();
      var n2 = Math.floor(this.n/2);
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<V.depth;i++) {

            var ai = V.get(x,y,i);

            // normalize in a window of size n
            var den = 0.0;
            for(var j=Math.max(0,i-n2);j<=Math.min(i+n2,V.depth-1);j++) {
              var aa = V.get(x,y,j);
              den += aa*aa;
            }
            den *= this.alpha / this.n;
            den += this.k;
            this.S_cache_.set(x,y,i,den); // will be useful for backprop
            den = Math.pow(den, this.beta);
            A.set(x,y,i,ai/den);
          }
        }
      }

      this.out_act = A;
      return this.out_act; // dummy identity function for now
    },
    backward: function() { 
      // evaluate gradient wrt data
      var V = this.in_act; // we need to set dw of this
      V.dw = global.zeros(V.w.length); // zero out gradient wrt data
      var A = this.out_act; // computed in forward pass 

      var n2 = Math.floor(this.n/2);
      for(var x=0;x<V.sx;x++) {
        for(var y=0;y<V.sy;y++) {
          for(var i=0;i<V.depth;i++) {

            var chain_grad = this.out_act.get_grad(x,y,i);
            var S = this.S_cache_.get(x,y,i);
            var SB = Math.pow(S, this.beta);
            var SB2 = SB*SB;

            // normalize in a window of size n
            for(var j=Math.max(0,i-n2);j<=Math.min(i+n2,V.depth-1);j++) {              
              var aj = V.get(x,y,j); 
              var g = -aj*this.beta*Math.pow(S,this.beta-1)*this.alpha/this.n*2*aj;
              if(j===i) g+= SB;
              g /= SB2;
              g *= chain_grad;
              V.add_grad(x,y,j,g);
            }

          }
        }
      }
    },
    getParamsAndGrads: function() { return []; },
    toJSON: function() {
      var json = {};
      json.k = this.k;
      json.n = this.n;
      json.alpha = this.alpha; // normalize by size
      json.beta = this.beta;
      json.out_sx = this.out_sx; 
      json.out_sy = this.out_sy;
      json.out_depth = this.out_depth;
      json.layer_type = this.layer_type;
      return json;
    },
    fromJSON: function(json) {
      this.k = json.k;
      this.n = json.n;
      this.alpha = json.alpha; // normalize by size
      this.beta = json.beta;
      this.out_sx = json.out_sx; 
      this.out_sy = json.out_sy;
      this.out_depth = json.out_depth;
      this.layer_type = json.layer_type;
    }
  }
  

  global.LocalResponseNormalizationLayer = LocalResponseNormalizationLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  var Buffer = jpcnn.Buffer;

  // converters between convnetjs Vol and jpcnn Buffer

  var VolToBuffer = function(vol) {
    var buf = new Buffer([1, vol.sx, vol.sy, vol.depth]);
    buf._data = vol.w;
    return buf;
  }

  var BufferToVol = function(buf) {
    var dims = buf._dims; // sigh
    console.assert(dims._dims[0] === 1); // dim 0 is num, but convnetjs has batches of 1
    var vol = new convnetjs.Vol(dims._dims[1], dims._dims[2], dims._dims[3]);
    vol.w = buf._data;
    return vol;
  }

  global.VolToBuffer = VolToBuffer;
  global.BufferToVol = BufferToVol;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  var Buffer = jpcnn.Buffer;
  var assert = global.assert;
  var VolToBuffer = global.VolToBuffer;
  var BufferToVol = global.BufferToVol;

  // This file contains all layers that do dot products with input,
  // but usually in a different connectivity pattern and weight sharing
  // schemes: 
  // - FullyConn is fully connected dot products 
  // - ConvLayer does convolutions (so weight sharing spatially)
  // putting them together in one file because they are very similar

  // back up the CPU implementation
  global.ConvLayerCPU = global.ConvLayer;
  // and define the new WebGL implementation, which will overwrite global.ConvLayer
  // later on in this file, and will thus become the default ConvLayer in the WebGL build
  var ConvLayer = function(opt) {
    var opt = opt || {};

    // required
    this.out_depth = opt.filters;
    this.sx = opt.sx; // filter size. Should be odd if possible, it's cleaner.
    this.in_depth = opt.in_depth;
    this.in_sx = opt.in_sx;
    this.in_sy = opt.in_sy;
    
    // optional
    this.sy = typeof opt.sy !== 'undefined' ? opt.sy : this.sx;
    this.stride = typeof opt.stride !== 'undefined' ? opt.stride : 1; // stride at which we apply filters to input volume
    this.pad = typeof opt.pad !== 'undefined' ? opt.pad : 0; // amount of 0 padding to add around borders of input volume
    this.l1_decay_mul = typeof opt.l1_decay_mul !== 'undefined' ? opt.l1_decay_mul : 0.0;
    this.l2_decay_mul = typeof opt.l2_decay_mul !== 'undefined' ? opt.l2_decay_mul : 1.0;

    // computed
    // note we are doing floor, so if the strided convolution of the filter doesnt fit into the input
    // volume exactly, the output volume will be trimmed and not contain the (incomplete) computed
    // final application.
    this.out_sx = Math.floor((this.in_sx + this.pad * 2 - this.sx) / this.stride + 1);
    this.out_sy = Math.floor((this.in_sy + this.pad * 2 - this.sy) / this.stride + 1);
    this.layer_type = 'conv';

    // initializations
    var bias = typeof opt.bias_pref !== 'undefined' ? opt.bias_pref : 0.0;
    this.filters = [];
    for(var i=0;i<this.out_depth;i++) { this.filters.push(new Vol(this.sx, this.sy, this.in_depth)); }
    this.biases = new Vol(1, 1, this.out_depth, bias);

    this.dirty = true;
    this.jpkernels = 0;
    this.jpbiases = 0;
  }
  ConvLayer.prototype = {
    syncKernels_: function() {
      // convert kernels into buffers
      var fvals = this.sx * this.sx * this.in_depth;
      var nf = this.filters.length;
      this.jpkernels = new Buffer([fvals, nf]);
      var n = 0;
      for(var j=0;j<fvals;j++) {
        for(var i=0;i<nf;i++) {
          this.jpkernels._data[n] = this.filters[i].w[j];
          n++;
        }
      }
      this.jpbiases = VolToBuffer(this.biases);
      this.dirty = false;
    },
    forward: function(V, is_training) {
      var forward_start = +new Date();

      this.in_act = V;
      // var t0 = +new Date();
      if(this.dirty) { this.syncKernels_(); }
      // var t1 = +new Date();
      // console.log('kernel sync took ' + (t1-t0) + 'ms');

      // var t0 = +new Date();
      var buf = VolToBuffer(V); // convert input V into a buffer object
      // if(this.pad > 0) {
      //   // we have to pad the buffer
      //   buf = jpcnn.matrixInsertMargin(buf, this.pad, this.pad);
      // }
      // var t1 = +new Date();
      // console.log('data copy took ' + (t1-t0) + 'ms');

      // assert(this.sx === this.sy, "WebGL implementation doesn't support non-square kernels");
      // var t0 = +new Date();
      //  this._output = matrixCorrelate(input, this._kernels, this._kernelWidth, this._kernelCount, this._sampleStride, this._bias, this._marginSize);
      var b0 = jpcnn.matrixCorrelate(buf, this.jpkernels, this.sx, this.out_depth, this.stride, this.jpbiases, this.pad);
      // var t1 = +new Date();
      // console.log('the actual convolution took ' + (t1-t0) + 'ms');
      // jpcnn.matrixAddInplace(b0, this.jpbiases, 1.0);
      
      // var t0 = +new Date();
      var A = BufferToVol(b0); // and convert back to Vol
      // var t1 = +new Date();
      // console.log('BufferToVol took ' + (t1-t0) + 'ms');

      this.out_act = A;

      var forward_stop = +new Date();

      console.log('the actual convolution took ' + (forward_stop-forward_start) + 'ms');

      return this.out_act;
    },
    backward: function() {
      this.dirty = true; // mark as dirty. next forward pass we'll have to recopy filters to buffers

      var V = this.in_act;
      V.dw = global.zeros(V.w.length); // zero out gradient wrt bottom data, we're about to fill it

      var V_sx = V.sx |0;
      var V_sy = V.sy |0;
      var xy_stride = this.stride |0;

      for(var d=0;d<this.out_depth;d++) {
        var f = this.filters[d];
        var x = -this.pad |0;
        var y = -this.pad |0;
        for(var ay=0; ay<this.out_sy; y+=xy_stride,ay++) {  // xy_stride
          x = -this.pad |0;
          for(var ax=0; ax<this.out_sx; x+=xy_stride,ax++) {  // xy_stride

            // convolve centered at this particular location
            var chain_grad = this.out_act.get_grad(ax,ay,d); // gradient from above, from chain rule
            for(var fy=0;fy<f.sy;fy++) {
              var oy = y+fy; // coordinates in the original input array coordinates
              for(var fx=0;fx<f.sx;fx++) {
                var ox = x+fx;
                if(oy>=0 && oy<V_sy && ox>=0 && ox<V_sx) {
                  for(var fd=0;fd<f.depth;fd++) {
                    // avoid function call overhead (x2) for efficiency, compromise modularity :(
                    var ix1 = ((V_sx * oy)+ox)*V.depth+fd;
                    var ix2 = ((f.sx * fy)+fx)*f.depth+fd;
                    f.dw[ix2] += V.w[ix1]*chain_grad;
                    V.dw[ix1] += f.w[ix2]*chain_grad;
                  }
                }
              }
            }
            this.biases.dw[d] += chain_grad;
          }
        }
      }
    },
    getParamsAndGrads: function() {
      var response = [];
      for(var i=0;i<this.out_depth;i++) {
        response.push({params: this.filters[i].w, grads: this.filters[i].dw, l2_decay_mul: this.l2_decay_mul, l1_decay_mul: this.l1_decay_mul});
      }
      response.push({params: this.biases.w, grads: this.biases.dw, l1_decay_mul: 0.0, l2_decay_mul: 0.0});
      return response;
    },
    toJSON: function() {
      var json = {};
      json.sx = this.sx; // filter size in x, y dims
      json.sy = this.sy;
      json.stride = this.stride;
      json.in_depth = this.in_depth;
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.l1_decay_mul = this.l1_decay_mul;
      json.l2_decay_mul = this.l2_decay_mul;
      json.pad = this.pad;
      json.filters = [];
      for(var i=0;i<this.filters.length;i++) {
        json.filters.push(this.filters[i].toJSON());
      }
      json.biases = this.biases.toJSON();
      return json;
    },
    fromJSON: function(json) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.sx = json.sx; // filter size in x, y dims
      this.sy = json.sy;
      this.stride = json.stride;
      this.in_depth = json.in_depth; // depth of input volume
      this.filters = [];
      this.l1_decay_mul = typeof json.l1_decay_mul !== 'undefined' ? json.l1_decay_mul : 1.0;
      this.l2_decay_mul = typeof json.l2_decay_mul !== 'undefined' ? json.l2_decay_mul : 1.0;
      this.pad = typeof json.pad !== 'undefined' ? json.pad : 0;
      for(var i=0;i<json.filters.length;i++) {
        var v = new Vol(0,0,0,0);
        v.fromJSON(json.filters[i]);
        this.filters.push(v);
      }
      this.biases = new Vol(0,0,0,0);
      this.biases.fromJSON(json.biases);
    }
  }

  
  
  global.ConvLayer = ConvLayer;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience
  
  // Net manages a set of layers
  // For now constraints: Simple linear order of layers, first layer input last layer a cost layer
  var Net = function(options) {
    this.layers = [];
  }

  Net.prototype = {
    
    // takes a list of layer definitions and creates the network layer objects
    makeLayers: function(defs) {

      // few checks for now
      if(defs.length<2) {console.log('ERROR! For now at least have input and softmax layers.');}
      if(defs[0].type !== 'input') {console.log('ERROR! For now first layer should be input.');}

      // desugar syntactic for adding activations and dropouts
      var desugar = function() {
        var new_defs = [];
        for(var i=0;i<defs.length;i++) {
          var def = defs[i];
          
          if(def.type==='softmax' || def.type==='svm') {
            // add an fc layer here, there is no reason the user should
            // have to worry about this and we almost always want to
            new_defs.push({type:'fc', num_neurons: def.num_classes});
          }

          if(def.type==='regression') {
            // add an fc layer here, there is no reason the user should
            // have to worry about this and we almost always want to
            new_defs.push({type:'fc', num_neurons: def.num_neurons});
          }

          if((def.type==='fc' || def.type==='conv') 
              && typeof(def.bias_pref) === 'undefined'){
            def.bias_pref = 0.0;
            if(typeof def.activation !== 'undefined' && def.activation === 'relu') {
              def.bias_pref = 0.1; // relus like a bit of positive bias to get gradients early
              // otherwise it's technically possible that a relu unit will never turn on (by chance)
              // and will never get any gradient and never contribute any computation. Dead relu.
            }
          }
          
          if(typeof def.tensor !== 'undefined') {
            // apply quadratic transform so that the upcoming multiply will include
            // quadratic terms, equivalent to doing a tensor product
            if(def.tensor) {
              new_defs.push({type: 'quadtransform'});
            }
          }

          new_defs.push(def);

          if(typeof def.activation !== 'undefined') {
            if(def.activation==='relu') { new_defs.push({type:'relu'}); }
            else if (def.activation==='sigmoid') { new_defs.push({type:'sigmoid'}); }
            else if (def.activation==='tanh') { new_defs.push({type:'tanh'}); }
            else if (def.activation==='maxout') {
              // create maxout activation, and pass along group size, if provided
              var gs = def.group_size !== 'undefined' ? def.group_size : 2;
              new_defs.push({type:'maxout', group_size:gs});
            }
            else { console.log('ERROR unsupported activation ' + def.activation); }
          }
          if(typeof def.drop_prob !== 'undefined' && def.type !== 'dropout') {
            new_defs.push({type:'dropout', drop_prob: def.drop_prob});
          }

        }
        return new_defs;
      }
      defs = desugar(defs);

      // create the layers
      this.layers = [];
      for(var i=0;i<defs.length;i++) {
        var def = defs[i];
        if(i>0) {
          var prev = this.layers[i-1];
          def.in_sx = prev.out_sx;
          def.in_sy = prev.out_sy;
          def.in_depth = prev.out_depth;
        }

        switch(def.type) {
          case 'fc': this.layers.push(new global.FullyConnLayer(def)); break;
          case 'lrn': this.layers.push(new global.LocalResponseNormalizationLayer(def)); break;
          case 'dropout': this.layers.push(new global.DropoutLayer(def)); break;
          case 'input': this.layers.push(new global.InputLayer(def)); break;
          case 'softmax': this.layers.push(new global.SoftmaxLayer(def)); break;
          case 'regression': this.layers.push(new global.RegressionLayer(def)); break;
          case 'conv': this.layers.push(new global.ConvLayer(def)); break;
          case 'pool': this.layers.push(new global.PoolLayer(def)); break;
          case 'relu': this.layers.push(new global.ReluLayer(def)); break;
          case 'sigmoid': this.layers.push(new global.SigmoidLayer(def)); break;
          case 'tanh': this.layers.push(new global.TanhLayer(def)); break;
          case 'maxout': this.layers.push(new global.MaxoutLayer(def)); break;
          case 'quadtransform': this.layers.push(new global.QuadTransformLayer(def)); break;
          case 'svm': this.layers.push(new global.SVMLayer(def)); break;
          default: console.log('ERROR: UNRECOGNIZED LAYER TYPE!');
        }
      }
    },

    // forward prop the network. A trainer will pass in is_training = true
    forward: function(V, is_training) {
      if(typeof(is_training)==='undefined') is_training = false;
      var act = this.layers[0].forward(V, is_training);
      for(var i=1;i<this.layers.length;i++) {
        act = this.layers[i].forward(act, is_training);
      }
      return act;
    },

    getCostLoss: function(V, y) {
      this.forward(V, false);
      var N = this.layers.length;
      var loss = this.layers[N-1].backward(y);
      return loss;
    },
    
    // backprop: compute gradients wrt all parameters
    backward: function(y) {
      var N = this.layers.length;
      var loss = this.layers[N-1].backward(y); // last layer assumed softmax
      for(var i=N-2;i>=0;i--) { // first layer assumed input
        this.layers[i].backward();
      }
      return loss;
    },
    getParamsAndGrads: function() {
      // accumulate parameters and gradients for the entire network
      var response = [];
      for(var i=0;i<this.layers.length;i++) {
        var layer_reponse = this.layers[i].getParamsAndGrads();
        for(var j=0;j<layer_reponse.length;j++) {
          response.push(layer_reponse[j]);
        }
      }
      return response;
    },
    getPrediction: function() {
      var S = this.layers[this.layers.length-1]; // softmax layer
      var p = S.out_act.w;
      var maxv = p[0];
      var maxi = 0;
      for(var i=1;i<p.length;i++) {
        if(p[i] > maxv) { maxv = p[i]; maxi = i;}
      }
      return maxi;
    },
    toJSON: function() {
      var json = {};
      json.layers = [];
      for(var i=0;i<this.layers.length;i++) {
        json.layers.push(this.layers[i].toJSON());
      }
      return json;
    },
    fromJSON: function(json) {
      this.layers = [];
      for(var i=0;i<json.layers.length;i++) {
        var Lj = json.layers[i]
        var t = Lj.layer_type;
        var L;
        if(t==='input') { L = new global.InputLayer(); }
        if(t==='relu') { L = new global.ReluLayer(); }
        if(t==='sigmoid') { L = new global.SigmoidLayer(); }
        if(t==='tanh') { L = new global.TanhLayer(); }
        if(t==='dropout') { L = new global.DropoutLayer(); }
        if(t==='conv') { L = new global.ConvLayer(); }
        if(t==='pool') { L = new global.PoolLayer(); }
        if(t==='lrn') { L = new global.LocalResponseNormalizationLayer(); }
        if(t==='softmax') { L = new global.SoftmaxLayer(); }
        if(t==='regression') { L = new global.RegressionLayer(); }
        if(t==='fc') { L = new global.FullyConnLayer(); }
        if(t==='maxout') { L = new global.MaxoutLayer(); }
        if(t==='quadtransform') { L = new global.QuadTransformLayer(); }
        if(t==='svm') { L = new global.SVMLayer(); }
        L.fromJSON(Lj);
        this.layers.push(L);
      }
    }
  }
  

  global.Net = Net;
})(convnetjs);
(function(global) {
  "use strict";
  var Vol = global.Vol; // convenience

  var Trainer = function(net, options) {

    this.net = net;

    var options = options || {};
    this.learning_rate = typeof options.learning_rate !== 'undefined' ? options.learning_rate : 0.01;
    this.l1_decay = typeof options.l1_decay !== 'undefined' ? options.l1_decay : 0.0;
    this.l2_decay = typeof options.l2_decay !== 'undefined' ? options.l2_decay : 0.0;
    this.batch_size = typeof options.batch_size !== 'undefined' ? options.batch_size : 1;
    this.method = typeof options.method !== 'undefined' ? options.method : 'sgd'; // sgd/adagrad/adadelta/windowgrad

    this.momentum = typeof options.momentum !== 'undefined' ? options.momentum : 0.9;
    this.ro = typeof options.ro !== 'undefined' ? options.ro : 0.95; // used in adadelta
    this.eps = typeof options.eps !== 'undefined' ? options.eps : 1e-6; // used in adadelta

    this.k = 0; // iteration counter
    this.gsum = []; // last iteration gradients (used for momentum calculations)
    this.xsum = []; // used in adadelta
  }

  Trainer.prototype = {
    train: function(x, y) {

      var start = new Date().getTime();
      this.net.forward(x, true); // also set the flag that lets the net know we're just training
      var end = new Date().getTime();
      var fwd_time = end - start;

      var start = new Date().getTime();
      var cost_loss = this.net.backward(y);
      var l2_decay_loss = 0.0;
      var l1_decay_loss = 0.0;
      var end = new Date().getTime();
      var bwd_time = end - start;
      
      this.k++;
      if(this.k % this.batch_size === 0) {

        var pglist = this.net.getParamsAndGrads();

        // initialize lists for accumulators. Will only be done once on first iteration
        if(this.gsum.length === 0 && (this.method !== 'sgd' || this.momentum > 0.0)) {
          // only vanilla sgd doesnt need either lists
          // momentum needs gsum
          // adagrad needs gsum
          // adadelta needs gsum and xsum
          for(var i=0;i<pglist.length;i++) {
            this.gsum.push(global.zeros(pglist[i].params.length));
            if(this.method === 'adadelta') {
              this.xsum.push(global.zeros(pglist[i].params.length));
            } else {
              this.xsum.push([]); // conserve memory
            }
          }
        }

        // perform an update for all sets of weights
        for(var i=0;i<pglist.length;i++) {
          var pg = pglist[i]; // param, gradient, other options in future (custom learning rate etc)
          var p = pg.params;
          var g = pg.grads;

          // learning rate for some parameters.
          var l2_decay_mul = typeof pg.l2_decay_mul !== 'undefined' ? pg.l2_decay_mul : 1.0;
          var l1_decay_mul = typeof pg.l1_decay_mul !== 'undefined' ? pg.l1_decay_mul : 1.0;
          var l2_decay = this.l2_decay * l2_decay_mul;
          var l1_decay = this.l1_decay * l1_decay_mul;

          var plen = p.length;
          for(var j=0;j<plen;j++) {
            l2_decay_loss += l2_decay*p[j]*p[j]/2; // accumulate weight decay loss
            l1_decay_loss += l1_decay*Math.abs(p[j]);
            var l1grad = l1_decay * (p[j] > 0 ? 1 : -1);
            var l2grad = l2_decay * (p[j]);

            var gij = (l2grad + l1grad + g[j]) / this.batch_size; // raw batch gradient

            var gsumi = this.gsum[i];
            var xsumi = this.xsum[i];
            if(this.method === 'adagrad') {
              // adagrad update
              gsumi[j] = gsumi[j] + gij * gij;
              var dx = - this.learning_rate / Math.sqrt(gsumi[j] + this.eps) * gij;
              p[j] += dx;
            } else if(this.method === 'windowgrad') {
              // this is adagrad but with a moving window weighted average
              // so the gradient is not accumulated over the entire history of the run. 
              // it's also referred to as Idea #1 in Zeiler paper on Adadelta. Seems reasonable to me!
              gsumi[j] = this.ro * gsumi[j] + (1-this.ro) * gij * gij;
              var dx = - this.learning_rate / Math.sqrt(gsumi[j] + this.eps) * gij; // eps added for better conditioning
              p[j] += dx;
            } else if(this.method === 'adadelta') {
              // assume adadelta if not sgd or adagrad
              gsumi[j] = this.ro * gsumi[j] + (1-this.ro) * gij * gij;
              var dx = - Math.sqrt((xsumi[j] + this.eps)/(gsumi[j] + this.eps)) * gij;
              xsumi[j] = this.ro * xsumi[j] + (1-this.ro) * dx * dx; // yes, xsum lags behind gsum by 1.
              p[j] += dx;
            } else {
              // assume SGD
              if(this.momentum > 0.0) {
                // momentum update
                var dx = this.momentum * gsumi[j] - this.learning_rate * gij; // step
                gsumi[j] = dx; // back this up for next iteration of momentum
                p[j] += dx; // apply corrected gradient
              } else {
                // vanilla sgd
                p[j] +=  - this.learning_rate * gij;
              }
            }
            g[j] = 0.0; // zero out gradient so that we can begin accumulating anew
          }
        }
      }

      // appending softmax_loss for backwards compatibility, but from now on we will always use cost_loss
      // in future, TODO: have to completely redo the way loss is done around the network as currently 
      // loss is a bit of a hack. Ideally, user should specify arbitrary number of loss functions on any layer
      // and it should all be computed correctly and automatically. 
      return {fwd_time: fwd_time, bwd_time: bwd_time, 
              l2_decay_loss: l2_decay_loss, l1_decay_loss: l1_decay_loss,
              cost_loss: cost_loss, softmax_loss: cost_loss, 
              loss: cost_loss + l1_decay_loss + l2_decay_loss}
    }
  }
  
  global.Trainer = Trainer;
  global.SGDTrainer = Trainer; // backwards compatibility
})(convnetjs);

(function(global) {
  "use strict";

  // used utilities, make explicit local references
  var randf = global.randf;
  var randi = global.randi;
  var Net = global.Net;
  var Trainer = global.Trainer;
  var maxmin = global.maxmin;
  var randperm = global.randperm;
  var weightedSample = global.weightedSample;
  var getopt = global.getopt;
  var arrUnique = global.arrUnique;

  /*
  A MagicNet takes data: a list of convnetjs.Vol(), and labels
  which for now are assumed to be class indeces 0..K. MagicNet then:
  - creates data folds for cross-validation
  - samples candidate networks
  - evaluates candidate networks on all data folds
  - produces predictions by model-averaging the best networks
  */
  var MagicNet = function(data, labels, opt) {
    var opt = opt || {};
    if(typeof data === 'undefined') { data = []; }
    if(typeof labels === 'undefined') { labels = []; }

    // required inputs
    this.data = data; // store these pointers to data
    this.labels = labels;

    // optional inputs
    this.train_ratio = getopt(opt, 'train_ratio', 0.7);
    this.num_folds = getopt(opt, 'num_folds', 10);
    this.num_candidates = getopt(opt, 'num_candidates', 50); // we evaluate several in parallel
    // how many epochs of data to train every network? for every fold?
    // higher values mean higher accuracy in final results, but more expensive
    this.num_epochs = getopt(opt, 'num_epochs', 50); 
    // number of best models to average during prediction. Usually higher = better
    this.ensemble_size = getopt(opt, 'ensemble_size', 10);

    // candidate parameters
    this.batch_size_min = getopt(opt, 'batch_size_min', 10);
    this.batch_size_max = getopt(opt, 'batch_size_max', 300);
    this.l2_decay_min = getopt(opt, 'l2_decay_min', -4);
    this.l2_decay_max = getopt(opt, 'l2_decay_max', 2);
    this.learning_rate_min = getopt(opt, 'learning_rate_min', -4);
    this.learning_rate_max = getopt(opt, 'learning_rate_max', 0);
    this.momentum_min = getopt(opt, 'momentum_min', 0.9);
    this.momentum_max = getopt(opt, 'momentum_max', 0.9);
    this.neurons_min = getopt(opt, 'neurons_min', 5);
    this.neurons_max = getopt(opt, 'neurons_max', 30);

    // computed
    this.folds = []; // data fold indices, gets filled by sampleFolds()
    this.candidates = []; // candidate networks that are being currently evaluated
    this.evaluated_candidates = []; // history of all candidates that were fully evaluated on all folds
    this.unique_labels = arrUnique(labels);
    this.iter = 0; // iteration counter, goes from 0 -> num_epochs * num_training_data
    this.foldix = 0; // index of active fold

    // callbacks
    this.finish_fold_callback = null;
    this.finish_batch_callback = null;

    // initializations
    if(this.data.length > 0) {
      this.sampleFolds();
      this.sampleCandidates();
    }
  };

  MagicNet.prototype = {

    // sets this.folds to a sampling of this.num_folds folds
    sampleFolds: function() {
      var N = this.data.length;
      var num_train = Math.floor(this.train_ratio * N);
      this.folds = []; // flush folds, if any
      for(var i=0;i<this.num_folds;i++) {
        var p = randperm(N);
        this.folds.push({train_ix: p.slice(0, num_train), test_ix: p.slice(num_train, N)});
      }
    },

    // returns a random candidate network
    sampleCandidate: function() {
      var input_depth = this.data[0].w.length;
      var num_classes = this.unique_labels.length;

      // sample network topology and hyperparameters
      var layer_defs = [];
      layer_defs.push({type:'input', out_sx:1, out_sy:1, out_depth: input_depth});
      var nl = weightedSample([0,1,2,3], [0.2, 0.3, 0.3, 0.2]); // prefer nets with 1,2 hidden layers
      for(var q=0;q<nl;q++) {
        var ni = randi(this.neurons_min, this.neurons_max);
        var act = ['tanh','maxout','relu'][randi(0,3)];
        if(randf(0,1)<0.5) {
          var dp = Math.random();
          layer_defs.push({type:'fc', num_neurons: ni, activation: act, drop_prob: dp});
        } else {
          layer_defs.push({type:'fc', num_neurons: ni, activation: act});
        }
      }
      layer_defs.push({type:'softmax', num_classes: num_classes});
      var net = new Net();
      net.makeLayers(layer_defs);

      // sample training hyperparameters
      var bs = randi(this.batch_size_min, this.batch_size_max); // batch size
      var l2 = Math.pow(10, randf(this.l2_decay_min, this.l2_decay_max)); // l2 weight decay
      var lr = Math.pow(10, randf(this.learning_rate_min, this.learning_rate_max)); // learning rate
      var mom = randf(this.momentum_min, this.momentum_max); // momentum. Lets just use 0.9, works okay usually ;p
      var tp = randf(0,1); // trainer type
      var trainer_def;
      if(tp<0.33) {
        trainer_def = {method:'adadelta', batch_size:bs, l2_decay:l2};
      } else if(tp<0.66) {
        trainer_def = {method:'adagrad', learning_rate: lr, batch_size:bs, l2_decay:l2};
      } else {
        trainer_def = {method:'sgd', learning_rate: lr, momentum: mom, batch_size:bs, l2_decay:l2};
      }
      
      var trainer = new Trainer(net, trainer_def);

      var cand = {};
      cand.acc = [];
      cand.accv = 0; // this will maintained as sum(acc) for convenience
      cand.layer_defs = layer_defs;
      cand.trainer_def = trainer_def;
      cand.net = net;
      cand.trainer = trainer;
      return cand;
    },

    // sets this.candidates with this.num_candidates candidate nets
    sampleCandidates: function() {
      this.candidates = []; // flush, if any
      for(var i=0;i<this.num_candidates;i++) {
        var cand = this.sampleCandidate();
        this.candidates.push(cand);
      }
    },

    step: function() {
      
      // run an example through current candidate
      this.iter++;

      // step all candidates on a random data point
      var fold = this.folds[this.foldix]; // active fold
      var dataix = fold.train_ix[randi(0, fold.train_ix.length)];
      for(var k=0;k<this.candidates.length;k++) {
        var x = this.data[dataix];
        var l = this.labels[dataix];
        this.candidates[k].trainer.train(x, l);
      }

      // process consequences: sample new folds, or candidates
      var lastiter = this.num_epochs * fold.train_ix.length;
      if(this.iter >= lastiter) {
        // finished evaluation of this fold. Get final validation
        // accuracies, record them, and go on to next fold.
        var val_acc = this.evalValErrors();
        for(var k=0;k<this.candidates.length;k++) {
          var c = this.candidates[k];
          c.acc.push(val_acc[k]);
          c.accv += val_acc[k];
        }
        this.iter = 0; // reset step number
        this.foldix++; // increment fold

        if(this.finish_fold_callback !== null) {
          this.finish_fold_callback();
        }

        if(this.foldix >= this.folds.length) {
          // we finished all folds as well! Record these candidates
          // and sample new ones to evaluate.
          for(var k=0;k<this.candidates.length;k++) {
            this.evaluated_candidates.push(this.candidates[k]);
          }
          // sort evaluated candidates according to accuracy achieved
          this.evaluated_candidates.sort(function(a, b) { 
            return (a.accv / a.acc.length) 
                 > (b.accv / b.acc.length) 
                 ? -1 : 1;
          });
          // and clip only to the top few ones (lets place limit at 3*ensemble_size)
          // otherwise there are concerns with keeping these all in memory 
          // if MagicNet is being evaluated for a very long time
          if(this.evaluated_candidates.length > 3 * this.ensemble_size) {
            this.evaluated_candidates = this.evaluated_candidates.slice(0, 3 * this.ensemble_size);
          }
          if(this.finish_batch_callback !== null) {
            this.finish_batch_callback();
          }
          this.sampleCandidates(); // begin with new candidates
          this.foldix = 0; // reset this
        } else {
          // we will go on to another fold. reset all candidates nets
          for(var k=0;k<this.candidates.length;k++) {
            var c = this.candidates[k];
            var net = new Net();
            net.makeLayers(c.layer_defs);
            var trainer = new Trainer(net, c.trainer_def);
            c.net = net;
            c.trainer = trainer;
          }
        }
      }
    },

    evalValErrors: function() {
      // evaluate candidates on validation data and return performance of current networks
      // as simple list
      var vals = [];
      var fold = this.folds[this.foldix]; // active fold
      for(var k=0;k<this.candidates.length;k++) {
        var net = this.candidates[k].net;
        var v = 0.0;
        for(var q=0;q<fold.test_ix.length;q++) {
          var x = this.data[fold.test_ix[q]];
          var l = this.labels[fold.test_ix[q]];
          net.forward(x);
          var yhat = net.getPrediction();
          v += (yhat === l ? 1.0 : 0.0); // 0 1 loss
        }
        v /= fold.test_ix.length; // normalize
        vals.push(v);
      }
      return vals;
    },

    // returns prediction scores for given test data point, as Vol
    // uses an averaged prediction from the best ensemble_size models
    // x is a Vol.
    predict_soft: function(data) {
      // forward prop the best networks
      // and accumulate probabilities at last layer into a an output Vol
      var nv = Math.min(this.ensemble_size, this.evaluated_candidates.length);
      if(nv === 0) { return new convnetjs.Vol(0,0,0); } // not sure what to do here? we're not ready yet
      var xout, n;
      for(var j=0;j<nv;j++) {
        var net = this.evaluated_candidates[j].net;
        var x = net.forward(data);
        if(j===0) { 
          xout = x; 
          n = x.w.length; 
        } else {
          // add it on
          for(var d=0;d<n;d++) {
            xout.w[d] += x.w[d];
          }
        }
      }
      // produce average
      for(var d=0;d<n;d++) {
        xout.w[d] /= n;
      }
      return xout;
    },

    predict: function(data) {
      var xout = this.predict_soft(data);
      if(xout.w.length !== 0) {
        var stats = maxmin(xout.w);
        var predicted_label = stats.maxi; 
      } else {
        var predicted_label = -1; // error out
      }
      return predicted_label;

    },

    toJSON: function() {
      // dump the top ensemble_size networks as a list
      var nv = Math.min(this.ensemble_size, this.evaluated_candidates.length);
      var json = {};
      json.nets = [];
      for(var i=0;i<nv;i++) {
        json.nets.push(this.evaluated_candidates[i].net.toJSON());
      }
      return json;
    },

    fromJSON: function(json) {
      this.ensemble_size = json.nets.length;
      this.evaluated_candidates = [];
      for(var i=0;i<this.ensemble_size;i++) {
        var net = new Net();
        net.fromJSON(json.nets[i]);
        var dummy_candidate = {};
        dummy_candidate.net = net;
        this.evaluated_candidates.push(dummy_candidate);
      }
    },

    // callback functions
    // called when a fold is finished, while evaluating a batch
    onFinishFold: function(f) { this.finish_fold_callback = f; },
    // called when a batch of candidates has finished evaluating
    onFinishBatch: function(f) { this.finish_batch_callback = f; }
    
  };

  global.MagicNet = MagicNet;
})(convnetjs);
(function(lib) {
  "use strict";
  if (typeof module === "undefined" || typeof module.exports === "undefined") {
    window.jsfeat = lib; // in ordinary browser attach library to window
  } else {
    module.exports = lib; // in nodejs
  }
})(convnetjs);
