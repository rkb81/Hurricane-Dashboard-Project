// STEP 1: Get the samples_url endpoint
const samples_url = "http://127.0.0.1:5000/api/v1.0/HurricaneData"
const season_one ="http://127.0.0.1:5000/api/v1.0/SeasononeData"
const season_two ="http://127.0.0.1:5000/api/v1.0/SeasontwoData"
const season_three ="http://127.0.0.1:5000/api/v1.0/SeasonthreeData"
const season_four  = "http://127.0.0.1:5000/api/v1.0/SeasonfourData"


// STEP 2: Initialize the function. Create dropdown. 
function init() {
    // Fetch the JSON data named "samples" and console log it
    let dropdownMenu = d3.select("#selDataset");
    d3.json(samples_url).then(function (samples) {
        console.log(samples);

        let datalist= samples.data;
        let uniqueSeason = [];

        for (let i = 0; i < datalist.length; i++) {
            
            let season = datalist[i].Season;

    // Check if the Season is not null and is not already in the uniqueSeason array
            if (season !== null && !uniqueSeason.includes(season)){
        uniqueSeason.push(season);
              }
            }
                console.log(uniqueSeason);

        for (let i = 0; i < uniqueSeason.length; i++) 
            {dropdownMenu.append("option").text(uniqueSeason[i]).property("value", uniqueSeason[i]);
            }  

            let firstSample = uniqueSeason[0];
            console.log(firstSample);
            charts(firstSample);
            panel(firstSample);

            // Created a function on with which selecting a season is possible and showing Seasonal data
            dropdownMenu.on("change", function () {
            let selectedSeason = dropdownMenu.property("value");
            charts(selectedSeason);
            panel(selectedSeason);
   
            });
        });
    }
    

// STEP 4: Create Bar Graph using the data that is selected from the dropdown:
function charts(x) {

    let selectedSeasonURL;
    if (x === "1") {
        selectedSeasonURL = season_one;
    } else if (x === "2") {
        selectedSeasonURL = season_two;
    } else if (x === "3") {
        selectedSeasonURL = season_three;
    }
    else if (x === "4") {
        selectedSeasonURL = season_four;
    }

    d3.json(selectedSeasonURL).then(function (samples2) {
        let samples1 = samples2.dataa;
        console.log(samples1);

        const categoryCounts = {};
        samples1.forEach((storm) => {
        const category = storm.Storm_Category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        console.log(categoryCounts);

        });

        const categories = Object.keys(categoryCounts);
        const counts = Object.values(categoryCounts);

        const BarColors = ['#FFB6C1', '#98FB98', '#FFD700', '#B0E0E6', '#FFA07A'];
        // Step 3: Create the bar graph using Plotly
        let trace = {
            x: categories,
            y: counts,
            type: "bar",
            marker: {
                color: BarColors,
                    },
         
            }
        
        let layout = {
            title: "Frequency of Storm Categories for all Seasons ",
            xaxis: {
            title: "Storm Category",
            },
            yaxis: {
            title: "Frequency",
            },
        };
        
        
        Plotly.newPlot("bar", [trace], layout);   

    });
};           

// Fucntion for creating line graphs respective of the Seasons
function panel(x) {
    let selectedSeasonURL;
    if (x === "1") {
        selectedSeasonURL = season_one;
    } else if (x === "2") {
        selectedSeasonURL = season_two;
    } else if (x === "3") {
        selectedSeasonURL = season_three;
    } else if (x === "4") {
        selectedSeasonURL = season_four; 
    }
    d3.json(selectedSeasonURL).then(function (seasondata) {
        let samples1 = seasondata.dataa;
        console.log(samples1);

        const categorySum = {}; // Object to store sum for each category
        const categoryeach = {}; // Object to store count for each category
        const categoryPressure = {}; // Object to store sum of air pressure for each category

        samples1.forEach((storm) => {
            const category = storm.Storm_Category;
            const windspeed = storm['Wind_Speed(knots)']; // Accessing windspeed using the appropriate property name
            const airpressure = storm['Air_Pressure(mb)'];

            // If the category is encountered for the first time, initialize the sum and count
            if (!categorySum[category]) {
                categorySum[category] = 0;
                categoryeach[category] = 0;
                categoryPressure[category] = 0;
            }

            // Update the sum and count for the category
            categorySum[category] += windspeed;
            categoryPressure[category] += airpressure;
            categoryeach[category]++;
        });

        const avgwindspeed = {};
        const avgairpressure = {};

        for (const category in categorySum) {
            // Calculate average windspeed for each category
            avgwindspeed[category] = categorySum[category] / categoryeach[category];

            // Calculate average air pressure for each category
            avgairpressure[category] = categoryPressure[category] / categoryeach[category];
        }

        // This object will contain the average windspeed and air pressure for each storm category
        console.log(avgwindspeed);
        console.log(avgairpressure);

   // Create the trace for windspeed data
   const windspeedTrace = {
    x: Object.keys(avgwindspeed), // Storm categories will be used as x-axis
    y: Object.values(avgwindspeed), // Average windspeed values
    mode: 'lines+markers',
    name: 'Average Windspeed (knots)',
    line: { color: 'blue' },
};

// Create the trace for air pressure data
const airPressureTrace = {
    x: Object.keys(avgairpressure), // Storm categories will be used as x-axis
    y: Object.values(avgairpressure), // Average air pressure values
    mode: 'lines+markers',
    name: 'Average Air Pressure (mb)',
    line: { color: 'red' },
};

// define the traces
const data = [windspeedTrace];
const datapressure= [airPressureTrace];
// Define layout options
const layout1 = {
    title: 'Average Windspeed VS Storm Categories',
    xaxis: { title: 'Storm Categories' },
    yaxis: { title: 'Value (knots)' },
    paper_bgcolor: 'rgb(240, 256, 254)',
    plot_bgcolor: 'rgb(240, 256, 254)'
};

const layout2 = {
    title: 'Average Air Pressure VS Storm Categories',
    xaxis: { title: 'Storm Categories' },
    yaxis: { title: 'Value(mb)' },
    paper_bgcolor: 'rgb(252, 257, 245)',
    plot_bgcolor: 'rgb(252, 257, 245)'
};



// Create the chart
Plotly.newPlot("line", data, layout1);
Plotly.newPlot("bubble", datapressure, layout2);

    });
}



function createClusteredBarGraph(samples_url) {
    console.log("Function createClusteredBarGraph is called.");
    d3.json(samples_url).then(function (samples) {
        let samples1 = samples.data;
        console.log(samples1);

        const categoryCounts = {};
        samples1.forEach((storm) => {
            const category = storm.Storm_Category;
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            console.log(categoryCounts);
        });

        const categories = Object.keys(categoryCounts);
        const counts = Object.values(categoryCounts);

        const BarColors = ['#FFB6C1', '#98FB98', '#FFD700', '#B0E0E6', '#FFA07A'];
        
        // Step 3: Create the clustered bar graph using Plotly
        let trace = {
            x: categories,
            y: counts,
            type: "bar",
            marker: {
                color: BarColors,
            },
        };
        
        let layout = {
            title: "Frequency of Storm Categories",
            xaxis: {
                title: "Categories",
            },
            yaxis: {
                title: "Frequency",
            },
            barmode: "group", // Specify "group" for clustered bars
        };
        
        Plotly.newPlot("extragraph", [trace], layout);   
    });
}

init();

const button = document.getElementById('extragraph');
button.addEventListener('click', function () {
    createClusteredBarGraph(samples_url);
});














