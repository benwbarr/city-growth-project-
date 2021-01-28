var margin = {top: 20, right: 20, bottom: 60, left: 20},
    width = 800 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#map-id")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 10,
    zoomOffset: -1,
    tileSize: 512,
    id: "streets-v11",
    accessToken: API_KEY
});



// Create the map object with options
var map = L.map("map-id", {
    center: [38.642763, -98.327818],
    zoom: 4,

});

lightmap.addTo(map);

function createMap(popMarkers) {


    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Pop Markers": popMarkers
    };


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

}

// legend
var legend = L.control({ position: "bottomleft" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "Legend ");
    var limits = [40000000,32000000,24000000,1600000,8000000,0];
    var colors = ["#f06465", "#f0936b", "#f3ba4e", "#f3db4c", "#c7f34c",'#74f34d'];
    var labels = [];


    var legendInfo = "<h1>Legend</h1>" +
        "<div class=\"labels\">" + "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: "
            + colors[index] + "\">"
            + limit + ""  + "</li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};
legend.addTo(map);


function handleSubmit() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input value from the form
    var y1 = "y" + d3.select("#startingYear").node().value;

    var y2 = "y" + d3.select("#endingYear").node().value;
    console.log(y1);

    // clear the input value
    d3.select("#startingYear").node().value = "";

    // Build the plot with the new stock
    buildPlot(y1, y2);
}

function buildPlot(y1, y2) {


    d3.json("static/data/yearly_estimates_state.json", function(data) {
        console.log(data.data.locations)

        for (var index = 0; index < data.data.locations.length; index++) {
            var location = data.data.locations[index];
            var dif = (location[y2] - location[y1]) / 1000

            markers = L.circleMarker([location.Latitude, location.Longitude], {
                color: "#F00",
                radius: dif
            });

            var from = markers.getLatLng();

            markers.bindPopup(location.state + ' ' + (from).toString());


            map.addLayer(markers);


        }
    })
}
d3.select("#submit").on("click", handleSubmit);