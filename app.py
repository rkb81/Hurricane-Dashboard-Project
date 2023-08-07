# Import the dependencies
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from datetime import datetime, timedelta
from flask import Flask, jsonify
from flask_cors import CORS
import geojson

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Hurricane-Project-3/Resources/NA_Basin.sqlite")

# connecting SQLite DB
tropical_storm = pd.read_sql("select * from hurricane_table;", engine)
print(tropical_storm.head())

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

CORS(app)

#################################################
# Flask Routes
#################################################

def hurricanes1950():
    tropical_storm1950 = tropical_storm.loc[
        (tropical_storm.Datetime >= '1950-01-01') &
        (tropical_storm.Datetime < '1960-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm1950 = tropical_storm1950[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm1950.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection1950 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection1950)

def hurricanes1960():
    tropical_storm1960 = tropical_storm.loc[
        (tropical_storm.Datetime >= '1960-01-01') &
        (tropical_storm.Datetime < '1970-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm1960 = tropical_storm1960[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm1960.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection1960 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection1960)

def hurricanes1970():
    tropical_storm1970 = tropical_storm.loc[
        (tropical_storm.Datetime >= '1970-01-01') &
        (tropical_storm.Datetime < '1980-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm1970 = tropical_storm1970[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm1970.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection1970 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection1970)

def hurricanes1980():
    tropical_storm1980 = tropical_storm.loc[
        (tropical_storm.Datetime >= '1980-01-01') &
        (tropical_storm.Datetime < '1990-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm1980 = tropical_storm1980[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm1980.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection1980 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection1980)

def hurricanes1990():
    tropical_storm1990 = tropical_storm.loc[
        (tropical_storm.Datetime >= '1990-01-01') &
        (tropical_storm.Datetime < '2000-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm1990 = tropical_storm1990[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm1990.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection1990 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection1990)

def hurricanes2000():
    tropical_storm2000 = tropical_storm.loc[
        (tropical_storm.Datetime >= '2000-01-01') &
        (tropical_storm.Datetime < '2010-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm2000 = tropical_storm2000[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm2000.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection2000 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection2000)

def hurricanes2010():
    tropical_storm2010 = tropical_storm.loc[
        (tropical_storm.Datetime >= '2010-01-01') &
        (tropical_storm.Datetime < '2020-01-01') &
        (tropical_storm.Storm_Category == 'TS')
    ]
    tropical_storm2010 = tropical_storm2010[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

    geojson_features = []
    for _, row in tropical_storm2010.iterrows():
        properties = {
            "ID": row["ID"],
            "Datetime": row["Datetime"],
            "Name": row["Name"],
            "Wind_Speed": row["Wind_Speed(knots)"],
            "Air_Pressure": row["Air_Pressure(mb)"],
            "Distance_to_Land": row["Distance_to_Land(km)"]
        }
        point = geojson.Point((row["Longitude"], row["Latitude"]))
        feature = geojson.Feature(geometry=point, properties=properties)
        geojson_features.append(feature)

    feature_collection2010 = geojson.FeatureCollection(geojson_features)
    return geojson.dumps(feature_collection2010)

# Route registration
app.add_url_rule('/api/ts195059', 'hurricanes1950', hurricanes1950)
app.add_url_rule('/api/ts196069', 'hurricanes1960', hurricanes1960)
app.add_url_rule('/api/ts197079', 'hurricanes1970', hurricanes1970)
app.add_url_rule('/api/ts198089', 'hurricanes1980', hurricanes1980)
app.add_url_rule('/api/ts199099', 'hurricanes1990', hurricanes1990)
app.add_url_rule('/api/ts200009', 'hurricanes2000', hurricanes2000)
app.add_url_rule('/api/ts201019', 'hurricanes2010', hurricanes2010)

@app.route('/')
def landing_page():
    
    # List all available api routes
    return (
        f"Available Routes:<br/>"
        f"/api/ts195059<br/>"
        f"/api/ts196069<br/>"
        f"/api/ts197079<br/>"
        f"/api/ts198089<br/>"
        f"/api/ts199099<br/>"
        f"/api/ts200009<br/>"
        f"/api/ts201019<br/>"
    )

if __name__ == '__main__':
    app.run(debug=True)

