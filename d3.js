function initMap(){
    console.log('lib loaded');
  //accident location (dot map with labels)
   // Create the Google Map…
  var map = new google.maps.Map(d3.select("#map").node(), {
    zoom:11,
    center: new google.maps.LatLng(49.246292,-123.116226),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Load the csv data. When the data comes back, create an overlay.
  d3.csv("data/Location_data.csv", function (error, data) {
    if (error) throw error;

    var overlay = new google.maps.OverlayView();

    // Add the container when the overlay is added to the map.
    overlay.onAdd = function () {
      var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "loc");

      // Draw each marker as a separate SVG element.
      // We could use a single SVG, but what size would it have?
      overlay.draw = function () {
        var projection = this.getProjection(),
          padding = 10;

        var marker = layer.selectAll("svg")
          .data(data)
          .each(transform) // update existing markers
          .enter()
          .append("svg")
          .each(transform)
          .attr("class", "marker");

        // Add a circle.
        marker.append("circle")
          .attr("r", 4.5)
          .attr("cx", padding)
          .attr("cy", padding);

        // Add a label.
        marker.append("text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", ".31em")
          .text(function (d) {
            return d["Location Flag"];
          });

        function transform(d) {
          d = new google.maps.LatLng(d["Latitude"], d["Longitude"]);
          d = projection.fromLatLngToDivPixel(d);
          return d3.select(this)
            .style("left", (d.x - padding) + "px")
            .style("top", (d.y - padding) + "px");
        }
      };
    };

    // Bind our overlay to the map…
    overlay.setMap(map);
  });
   
 
   // number of accidents

    var url = "data/overview_crashes.csv";
    var margin = {
        left: 50,
        right: 50,
        top: 40,
        bottom: 40
    }


    //load csv data
    d3.csv(url)
        .row(function (d) {
            //read column name (numbers) 
            d.Year = +d.Year; //convert to intger
            d["BC(total)"] = +d["BC(total)"];
            d["Lower Mainland"] = +d["Lower Mainland"];
            d["Vancouver Island"] = +d["Vancouver Island"];
            d["Southern Interior"] = +d["Southern Interior"];
            d["North Central"] = +d["North Central"];
            return d;
        })
        //.get() get data--returned data
        .get(function (error, data) {

            // console.log(data);

            //create the width and height of the chart
            var width = 500 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            //create svg element
            var svg2 = d3.select("#num_accident")
                .append("svg")
                .attr("width", "100%")
                .attr("height", height + margin.top + margin.bottom);

            var year = ["2012", "2013", "2014", "2015", "2016"];
            //create scale
            var xScale = d3.scalePoint()
                .domain(year)
                .range([0, width + margin.right]);

            var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) {
                    return d["BC(total)"];
                })])
                .range([height, 0]);

            //create axies
            var xAxis = d3.axisBottom(xScale),
                yAxis = d3.axisLeft(yScale);

            //creaete a group consists of both bar chart and axis
            var chartGroup = svg2.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //define line generators
            var line1 = d3.line()
                .x(function (d) {
                    return xScale(d.Year)
                })
                .y(function (d) {
                    return yScale(d["BC(total)"])
                });

            var line2 = d3.line()
                .x(function (d) {
                    return xScale(d.Year)
                })
                .y(function (d) {
                    return yScale(d["Lower Mainland"])
                });

            var line3 = d3.line()
                .x(function (d) {
                    return xScale(d.Year)
                })
                .y(function (d) {
                    return yScale(d["Vancouver Island"])
                });

            var line4 = d3.line()
                .x(function (d) {
                    return xScale(d.Year)
                })
                .y(function (d) {
                    return yScale(d["Southern Interior"])
                });

            var line5 = d3.line()
                .x(function (d) {
                    return xScale(d.Year)
                })
                .y(function (d) {
                    return yScale(d["North Central"])
                });

            //draw line charts
            chartGroup.append("path").
            attr("d", line1(data))
                .attr("class", "line1");

            chartGroup.append("path").
            attr("d", line2(data))
                .attr("class", "line2");

            chartGroup.append("path").
            attr("d", line3(data))
                .attr("class", "line3");

            chartGroup.append("path").
            attr("d", line4(data))
                .attr("class", "line4");

            chartGroup.append("path").
            attr("d", line5(data))
                .attr("class", "line5");

            //create the group for axis
            chartGroup.append("g")
                .attr("class", "axis y")
                .call(yAxis);

            chartGroup.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        })


    // operating costs
    // inspired by Bostock's stack bar chart tutorial

    // Setup svg margin
    var margin = {
        left: 50,
        right: 50,
        top: 40,
        bottom: 40
    }

     //create the width and height of the chart
     var width = 500 - margin.left - margin.right,
     height = 500 - margin.top - margin.bottom;
    // create svg canvas
    svg3 = d3.select("#op_cost")
        .append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom);
    //create a group for axies and chart
    g = svg3.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //create x,y,color scales
    var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.05)
        .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#BEAED4","#FDC086","#067bc2", "#84bcda", "#7FC97F", "#f37748"]);

    //load data and transpose the data
    d3.csv("data/operating_cost.csv", function (d, i, columns) {
        for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
        d.total = t;
        return d;
    }, function (error, data) {
        if (error) throw error;
        var keys = data.columns.slice(1);
        //sort cost of each year from low to heigh
        data.sort(function (a, b) {
            return a.total - b.total;
        });
        x.domain(data.map(function (d) {
            return d.Year;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.total;
        })]).nice();
        z.domain(keys);
        //create another group for stacked rects
        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);
            })
            .selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return x(d.data.Year);
            })
            .attr("y", function (d) {
                return y(d[1]);
            })
            .attr("height", function (d) {
                return y(d[0]) - y(d[1]);
            })
            .attr("width", x.bandwidth());

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("$Million");
    });


    //insurance premium
    //create data url
    var url2 = "data/insurance_premium.csv";

    //parse the date string
    var parseDate = d3.timeParse("%Y");


    //create margin
    var margin = {
        left: 50,
        right: 50,
        top: 40,
        bottom: 40
    }


    d3.csv(url2)
        .row(function (d) {
            //read column name (numbers) 
            d.Year = +d.Year; //convert to intger
            d["Insurance Premium"] = +d["Insurance Premium"];
            return d;
        })
        //.get() get data--returned data
        .get(function (error, data) {
            //create the width and height of the chart
            var width = 400 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

            var year = ["2013", "2014", "2015", "2016", "2017"];
            //create scale 
            var xScale = d3.scaleBand()
            .domain(year)
            .range([0 , width + margin.right + margin.left])
            .paddingInner(0.05); 
           
     

            var yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function (d) {
                    return d["Insurance Premium"];
                })])
                .range([height, 0]); //input -> output, invert y

            //create yaxis
            var xAxis = d3.axisBottom(xScale)
            var yAxis = d3.axisLeft(yScale);



            //create a svg element
            var svg = d3.select("#ins_prem")
                .append("svg") //create new dom element
                .attr("width", "100%")
                .attr("height", height + margin.top + margin.bottom);


            //creaete a group consists of both bar chart and axis
            var chartGroup = svg.append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            //create an arry of rect svg elements
            chartGroup.selectAll("rect")
                .data(data) //bind data
                .enter() //create new data-bound element for each new element added in the dataset
                .append("rect")
                .attr("class", "bar")
                .attr("x", function (d, i) {
                    return 25+xScale(d.Year);
                })
                .attr("y", function (d, i) {
                    return yScale(d["Insurance Premium"]); //invert the y pos
                })
                .attr("width", 30)
                .attr("height", function (d, i) {
                    return height - yScale(d["Insurance Premium"]); //height - inverted y pos, then draw from that point to bottom
                });

            //create label
            chartGroup.selectAll("p")
                .data(data)
                .enter() // always bind data whenever needs data from the dataset
                .append("text") // append svg text element
                .attr("fill", "black")
                .attr("font-size","10px")
                .attr("x", function (d, i) {
                    return 25+xScale(d.Year);
                })
                .attr("y", function (d, i) {
                    return yScale(d["Insurance Premium"]); //invert the y pos
                })
                .text(function (d, i) {
                    return "$"+(d["Insurance Premium"]);
                })

            //create the group for axis
            chartGroup.append("g")
                .attr("class", "axis y")
                .call(yAxis);

            chartGroup.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
        })
}