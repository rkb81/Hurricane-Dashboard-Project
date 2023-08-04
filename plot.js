const url = 'http://127.0.0.1:5000/api/v1.0/HurricaneLocationData'; // Replace with the URL of your data source


let map;
let markersLayer;

function initMap() {
  map = L.map('map').setView([19, -99], 5); // Set initial map view
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  markersLayer = L.layerGroup().addTo(map);

  const yearSelect = document.getElementById('yearSelect');
  const hurricaneSelect = document.getElementById('hurricaneSelect');

  // Get unique years and hurricane names from the data
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

  updateMap(); // Initially update the map based on the selected filters
}

d3.json(url).then(data => {
  hurricanes = data.data;
  initMap(); // Initialize the map after loading the data
});

function updateMap() {
  const selectedYear = parseInt(yearSelect.value);
  const selectedHurricane = hurricaneSelect.value;

  if (map && markersLayer) {
    markersLayer.clearLayers(); // Clear existing markers

    hurricanes.forEach(h => {
      const year = new Date(h.Datetime).getFullYear();
      const name = h.Name;
      const country = h.country || 'Unknown';

      if (year === selectedYear && (selectedHurricane === 'All' || name === selectedHurricane)) {
        L.marker([h.Latitude, h.Longitude])
          .bindPopup(`Year: ${year}<br>Name: ${name}<br>Country: ${country}`)
          .addTo(markersLayer); // Add the marker to the markersLayer instead of directly to the map
      }
    });
  }
}