# Import the dependencies
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from datetime import datetime, timedelta
from flask import Flask, jsonify, render_template
from flask_cors import CORS
import geojson

#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///Resources/NA_Basin.sqlite")

# connecting SQLite DB
tropical_storm = pd.read_sql("select * from hurricane_table;", engine)
print(tropical_storm.head())

#################################################
# Flask Setup
#################################################

app = Flask(__name__)

CORS(app)

#################################################
# API Routes
#################################################

def generate_tropical_storms(year_start, year_end):
    def tropical_storms():
        tropical_storm_range = tropical_storm.loc[
            (tropical_storm.Datetime >= f'{year_start}-01-01') &
            (tropical_storm.Datetime < f'{year_end}-01-01') &
            (tropical_storm.Storm_Category == 'TS')
        ]
        tropical_storm_range = tropical_storm_range[["ID", "Datetime", "Name", "Wind_Speed(knots)", "Air_Pressure(mb)", "Distance_to_Land(km)", "Latitude", "Longitude"]]

        geojson_features = []
        for _, row in tropical_storm_range.iterrows():
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

        feature_collection = geojson.FeatureCollection(geojson_features)
        return geojson.dumps(feature_collection)

    return tropical_storms

# Route registration
app.add_url_rule('/api/ts195059', 'tropical_storms1950', generate_tropical_storms(1950, 1960))
app.add_url_rule('/api/ts196069', 'tropical_storms1960', generate_tropical_storms(1960, 1970))
app.add_url_rule('/api/ts197079', 'tropical_storms1970', generate_tropical_storms(1970, 1980))
app.add_url_rule('/api/ts198089', 'tropical_storms1980', generate_tropical_storms(1980, 1990))
app.add_url_rule('/api/ts199099', 'tropical_storms1990', generate_tropical_storms(1990, 2000))
app.add_url_rule('/api/ts200009', 'tropical_storms2000', generate_tropical_storms(2000, 2010))
app.add_url_rule('/api/ts201019', 'tropical_storms2010', generate_tropical_storms(2010, 2020))


@app.route('/api')
def api_landing_page():
    
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


##################################################
# Front End Routes
##################################################

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/tropical_storms')
def tropical_storms():
    return render_template("tropical_storms.html") #Display html


if __name__ == '__main__':
    app.run(debug=True)

