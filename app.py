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

#Huma's code
def cities():
    temp = pd.read_sql("select * from second_table;", con=engine)
    json_data = temp.to_dict(orient="records") #Improves JSON file readability
    response = {"data": json_data}
    return jsonify(response)

#Deepika's code
def countries():
    temp = pd.read_sql("select * from second_table;", con=engine)
    json_data = temp.to_dict(orient="records") #Improves JSON file readability
    response = {"data": json_data}
    return jsonify(response)

#Leif's code
def NineteenFiftyTwo():
    temp = pd.read_sql("select * from hurricane_table WHERE Datetime BETWEEN '1952-01-01' AND '2022-01-01';", con=engine)
    json_data = temp.to_dict(orient="records")
    response = {"data": json_data}
    return jsonify(response)
    
#Dhawanpreet's route 

def passengers():
 
    temp=pd.read_sql("select * from hurricane_table;",con=engine)

    json_data = temp.to_dict(orient="records")
    response = {"data": json_data}
    return jsonify(response)

def Season_one_Data():
    Season_one=pd.read_sql("select * from hurricane_table where Season==1;",con=engine)

    json_1_data = Season_one.to_dict(orient="records")
    response1 = {"dataa": json_1_data}
    return jsonify(response1)

def Season_two_Data():
    Season_two=pd.read_sql("select * from hurricane_table where Season==2;",con=engine)

    json_2_data = Season_two.to_dict(orient="records")
    response2 = {"dataa": json_2_data}
    return jsonify(response2)


def Season_three_Data():
    Season_three=pd.read_sql("select * from hurricane_table where Season==3;",con=engine)

    json_3_data = Season_three.to_dict(orient="records")
    response3= {"dataa": json_3_data}
    return jsonify(response3)

def Season_four_Data():
    Season_four=pd.read_sql("select * from hurricane_table where Season==4;",con=engine)

    json_4_data = Season_four.to_dict(orient="records")
    response4 = {"dataa": json_4_data}
    return jsonify(response4)


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
        f"/api/v1.0/HurricaneCitiesData<br/>" # Huma's city url
        f"/api/v1.0/HurricaneLocationData<br/>" # Leif's url
        f"Available Routes:<br/>"  # Dhawanpreet's routes
        f"127.0.0.1:5000/api/v1.0/HurricaneLocationData<br/>"
        f"/api/v1.0/HurricaneData<br/>"
        f"/api/v1.0/SeasononeData<br/>"
        f"/api/v1.0/SeasontwoData<br/>"
        f"/api/v1.0/SeasonthreeData<br/>"
        f"/api/v1.0/SeasonfourData<br/>"
    )


##################################################
# Front End Routes
##################################################

@app.route('/')
def index():
    return render_template("index.html")

# Ron's Tropical Storm Route:
@app.route('/tropical_storms')
def tropical_storms():
    return render_template("tropical_storms.html") #Display html

# Huma's City Route:
@app.route("/api/v1.0/HurricaneCitiesData")
def cities():
  return render_template("index_HA.html") #Display html

# Deepika's data Route:
@app.route("/api/v1.0/HurricaneLocationData")
def cities():
  return render_template("index_DP.html") #Display html

#Leif's Route
@app.route("/api/v1.0/HurricaneLocationData")
def NineteenFiftyTwo():
    return render_template("index_LM.html") #Display html

#Dhawanpreet's route 

@app.route("/api/v1.0/HurricaneData")
def passengers():
  return render_template("index_DP.html") #Display html


@app.route("/api/v1.0/SeasononeData")
def Season_one_Data():
   return render_template("index_DP.html") #Display html

@app.route("/api/v1.0/SeasontwoData")
def Season_two_Data():
    return render_template("index_DP.html") #Display html


@app.route("/api/v1.0/SeasonthreeData")
def Season_three_Data():
  return render_template("index_DP.html") #Display html


@app.route("/api/v1.0/SeasonfourData")
def Season_four_Data():
   return render_template("index_DP.html") #Display html



if __name__ == '__main__':
    app.run(debug=True)

