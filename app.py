# import necessary libraries
from flask import (
    Flask,
    render_template)
from pymongo import MongoClient

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/byState")
def states():
    return render_template("states.html")

@app.route("/byStateData")
# State Database Needs StateName, Lat, Lon, GDP-State-2010 through GDP-State-2020, POP-State-2010 through POP-State-2020
def stateData():
    client = MongoClient(mongodb+srv://DbAdmin:UofA2020@cluster0.jaoht.mongodb.net/city_growth_db?retryWrites=true&w=majority)
    db = client['city_growth_db']
    collection1 = db[gdp_by_state]

    cursor = mongo.find(collection1)

    data1 = [dict(x) for x in cursor]

    return jsonify(data1)

@app.route("/byCountyData")
# County Database Needs CountyName, StateName, Lat, Lon, GDP-County-2010, GDP-County-2020
def countyData():
    client = MongoClient(mongodb+srv://DbAdmin:UofA2020@cluster0.jaoht.mongodb.net/city_growth_db?retryWrites=true&w=majority)
    db = client['city_growth_db']
    collection2 = db[gdp_by_county]

    cursor = mongo.find(collection2)

    data2 = [dict(x) for x in cursor]

    return jsonify(data2)



if __name__ == "__main__":
    app.run(debug = True)
