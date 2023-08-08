// Define the URL to fetch hurricane data from the API
const url = 'http://127.0.0.1:5000/api/v1.0/HurricaneLocationData';

// Global variables for the map and filters
let map;
let markersLayer;
let hurricanes;
let selectedYear;
let selectedHurricane;
let selectedCountry;
let defaultPolylines = [];

// Initialize the map and UI elements
function initMap() {
  // Create a Leaflet map with initial view and add a tile layer
  map = L.map('map').setView([19, -99], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Create a layer group for markers and add to the map
  markersLayer = L.layerGroup().addTo(map);

  // Create filter dropdowns and reset button
  const yearSelect = document.getElementById('yearSelect');
  const hurricaneSelect = document.getElementById('hurricaneSelect');
  const countrySelect = document.getElementById('countrySelect');
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Filters';
  resetButton.addEventListener('click', resetFilters);
  document.body.appendChild(resetButton);

  // Initialize filter variables to null
  selectedYear = null;
  selectedHurricane = null;
  selectedCountry = null;

  // Fetch unique years, hurricane names, and countries from data
  const years = [...new Set(hurricanes.map(d => new Date(d.Datetime).getFullYear()))];
  const hurricaneNames = [...new Set(hurricanes.map(d => d.Name))];
  const countries = [...new Set(hurricanes.map(d => d.country))];

  // Populate filter dropdowns with options
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

  countries.forEach(country => {
    const option = document.createElement('option');
    option.value = country;
    option.text = country || 'Unknown';
    countrySelect.appendChild(option);
  });

  // Add event listeners to filter dropdowns
  yearSelect.addEventListener('change', updateMap);
  hurricaneSelect.addEventListener('change', updateMap);
  countrySelect.addEventListener('change', updateMap);

  // Update the map with initial data
  updateAll();
}


// Update the map based on selected filters
function updateMap() {
  // Get selected filter values and the "No Data" message element
  selectedYear = parseInt(yearSelect.value);
  selectedHurricane = hurricaneSelect.value;
  selectedCountry = countrySelect.value;
  const noDataMessage = document.getElementById('noDataMessage');

  // Clear existing markers
  markersLayer.clearLayers();

  // Check if "All" is selected for each filter
  const isAllYearsSelected = selectedYear === 'All';
  const isAllHurricanesSelected = selectedHurricane === 'All';
  const isAllCountriesSelected = selectedCountry === 'All';

  // Filter data based on selected filters
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

  // Update the map with filtered data
  updateMarkersAndPolylines(filteredData);

  // Display "No Data" message if no hurricanes match the filters
  noDataMessage.style.display = filteredData.length === 0 ? 'block' : 'none';
}

// Update markers and polylines on the map
function updateMarkersAndPolylines(data) {
  // Iterate through filtered data and add markers and polylines
  data.forEach(h => {
    const latLngs = hurricanes
      .filter(d => d.Name === h.Name)
      .map(d => [d.Latitude, d.Longitude]);

    const polyline = L.polyline(latLngs, { color: getRandomColor() })
      .bindPopup(`Name: ${h.Name}`);
    markersLayer.addLayer(polyline);
  });
}

// Update all markers and polylines for default view
function updateAll() {
  selectedYear = 'All';
  selectedHurricane = 'All';
  selectedCountry = 'All';

  // Clear existing markers and polylines
  markersLayer.clearLayers();
  defaultPolylines.forEach(polyline => markersLayer.removeLayer(polyline));
  defaultPolylines = [];

  // Group hurricanes by name and update map
  const groupedHurricanes = groupHurricanesByName(hurricanes);
  for (const name in groupedHurricanes) {
    const latLngs = groupedHurricanes[name].map(d => [d.Latitude, d.Longitude]);
    const polyline = L.polyline(latLngs, { color: getRandomColor() })
      .bindPopup(`Name: ${name}`);

    defaultPolylines.push(polyline);
    markersLayer.addLayer(polyline);
  }
}

// Group data by hurricane name
function groupHurricanesByName(data) {
  const hurricanesGrouped = {};
  data.forEach(h => {
    const name = h.Name;
    if (!hurricanesGrouped[name]) {
      hurricanesGrouped[name] = [];
    }
    hurricanesGrouped[name].push(h);
  });
  return hurricanesGrouped;
}

// Generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Reset all filters and update the map
function resetFilters() {
  selectedYear = 'All';
  selectedHurricane = 'All';
  selectedCountry = 'All';

  // Set the selected values for the filter dropdowns to "All"
  yearSelect.value = 'All';
  hurricaneSelect.value = 'All';
  countrySelect.value = 'All';

  // Clear markers and polylines
  markersLayer.clearLayers();
  defaultPolylines.forEach(polyline => markersLayer.removeLayer(polyline));
  defaultPolylines = [];

  // Update the map with the default view
  updateAll();

  // Hide the "No Data" message
  const noDataMessage = document.getElementById('noDataMessage');
  noDataMessage.style.display = 'none';
}

// Fetch hurricane data and initialize the map on page load
document.addEventListener('DOMContentLoaded', () => {
  d3.json(url).then(data => {
    hurricanes = data.data;

    // Initialize the map and UI elements
    initMap();

    // Add event listener to the reset button
    const resetButton = document.getElementById('resetFiltersButton');
    resetButton.addEventListener('click', resetFilters);
  });
});