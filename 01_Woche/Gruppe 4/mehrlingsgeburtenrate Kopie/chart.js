var dataArray = [13103,13181,12698,12295,12728,13089,13307,13428,14183,14509,14701,14657,14817,15028,14365,13773,13018,
12186,11296,10250,9751,8558,7699,7554,7186,7488,7141,7243,7371,7967,7781,7867,7792,7909,8249,8792,9186,9483,9544,10024,
9620,9564,9826,9744,10095,11063,11465,11702,11481,11546,11064,11438,11148,12032,10447,10538,10829,10820,11026,11573,11254];       //datensatz
var width = 500;                     
var height = 20000;

var widthScale = d3.scale.linear()     
                 .domain([0, 20000])      
                 .range([0, width]);    


var color = d3.scale.linear()               
             .domain ([0, 20000])             
             .range (["red", "blue"])      
             
var axis = d3.svg.axis()  
             .ticks(5)                   
             .scale(widthScale);
                         
//setup
var canvas = d3.select("body")            
             .append("svg")             
             .attr("width", width)           
             .attr("height", height)         
             .append("g")                   
             .attr("transform", "translate (50, 50)")   
                                        

             
var bars = canvas.selectAll ("rect")        
             .data(dataArray)               
             .enter()                       
                  .append("rect")                                         
                  .attr("width", function(d) {return widthScale (d); })    
                  .attr("height", 2)                                      
                  .attr("fill", function (d) { return color (d) })                                          
                  .attr("y", function(d, i) {return i * 5; });          
                  
canvas.append("g")
     .attr("transform", "translate(0, 400)")
     .call(axis);