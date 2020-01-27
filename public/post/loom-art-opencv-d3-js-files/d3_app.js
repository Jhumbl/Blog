var w = 700;
var h = 400;

var svg1 = d3.select("#chart")
         .append("div")
         .attr("class", "svg")
         .attr("id", "svg1")
         .style("position", "relative")
         .append("svg")
         .attr("width", w)
         .attr("height", h);

var svg2 = d3.select("#chart")
         .append("div")
         .attr("class", "svg")
         .attr("id", "svg2")
         .style("position", "relative")
         .append("svg")
         .attr("width", w)
         .attr("height", h);
var svg3 = d3.select("#chart")
         .append("div")
         .attr("class", "svg")
         .attr("id", "svg3")
         .style("position", "relative")
         .append("svg")
         .attr("width", w)
         .attr("height", h);

var left_img_centre_x = w/4;
var left_img_centre_y = h/2;
var right_img_centre_x = w*3/4;
var right_img_centre_y = h/2;
var img_radius = w/4.6;

// =============================================
// Elvis Presley Image
// =============================================
        
var clip = svg1.append("defs")
                .append("clipPath")
                .attr("id", "image_border_elvis")
                .append("rect")
                .attr("id", "elvis_border")
                .attr("x", left_img_centre_x - img_radius)
                .attr("y", left_img_centre_y - img_radius)
                .attr("rx", 220)
                .attr("ry", 220)
                .attr("width", img_radius*2)
                .attr("height", img_radius*2)
                .attr("fill-opacity", 0)
                .attr("stroke", "black")
                .attr("stroke-width", 3);

svg1.append("svg:image")
    .attr("id", "elvis")
    .attr('x', left_img_centre_x - img_radius)
    .attr('y',left_img_centre_y - img_radius)
    .attr('width', img_radius*2)
    .attr('height', img_radius*2)
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/elvis4.jpg")
    .attr("clip-path", "url(#image_border_elvis)");

var rect = svg1.append("use")
    .attr("xlink:href", "#elvis_border")
    .attr("y", 0)
    .attr("x", 0);

for (var i = 0; i < 200; i++) { 
    svg1.append("circle")
        .attr("cx", right_img_centre_x + img_radius*Math.sin(i*2* Math.PI/ (200)))
        .attr("cy", right_img_centre_y + img_radius*Math.cos(i*2* Math.PI/ (200)))
        .attr("r", 1.5)
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("stroke-width", 0.01)
        .attr("opacity", 1);
} 
    
// =============================================
// Audrey Hepburn Image
// =============================================

var clip = svg2.append("defs")
                .append("clipPath")
                .attr("id", "image_border_audrey")
                .append("rect")
                .attr("id", "audrey_border")
                .attr("x", right_img_centre_x - img_radius)
                .attr("y", right_img_centre_y - img_radius)
                .attr("rx", 220)
                .attr("ry", 220)
                .attr("width", img_radius*2)
                .attr("height", img_radius*2)
                .attr("fill-opacity", 0)
                .attr("stroke", "black")
                .attr("stroke-width", 3);

svg2.append("svg:image")
    .attr("id", "audrey")
    .attr('x', right_img_centre_x - img_radius)
    .attr('y',right_img_centre_y - img_radius)
    .attr('width', img_radius*2)
    .attr('height', img_radius*2)
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/audrey3.jpg")
    .attr("clip-path", "url(#image_border_audrey)");

var rect = svg2.append("use")
    .attr("xlink:href", "#audrey_border")
    .attr("y", 0)
    .attr("x", 0);

for (var i = 0; i < 200; i++) { 
    svg2.append("circle")
        .attr("cx", left_img_centre_x + img_radius*Math.sin(i*2* Math.PI/ (200)))
        .attr("cy", left_img_centre_y + img_radius*Math.cos(i*2* Math.PI/ (200)))
        .attr("r", 1.5)
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("stroke-width", 0.01)
        .attr("opacity", 1);
} 

// =============================================
// Amy Winehouse Image
// =============================================

var clip = svg1.append("defs")
                .append("clipPath")
                .attr("id", "image_border_amy")
                .append("rect")
                .attr("id", "amy_border")
                .attr("x", left_img_centre_x - img_radius)
                .attr("y", left_img_centre_y - img_radius)
                .attr("rx", 220)
                .attr("ry", 220)
                .attr("width", img_radius*2)
                .attr("height", img_radius*2)
                .attr("fill-opacity", 0)
                .attr("stroke", "black")
                .attr("stroke-width", 3);

svg3.append("svg:image")
    .attr("id", "amy")
    .attr('x', left_img_centre_x - img_radius)
    .attr('y',left_img_centre_y - img_radius)
    .attr('width', img_radius*2)
    .attr('height', img_radius*2)
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/amy5_gray.jpg")
    .attr("clip-path", "url(#image_border_amy)");

var rect = svg3.append("use")
    .attr("xlink:href", "#amy_border")
    .attr("y", 0)
    .attr("x", 0);

for (var i = 0; i < 200; i++) { 
    svg3.append("circle")
        .attr("cx", right_img_centre_x + img_radius*Math.sin(i*2* Math.PI/ (200)))
        .attr("cy", right_img_centre_y + img_radius*Math.cos(i*2* Math.PI/ (200)))
        .attr("r", 1.5)
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("stroke-width", 0.01)
        .attr("opacity", 1);
} 

// =============================================
// Signitures
// =============================================

svg1.append("image")
    .attr("class", "signiture")
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/elvis_signiture.svg")
    .attr("x", w/2 - 150)
    .attr("y", 10)
    .attr("width", 300)
    .attr("height", 120);

svg2.append("image")
    .attr("class", "signiture")
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/audrey_signiture.svg")
    .attr("x", w/2 - 100)
    .attr("y", 0)
    .attr("width", 200)
    .attr("height", 100);

svg3.append("image")
    .attr("class", "signiture")
    .attr("xlink:href", "/post/loom-art-opencv-d3-js-files/amy_signiture.svg")
    .attr("x", w/2 - 50)
    .attr("y", 40)
    .attr("width", 100)
    .attr("height", 60);

// =============================================
// Repeat Buttons
// =============================================

d3.select("#svg1")
  .append("button")
  .attr("id", "elvis_button")
  .attr("class", "button")
  .text("Click to Play")
  .style("position", "absolute")
  .style("left", "50%")
  .style("top", "75%")
  .style("transform", "translate(-50%,0%)");
d3.selectAll("#svg2")
  .append("button")
  .attr("id", "audrey_button")
  .attr("class", "button")
  .text("Click to Play")
  .style("position", "absolute")
  .style("left", "50%")
  .style("top", "75%")
  .style("transform", "translate(-50%,0%)");
d3.selectAll("#svg3")
  .append("button")
  .attr("id", "amy_button")
  .attr("class", "button")
  .text("Click to Play")
  .style("position", "absolute")
  .style("left", "50%")
  .style("top", "75%")
  .style("transform", "translate(-50%,0%)");

// =============================================
// Loom Art
// =============================================

d3.json("/post/loom-art-opencv-d3-js-files/full_edge_list.json")
   .then(function(data){
        console.log("hello");
        var edges = data;
        var lines = {"elvis_button": {"lines_class": ".lines_elvis", "no_of_lines" : 8000}, 
                      "audrey_button": {"lines_class": ".lines_audrey", "no_of_lines" : 7500}, 
                      "amy_button": {"lines_class": ".lines_amy", "no_of_lines" : 8000}};
                      
        var isSafari = window.safari !== undefined;
        if (isSafari) console.log("Safari, yeah!");

        svg1.selectAll(".lines_elvis")
                .data(edges["elvis"])
                .enter()
                .append("line")
                .attr("class", "lines_elvis")
                .attr("x1", function(d, i){
                    if (i < lines["elvis_button"]["no_of_lines"]){
                        return right_img_centre_x + img_radius*Math.sin(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("y1", function(d, i){
                    if (i < lines["elvis_button"]["no_of_lines"]){
                        return right_img_centre_y + img_radius*Math.cos(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("x2", function(d, i){
                    if (i < lines["elvis_button"]["no_of_lines"]){
                        return right_img_centre_x + img_radius*Math.sin(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("y2", function(d, i){
                    if (i < lines["elvis_button"]["no_of_lines"]){
                    return right_img_centre_y + img_radius*Math.cos(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("stroke", "black")
                .attr("stroke-width", 0.07)
                .attr("opacity", function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .transition()
                .attr("opacity",function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .on("end", function(){
                    d3.select("#elvis_button")
                      .style("visibility", "visible")
                })

        svg2.selectAll(".lines_audrey")
                .data(edges["audrey"])
                .enter()
                .append("line")
                .attr("class", "lines_audrey")
                .attr("x1", function(d, i){
                    if (i < lines["audrey_button"]["no_of_lines"]){
                        return left_img_centre_x + img_radius*Math.sin(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("y1", function(d, i){
                    if (i < lines["audrey_button"]["no_of_lines"]){
                        return left_img_centre_y + img_radius*Math.cos(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("x2", function(d, i){
                    if (i < lines["audrey_button"]["no_of_lines"]){
                        return left_img_centre_x + img_radius*Math.sin(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("y2", function(d, i){
                    if (i < lines["audrey_button"]["no_of_lines"]){
                    return left_img_centre_y + img_radius*Math.cos(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("stroke", "black")
                .attr("stroke-width", 0.07)
                .attr("opacity",function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .transition()
                .attr("opacity", function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .on("end", function(){
                    d3.select("#audrey_button")
                      .style("visibility", "visible")
                })

        svg3.selectAll(".lines_amy")
                .data(edges["amy"])
                .enter()
                .append("line")
                .attr("class", "lines_amy")
                .attr("x1", function(d, i){
                    if (i < lines["amy_button"]["no_of_lines"]){
                        return right_img_centre_x + img_radius*Math.sin(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("y1", function(d, i){
                    if (i < lines["amy_button"]["no_of_lines"]){
                        return right_img_centre_y + img_radius*Math.cos(d["x"]*2* Math.PI/ (200));
                    }
                })
                .attr("x2", function(d, i){
                    if (i < lines["amy_button"]["no_of_lines"]){
                        return right_img_centre_x + img_radius*Math.sin(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("y2", function(d, i){
                    if (i < lines["amy_button"]["no_of_lines"]){
                    return right_img_centre_y + img_radius*Math.cos(d["y"]*2* Math.PI/ (200));
                    }
                })
                .attr("stroke", "black")
                .attr("stroke-width", 0.07)
                .attr("opacity", function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .transition()
                .attr("opacity", function(){
                  if (isSafari){
                    return 0.15;
                  } else {
                    return 0.7;
                  }
                })
                .on("end", function(){
                    d3.select("#amy_button")
                      .style("visibility", "visible")
                })

        // =============================================
        // Loom Art ANIMATION
        // =============================================


    
             
        d3.selectAll("button")
            .on("click", function(){
                var button_id = this.id;
                var lines_class = lines[button_id]["lines_class"];
                var num_lines = lines[button_id]["no_of_lines"];
                console.log(num_lines);
                
                d3.select(this)
                    .style("visibility", "hidden")
                d3.selectAll(lines_class)
                    .attr("opacity", 0.8)
                    .attr("stroke", "white")
                    .transition()
                    .duration(10)
                    .delay(function(d,i){
                        return Math.ceil(i/10) * 15;
                    })
                    .attr("stroke", "black")
                    .on("end", function(d,i){
                        if (i == num_lines-1){
                            console.log("finished");
                            d3.select("#" + button_id)
                            .style("visibility", "visible");
                        }
                    });
            });




   })
