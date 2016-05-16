var valarr = [28, 18, 17, 8];

var log = function () { 

	// console.log(arguments); 
	var toTime = new Date();

	var differenceTravel = toTime.getTime() - fromTime.getTime();
	var seconds = Math.floor((differenceTravel) / (1000));
// document.write('+ seconds +');
	console.log('log: '+seconds);
	p.workerProcess.process.kill();

	console.log(p);
};

function fib(n) {
	return n < 2 ? 1 : fib(n - 1) + fib(n - 2);
};

function parallel() {
	// console.log('pushed:'+p);

	for(var i = 0; i<100; i++) {

	var fromTime = new Date();
	var p = new Parallel(valarr);
	// console.log(p);

	// var p1 = new Parallel(valarr);
	// var p2 = new Parallel(valarr);

	// One gotcha: anonymous functions cannot be serialzed
	// If you want to do recursion, make sure the function
	// is named appropriately

	p.map(fib).then(log);
	// p1.map(fib).then(log);
	// p2.map(fib).then(log);

	// delete p;
	// p = undefined;

	// p.workerProcess.process.kill();
	// Logs the first 7 Fibonnaci numbers, woot!
	}
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