var margin = {top: 20, right: 30, bottom: 60, left: 90},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#svg-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("static/data/offical_census_state.csv", function(data) {

    // Add X axis
    var x = d3.scaleLinear()
        .domain([0, 40000000])
        .range([ 0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Y axis
    var y = d3.scaleBand()
        .range([ 0, height ])
        .domain(data.map(function(d) { return d.state; }))
        .padding(.5);
    svg.append("g")
        .call(d3.axisLeft(y))
    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#startingYear").on("change", update);

// This function is called when a dropdown menu item is selected
    function update() {
        // Use D3 to select the dropdown menu
        var dropdownMenu = d3.select("#startingYear");
        // Assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");


    }

    //Bars
    svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function(d) { return y(d.state); })
        .attr("width", function(d) { return x(d.census); })
        .attr("height", y.bandwidth() )
        .attr("fill", "#69b3a2")




})

