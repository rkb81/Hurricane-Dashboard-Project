#coimport numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Resources/NA_Basin.sqlite")

print(engine)



# reflect an existing database into a new model
#Base = automap_base()
# reflect the tables
#Base.prepare(autoload_with=engine)

#print(Base.classes.keys())

# Save reference to the table
#Table_data = Base.classes.second_table

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

CORS(app)


#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/HurricaneLocationData<br/>"
        
    )






@app.route("/api/v1.0/HurricaneLocationData")
def passengers():
    '''
    # Create our session (link) from Python to the DB
    #session = Session(engine)


    """Return a list of passenger data including the name, age, and sex of each passenger"""
    # Query all passengers
    results = session.query(Table_data).all()

    session.close()

     # Query all data
    results = session.query(Table_data).all()

    session.close()

    # Use dictionary comprehension to build the list of dictionaries
    all_data = [{col.name: getattr(row, col.name) for col in Table_data.__table__.columns} for row in results]

    return jsonify(all_data)
'''
    temp=pd.read_sql("select * from second_table;",con=engine)
    json_data = temp.to_dict(orient="records")
    response = {"data": json_data}
    return jsonify(response)
 

if __name__ == '__main__':
    app.run(debug=True)






