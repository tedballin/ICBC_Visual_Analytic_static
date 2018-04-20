//  //Injury
//  //create data url
//  var url1 = "data/ins1.csv";


//  //parse the date string
//  var parseDate = d3.timeParse("%Y");

//  //padding for x axis
//  var padding = 20;
//  //create margin
//  var margin = {
//      left: 50,
//      right: 50,
//      top: 40,
//      bottom: 40
//  }

//  //create the width and height of the chart
//  var width =600 - margin.left - margin.right,
//      height = 500 - margin.top - margin.bottom;


//  //create a svg element
//  var svg = d3.select("#bar")
//      .append("svg") //create new dom element
//      .attr("width", "100%")
//      .attr("height", height + margin.top + margin.bottom);


//  //creaete a group consists of both bar chart and axis
//  var chartGroup = svg.append("g")
//      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //  d3.csv(url1, function(d, i, columns) {
    //     for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    //     return d;
    //   }, 
    //  //.get() get data--returned data
    //  function (error, data) {

    //     var keys = data.columns.slice(1);

    //     console.log(keys);
    //      //create scale, use scale time for parsed date
    //      var xScale0 = d3.scaleBand()
    //          .domain(data.map(function (d) {
    //              return d["City"];
    //          }))
    //          .rangeRound([0, width])
    //          .padding(0.5);

    //      var xScale1 = d3.scaleBand()
    //      .domain(keys)
    //      .rangeRound([0, xScale0.bandwidth()])
    //      .padding(0.1);

    //      var yScale = d3.scaleLinear()
    //          .domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice()
    //          .range([height, 0]); //input -> output, invert y
        
    //     //color
    //     var z = d3.scaleOrdinal()
    //     .range(["darkred", "orange"]);

    //     //  //create yaxis
    //     //  var xAxis = d3.axisBottom(xScale);
    //     //  var yAxis = d3.axisLeft(yScale);

    //      //create an arry of rect svg elements
    //      bars = chartGroup.append("g")
    //      .selectAll("g")
    //      .data(data)
    //      .enter().append("g")
    //        .attr("transform", function(d) { return "translate(" + xScale0(d["City"]) + ",0)"; })
    //      .selectAll("rect")
    //      .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    //      .enter().append("rect")
    //      .attr("class", "bar")
    //        .attr("x", function(d) { return xScale1(d.key); })
    //        .attr("y", function(d) { return yScale(d.value); })
    //        .attr("width", xScale1.bandwidth())
    //        .attr("height", function(d) { return height - yScale(d.value); })
    //        .attr("fill", function(d) { return z(d.key); });

    //        chartGroup.append("g")
    //        .attr("class", "axis")
    //        .attr("transform", "translate(0," + height + ")")
    //        .call(d3.axisBottom(xScale0));
     
    //        chartGroup.append("g")
    //        .attr("class", "axis")
    //        .call(d3.axisLeft(yScale).ticks(null, "s"))
    //      .append("text")
    //        .attr("x", 2)
    //        .attr("y", yScale(yScale.ticks().pop()) + 0.5)
    //        .attr("dy", "0.32em")
    //        .attr("fill", "#000")
    //        .attr("font-weight", "bold")
    //        .attr("text-anchor", "start")
    //        .text("Million");
        

        
    //           //highlight
    //      bars.on("click", function (d) {

    //         var highlightkey = d.key;
           
    //         window.cityname =d["City"];
    
    //         console.log(cityname);

    //         // remove previous selecitons ...
    //         d3.selectAll("rect.bar").attr("fill", function(d) { return z(d.key); });

    //         d3.select(this)
    //             .attr("fill", "purple");

    //         d3.selectAll("rect.bar").classed("dim", function (dd) {
    //             if (dd.key == highlightkey)
    //                 return false;
    //             else
    //                 return true;
    //         })
    //         window.update();
    //     })
    //  });

// //  d3.select("#data2").on("click", function () {
// //      console.log("clicked");
// //      d3.csv(url2)
// //          //.row transform each data point
// //          .row(function (d) {
// //              //read column name (numbers) 
// //              city = d["City"];
// //              ins = +d["Material"];
// //              return d;
// //          })
// //          //.get() get data--returned data
// //          .get(function (error, data) {
// //              if (error) throw error;
// //              //create scale, use scale time for parsed date
// //              var xScale = d3.scaleBand()
// //                  .domain(data.map(function (d) {
// //                      return d["City"];
// //                  }))
// //                  .rangeRound([0, width])
// //                  .padding(0.5);

// //              var yScale = d3.scaleLinear()
// //                  .domain([0, d3.max(data, function (d) {
// //                      return d["Material"];
// //                  })])
// //                  .range([height, 0]); //input -> output, invert y

// //              //create yaxis
// //              var xAxis = d3.axisBottom(xScale);
// //              var yAxis = d3.axisLeft(yScale);

// //              //create an arry of rect svg elements
// //              bars = chartGroup.selectAll("rect.bar")
// //                  .data(data) //bind data
// //                  .transition()
// //                  .duration(1000)
// //                  .attr("fill", "orange")
// //                  .attr("x", function (d, i) {
// //                      return xScale(d["City"]);
// //                  })
// //                  .attr("y", function (d, i) {
// //                      return yScale(d["Material"]); //invert the y pos
// //                  })
// //                  .attr("width", 30)
// //                  .attr("height", function (d, i) {
// //                      return height - yScale(d["Material"]); //height - inverted y pos, then draw from that point to bottom
// //                  });



// //              //create label
// //              chartGroup.selectAll(".labels")
// //                  .data(data)
// //                  .transition()
// //                  .duration(1000)
// //                  .delay(1000)
// //                  .attr("fill", "orange")
// //                  .attr("x", function (d, i) {
// //                      return xScale(d["City"]);
// //                  })
// //                  .attr("y", function (d, i) {
// //                      return yScale(d["Material"]) - 5; //invert the y pos
// //                  })
// //                  .text(function (d, i) {
// //                      return "$" + (d["Material"]);
// //                  })

// //              //create the group for axis
// //              chartGroup.select(".axis_y")
// //                  .transition()
// //                  .duration(1000)
// //                  .call(yAxis);

// //              chartGroup.select(".axis_x")
// //                  .transition()
// //                  .duration(1000)
// //                  //adjest the position of sticks
// //                  .attr("transform", "translate(0," + height + ")")
// //                  .call(xAxis);
// //          });
// //          //highlight
// //          bars.on("click", function (d) {

// //             var highlightkey = d.key;
// //           cityname = d["City"];
// //             console.log(cityname);

// //             // remove previous selecitons ...
// //             d3.selectAll("rect.bar").attr("fill", "orange");

// //             d3.select(this)
// //                 .attr("fill", "purple");

// //             d3.selectAll("rect.bar").classed("dim", function (dd) {
// //                 if (dd.key == highlightkey)
// //                     return false;
// //                 else
// //                     return true;
// //             })
// //             window.update();
// //         })
         
// //  });

// //  d3.select("#data1").on("click", function () {
// //      console.log("clicked");
// //      d3.csv(url1)
// //          //.row transform each data point
// //          .row(function (d) {
// //              //read column name (numbers) 
// //              city = d["City"];
// //              ins = +d["Injury"];
// //              return d;
// //          })
// //          //.get() get data--returned data
// //          .get(function (error, data) {
// //              if (error) throw error;
// //              //create scale, use scale time for parsed date
// //              var xScale = d3.scaleBand()
// //                  .domain(data.map(function (d) {
// //                      return d["City"];
// //                  }))
// //                  .rangeRound([0, width])
// //                  .padding(0.5);

// //              var yScale = d3.scaleLinear()
// //                  .domain([0, d3.max(data, function (d) {
// //                      return d["Injury"];
// //                  })])
// //                  .range([height, 0]); //input -> output, invert y

// //              //create yaxis
// //              var xAxis = d3.axisBottom(xScale);
// //              var yAxis = d3.axisLeft(yScale);

// //              //create an arry of rect svg elements
// //              bars = chartGroup.selectAll("rect.bar")
// //                  .data(data) //bind data
// //                  .transition()
// //                  .duration(1000)
// //                  .attr("fill", "darkred")
// //                  .attr("x", function (d, i) {
// //                      return xScale(d["City"]);
// //                  })
// //                  .attr("y", function (d, i) {
// //                      return yScale(d["Injury"]); //invert the y pos
// //                  })
// //                  .attr("width", 30)
// //                  .attr("height", function (d, i) {
// //                      return height - yScale(d["Injury"]); //height - inverted y pos, then draw from that point to bottom
// //                  });
    
// //              //create label
// //              chartGroup.selectAll(".labels")
// //                  .data(data)
// //                  .transition()
// //                  .duration(1000)
// //                  .delay(1000)
// //                  .attr("fill", "darkred")
// //                  .attr("x", function (d, i) {
// //                      return xScale(d["City"]);
// //                  })
// //                  .attr("y", function (d, i) {
// //                      return yScale(d["Injury"]) - 5; //invert the y pos
// //                  })
// //                  .text(function (d, i) {
// //                      return "$" + (d["Injury"]);
// //                  })
                  
// //              //create the group for axis
// //              chartGroup.select(".axis_y")
// //                  .transition()
// //                  .duration(1000)
// //                  .call(yAxis);

// //              chartGroup.select(".axis_x")
// //                  .transition()
// //                  .duration(1000)
// //                  //adjest the position of sticks
// //                  .attr("transform", "translate(0," + height + ")")
// //                  .call(xAxis);
// //          });
// //          //highlight
// //          bars.on("click", function (d) {

// //             var highlightkey = d.key;
// //            cityname = d["City"];
// //             console.log(cityname);
// //             // remove previous selecitons ...
// //             d3.selectAll("rect.bart").attr("fill", "darkred");

// //             d3.select(this)
// //                 .attr("fill", "purple");


// //             d3.selectAll("rect.bar").classed("dim", function (dd) {
// //                 if (dd.key == highlightkey)
// //                     return false;
// //                 else
// //                     return true;
// //             })

// //         });
// //  });






 
 //Injury
 //create data url
 var url1 = "data/ins1.csv";
 var url2 = "data/ins2.csv";

 //parse the date string
 var parseDate = d3.timeParse("%Y");

 //padding for x axis
 var padding = 20;
 //create margin
 var margin = {
     left: 50,
     right: 50,
     top: 40,
     bottom: 40
 }

 //create the width and height of the chart
 var width = 600 - margin.left - margin.right,
     height = 500 - margin.top - margin.bottom;


 //create a svg element
 var svg = d3.select("#bar")
     .append("svg") //create new dom element
     .attr("width", "100%")
     .attr("height", height + margin.top + margin.bottom);


 //creaete a group consists of both bar chart and axis
 var chartGroup = svg.append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 d3.csv(url1)
     //.row transform each data point
     .row(function (d) {
         //read column name (numbers) 
         city = d["City"];
         ins = +d["Injury"];
         return d;
     })
     //.get() get data--returned data
     .get(function (error, data) {

         //create scale, use scale time for parsed date
         var xScale = d3.scaleBand()
             .domain(data.map(function (d) {
                 return d["City"];
             }))
             .rangeRound([0, width])
             .padding(0.5);

         var yScale = d3.scaleLinear()
             .domain([0, d3.max(data, function (d) {
                 return d["Injury"];
             })])
             .range([height, 0]); //input -> output, invert y

         //create yaxis
         var xAxis = d3.axisBottom(xScale);
         var yAxis = d3.axisLeft(yScale);

         //create an arry of rect svg elements
         bars = chartGroup.selectAll("rect")
             .data(data) //bind data
             .enter() //create new data-bound element for each new element added in the dataset
             .append("rect")
             .attr("class", "bar")
             .attr("fill", "darkred")
             .attr("x", function (d, i) {
                 return xScale(d["City"]);
             })
             .attr("y", function (d, i) {
                 return yScale(d["Injury"]); //invert the y pos
             })
             .attr("width", 30)
             .attr("height", function (d, i) {
                 return height - yScale(d["Injury"]); //height - inverted y pos, then draw from that point to bottom
             });

         //create label
         chartGroup.selectAll("p")
             .data(data)
             .enter() // always bind data whenever needs data from the dataset
             .append("text") // append svg text element
             .attr("class", "labels")
             .attr("fill", "darkred")
             .attr("font-size", "12px")
             .attr("x", function (d, i) {
                 return xScale(d["City"]);
             })
             .attr("y", function (d, i) {
                 return yScale(d["Injury"]) - 5; //invert the y pos
             })
             .text(function (d, i) {
                 return "$" + (d["Injury"]);
             })

         //create the group for axis
         chartGroup.append("g")
             .attr("class", "axis_y")
             .call(yAxis)
             .append("text")
             .attr("x", -30)
             .attr("y", yScale(yScale.ticks().pop()) - 20)
             .attr("dy", "0.32em")
             .attr("fill", "#000")
             .attr("font-weight", "bold")
             .attr("text-anchor", "start")
             .text("$Million");

         chartGroup.append("g")
             .attr("class", "axis_x")
             //adjest the position of sticks
             .attr("transform", "translate(0," + height + ")")
             .call(xAxis)

        
              //highlight
         bars.on("click", function (d) {

            var highlightkey = d.key;
       
                window.cityname =d["City"];
             
            console.log(cityname);

            // remove previous selecitons ...
            d3.selectAll("rect.bar").attr("fill", "darkred");

            d3.select(this)
                .attr("fill", "purple");

            d3.selectAll("rect.bar").classed("dim", function (dd) {
                if (dd.key == highlightkey)
                    return false;
                else
                    return true;
            })
            window.update();
        })
     });

 d3.select("#data2").on("click", function () {
     console.log("clicked");
     d3.csv(url2)
         //.row transform each data point
         .row(function (d) {
             //read column name (numbers) 
             city = d["City"];
             ins = +d["Material"];
             return d;
         })
         //.get() get data--returned data
         .get(function (error, data) {
             if (error) throw error;
             //create scale, use scale time for parsed date
             var xScale = d3.scaleBand()
                 .domain(data.map(function (d) {
                     return d["City"];
                 }))
                 .rangeRound([0, width])
                 .padding(0.5);

             var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function (d) {
                     return d["Material"];
                 })])
                 .range([height, 0]); //input -> output, invert y

             //create yaxis
             var xAxis = d3.axisBottom(xScale);
             var yAxis = d3.axisLeft(yScale);

             //create an arry of rect svg elements
             bars = chartGroup.selectAll("rect.bar")
                 .data(data) //bind data
                 .transition()
                 .duration(1000)
                 .attr("fill", "orange")
                 .attr("x", function (d, i) {
                     return xScale(d["City"]);
                 })
                 .attr("y", function (d, i) {
                     return yScale(d["Material"]); //invert the y pos
                 })
                 .attr("width", 30)
                 .attr("height", function (d, i) {
                     return height - yScale(d["Material"]); //height - inverted y pos, then draw from that point to bottom
                 });



             //create label
             chartGroup.selectAll(".labels")
                 .data(data)
                 .transition()
                 .duration(1000)
                 .delay(1000)
                 .attr("fill", "orange")
                 .attr("x", function (d, i) {
                     return xScale(d["City"]);
                 })
                 .attr("y", function (d, i) {
                     return yScale(d["Material"]) - 5; //invert the y pos
                 })
                 .text(function (d, i) {
                     return "$" + (d["Material"]);
                 })

             //create the group for axis
             chartGroup.select(".axis_y")
                 .transition()
                 .duration(1000)
                 .call(yAxis);

             chartGroup.select(".axis_x")
                 .transition()
                 .duration(1000)
                 //adjest the position of sticks
                 .attr("transform", "translate(0," + height + ")")
                 .call(xAxis);
         });
         //highlight
         bars.on("click", function (d) {

            var highlightkey = d.key;
          cityname = d["City"];
            console.log(cityname);

            // remove previous selecitons ...
            d3.selectAll("rect.bar").attr("fill", "orange");

            d3.select(this)
                .attr("fill", "purple");

            d3.selectAll("rect.bar").classed("dim", function (dd) {
                if (dd.key == highlightkey)
                    return false;
                else
                    return true;
            })
            window.update();
        })
         
 });

 d3.select("#data1").on("click", function () {
     console.log("clicked");
     d3.csv(url1)
         //.row transform each data point
         .row(function (d) {
             //read column name (numbers) 
             city = d["City"];
             ins = +d["Injury"];
             return d;
         })
         //.get() get data--returned data
         .get(function (error, data) {
             if (error) throw error;
             //create scale, use scale time for parsed date
             var xScale = d3.scaleBand()
                 .domain(data.map(function (d) {
                     return d["City"];
                 }))
                 .rangeRound([0, width])
                 .padding(0.5);

             var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function (d) {
                     return d["Injury"];
                 })])
                 .range([height, 0]); //input -> output, invert y

             //create yaxis
             var xAxis = d3.axisBottom(xScale);
             var yAxis = d3.axisLeft(yScale);

             //create an arry of rect svg elements
             bars = chartGroup.selectAll("rect.bar")
                 .data(data) //bind data
                 .transition()
                 .duration(1000)
                 .attr("fill", "darkred")
                 .attr("x", function (d, i) {
                     return xScale(d["City"]);
                 })
                 .attr("y", function (d, i) {
                     return yScale(d["Injury"]); //invert the y pos
                 })
                 .attr("width", 30)
                 .attr("height", function (d, i) {
                     return height - yScale(d["Injury"]); //height - inverted y pos, then draw from that point to bottom
                 });
    
             //create label
             chartGroup.selectAll(".labels")
                 .data(data)
                 .transition()
                 .duration(1000)
                 .delay(1000)
                 .attr("fill", "darkred")
                 .attr("x", function (d, i) {
                     return xScale(d["City"]);
                 })
                 .attr("y", function (d, i) {
                     return yScale(d["Injury"]) - 5; //invert the y pos
                 })
                 .text(function (d, i) {
                     return "$" + (d["Injury"]);
                 })
                  
             //create the group for axis
             chartGroup.select(".axis_y")
                 .transition()
                 .duration(1000)
                 .call(yAxis);

             chartGroup.select(".axis_x")
                 .transition()
                 .duration(1000)
                 //adjest the position of sticks
                 .attr("transform", "translate(0," + height + ")")
                 .call(xAxis);
         });
         //highlight
         bars.on("click", function (d) {

            var highlightkey = d.key;
           cityname = d["City"];
            console.log(cityname);
            // remove previous selecitons ...
            d3.selectAll("rect.bart").attr("fill", "darkred");

            d3.select(this)
                .attr("fill", "purple");


            d3.selectAll("rect.bar").classed("dim", function (dd) {
                if (dd.key == highlightkey)
                    return false;
                else
                    return true;
            })

        });
 });

 d3.select("#compare").on("click", function () {
    console.log("clicked");
   $("rect.bar").remove();
   $(".labels").remove();
   $(".axis_x").remove();
   $(".axis_y").remove();
   d3.csv(url1, function(d, i, columns) {
    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
    return d;
  }, 
 //.get() get data--returned data
 function (error, data) {

    var keys = data.columns.slice(1);

    console.log(keys);
     //create scale, use scale time for parsed date
     var xScale0 = d3.scaleBand()
         .domain(data.map(function (d) {
             return d["City"];
         }))
         .rangeRound([0, width])
         .padding(0.5);

     var xScale1 = d3.scaleBand()
     .domain(keys)
     .rangeRound([0, xScale0.bandwidth()])
     .padding(0.1);

     var yScale = d3.scaleLinear()
         .domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice()
         .range([height, 0]); //input -> output, invert y
    
    //color
    var z = d3.scaleOrdinal()
    .range(["darkred", "orange"]);

    //  //create yaxis
    //  var xAxis = d3.axisBottom(xScale);
    //  var yAxis = d3.axisLeft(yScale);

     //create an arry of rect svg elements
     bars = chartGroup.append("g")
     .selectAll("g")
     .data(data)
     .enter().append("g")
       .attr("transform", function(d) { return "translate(" + xScale0(d["City"]) + ",0)"; })
     .selectAll("rect")
     .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
     .enter().append("rect")
     .attr("class", "bar")
       .attr("x", function(d) { return xScale1(d.key); })
       .attr("y", function(d) { return yScale(d.value); })
       .attr("width", xScale1.bandwidth())
       .attr("height", function(d) { return height - yScale(d.value); })
       .attr("fill", function(d) { return z(d.key); });

       chartGroup.append("g")
       .attr("class", "axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(xScale0));
 
       chartGroup.append("g")
       .attr("class", "axis")
       .call(d3.axisLeft(yScale).ticks(null, "s"))
     .append("text")
       .attr("x", 2)
       .attr("y", yScale(yScale.ticks().pop()) + 0.5)
       .attr("dy", "0.32em")
       .attr("fill", "#000")
       .attr("font-weight", "bold")
       .attr("text-anchor", "start")
       .text("Million");
    

    
          //highlight
     bars.on("click", function (d) {

        var highlightkey = d.key;
       
        window.cityname =d["City"];

        console.log(cityname);

        // remove previous selecitons ...
        d3.selectAll("rect.bar").attr("fill", function(d) { return z(d.key); });

        d3.select(this)
            .attr("fill", "purple");

        d3.selectAll("rect.bar").classed("dim", function (dd) {
            if (dd.key == highlightkey)
                return false;
            else
                return true;
        })
        window.update();
    })
 });
});