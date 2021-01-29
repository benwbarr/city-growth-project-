# import necessary libraries
from flask import (
    Flask,
    render_template,
    request,
    jsonify)
import pymongo
from test import (data2010, data2019, dataState)

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
    
    

    return jsonify(dataState)

@app.route("/byCountyData2010")
# County Database Needs CountyName, StateName, Lat, Lon, GDP-County-2010, GDP-County-2020
def countyData2010():
    return jsonify(data2010)

@app.route("/byCountyData2019")
# County Database Needs CountyName, StateName, Lat, Lon, GDP-County-2010, GDP-County-2020
def countyData2019():
    return jsonify(data2019)


if __name__ == "__main__":
    app.run(debug = True)
