import pymongo
from pprint import pprint
from dotenv import load_dotenv
import os
load_dotenv()
client = pymongo.MongoClient(os.environ["MONGOURI"])
db= client["city_growth_db"]
# print(client)
# print(db)
col2010 = db["2010_data"]
col2011 = db["2011_Data"]
col2012 = db["2012_Data"]
col2013 = db["2013_Data"]
col2014 = db["2014_Data"]
col2015 = db["2015_Data"]
col2016 = db["2016_Data"]
col2017 = db["2017_Data"]
col2018 = db["2018_Data"]
col2019 = db["2019_Data"]

data2010 = [dict(x) for x in col2010.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2011 = [dict(x) for x in col2011.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2012 = [dict(x) for x in col2012.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2013 = [dict(x) for x in col2013.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2014 = [dict(x) for x in col2014.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2015 = [dict(x) for x in col2015.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2016 = [dict(x) for x in col2016.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2017 = [dict(x) for x in col2017.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2018 = [dict(x) for x in col2018.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
data2019 = [dict(x) for x in col2019.find({},{"_id":False, "City":True, "State_id":True, "DataValue":True, "Latitude": True, "Longitude":True, "TimePeriod":True})]
dataCounty = data2010 + data2011 + data2012 + data2013 + data2014 + data2015 + data2016 + data2017 + data2018 + data2019

colState = db["State_Data"]
dataState = [dict(x) for x in colState.find({},{"_id":False, "state":True, "census":True, "Latitude": True, "Longitude":True})]