# Hurricane ETL and Dashboard Project

## Authors: Deepika Pitchikala, Leif Munroe, Dhawanpreet Dhaliwal, Huma Alam, Ron Briggs

## Table of Contents
- [Introduction](#Introduction)
  - [What’s our story?](#what's-our-story?)
  - [Requirements](#Requirements)
  - [Group Work Outline](#Group-Work-Outline)
  - [Workflow Diagram](#Workflow-Diagram)
- [Hurricane Dashboards](#Hurricane-Dashboards)
  - [Seasonality of Hurricanes](#Seasonality-of-Hurricanes)
    - [Winter](#Winter)
    - [Spring](#Spring)
    - [Summer and Fall](#Summer-and-Fall)
    - [Clustered Graph](#Clustered-Graph)
  - [Digital Hurricane Catalogue](#Digital-Hurricane-Catalogue)
  - [Cities Affected by Hurricanes](#Cities-Affected-by-Hurricanes)
  - [Hurricane Impact of Countries](#Hurricane-Impact-of-Countries)
  - [Tropical Storm Frequency by Decade](#Tropical-Storm-Frequency-by-Decade)

## Introduction

### Objective: 
To create an ETL based on raw NOAA hurricane data from the North Atlantic Basin and from that, create a series of visualizations that can help us gain insights into hurricanes, using graphs and maps.

### What’s our story?
Climate Change has been a growing concern to humanity in recent decades.  One of the consequences of climate change is an increased frequency of tropical storms.  We will create several visualizations that show the increase of tropical storms in the North American basin from 1950 to 2020.

### Requirements
- New database and schema: SQLite
- Python Flask API:
    - http://127.0.0.1:5000//hurricane_seasons - Season Storm Dashboard (Dhawanpreet)
    - http://127.0.0.1:5000//hurricane_analysis - Individual Storm Dashboard (Leif)
    - http://127.0.0.1:5000//hurricane_cities - Storm Location(City) Dashboard (Huma)
    - http://127.0.0.1:5000//hurricane_location - Storm Location(Country) Dashboard (Deepika)
    - http://127.0.0.1:5000/tropical_storms - Tropical Storm Frequency by Decade (Ron)
- New JavaScript Library: turf.js library for buffer layer on Ron’s Dashboard
- Minimum 100 Lines of Data: Over 500 lines of data
- 3 Interactive Visuals: Over 6 interactive visuals

### Group Work Outline:
- Convert Master file to SQLite File - Everyone
- Create Flask App and convert SQLite Database
- Create 5 Objective Questions that is covered by each Group Member - Everyone
- Has at least 2 to 3 interactive visuals for each page - Everyone seperately with the subject topic they have 

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/7055c7b3-affc-4cab-9e40-09f06fc68cb0)

### Workflow Diagram

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/bca4a8d3-69d9-4842-8396-26d6c7df4fbd)

# Hurricane Dashboards

## Seasonality of Hurricanes
### Dhawanpreet Dhaliwal

Looking at Hurricanes and Tropical Storms by Seasons; Winter, Spring, Summer and Fall. Also, creating a dropdown with the seasons where the below gets updated:

Bar Graph: Frequency of Storm for All Season (Storm Category vs. Frequency)
- Line Graph: Average Windspeed vs. Storm Categories
- Line Graph: Average Air Pressure vs. Storm Categories

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/a17f369f-2c25-4019-a691-6606dd0fe9f8)

### Winter:
The  bar graph depicts the frequency of CAT1 and TS storm all other storms did not occur at all 
The average wind_speed was Cat 1 was 65 and Tropical storm it wasS 52.5 Knots and Air pressure is 991 for cat 1 for TS 999.5 .Here we can see that the averages of tropical storm depicts transition from a tropical storm to a Category 1 storm
Higher the air pressure means lower the windspeed.

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/a17f369f-2c25-4019-a691-6606dd0fe9f8)

### Spring:
Here the bar graph for frequency of the storms depict that in spring  Tropical storms were the most occurring storms .Cat 1occured 38 times where as cat 2(4) and cat3 (2) are not that signicant
The windspeed line graph clearly depicts the rise of windspeed with the cat 2 (87.5 knots ) and cat 5 (average being 110) .Opposite can be seen for the air pressure which is it decrease with the categories leading to more destructive hurricanes 

<img width="589" alt="image" src="https://github.com/rkb81/Hurricane-Project-3/assets/130263833/705dc47f-5ee1-46d2-badb-871fb66f4492">

### Summer and Fall:
Similar patterns can be seen in both the summer and fall season for tropical storms being the most frequent storms. But in season three the tropical storm occurred for 1928 times where as for season 4 this number decrease to 1123.

<img width="575" alt="image" src="https://github.com/rkb81/Hurricane-Project-3/assets/130263833/3843cb88-9da9-4820-843d-ee4cb229063f">

### Clustered Graph
This graph represents all the four seasons for all the decades and shows that Tropical storms were the most frequent storms occuring 1928 times and CAT 5 storm were the leaset in frequency. 

<img width="546" alt="image" src="https://github.com/rkb81/Hurricane-Project-3/assets/130263833/176c6bcd-c3d7-486b-9115-e7e65a07075e">

## Digital Hurricane Catalogue
### Leif Munroe
Created a dashboard where the user selects a hurricane ID and a Hurricane Info panel displays hurricane path points, wind speed, air pressure and storm category for the duration of the storm; alongside a line graph that plots the windspeed over time for each instance the hurricaned was measured. 

There is an interactive dropdown with hurricane id's updating:
- Panel of Hurricane Information
- Line Graph: Wind Speed vs. Datetime

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/8a820496-089f-4d60-b74d-352be25b5226)

## Cities Affected by Hurricanes
### Huma Alam

Create a map where the user selects a city and the wind speed and location is shown for 2010-2020. There is an interactive dropdown with city name that changes:

- Bar Graph: Hurrican Namee vs. Wind Speed
- Leaflet Map

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/ecd8c24d-cbec-486f-85e9-3b16c6c22b1f)

## Hurricane Impact of Countries
### Deepika Pitchikala

This webpage provides an interactive dashboard for visualizing and exploring hurricane data in the North American Basin over the past decade. The dashboard is built using HTML, CSS, JavaScript, and the Leaflet library for mapping.The code uses Leaflet for mapping, D3.js for data manipulation, and the Fetch API to retrieve hurricane data from a specified API endpoint.

Features of webpage:
- Map: The main section of the webpage displays a Leaflet map representing hurricane paths. Users can interact with the map to explore hurricanes by filtering based on year, hurricane name, and country.
- Filter Dropdowns: Three filter dropdowns allow users to select specific filters for the displayed hurricanes: year, hurricane name, and country.
- Reset Filters Button: Users can reset the applied filters and view all hurricane paths by clicking the "Reset Filters" button.
- No Data Message: If the selected filters yield no hurricane data points, a message is displayed to inform the user.
- Instructions: A section provides instructions on how to use the map and interact with the filters.

SnapShot of webpage
![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/1922cd25-2776-4838-ac30-7b2a88765a77)

## Tropical Storm Frequency by Decade
### Ron Briggs

Does Tropical Storm Frequency increase over time?
- Created 7 map layers showing the frequency distribution of tropical storms from 1950 to 2019
- Legend shows wind speed (knots)
- Each data point displays the name, date, air pressure and wind speed
- Looking at all the layers we can see that tropical storms are increasing over time
- A layer showing a 200 km buffer zone around tropical storm point to show the effect of each storm on the surrounding terrain

![image](https://github.com/rkb81/Hurricane-Project-3/assets/130116747/9aea8d6d-d1f6-4411-a31e-a837d9a2c6a5)


