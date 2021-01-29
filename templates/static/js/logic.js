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
    var div = L.DomUtil.create("div", "Population Legend");
    var limits = [1000000,500000,250000,90000,40000,0, "Less Than 0"];
    var colors = ["#f06465", "#f0936b", "#f3ba4e", "#f3db4c", "#c7f34c",'#74f34d','#4cb4f3'];
    var labels = [];


    var legendInfo = "<h3>Population Legend</h3>" +
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
    //d3.event.preventDefault();

    // Select the input value from the form
    var y1 = "y" + d3.select("#startingYear").node().value;

    var y2 = "y" + d3.select("#endingYear").node().value;
   // console.log(y1);


    // Build the plot
    buildPlot(y1, y2);
}


function buildPlot(y1, y2) {


    d3.json("static/data/yearly_estimates_state.json", function(data) {
        //console.log(data.data.locations)


        for (var index = 0; index < data.data.locations.length; index++) {
            var location = data.data.locations[index];
            //var dif = (location[y2] - location[y1]) - 1000000;
            var diff = (location[y2] - location[y1]);

            var scale = d3.scaleBand()
                .domain(diff)
                .range([0, 1000]);

            var color = "";
            if (diff > 1000000) {
                color = '#f06465';
            }
            else if (diff > 500000) {
                color = '#f0936b';
            }
            else if (diff > 250000) {
                color = '#f3ba4e';
            }
            else if (diff > 90000) {
                color = '#f3db4c';
            }
            else if (diff > 40000) {
                color = '#c7f34c';
            }
            else if (diff < 0) {
                color = '#4cb4f3';
            }
            else {
                color = '#74f34d';
            }



            markers = L.circleMarker([location.Latitude, location.Longitude], {
                color: "white",
                radius: 13,
                fillOpacity: 1,
                fillColor: color
            });
            var year1 = d3.select("#startingYear").node().value;

            var year2 = d3.select("#endingYear").node().value;

            markers.bindPopup('<h4><p>Location:'
                + " " + location.state + "</p>"
                + "<p>Year: " + year1 + " - " + "Year: " + year2 + "</p>"
                + "Population Difference: "
                + diff);


            map.addLayer(markers);
           // markers.addTo(map)

        }
    })
}


d3.select("#submit").on("click", handleSubmit);