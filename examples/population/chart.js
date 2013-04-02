var chart = chart || {};

jQuery(document).ready(function() {

	// predefine column names for our data rows
	var columnNames = [
		"Jahr",
		"Baden-Württemberg",
		"Brandenburg",
		"Mecklenburg-Vorpommern",
		"Niedersachsen",
		"Nordrhein-Westfalen",
		"Rheinland-Pfalz",
		"Sachsen-Anhalt",
		"Schleswig-Holstein",
		"Bayern",
		"Berlin",
		"Bremen",
		"Hamburg",
		"Hessen",
		"Saarland",
		"Sachsen",
		"Thüringen"
	];

	// load JSON data via AJAX
	d3.json("../../data/population-germany/1978-2011.rows.json", function(data) {
		chart.setup({
			columns: columnNames,
			rows: data,
			autostep: true,
			w: document.width - 50,
			h: Math.round(window.innerHeight * .6)
		});
	});
});

chart.setup = function(options) {
	// setup variables and dimensions
	chart.options = options = options || {};	// initialize options when none were passed in
	var w = chart.w = options.w || 800;	// default width
	var h = chart.h = options.h || 500;	// default height
	var cols = chart.cols = options.columns || [];
	var rows = chart.rows = options.rows || [];
	var currentYear = chart.current = 0;
	chart.timer = null;

	// create our SVG container and setup width and height
	var svg = chart.svg = d3.select("body").append("svg");
	svg.attr("width", w).attr("height", h);

	// create a linear scale for our values
	var yScale = chart.yScale = d3.scale.linear();

	// adjust input domain to maximum in data
	var max = 0;
	rows.forEach(function(r) {
		var max_in_row = d3.max(r);
		if (max_in_row > max)
			max = max_in_row;
	});
	yScale.domain([0, max]);
	// adjust output range to pixel height of the chart
	yScale.range([0, h]);

	// create some context
	chart.title = d3.select("body").append("h2");
	chart.btn = d3.select("body").append("button").text("➜").on("click", chart.step);

	chart.draw();
}

chart.draw = function() {
	if (chart.rows.length > chart.current) {
		var row = chart.rows[chart.current];
		var year = row.shift();

		// create visual elements (i.e. bars representing data)
		var bars = chart.svg.selectAll("rect").data(row);
		// update existing
		bars.transition()
				.duration(200)
				.attr("y",
				function(d) {
					return chart.h - chart.yScale(d);
				})
				.attr("height",
				function(d) {
					return d !== -1 ? chart.yScale(d) : 0;
				});
		// create missing
		bars.enter().append("rect")
				.attr("x",
				function(d, i) {
					return i * (chart.w / row.length);
				})
				.attr("width",
				function() {
					return chart.w / row.length - 2;
				})
				.attr("y", chart.h)
				.transition()
				.duration(1000)
				.attr("y",
				function(d) {
					return chart.h - chart.yScale(d);
				})
				.attr("height",
				function(d) {
					return d !== -1 ? chart.yScale(d) : 0;
				});

		// update context information
		chart.title.text(year);
	}
}

chart.step = function() {
	chart.current++;
	chart.draw();
	if (chart.options.autostep) {
		if (chart.timer !== null)
			window.clearTimeout(chart.timer);
		chart.timer = window.setTimeout(chart.step, 100);
	}
}