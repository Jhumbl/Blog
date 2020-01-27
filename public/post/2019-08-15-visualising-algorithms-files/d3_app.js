/*
 * Summary: This file contains code for creating the d3 visualisation of the OPTICS algorithm.
 * Author: Jack Humble 
 * Date: 2019/06/06
 */

var w = 700;
var h = 920;
var padding = 20;

var svg = d3.select("#chart")
  .style("position", "relative")
  .append("svg")
  .attr("id", "optics-viz")
  .attr("width", w)
  .attr("height", h)
  .style("position", "relative");

d3.select("#chart").append("div")
   .attr("class", "hover-window")
   .style("width", "700px")
   .style("height", "235px")
   .style("top", "-333px")
   //.style("left", "50%")
   .style("position", "relative")
   .style("background-color", "red")
   .style("opacity", "0");

jQuery.get('/post/2019-08-15-visualising-algorithms-files/points_random.csv', function(data) {
    //console.log(data);
    data = $.csv.toObjects(data);
    data = data.map(p => new Point(p.x, p.y, false, null, null, "black"));

    optics2 = new OPTICS(points = data, epsilon= 100, minPts=5);
    var optics_arr = optics2.run();
    

    for (const obj of optics_arr){
        if (obj.rd === null){
            obj.rd = 0;
        }
        obj.x = parseFloat(obj.x);
        obj.y = parseFloat(obj.y);
    }
    
    // Initialize colours to the starting value
    colours = ["#AD494A", "#BD9E39", "#6B6ECF", "#393B79", "#8C6D32", "#5254A3", "#8CA253", "#E7BA52", "#E7CB95", "#B5CF6B", "#843C39", "#9C9EDE", "#7B4173", "#CEDB9C"];

    var i=0;
    var last_col;
    var epsilon = 6.2;
    for (const point of optics_arr){
        if (point.rd < epsilon){
            point.colour = colours[i];
            last_col = colours[i];
        } else {
            point.colour = "black";
            if (last_col != "black"){
                i = i+1;
            }  
            last_col = "black";           
        }
    }
    

    // ============================================================================
    // D3 VISUALISATION
    // ============================================================================

    // Show button
    d3.select("#algorithm-button")
      .style("visibility", "visible")
    // ============================================================================
    // DBSCAN CLUSTER SCATTERPLOT
    // ============================================================================

    var xScaleScatter = d3.scaleLinear()
                          //.domain([0, d3.max(optics_arr, function(d){
                          //    return d.x;
                          //})])
                          .domain([0,100])
                          .range([40, w-40]);

    var yScaleScatter = d3.scaleLinear()
                          .domain([0, d3.max(optics_arr, function(d){
                              return d.y;
                          })])
                          .range([w-150, 20]);
    
    var xAxisScatter = d3.axisBottom(xScaleScatter).ticks(10);
    var yAxisScatter = d3.axisLeft(yScaleScatter).ticks(10)
            
    d3.select("#optics-viz")
      .selectAll("circle")
      .data(optics_arr)
      .enter()
      .append("circle")
      .attr("class", "circles")
      .attr("cx", function(d){
          return xScaleScatter(d.x);
      })
      .attr("cy", function(d){
          return yScaleScatter(d.y);
      })
      .attr("r", function(d){
        if (d.colour == "black"){
            return 1;
        } else {
            return 2;
        }
      })
      .attr("fill", function(d){
          return d.colour;
      });

    d3.select("#optics-viz")
      .append("g")
      .attr("class", "x axis scatter")
      .style("font-size", "12px")
      .attr("transform", function(){
        return "translate(0," + yScaleScatter(0) + ")";
      })
      .call(xAxisScatter);

    d3.select("#optics-viz")
      .append("g")
      .attr("class", "y axis scatter")
      .style("font-size", "12px")
      .attr("transform", "translate(40, 0)")
      .call(yAxisScatter);

    // ============================================================================
    // OPTICS BAR PLOT REACHABILITY DISTANCE
    // ============================================================================

    var xScale = d3.scaleBand()
                   .domain(d3.range(optics_arr.length))
                   .range([40, w-40]) 
                   .paddingInner(0);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(optics_arr, function(d){
                       return d.rd;
                   })])
                   .range([0, h*31/128]);

    var yAxisScale = d3.scaleLinear()
                   .domain([0, d3.max(optics_arr, function(d){
                       return d.rd;
                   })])
                   .range([h*31/128, 0]);

    var xAxis = d3.axisBottom(xScale)
                  .tickValues(xScale.domain().filter(function(d,i){return !(i%200)}));

    var yAxis = d3.axisLeft(yAxisScale).ticks(6);
                   
    svg.selectAll(".bars")
        .data(optics_arr)
        .enter()
        .append("rect")
        .attr("class", "bars")
        .attr("id", function(d,i){
            return "bar_" + i;
        })
        .attr("x", function(d,i){
            return xScale(i);
        })
        .attr("y", function(d){
            return h-yScale(d.rd)-100;
        })
        .attr("height", function(d){
            //console.log(d.rd);
            return yScale(d.rd);
        })
        .attr("width", function(d){
            return xScale.bandwidth();
        })
        .attr("fill", function(d){
            return d.colour;
        })
        .attr("stroke", function(d){
            return d.colour;
        })
        .attr("stroke-wifth", 0.001);

    svg.append("g")
       .attr("class", "x axis")
       .style("font-size", "12px")
       .attr("transform", "translate(0, 830)")
       .call(xAxis);

    svg.append("g")
       .attr("class", "y axis")
       .style("font-size", "12px")
       .attr("transform", "translate(40,596.7)")
       .call(yAxis);

    var horizontal = d3.select("#chart")
       .append("div")
       .attr("class", "remove")
       .style("position", "absolute")
       .style("text-align", "center")
       .style("z-index", "19")
       .style("width", "660px")
       .style("height", "1px")
       .style("top", "771px")
       .style("left", "50%")
       .style("margin-left", "-330px")
       .style("background", "none")
       .style("border-top", "1px dashed grey")
       .style("pointer-events", "none");

    var epsilon_text = d3.select("#chart")
                         .append("div")
                         .attr("class", "epsilon")
                         //.style("width", "90px")
                         .style("height", "fit-content")
                         .style("position", "absolute")
			 .style("white-space", "nowrap")
                         .style("text-align", "center")
			 //.style("alignment-baseline", "middle")
                         .style("z-index", 19)
                         .style("top", "752px")
                         .style("left", "8%")
                         //.style("margin-left", "-275")
                         .style("background", "rgba(255, 255, 255, 0.7)")
                         .style("background-opacity", "0.5")
			 .style("margin", "0")
			 .style("padding", "0")
			 .style("padding-left", "5px")
			 .style("padding-right", "5px")
			 //.style("padding-top", "10px")
			 //.style("padding-bottom", "10px")
                         .style("pointer-events", "none")
			 .style("line-height", "18px");

    epsilon_text.append("text")
                .attr("id", "eps_value")
                .text("𝜀' = 6.2")
                .style("font-size", "14px")
		.style("display", "table")
                .style("pointer-events", "none")
		.style("text-anchor", "middle")
 		.style("alignment-baseline", "middle");
    
    // ============================================================================
    // UPDATE BAR AND SCATTER BASED ON MOUSE
    // ============================================================================

    function update_reachability(mousey){
        
        mousey = mousey[1] + 631;
        horizontal.style("top", mousey + "px");
        
        epsilon_text.style("top", function(){return ((mousey - 19) + "px");});
                
        epsilon = yAxisScale.invert(mousey - 634.5)
        
        d3.select("#eps_value").text(function(){
            if (epsilon >= 0){
            return "𝜀' = " + (epsilon).toFixed(1);
            } else {
                return "𝜀' = 0.0";
            }
        });
        
        
        var i=0;
        var last_col;
        for (const point of optics_arr){
            if (point.rd < epsilon){
                point.colour = colours[i];
                last_col = colours[i];
            } else {
                point.colour = "black";
                if (last_col != "black"){
                    i = i+1;
                }  
                last_col = "black";           
            }
        }

        d3.selectAll(".bars")
            .data(optics_arr)
            .attr("stroke", function(d){          
                return d.colour;
            })
            .attr("fill", function(d){
                return d.colour;
            });
        
        d3.selectAll(".circles")
            .data(optics_arr)
            .attr("fill", function(d){
                return d.colour;
            })
            .attr("r", function(d){
                if (d.colour == "black"){
                    return 1;
                } else {
                    return 2;
                }
            });

    };
    
    d3.select(".hover-window")
       .on("mousemove", function(){  
          //loop=false;
          var mouse = d3.mouse(this);
          update_reachability(mouse);
        })
       .on("mouseover", function(){
          var mouse = d3.mouse(this);  
          update_reachability(mouse);
        })
       .on("mouseout", function(){
            horizontal.style("top", "771px" );
            epsilon_text.style("top", "752px");
            d3.select("#eps_value").text("𝜀' = 6.2");

            var i=0;
            var last_col;
            for (const point of optics_arr){
                if (point.rd < 6.2){
                    point.colour = colours[i];
                    last_col = colours[i];
                } else {
                    point.colour = "black";
                    if (last_col != "black"){
                        i = i+1;
                    }  
                    last_col = "black";           
                }
            }   

            d3.selectAll(".bars")
                .data(optics_arr)
                .attr("stroke", function(d){          
                    return d.colour;
                })
                .attr("fill", function(d){
                    return d.colour;
                });
        
            d3.selectAll(".circles")
                .data(optics_arr)
                .attr("fill", function(d){
                    return d.colour;
                })
                .attr("r", function(d){
                    if (d.colour == "black"){
                        return 1;
                    } else {
                        return 2;
                    }
                });
       });
    

    // ============================================================================
    // AXIS LABELS
    // ============================================================================  

    svg.append("text")
        .text("X Value")
        .attr("x", w/2)
        .attr("y", 585)
        .style("text-anchor", 'middle');

    svg.append("text")
        .text("Y Value")
        .attr("transform", "rotate(-90)")
        .attr("x", -280)
        .attr("y", 12)
        .style("text-anchor", 'middle');


    svg.append("text")
        .text("Index of Ordered Points")
        .attr("x", w/2)
        .attr("y", 870)
        .style("text-anchor", 'middle');

    svg.append("text")
        .text("Reachability Distance")
        .attr("transform", "rotate(-90)")
        .attr("x", -705)
        .attr("y", 12)
        .style("text-anchor", 'middle');
    
    // ============================================================================
    // PATH ORDER OF POINTS ANIMATION
    // ============================================================================    
    var i = 0;
    function path(){
        
        // Line parameters
        var x1 = optics_arr[i].x;
        var y1 = optics_arr[i].y;
        var x2 = optics_arr[i+1].x;
        var y2 = optics_arr[i+1].y;
        var l = optics_arr.length;
        
        // Bar parameters
        var bar_height = yScale(optics_arr[i].rd);


        d3.select("#optics-viz")
            .append("line")
            .attr("class", "path_line")
            .attr("x1", xScaleScatter(x1))
            .attr("y1", yScaleScatter(y1))
            .attr("x2", xScaleScatter(x2))
            .attr("y2", yScaleScatter(y2))
            .attr("stroke", "black")
            .attr("stroke-width", 0.7)
            .transition()
            .duration(10)
            .attr("stroke", "black")
            .on("end", function(){
                if (i < l - 2){
                    
                    // Add each respective bar to the reachability plot
                    d3.select("#bar_" + i)
                      .transition()
                      .duration(10)
                      .attr("height", bar_height);
                    

                    i = i + 1;
                    path();
                } else {
                    d3.select("#bar_1298")
                      .attr("height", yScale(optics_arr[1298].rd))
                    d3.select("#bar_1299")
                      .attr("height", yScale(optics_arr[1299].rd))

                    //reset i for next run through.
                    i = 0;

                    d3.selectAll(".path_line")
                        .attr("opacity", 1)
                        .transition()
                        .duration(2000)
                        .attr("opacity", 0)
                        .on("end", function(){
                            //reset button styling
                            d3.select("#algorithm-button")
                                .style("opacity", "1")                     
                                .style("pointer-events", "auto")
                                .style("left", "-30%")
                                .text("Click to run OPTICS algorithm!");
                                
                        })
                        .remove();
                    

                    
                    
                }
            });
    }

    d3.select("#algorithm-button")
      .on("click", function(){
        // set up - remove bars, remove colour, remove pointer events, change button css
        d3.select("#algorithm-button")
          .style("opacity", "0.5")
          .style("pointer-events", "none")
          .style("left", "-37.95%")
          .text("Running...");

        d3.selectAll(".bars")
          .attr("height", 0);

        path();
      })     

});

