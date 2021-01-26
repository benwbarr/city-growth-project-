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

function createMarkers(response) {


    var locations = response.data.locations;

    // Initialize an array to hold markers
    var popMarkers = [];

    // Loop through the array
    for (var index = 0; index < locations.length; index++) {
        var location = locations[index];

        // For each location, create a marker and bind a popup with the location's name
        var popMarker = L.circleMarker([location.Latitude, location.Longitude],{
                stroke: false,
                fillOpacity: 0.75,
                color: "purple",
                fillColor: "purple",
        })
            .bindPopup("<h3>" + location.state + "<h3><h3>Population: " + location.census + "</h3>");
        popMarkers.push(popMarker)

        getColor(popMarker);
        function getColor(popMarker) {
            switch (true) {
                case popMarker > 40000000:
                    return "#f06465";
                case popMarker > 32000000:
                    return '#f0936b';
                case popMarker > 24000000:
                    return '#f3ba4e';
                case popMarker > 1600000:
                    return '#f3db4c';
                case popMarker > 8000000:
                    return '#c7f34d';
                default:
                    return '#74f34d';

            }
            radius = getColor.census;
        }
    }

    // Create a layer group made from the markers array, pass it into the createMap function
    createMap(L.layerGroup(popMarkers));

}

// Perform an call Call createMarkers when complete
    d3.json("static/data/offical_census_state.json", createMarkers);