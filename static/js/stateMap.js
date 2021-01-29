
// Define options for states
d3.json("/byStateData").then(function(data) {
    // data => names, metadata, samples //
    
    
    console.log(data)
    //var states =[]
    //for (i=0; i<locations.length; i++) {
        //states.push(locations[i].state.split(".").pop())
    //}
    //console.log(states)
    // inserting id options into dropdown menu
    var dropdown = d3.select("#stateSelection")
    //dropdown.selectAll("option")
        //.data(states)
        //.enter()
        //.append("option")
        //.text(entry => {return entry})

    })
// function for change of state
function stateChangedState(selectedState) {
d3.json("/byCountyData").then(function(countyData){
    console.log(countyData)
    
})
}


function createMap(county, stateLat, stateLon) {
    var myMap = L.map("map", {
        center: [stateLat, stateLon],
        zoom: 6
    });

    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/outdoors-v11",
        accessToken: API_KEY
    }).addTo(myMap);

    for (i=0; i<county.length; i++) {
        var location = [county[i].lat, county[i].lon]
        L.circle(location, {
            fillOpacity: .5,
            color: "red",
            fillColor: "red",
            radius: (county[i].GDP_County_2020 - county[i].GDP_county_2010)*1000
        }).bindPopup("<h1>County Name: " + county[i].CountyName + "</h1><hr><h2> Percent change in GDP over last 10 years: " + (county[i].GDP_County_2020 - county[i].GDP_county_2010) + "</h2>").addTo(myMap) 

    }
}