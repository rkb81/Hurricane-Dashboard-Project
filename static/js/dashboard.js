
//Get the data from the Flask URL
const url = "http://127.0.0.1:5000/api/v1.0/HurricaneLocationData";
//const url = "http://127.0.0.1:5000/api/Storms1952_2022";

//Initial Function
function init() {
    //Get the JSON data and console log it
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then(function (samples) {
        //Test reading the data
        let datalist = samples.data;
        console.log(datalist);

        //Create Unique ID list
        const uniqueIDs = [];

        //Append the ID's to the list
        for (let i = 0; i < datalist.length; i++) {
            let id = datalist[i].ID;

            if (id !== null && !uniqueIDs.includes(id)) {
                uniqueIDs.push(id);
            }
        }
        console.log(uniqueIDs)
        for (let i = 0; i < uniqueIDs.length; i++) {
            dropdownMenu.append("option").text(uniqueIDs[i]).property("value", uniqueIDs[i]);
        }

        let firstID = uniqueIDs[0];
        console.log(firstID);

        // Create the grouped data by ID
        const groupedHurricanes = groupHurricanesByID(datalist);

        // Retrieve the data for the first ID
        const targetID = "1952295N11282";
        const targetHurricaneData = groupedHurricanes[targetID];

        // Call the displayDataInPanel function with the initial data
        displayDataInPanel({ [targetID]: targetHurricaneData });
        // Call the Plot function
        createPlot(targetHurricaneData);
})
}

//Group the hurricanes by ID     
function groupHurricanesByID(hurricanes) {
        const hurricanesGrouped = {};
        hurricanes.forEach(h => {
            const id = h.ID;
            if (!hurricanesGrouped[id]) {
                hurricanesGrouped[id] = [];
            }
            hurricanesGrouped[id].push(h);
        });
        return hurricanesGrouped;
    }

// Identify the HTML location of the data
const dataPanel = document.getElementById("sample-metadata");

//Display the Panel data
function displayDataInPanel(groupedHurricanes) {
    // Clear the panel before displaying new data
    dataPanel.innerHTML = "";
     
    for (const id in groupedHurricanes) {
        const hurricaneData = groupedHurricanes[id];
        //const name = groupedHurricanes[name];
        // Create a div for each hurricane's data
        const hurricaneDiv = document.createElement("div");
        hurricaneDiv.classList.add("hurricane-data");

        // Create headings for hurricane names
        const heading = document.createElement("h3");
        heading.textContent = `Hurricane ${id}`;
        hurricaneDiv.appendChild(heading);

        // Create a list to display the hurricane's data
        const dataList = document.createElement("ul");

        // Iterate through the hurricane's data and add to the list
        hurricaneData.forEach(dataEntry => {
            const listItem = document.createElement("li");
            listItem.textContent = `Name: ${dataEntry.Name}, Datetime: ${dataEntry.Datetime}, Wind Speed(knots): ${dataEntry["Wind_Speed(knots)"]}, Air Pressure(mb): ${dataEntry["Air_Pressure(mb)"]}, Storm Category: ${dataEntry.Storm_Category}`;
            dataList.appendChild(listItem);
        });

        // Append the list to the hurricane's div
        hurricaneDiv.appendChild(dataList);

        // Append the hurricane's div to the panel
        dataPanel.appendChild(hurricaneDiv);
    }
}


//Create the plotting function
function createPlot(hurricaneData) {
    //const groupedHurricanes = groupHurricanesByID(hurricanes);
    //const hurricaneData = groupedHurricanes[selectedID];

    // Extract data for plotting
    const datetimeValues = hurricaneData.map(entry => new Date(entry.Datetime));
    const windSpeedValues = hurricaneData.map(entry => entry["Wind_Speed(knots)"]);
    console.log(windSpeedValues)

    const wind_chart = {
        x: datetimeValues,
        y: windSpeedValues,
        type: 'scatter'
    };
    const wind_data = [wind_chart];
    const wind_layout = {
        title: "Wind Speed change over the duration of the Storm",
        xaxis: {title:"Datetime"},
        yaxis: {title:"Wind Speed (knots)"}
    }

    Plotly.newPlot('scatter', wind_data, wind_layout)
}

// Create the dropdown change function
function optionChanged(hurricaneID) {
    d3.json(url).then(function (samples) {
        const datalist = samples.data
        // Filter data for the selected hurricane name
        const selectedHurricaneData = datalist.filter(entry => entry.ID === hurricaneID);


        /*const groupedHurricanes = groupHurricanesByID(selectedHurricaneData);
        for (const id in groupedHurricanes) {
            const latLngs = groupedHurricanes[id].map(d => [d.Latitude, d.Longitude]);
            const wind_speed = groupedHurricanes[id].map(d => d["Wind_Speed(knots)"]);
        }
        console.log(groupedHurricanes)*/

        // Call the displayDataInPanel function with your grouped data
        displayDataInPanel({ [hurricaneID]: selectedHurricaneData });
        //Get data for all plots

        //createChart(data, id)
        createPlot(selectedHurricaneData)

    });
}
init();