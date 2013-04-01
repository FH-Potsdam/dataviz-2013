var app = app || {};

jQuery(document).ready(function() {
	app.setup({
		people: people,	// we get the people array from index.html
		groupsize: 3
	});

	$("#btn-group-now").click(function() {
		app.reveal();
	});
});

app.setup = function(options) {
	options = options || {};
	// Settings (could be injected via options)
	app.people = options.people || [];
	app.people_per_group = options.groupsize || 3;
	
	// Some preparations
	app.nr_of_groups = Math.ceil(people.length / app.people_per_group);
	app.groups = [];
	for (var i = 0; i < app.nr_of_groups; i++) {
		app.groups[i] = [];
	}

	// Create group containers for position reference
	d3.select("#grouped").selectAll("div.group")
			.data(app.groups)
			.enter().append("div").attr("class", "group").text(
			function(d, i) {
				return "Gruppe " + (i + 1);
			});

	// Assign groups and final element positions
	app.people = app.assign(app.people, app.nr_of_groups, app.people_per_group);
	app.people.forEach(function(p, i) {
		var offset = $(".group:eq(" + p.group.index + ")").offset();
		p.offset = {top: offset.top + (p.group.position) * 20, left: offset.left};
	});

	var list = d3.select("#original").selectAll("div.member").data(app.people);
	var offset = $("#original").offset();

	// Create elements for the members and animate their entrance
	list.enter().append("div")
			.attr("class", "member")
			.style("top",
			function(d, i) {
				return offset.top + (i * 20) + "px";
			})
			.style("left",
			function(d, i) {
				return -200 + "px"; //offset.left + "px";
			})
			.text(
			function(d) {
				return d.name;
			})
			.transition()
			.duration(500)
			.delay(
			function(d, i) {
				return i * 50;
			})
			.style("left", offset.left + "px");

	app.memberlist = list;
}


/**
 * Assigns groups to an array of objects by setting a group property (needs jQuery)
 * @param {array} people
 * @param {int} nr_of_groups
 * @param {int} people_per_group
 * @returns {app.assign.list_of_people}
 */
app.assign = function(people, nr_of_groups, people_per_group) {

	var random = function(min, max) {
		// proper random value between min and max
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var tmp_people = [];
	// create temporary copy of memberlist
	people.forEach(function(el) {
		tmp_people.push(el);
	});
	// go through groups and randomly choose members
	for (var i = 0; i < nr_of_groups; i++) {
		for (var j = 0; j < people_per_group; j++) {
			if (tmp_people.length > 0) {
				var chosen_index = random(0, tmp_people.length - 1);
				var chosen = tmp_people[chosen_index];
				// add information about group to original member array
				people[(chosen.nr - 1)].group = {index: i, position: j + 1};
				// remove entry from temporary list
				tmp_people.splice(chosen_index, 1);
			} else {
				break;
			}
		}
	}
	return people;
}

/**
 * Reveals the previously assigned groups in an animated transition
 * @returns {undefined}
 */
app.reveal = function() {
	app.memberlist.transition()
			.duration(300)
			.delay(
			function(d, i) {
				return i * 400;
			})
			.style("top",
			function(d) {
				return d.offset.top + "px";
			})
			.style("left",
			function(d) {
				return d.offset.left + "px";
			});
}