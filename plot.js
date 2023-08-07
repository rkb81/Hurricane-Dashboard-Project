const url = 'http://127.0.0.1:5000/api/v1.0/HurricaneLocationData'; 

let map;
let markersLayer;
let hurricanes;
let selectedYear;
let selectedHurricane;
let selectedCountry;
let defaultMarkers = []; 
let defaultPolylines = [];

function initMap() {
  map = L.map('map').setView([19, -99], 5); // Set initial map view
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  markersLayer = L.layerGroup().addTo(map);

  const yearSelect = document.getElementById('yearSelect');
  const hurricaneSelect = document.getElementById('hurricaneSelect');
  const countrySelect = document.getElementById('countrySelect');
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Filters';
  resetButton.addEventListener('click', resetFilters);
  document.body.appendChild(resetButton);

  // Initialize the filter variables to null
  selectedYear = null;
  selectedHurricane = null;
  selectedCountry = null;
  
  const years = [...new Set(hurricanes.map(d => new Date(d.Datetime).getFullYear()))];
  const hurricaneNames = [...new Set(hurricanes.map(d => d.Name))];
  const countries = [...new Set(hurricanes.map(d => d.country))];


  // Populate year and hurricane select dropdowns
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  });

  hurricaneNames.forEach(name => {
    const option = document.createElement('option');
    option.value = name;
    option.text = name;
    hurricaneSelect.appendChild(option);
  });

  // Populate country select dropdown
  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.text = country || 'Unknown';
    countrySelect.appendChild(option);
  });

  yearSelect.addEventListener('change', updateMap);
  hurricaneSelect.addEventListener('change', updateMap);
  countrySelect.addEventListener('change', updateMap);;
  // hurricaneDropdown.addEventListener('change', updateHurricaneInfo);
  
  updateAll(); 
  
}

function updateMap() {

  selectedYear = parseInt(yearSelect.value);
  selectedHurricane = hurricaneSelect.value;
  selectedCountry = countrySelect.value;
  const noDataMessage = document.getElementById('noDataMessage');

  if (map && markersLayer) {
    markersLayer.clearLayers(); // Clear existing markers

    // Check if "All" is selected for both year and hurricane name
    //const isAllSelected = selectedYear === 'All' && selectedHurricane === 'All';
    // Check if the selected year is 'All'
    const isAllYearsSelected = selectedYear === 'All';
    const isAllHurricanesSelected = selectedHurricane === 'All';
    const isAllCountriesSelected = selectedCountry === 'All';
    
    const filteredData = hurricanes.filter(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      const country = h.country || 'Unknown';

      // Check if each hurricane matches the selected filters
    const yearMatch = isAllYearsSelected || year === selectedYear;
    const hurricaneMatch = isAllHurricanesSelected || name === selectedHurricane;
    const countryMatch = isAllCountriesSelected || country === selectedCountry;
    return yearMatch && hurricaneMatch && countryMatch;
    });

  // Clear existing markers and default polylines
   markersLayer.clearLayers();
  defaultPolylines.forEach(polyline => markersLayer.removeLayer(polyline));
    
  if (filteredData.length === 0) {
      noDataMessage.style.display = 'block';
    } else {
      noDataMessage.style.display = 'none';
    }

    filteredData.forEach(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      const country = h.country || 'Unknown';

      const latLngs = hurricanes
      .filter(d => d.Name === name)
      .map(d => [d.Latitude, d.Longitude]);

    const polyline = L.polyline(latLngs, { color: getRandomColor() })
      .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`);

    markersLayer.addLayer(polyline);
  });
}
}
// function updateAll() {
//   const yearSelect = document.getElementById('yearSelect');
//   const hurricaneSelect = document.getElementById('hurricaneSelect');

//   // Set the selected values for the dropdowns to "All"
//   yearSelect.value = 'All';
//   hurricaneSelect.value = 'All'
//   console.log(hurricanes);
//   if (map && markersLayer) {
//     markersLayer.clearLayers(); // Clear existing markers

//     hurricanes.forEach(h => {
//       const year = new Date(h.Datetime).getFullYear();
//       const name = h.Name;
//       const country = h.country || 'Unknown';

//       //if (year === selectedYear && (selectedHurricane === 'All' || name === selectedHurricane)) {
//         L.marker([h.Latitude, h.Longitude])
//           .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`)
//           .addTo(markersLayer); // Add the marker to the markersLayer instead of directly to the map
//       }
//     //}
//     );
//   }
// }

function updateAll() {
  // const yearSelect = document.getElementById('yearSelect');
  // const hurricaneSelect = document.getElementById('hurricaneSelect');
  // const selectedCountry = countrySelect.value;
  selectedYear = parseInt(yearSelect.value); // Assign the value to selectedYear
  selectedHurricane = hurricaneSelect.value;
  selectedCountry = countrySelect.value;

  selectedYear = 'null';
  selectedHurricane = 'null';
  selectedCountry = 'null';


  // // Set the selected values for the dropdowns to "All"
  // yearSelect.value = 'All';
  // hurricaneSelect.value = 'All';
  // countrySelect.value = 'All';

  // Clear the default polylines
  defaultPolylines.forEach(polyline => markersLayer.removeLayer(polyline));
  defaultPolylines = [];
  
  //  defaultMarkers.forEach(marker => {
  //   markersLayer.removeLayer(marker);
  // });
  // defaultMarkers = [];

  if (map && markersLayer) {
    markersLayer.clearLayers(); 
    
    const groupedHurricanes = groupHurricanesByName(hurricanes);
      for (const name in groupedHurricanes) {
        const latLngs = groupedHurricanes[name].map(d => [d.Latitude, d.Longitude]);
        const polyline = L.polyline(latLngs, { color: getRandomColor() })
          .bindPopup(generatePopupContent(groupedHurricanes[name]));

        defaultPolylines.push(polyline);
        markersLayer.addLayer(polyline);
      }
    }
  }
  
  // Clear existing markers

    // const filteredData = hurricanes.filter(h => {
    //   const year = new Date(h.Datetime).getFullYear();
    //   const name = h.Name;
    //   const country = h.country || 'Unknown';

    //   return (
    //     (selectedYear === 'All' || year === selectedYear) &&
    //     (selectedHurricane === 'All' || name === selectedHurricane) &&
    //     (selectedCountry === 'All' || country === selectedCountry)
    //   );
    // });


    // Group data by hurricane name
    function groupHurricanesByName(hurricanes) {
    const hurricanesGrouped = {};
    hurricanes.forEach(h => {
      const name = h.Name;
      if (!hurricanesGrouped[name]) {
        hurricanesGrouped[name] = [];
      }
      hurricanesGrouped[name].push(h);
    });
    return hurricanesGrouped;
  }

//     // Create lines connecting the points for each hurricane
//     for (const name in hurricanesGrouped) {
//       const hurricaneData = hurricanesGrouped[name];
//       const latLngs = hurricaneData.map(h => [h.Latitude, h.Longitude]);
//       const polyline = L.polyline(latLngs, { color: getRandomColor() }).addTo(map);

//       // Add popup to the polyline with detailed information
//       const popupContent = generatePopupContent(hurricaneData);
//       polyline.bindPopup(popupContent);
//     }
//   }
// }

// Helper function to generate random colors for each hurricane path
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generatePopupContent(hurricaneData) {
  let content = '<div class="popup-content"><b>Hurricane Information:</b><br>';
  hurricaneData.forEach(h => {
    const country = h.country || 'Unknown';
    const name = h.Name;
    content += `<b>Country:</b> ${country}<br>`;
    content += `<b>Hurricane Name:</b> ${name}<br>`;
  });
  content += '</div>';
  return content;
}
function resetFilters() {
//   // Reset all filters to default
//   selectedYear = 'null';
//   selectedHurricane = 'null';
//   selectedCountry = 'null';
  // Reset all filters to default
  selectedYear = 'All';
  selectedHurricane = 'All';
  selectedCountry = 'All';

  // Set the selected values for the dropdowns to "All"
  yearSelect.value = 'All';
  hurricaneSelect.value = 'All';
  countrySelect.value = 'All';

  // Clear the existing markers and default polylines
  markersLayer.clearLayers();
  defaultPolylines.forEach(polyline => markersLayer.removeLayer(polyline));
  defaultPolylines = [];

  // // Re-add the default polylines representing all hurricanes
  // const groupedHurricanes = groupHurricanesByName(hurricanes);
  // for (const name in groupedHurricanes) {
  //   const latLngs = groupedHurricanes[name].map(d => [d.Latitude, d.Longitude]);
  //   const polyline = L.polyline(latLngs, { color: getRandomColor() })
  //     .bindPopup(generatePopupContent(groupedHurricanes[name]));
    
  //   defaultPolylines.push(polyline);
  //   markersLayer.addLayer(polyline);
  // }

  // Call updateAll to display the default map view with all hurricanes
  updateAll();
  // Hide the "No data" message when filters are reset
  const noDataMessage = document.getElementById('noDataMessage');
  noDataMessage.style.display = 'none';

  // Update the map with the reset filters
  //updateMap();

}

document.addEventListener('DOMContentLoaded', () => {
  d3.json(url).then(data => {
   hurricanes = data.data;
   
   initMap(); 

   // Add event listener to the reset button
   const resetButton = document.getElementById('resetFiltersButton');
   resetButton.addEventListener('click', resetFilters);
  });
})