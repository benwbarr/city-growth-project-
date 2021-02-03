
// Define options for states
d3.json("/byStateData").then(function(data) {
    // data => names, metadata, samples //
    
    
    console.log(data)
    var states =[]
    for (i=1; i<(data.length-1); i++) {
        states.push(data[i].state.split(".").pop())
    }
    var statesABBR = []
    for (i = 0; i<states.length; i++) {
        statesABBR.push(abbrState(states[i], "abbr"))
    }
    console.log(statesABBR)
    // inserting id options into dropdown menu
    var dropdown = d3.select("#stateSelection")
    dropdown.selectAll("option")
        .data(states)
        .enter()
        .append("option")
        .text(entry => {return entry})

    })
// function for change of state
function stateChangedState(selectedState) {
d3.json("/byCountyData2010").then(function(countyData2010){
    var stateData2010 = []
    var countyNames = []
    for (i=0; i<countyData2010.length; i++) {
        if (countyData2010.state == selectedState) {
            stateData2010.push(countyData2010[i].DataValue)
            countyNames.push(countyData2010[i].City)
        }
        
    }
    console.log(stateData2010)
})

d3.json("/byCountyData2019").then(function(countyData2019){
    var stateData2019 = []
    for (i=0; i<countyData2019.length; i++){
        if (countyData2019.state == selectedState) {
            stateData2019.push(countyData2019[i].DataValue)
        }
    }
})

d3.json("/byStateData").then(function(stateData){
    for (i=0; i<stateData.length; i++){
        if (stateData.state == selectedState) {
            var lat = stateData.Latitude
            var lon = stateData.Longitude
        }
    }
})

createMap(countyNames)
}
function createMap(countyName, county2010, county2019, stateLat, stateLon) {
    var myMap = L.map("map", {
        center: [stateLat, stateLon],
        zoom: 7
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



    function abbrState(input, to){
        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['District of Columbia', 'DC'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
        if (to == 'abbr'){
            input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
            for(i = 0; i < states.length; i++){
                if(states[i][0] == input){
                    return(states[i][1]);
                }
            }
        } else if (to == 'name'){
            input = input.toUpperCase();
            for(i = 0; i < states.length; i++){
                if(states[i][1] == input){
                    return(states[i][0]);
                }
            }
        }
    }