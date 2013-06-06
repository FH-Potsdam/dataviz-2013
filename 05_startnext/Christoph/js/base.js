var allData = allData || {};
var variable = variable || {};
var projectData;
jQuery(document).ready(function() {   
  allData.project_id = 6170;
  // allData.project_id = 7594;
  // allData.project_id = 4348;
  
  
  $.getJSON("proxy.php", { url : "https://api.startnext.de/v1/projects/"+allData.project_id }, function (data) {
    allData.project = data;
    loaded();
  });

  $.getJSON("proxy.php", { url : "https://api.startnext.de/v1/projects/"+allData.project_id+"/fans/?limit=999" }, function (data) {
    allData.fans = data;
    loaded();
  });

  $.getJSON("proxy.php", { url : "https://api.startnext.de/v1/projects/"+allData.project_id+"/fundings/?limit=999" }, function (data) {
    allData.fundings = data;
    loaded();
  });

  $.getJSON("proxy.php", { url : "https://api.startnext.de/v1/projects/"+allData.project_id+"/updates/?limit=999" }, function (data) {
    allData.updates = data;
    loaded();
  });
  
  
});

var loaded = function() {
  console.log("loaded");
  if(allData.fans && allData.project && allData.fundings && allData.updates) {
    setup();
  }
}

var setup = function() {
  projectData = allData.project.contents.data[0];
  draw_header();
  draw_timeline();
  console.log(allData);
}

var draw_header = function() {  
  var header = d3.select("#widget").append("div").attr("id", "widget-header");
  header.append("h1").html(projectData.title);
  header.append("h2").html(projectData.city);
  header.append("h3").html("Status: "+projectData.funding_status+"€");
  header.append("h3").html("Ziel: "+projectData.funding_target+"€");
  console.log(projectData);
}

var draw_timeline = function() {  
  var start_date = new Date(projectData.start_date*1000);
  var end_date = new Date(projectData.end_date*1000);
  var today = new Date();
  var diff = (end_date-start_date)/100000000;
  console.log(diff+" "+(today-start_date)/100000000);
  var pos_y = new Array();
  var pos_y2 = new Array();
  var box_gap = 2;
  var timeline_height = 500;
  var timeline_null = 450;
  var timeline_width = 1000;
  var box_height = 4;
  var box_width = (1000-(diff*box_gap))/diff;

  var scale_funding = d3.scale.linear()
    .domain([0, projectData.funding_target])
    .range([0, timeline_null]);
  
  var timeline = d3.select("#widget").append("svg").attr("id", "timeline-container").attr("width", timeline_width).attr("height", timeline_height);
  
  timeline.append("rect").attr("width", timeline_width).attr("height", timeline_height).attr("fill", "#bbb");
  
  timeline.append("g").selectAll("rect").data(allData.fundings.contents.data).enter()
    .append("rect")
    .attr("x", function(d,i) { 
      var curr_date = new Date(d.created*1000);
      var diff_curr = parseInt((curr_date-start_date)/100000000);
      if(pos_y[diff_curr]) {
        pos_y[diff_curr] += 1;
        d.pos_y = pos_y[diff_curr]*(box_height+box_gap);
      } else {
        pos_y[diff_curr] = 1;
        d.pos_y = pos_y[diff_curr]*(box_height+box_gap);
      }
      return diff_curr*(box_width+box_gap);
    })
    .attr("y", function(d,i) { return timeline_null-d.pos_y; })
    .attr("width", box_width)
    .attr("height", box_height);
  
    console.log(allData.updates.contents.data);
  timeline.append("g").selectAll("rect").data(allData.updates.contents.data).enter()
    .append("rect")
    .attr("fill", "#0000ff")
    .attr("x", function(d) { 
      var curr_date = new Date(d.created*1000);
      var diff_curr = parseInt((curr_date-start_date)/100000000);
      if(pos_y2[diff_curr]) {
        pos_y2[diff_curr] += 1;
        d.pos_y = pos_y2[diff_curr]*(box_height+box_gap);
      } else {
        pos_y2[diff_curr] = 1;
        d.pos_y = pos_y2[diff_curr]*(box_height+box_gap);
      }
      return diff_curr*(box_width+box_gap);
    })
    .attr("y", function(d) { return timeline_null+d.pos_y; })
    .attr("width", box_width)
    .attr("height", box_height);
  
  timeline.append("rect")
    .attr("id", "funding_max")
    .attr("width", 4)
    .attr("height", timeline_null)
    .attr("x", (today-start_date)/100000000*(box_width+box_gap))
    .attr("y", 0);
    
  timeline.append("rect")
    .attr("id", "funding_curr")
    .attr("fill", "#ff00ff")
    .attr("width", 4)
    .attr("height", function() { return scale_funding(projectData.funding_status); })
    .attr("x", ((today-start_date)/100000000)*(box_width+box_gap))
    .attr("y", function() { return timeline_null-scale_funding(projectData.funding_status); });
    
  timeline.append("text")
    .attr("fill", "red")
    .attr("x", ((today-start_date)/100000000)*(box_width+box_gap)+10)
    .attr("y", function() { return timeline_null-scale_funding(projectData.funding_status)+10; })
    .text(projectData.funding_status+"€");
    
  timeline.append("text")
    .attr("fill", "red")
    .attr("x", ((today-start_date)/100000000)*(box_width+box_gap)+10)
    .attr("y", function() { return timeline_null-scale_funding(projectData.funding_target)+10; })
    .text(projectData.funding_target+"€");

}