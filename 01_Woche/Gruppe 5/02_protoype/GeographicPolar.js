$(document).ready(function() {
	
	    var w = 400;
	    var h = 400;
	
		var data = d3.csv("./data/m_an.csv", function(d) {});
		console.log(data);

	    var svg = d3.select("#chartWrapper").append('svg').attr('width', w).attr('height', h);
		var group = svg.append("g.geoPolar");
		
		bar = d3.svg.arc().innerRadius( 0 ).outerRadius( function(d,i) { return radius( timeseries[val][0][i] ); });
					
});