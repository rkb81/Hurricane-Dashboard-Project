// STEP 1: Get the samples_url endpoint
const samples_url = "http://127.0.0.1:5000/api/v1.0/HurricaneCitiesData";

// STEP 2: Initialize the function. Create dropdown.
function init() {
    let dropdownMenu = d3.select("#selDataset");
    d3.json(samples_url).then(function (samples) {
        let datalist = samples.data;
        let uniqueCities = [];

        for (let i = 0; i < datalist.length; i++) {
            let city = datalist[i].city;

            if (city !== null && !uniqueCities.includes(city)) {
                uniqueCities.push(city);
            }
        }

        for (let i = 0; i < uniqueCities.length; i++) {
            dropdownMenu.append("option").text(uniqueCities[i]).property("value", uniqueCities[i]);
        }

        let firstCity = uniqueCities[0];
        console.log(firstCity);
        bargraphCreate(firstCity);
        mapcreate(firstCity);
    });
}

init();

// STEP 3: Fetch JSON data and create markers on the Leaflet Map
function mapcreate(SelectedCity) {
    d3.json(samples_url).then(function (samples) {
        let datalist = samples.data;

        for (let i = 0; i < datalist.length; i++) {
            let city = datalist[i].city;

            if (city === SelectedCity) {
                let latitude = datalist[i].Latitude;
                let longitude = datalist[i].Longitude;

                // Create a Plotly scattermapbox trace
                const trace = {
                    type: 'scattermapbox',
                    lat: [latitude],
                    lon: [longitude],
                    mode: 'markers',
                    marker: {
                        size: 10,
                        color: 'blue'
                    }
                };

                // Set layout options
                const layout = {
                    mapbox: {
                        center: { lat: latitude, lon: longitude },
                        zoom: 6,
                        style: 'open-street-map' // 'basic', 'streets', 'outdoors', etc.
                    },
                    width: 800,
                    height: 600
                };

                // Create the Plotly map
                Plotly.newPlot('bubble', [trace], layout);
            }
        }
    });
}

// STEP 4: Create Bar Graph
function bargraphCreate(SelectedCity) {
    d3.json(samples_url).then(function (samples) {
        let datalist = samples.data;

        // Filter data for the selected city
        let cityData = datalist.filter(entry => entry.city === SelectedCity);

        // Extract data for the bar graph
        let unique_Ids = cityData.map(entry => entry.Name);
        let windspeed = cityData.map(entry => entry['Wind_Speed(knots)']);

        // Create the Bar Graph trace
        let trace1 = {
            x: windspeed,
            y: unique_Ids,
            text: cityData.map(entry => entry.ID),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgba(0, 128, 0, 0.5)',


            }
        };

        // Set layout options
        let layout1 = {
            title: " ${SelectedCity} Hurricanes Between 2010-2020",
            margin: {
                l: 90,
                t: 40,
                r: 20,
                b: 40
            },
            xaxis: {
                title: 'Wind Speed (knots)' // Add x-axis label
            },
            yaxis: {
                title: 'Hurricane Name' // Add y-axis label
            }
        };

        // Create the Plotly bar graph
        Plotly.newPlot("bar", [trace1], layout1);
    });
}

function optionChanged(SelectedCity) {
    bargraphCreate(SelectedCity);
    mapcreate(SelectedCity);
}