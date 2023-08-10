Hurricane ETL and Visualization Project

Authors: Deepika Pitchikala, Leif Munroe, Dhawanpreet Dhaliwal, Huma Alam, Ron Briggs

Objective: To create an ETL based on raw NOAA hurricane data from the North Atlantic Basin and from that, create a series of visualizations that can help us gain insights into hurricanes, using graphs and maps.

What’s our story?
Climate Change has been a growing concern to humanity in recent decades.  One of the consequences of climate change is an increased frequency of tropical storms.  We will create several visualizations that show the increase of tropical storms in the North American basin from 1950 to 2020.

Requirements
New database and schema: SQLite
Python Flask API:

<body>
  <div class="center">
    <h1>Hurricane Homepage</h1>
    <br>
    <button class="button" onclick="window.location.href='**http://127.0.0.1:5000//hurricane_seasons**'">Season Storm Dashboard</button><br> <!-- Dhawanpreet -->
    <button class="button" onclick="window.location.href='**http://127.0.0.1:5000//hurricane_analysis**'">Individual Storm Dashboard</button><br> <!-- Leif -->
    <button class="button" onclick="window.location.href='**http://127.0.0.1:5000//hurricane_cities**'">Storm Location(City) Dashboard</button><br> <!-- Huma -->
    <button class="button" onclick="window.location.href='**http://127.0.0.1:5000//hurricane_location**'">Storm Location(Country) Dashboard</button><br> <!-- Deepika -->
    <button class="button" onclick="window.location.href='**http://127.0.0.1:5000/tropical_storms**'">Tropical Storm Frequency by Decade</button><br> <!-- Ron -->
  </div>

New JavaScript Library: turf.js library for buffer layer on Ron’s Dashboard
Minimum 100 Lines of Data
3 Interactive Visuals



![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/bca4a8d3-69d9-4842-8396-26d6c7df4fbd)



Note: To view the project workflow please refer to the Hurricane Project - Workflow Diagram.png file in the main directory.

Dhawanpreet - Seasonality of Hurricanes


Leif - Digital Hurricane Catalogue


Huma - Cities Affected by Hurricanes


Deepika - Hurricane Impact of Countries


Ron - Tropical Storm Frequency by Decade

