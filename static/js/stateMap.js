d3.csv("../../static/data/yearly_estimates_state.csv", function(data) {
    // data => names, metadata, samples //
    console.log(data.state)
    // names : list of id numbers //
    //console.log(data.names)
    // metadata => id, ethnicity, gender, age, location //
    //console.log(data.metadata[0].age)
    // samples => id, otu_ids, sample_values, out_labels
    //console.log(data.samples)
    
    // inserting id options into dropdown menu
    //var dropdown = d3.select("#selDataset")
    //dropdown.selectAll("option")
        //.data(data.names)
        //.enter()
        //.append("option")
        //.text(entry => {return entry})

    })