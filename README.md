**Hurricane ETL and Visualization Project**

**Authors:** Deepika Pitchikala, Leif Munroe, Dhawanpreet Dhaliwal, Huma Alam, Ron Briggs

**Objective:** To create an ETL based on raw NOAA hurricane data from the North Atlantic Basin and from that, create a series of visualizations that can help us gain insights into hurricanes, using graphs and maps.

**What’s our story?**
Climate Change has been a growing concern to humanity in recent decades.  One of the consequences of climate change is an increased frequency of tropical storms.  We will create several visualizations that show the increase of tropical storms in the North American basin from 1950 to 2020.

**Requirements**
- New database and schema: SQLite
- Python Flask API:

    http://127.0.0.1:5000//hurricane_seasons - Season Storm Dashboard (Dhawanpreet)
    
    http://127.0.0.1:5000//hurricane_analysis - Individual Storm Dashboard (Leif)
    
    http://127.0.0.1:5000//hurricane_cities - Storm Location(City) Dashboard (Huma)
    
    http://127.0.0.1:5000//hurricane_location - Storm Location(Country) Dashboard (Deepika)
    
    http://127.0.0.1:5000/tropical_storms - Tropical Storm Frequency by Decade (Ron)
 

- New JavaScript Library: turf.js library for buffer layer on Ron’s Dashboard
- Minimum 100 Lines of Data: Over 500 lines of data
- 3 Interactive Visuals: Over 6 interactive visuals

Group Work Outline:
Convert Master file to SQLite File - Everyone
Create Flask App and convert SQLite Database
Create 5 Objective Questions that is covered by each Group Member - Everyone
Have approx. 2-3 interactive visuals for each page - Everyone seperately with the subject topic they have 

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/7055c7b3-affc-4cab-9e40-09f06fc68cb0)



Below, shows our data plan:



![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/bca4a8d3-69d9-4842-8396-26d6c7df4fbd)



Note: To view the project workflow please refer to the Hurricane Project - Workflow Diagram.png file in the main directory.

**HURRICANE DASHBOARD**

Dhawanpreet - Seasonality of Hurricanes

Looking at Hurricanes and Tropical Storms by Seasons; Winter, Spring, Summer and Fall. Also, creating a dropdown with the seasons where the below gets updated:

Bar Graph: Frequency of Storm for All Season (Storm Category vs. Frequency)
- Line Graph: Average Windspeed vs. Storm Categories
- Line Graph: Average Air Pressure vs. Storm Categories

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/a17f369f-2c25-4019-a691-6606dd0fe9f8)



Leif - Digital Hurricane Catalogue
Created a dashboard where the user selects a hurricane ID and hurricane path points, wind speed, air pressure and storm category is shown on a panel with a line graph that displays the datetime and windspeed for all the data points. 

There is an interactive dropdown with hurricane id's updating:
- Panel Information
- Line Graph: Wind Speed vs. Datetime

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/8a820496-089f-4d60-b74d-352be25b5226)



Huma - Cities Affected by Hurricanes
Create a map where the user selects a city and the wind speed and location is shown for 2010-2020. There is an interactive dropdown with city name that changes:

- Bar Graph: Hurrican Namee vs. Wind Speed
- Leaflet Map

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/ecd8c24d-cbec-486f-85e9-3b16c6c22b1f)



Deepika - Hurricane Impact of Countries

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/1922cd25-2776-4838-ac30-7b2a88765a77)



Ron - Tropical Storm Frequency by Decade

Files - tropical_storms.html, tropical_storms.js
Bonus - turf.js (for buffer creation)

Topic: Does Tropical Storm Frequency increase over time?
- Created 7 map layers showing the frequency distribution of tropical storms from 1950 to 2019
- Legend shows wind speed (knots)
- Each data point displays the name, date, air pressure and wind speed
- Looking at all the layers we can see that tropical storms are increasing over time
- A layer showing a 200 km buffer zone around tropical storm point to show the effect of each storm on the surrounding terrain

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/9aea8d6d-d1f6-4411-a31e-a837d9a2c6a5)


