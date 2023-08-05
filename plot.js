const url = 'http://127.0.0.1:5000/api/v1.0/HurricaneLocationData'; // Replace with the URL of your data source


let map;
let markersLayer;
let hurricanes;

function initMap() {
  map = L.map('map').setView([19, -99], 5); // Set initial map view
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  markersLayer = L.layerGroup().addTo(map);

  const yearSelect = document.getElementById('yearSelect');
  const hurricaneSelect = document.getElementById('hurricaneSelect');
  const allSelect = document.getElementById('allData');
  
  const years = [...new Set(hurricanes.map(d => new Date(d.Datetime).getFullYear()))];
  const hurricaneNames = [...new Set(hurricanes.map(d => d.Name))];

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

  yearSelect.addEventListener('change', updateMap);
  hurricaneSelect.addEventListener('change', updateMap);
  allSelect.addEventListener('click', updateAll);
  // hurricaneDropdown.addEventListener('change', updateHurricaneInfo);
  
  updateAll(); 
  
}


document.addEventListener('DOMContentLoaded', () => {
 d3.json(url).then(data => {
  hurricanes = data.data;
  
  initMap(); // Initialize the map after loading the data
 });
 });
// function updateMap() {
//   const selectedYear = parseInt(yearSelect.value);
//   const selectedHurricane = hurricaneSelect.value;

//   if (map && markersLayer) {
//     markersLayer.clearLayers(); // Clear existing markers

//     hurricanes.forEach(h => {
//       const year = new Date(h.Datetime).getFullYear();
//       const name = h.Name;
//       const country = h.country || 'Unknown';

//       if (year === selectedYear && (selectedHurricane === 'All' || name === selectedHurricane)) {
//         L.marker([h.Latitude, h.Longitude])
//           .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`)
//           .addTo(markersLayer); // Add the marker to the markersLayer instead of directly to the map
//       }
//     });
//   }
// }

function updateMap() {
  const selectedYear = parseInt(yearSelect.value);
  const selectedHurricane = hurricaneSelect.value;
  const noDataMessage = document.getElementById('noDataMessage');

  if (map && markersLayer) {
    markersLayer.clearLayers(); // Clear existing markers

    const filteredData = hurricanes.filter(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      return year === selectedYear && (selectedHurricane === 'All' || name === selectedHurricane);
    });

    if (filteredData.length === 0) {
      // Show the "No data points" message when there are no data points for selected filters
      noDataMessage.style.display = 'block';
    } else {
      noDataMessage.style.display = 'none'; // Hide the message if there are data points
    }

    filteredData.forEach(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      const country = h.country || 'Unknown';

      L.marker([h.Latitude, h.Longitude])
        .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`)
        .addTo(markersLayer);
    });
  }
}


function updateAll() {
  const yearSelect = document.getElementById('yearSelect');
  const hurricaneSelect = document.getElementById('hurricaneSelect');

  // Set the selected values for the dropdowns to "All"
  yearSelect.value = 'All';
  hurricaneSelect.value = 'All'
  console.log(hurricanes);
  if (map && markersLayer) {
    markersLayer.clearLayers(); // Clear existing markers

    hurricanes.forEach(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      const country = h.country || 'Unknown';

      //if (year === selectedYear && (selectedHurricane === 'All' || name === selectedHurricane)) {
        L.marker([h.Latitude, h.Longitude])
          .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`)
          .addTo(markersLayer); // Add the marker to the markersLayer instead of directly to the map
      }
    //}
    );
  }
}


