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
    .range(["#BEAED4", "#FDC086", "#067bc2", "#84bcda", "#7FC97F", "#f37748"]);


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
        .attr("width", x.bandwidth()).on("mouseover", function () {
            toolTip.style("display", null);
        })
        .on("mouseout", function () {
            toolTip.style("display", "none");
        })
        .on("mousemove", function (d) {
            var xPosition = d3.mouse(this)[0] - 15;
            var yPosition = d3.mouse(this)[1] - 25;
            toolTip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            toolTip.select("text").text(-(d[0]-d[1]))
        });

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

    // Prep the toolTip bits, initial display is hidden
    var toolTip = g.append("g")
        .attr("class", "toolTip")
        .style("display", "none");

    toolTip.append("rect")
        .attr("width", 30)
        .attr("height", 20)
        .attr("fill", "gray")
        .style("opacity", 0.5);

    toolTip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");
});

