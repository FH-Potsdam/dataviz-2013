var app = app || {};


jQuery(document).ready(function() {

	app.people = people || [];
	app.people_per_group = 3;
	app.nr_of_groups = Math.ceil(people.length / app.people_per_group);
	app.groups = [];
	for (var i = 0; i < app.nr_of_groups; i++) {
		app.groups[i] = [];
	}

	var list = d3.select("#original");

	var offset = $("#original").offset();

	var groups = d3.select("#grouped");

	list.selectAll("div.member")
			.data(app.people)
			.enter().append("div")
			.attr("class", "member")
			.style("top", function(d, i) {
		return offset.top + (i * 20) + "px";
	})
			.text(
			function(d) {
				return d.name;
			});

	groups.selectAll("div.group")
			.data(app.groups)
			.enter().append("div").attr("class", "group").text(
			function(d, i) {
				return "Gruppe " + (i + 1);
			});

	app.choose();

});


app.choose = function() {
	var $groups = $(".group");
	var groupindex = 0;
	for (var i = 0; i < app.nr_of_groups; i++) {
		if ($groups.eq(i).find(".member").length < app.people_per_group) {
			groupindex = i;
			break;
		}
	}

	var people_left = $("#original .member:not(.chosen)").length;
	var chosen = app.random(0, people_left-1);
	
	d3.select("#original .member:not")
}

app.random = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}