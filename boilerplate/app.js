//jQuery(document).ready(function() {
//Width and height
var w = 250;
var h = 500;

console.log(h);

var dataset = [
	[50, 20],
	[467, 187],
	[239, 96],
	[67, 27],
	[314, 126],
	[89, 78],
	[13, 5],
	[29, 12],
	[144, 58],
	[191, 76]
];


var app = {
	data : [],
	setData : function () {

	}
}

/* d3.selectAll(".chart .axis-x div").text("x"); */


//Create SVG element
var svg = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h);


var chart = function() {
	svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
		return d[0] / 2;
	})
			.attr("cy", function(d) {
		return h - (d[1] * 2);
	})
			.attr("r", function(d) {
		//return 10;
		return Math.sqrt(d[1]);
	});

	svg.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.text(function(d) {
		return d[1]; // + "," + d[1];
	})
			.attr("x", function(d) {
		return (d[0] / 2) - (3 * ("" + d[0]).length);
	})
			.attr("y", function(d) {
		return ((h) - (d[1] * 2)) - 20;
	})
			.attr("font-family", "sans-serif")
			.attr("font-size", "11px")
			.attr("fill", "red");
	return "Chart was created";
}

chart();
//});