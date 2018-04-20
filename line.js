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
        d["Vancouver"] = +d["Vancouver"];
        d["North Vancouver"] = +d["North Vancouver"];
        d["West Vancouver"] = +d["West Vancouver"];
        d["Burnaby"] = +d["Burnaby"];
        d["Richmond"] = +d["Richmond"];
        d["Coquitlam"] = +d["Coquitlam"];
        d["Delta"] = +d["Delta"];
        d["Surrey"] = +d["Surrey"];
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
                return d["Vancouver"];
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
                return yScale(d["Vancouver"])
            });

        var line2 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["North Vancouver"])
            });

        var line3 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["West Vancouver"])
            });

        var line4 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["Burnaby"])
            });

        var line5 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["Richmond"])
            });

        var line6 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["Coquitlam"])
            });

        var line7 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["Delta"])
            });

        var line8 = d3.line()
            .x(function (d) {
                return xScale(d.Year)
            })
            .y(function (d) {
                return yScale(d["Surrey"])
            });

        //draw line charts
        chartGroup.append("path").
        attr("d", line1(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "steelblue");

        chartGroup.append("path").
        attr("d", line2(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "goldenrod");

        chartGroup.append("path").
        attr("d", line3(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "navy");

        chartGroup.append("path").
        attr("d", line4(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "purple");

        chartGroup.append("path").
        attr("d", line5(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "grey");

        chartGroup.append("path").
        attr("d", line6(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "green");

        chartGroup.append("path").
        attr("d", line7(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "aqua");

        chartGroup.append("path").
        attr("d", line8(data))
            .attr("fill", "none")
            .attr("stroke-width", 2)
            .attr("stroke", "red");

        //create the group for axis
        chartGroup.append("g")
            .attr("class", "axis y")
            .call(yAxis);

        chartGroup.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

    })