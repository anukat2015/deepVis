var valarr = [28, 18, 17, 8];
var answer = [];

// function fib(n) {
// 	return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
// };

function parallel() {

	// for(var i=0; i<10; i++) {
	var fromTime = new Date();

	var p = new Parallel(valarr);
	var log = function () { 

		// var toTime = new Date();
		// var differenceTravel = toTime.getTime() - fromTime.getTime();
		// var seconds = Math.floor((differenceTravel) / (1000));
		// console.log('seconds: '+seconds);

		console.log(arguments); 

		console.log('a: '+answer);
	};

	function fib(n) {
	// return n < 2 ? 1 : fib(n - 1) + fib(n - 2);

		// answer.push(n+1);
		return n;
	};
	

	p.map(fib).then(log);
// }

}

function single() {
	var fromTime = new Date();

	var result = [];
	for (var i = 0; i < 4; i++) {
		result.push(fib(valarr[i]));
	}

	console.log(result);
	var toTime = new Date();

	var differenceTravel = toTime.getTime() - fromTime.getTime();
	var seconds = Math.floor((differenceTravel) / (1000));
	// document.write('+ seconds +');
	console.log('seconds: '+seconds);

}