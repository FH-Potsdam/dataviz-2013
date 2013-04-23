d3.csv("data/effizienz_bundesliga.csv",


function(data) {
                    console.log(data);

                    var dataSet = data;
                    var width = 600;
                    var height = 650;
					
                    var widthScale1 = d3.scale.linear()
                            .domain([0, d3.max(data, function(d){ return parseInt(d.lizenzspieleretat); })])
                            .range([0,width]);

                    var widthScale2 = d3.scale.linear()
                        	.domain([0, d3.max(data, function(d){ return parseInt(d.punkte); })])
                        	.range([0,width]);
						
					var formatMillion = d3.format(".3s");
						
					var xAxis = d3.svg.axis()
							.scale(widthScale1)
							.orient("top")
							.ticks(4)
							.tickFormat(formatMillion);
					
					var xGrid = d3.svg.axis()
							.scale(widthScale1)
							.orient("bottom")
							.ticks(4)
							.tickSize(height,0,0);
						
                    var canvas = d3.select("body") //Create SVG element
                            .append("svg")
                            .attr("width", width)
                            .attr("height",height)
							.attr("class", "canvas");
							
						canvas.append("g")
							.attr("class", "grid")
							.call(xGrid)
							.attr("transform", "translate(30,-30)");

                    var group_1 = canvas.append("g");
                    var group_2 = canvas.append("g");
					
					var logo_group = canvas.append("g").attr("transform", "translate(0,-2)");

                    var bars1 = group_1.selectAll("rect") //Create bars: lizenzspieleretat
                            .data(dataSet)
                            .enter()
                            .append("rect")
                            .attr("height", 10)
                            .attr("y", function(d, i) { return i*35; })
							.attr("transform", "translate(30,0)")
                            .attr("fill", "rgb(90, 180, 172)")
							.attr("opacity", 0.8)
							.transition()
							.duration(500)
							.ease("cubic-in-out")
                            .attr("width", function(d) { return widthScale1(d.lizenzspieleretat); });
                            
                    var bars2 = group_2.selectAll("rect")  //Create bars: punkte
                        	.data(dataSet)
                        	.enter()
                        	.append("rect")
							.attr("height", 10)
                        	.attr("y", function(d, i) { return i*35 + 11; })
							.attr("transform", "translate(30,0)")
                        	.attr("fill", "rgb(153, 153, 153)")
							.attr("opacity", 0.8)
							.transition()
							.duration(500)
							.ease("cubic-in-out")
							.delay(500)
                        	.attr("width", function(d) { return widthScale2(d.punkte); });
							
					var logos = logo_group.selectAll("image")
							.data(dataSet)
							.enter()
							.append("image")
							.attr("xlink:href", function(d,i) { return "logos/"+d.platz+".png" })
							.attr("height", 25)
              			  	.attr("width", 25)
							.attr("y", function(d, i) { return i*35; });
						
						
						canvas.append("g")
							.attr("class", "axis")
							.call(xAxis)
							.attr("transform", "translate(30,-30)");
							
							

						
							
									
            });