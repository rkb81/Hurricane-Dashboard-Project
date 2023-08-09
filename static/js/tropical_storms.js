// hurricane frequency by decade
const TS1950_URL = "http://127.0.0.1:5000/api/ts195059"
const TS1960_URL = "http://127.0.0.1:5000/api/ts196069"
const TS1970_URL = "http://127.0.0.1:5000/api/ts197079"
const TS1980_URL = "http://127.0.0.1:5000/api/ts198089"
const TS1990_URL = "http://127.0.0.1:5000/api/ts199099"
const TS2000_URL = "http://127.0.0.1:5000/api/ts200009"
const TS2010_URL = "http://127.0.0.1:5000/api/ts201019"


// Modify the existing createMapForURL function to fetch and modify the layer
function fetchAndModifyLayer(url, applyBuffer) {
  // Perform a GET request to the query URL
  return d3.json(url).then(function (data) {
    // Modify the layer using createFeaturesWithBuffer function if applyBuffer is true
    const modifiedLayer = applyBuffer ? createFeaturesWithBuffer(data.features) : createFeatures(data.features);

    return modifiedLayer;
  });
}


// Call the createMapForURL function with the specific URLs you want to map
Promise.all([
  fetchAndModifyLayer(TS1950_URL, true), // With buffer
  fetchAndModifyLayer(TS1960_URL),
  fetchAndModifyLayer(TS1970_URL),
  fetchAndModifyLayer(TS1980_URL),
  fetchAndModifyLayer(TS1990_URL),
  fetchAndModifyLayer(TS2000_URL),
  fetchAndModifyLayer(TS2010_URL),
  fetchAndModifyLayer(TS1950_URL, false) // Without buffer
]).then(function (geoJSONLayers) {
  // All data has been fetched and processed. Now create the map with the final layers
  createMap(geoJSONLayers);
});


function createFeaturesWithBuffer(tropicalStormData) {
  const bufferLayers = [];

  function onEachFeature(feature, layer) {
    const Air_Pressure = feature.properties.Air_Pressure;
    const Wind_Speed = feature.properties.Wind_Speed;

    const markerOptions = {
      radius: getMarkerSize(Air_Pressure),
      fillColor: getColor(Wind_Speed),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };

    // Define a buffer around the point
    const center = turf.point([layer.getLatLng().lng, layer.getLatLng().lat]);
    const buffer = turf.buffer(center, 200, { units: 'kilometers' });

    // Convert the buffer to a Leaflet layer
    const bufferLayer = L.geoJSON(buffer, {
      style: {
        fillColor: "blue",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.1,
      },
    });

    bufferLayers.push(bufferLayer);

    // Bind the popup and set styles for the original point layer
    layer.bindPopup(/* ... */);
    layer.setStyle(markerOptions);
  }

  const originalLayer = L.geoJSON(tropicalStormData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    onEachFeature: onEachFeature,
  });

  const combinedLayers = [originalLayer, ...bufferLayers];
  return L.layerGroup(combinedLayers);
}


  // Define a function to determine the size of the data marker
  function getMarkerSize(Air_Pressure) {
    return Air_Pressure * 0.005; // Adjust the scaling factor for the desired marker size
  }

  // Define a function to determine the color of the data marker based on earthquake depth.
  function getColor(Wind_Speed) {
    // Define the color range 
    return Wind_Speed > 60 ? "darkred" :
           Wind_Speed > 50 ? "red" :
           Wind_Speed > 40 ? "orangered" :
           Wind_Speed > 30 ? "orange" :
           Wind_Speed > 20 ? "darkorange" :
           Wind_Speed > 10 ? "orange" :
                             "lightyellow";
  }


function createFeatures(tropicalStormData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    const Air_Pressure = feature.properties.Air_Pressure;
    const Wind_Speed = feature.properties.Wind_Speed;

    const markerOptions = {
      radius: getMarkerSize(Air_Pressure),
      fillColor: getColor(Wind_Speed),
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    };

    layer.bindPopup(
      `<h3>${feature.properties.Name}</h3><hr><p>${new Date(
      feature.properties.Datetime
    )}</p><p>Air Pressure: ${Air_Pressure} mb<br>Wind Speed: ${Wind_Speed} knots</p>`);
    layer.setStyle(markerOptions);
  }

  // Create a GeoJSON layer that contains the features array from the tropicalStormData.
  // Run the onEachFeature function once for each piece of data in the array.
  return L.geoJSON(tropicalStormData, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    onEachFeature: onEachFeature,
  });
}


function createMap(geoJSONLayers) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })
  
  let satellite = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Satellite": satellite,
    "Street Map": street,
    "Topographic Map": topo  
  };

  // Create an overlay object to hold our overlay layers.
  let overlayMaps = {
    "Tropical Storms (1950-59)": geoJSONLayers[7],
    "Tropical Storms (1960-69)": geoJSONLayers[1],
    "Tropical Storms (1970-79)": geoJSONLayers[2],
    "Tropical Storms (1980-89)": geoJSONLayers[3],
    "Tropical Storms (1990-99)": geoJSONLayers[4],
    "Tropical Storms (2000-09)": geoJSONLayers[5],
    "Tropical Storms (2010-19)": geoJSONLayers[6],
    "TS(1950-59) with 200km Buffer": geoJSONLayers[0],
  };

  // Create a Turf.js buffer around the points from the "Tropical Storms (1950-59)" layer
  fetchAndModifyLayer(TS1950_URL).then(function (bufferedLayer) {

  // Create our map, giving it the streetmap and tropical storm layers to display on load.
  let myMap = L.map("map", {
    center: [
      24, -82
    ],
    zoom: 5,
    layers: [satellite, geoJSONLayers[7]],
  });

  // Create a layer control and pass it our baseMaps and overlayMaps.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);  // Add the layer control to the map.

  // Create a legend control.
  let legend = L.control({ position: 'bottomright' });

  // Define the legend's content.
  legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');
    let grades = [20, 30, 40, 50, 60]; // Depth ranges for the legend
    let labels = [];
    div.innerHTML = "<h3>Wind Speed(knots)</h3>";

    // Loop through the depth ranges and generate the HTML for the legend.
    for (let i = 0; i < grades.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '">&emsp;</i> ' +
        grades[i] + (grades[i + 1] ? '&ndash;' + (grades[i + 1] - 1) + '<br>' : '+');
    }
    return div;
  };

  // Add the legend to the map.
  legend.addTo(myMap);
});
}

  

