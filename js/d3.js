    //create data
    var dataset = [5, 10, 13, 15,
        19, 21, 25, 22, 18, 13, 18, 15,
        13, 11, 12, 15
    ];

    //create the width and height of the chart
    var width = 500;
    var height = 500;

    //create margin
    var margin = {
        left: 50,
        right: 50,
        top: 40,
        bottom: 40
    }

    //create scale 
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset)])
        .range([height, 0]); //input -> output, invert y

    //create yaxis
    var yAxis = d3.axisLeft(yScale);


    //create a svg element
    var svg = d3.select("body")
        .append("svg") //create new dom element
        .attr("width", "100%") // set the canvas size as 100%
        .attr("height", "100%");


    //creaete a group consists of both bar chart and axis
    var chartGroup = svg.append("g")
                        .attr("transform","translate("+margin.left+","+margin.top+")");

    //create an arry of rect svg elements
    chartGrounp.selectAll("rect")
        .data(dataset) //bind data
        .enter() //create new data-bound element for each new element added in the dataset
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return i * 30;
        })
        .attr("y", function (d, i) {
            return yScale(d); //invert the y pos
        })
        .attr("width", 20)
        .attr("height", function (d, i) {
            return height - yScale(d); //height - inverted y pos, then draw from that point to bottom
        });

    //create label
    chartGroup.selectAll("p")
        .data("dataset")
        .enter() // always bind data whenever needs data from the dataset
        .append("p")
        .attr("x", function (d, i) {
            return i * 30;
        })
        .attr("y", function (d, i) {
            return yScale(d);
        })
        .text(function (d, i) {
            return d;
        })
    
    //create the group for axis
    chartGroup.append("g")
              .attr("class","axis y")
              .call(yAxis);