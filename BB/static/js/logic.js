function createMap(popMarkers) {

    // Create the tile layer that will be the background of our map
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 5,
        id: "light-v10",
        accessToken: API_KEY
    });

    // Create a baseMaps object to hold the lightmap layer
    var baseMaps = {
        "Light Map": lightmap
    };

    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
        "Pop Markers": popMarkers
    };

    // Create the map object with options
    var map = L.map("map-id", {
        center: [38.642763,  -98.327818],
        zoom: 12,
        layers: [lightmap, popMarkers]
    });

    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);
}

function createMarkers(response) {

    // Pull the "stations" property off of response.data
    var locations = response.data.locations;

    // Initialize an array to hold bike markers
    var popMarkers = [];

    // Loop through the stations array
    for (var index = 0; index < locations.length; index++) {
        var location = locations[index];

        // For each station, create a marker and bind a popup with the station's name
        var popMarker = L.marker([location.Latitude, location.Longitude])
            .bindPopup("<h3>" + location.state + "<h3><h3>Population: " + location.census + "</h3>");

        // Add the marker to the bikeMarkers array
        popMarkers.push(popMarker);
    }

    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(popMarkers));
}


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("static/data/offical_census_state.json", createMarkers);