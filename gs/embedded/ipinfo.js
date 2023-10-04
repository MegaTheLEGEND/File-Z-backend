// Create meta elements
const metaCharset = document.createElement('meta');
metaCharset.charset = 'UTF-8';
document.head.appendChild(metaCharset);

const metaViewport = document.createElement('meta');
metaViewport.name = 'viewport';
metaViewport.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(metaViewport);

// Create title element
const title = document.createElement('title');
title.textContent = 'IP Information with Map';
document.head.appendChild(title);

// Create stylesheet link element
const leafletStylesheet = document.createElement('link');
leafletStylesheet.rel = 'stylesheet';
leafletStylesheet.href = 'https://unpkg.com/leaflet/dist/leaflet.css';
document.head.appendChild(leafletStylesheet);

// Create style element for inline styles
const inlineStyle = document.createElement('style');
inlineStyle.textContent = `
  #map {
    height: 100vh;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;
document.head.appendChild(inlineStyle);

// Create body content
document.body.innerHTML = `
  <h2>IP Information Lookup with Map</h2>
  <label for="ipInput">Enter IP Address:</label>
  <input type="text" id="ipInput" placeholder="Enter IP Address">
  <button onclick="lookupIP()">Search</button>

  <table id="outputTable">
    <tr>
      <th>Property</th>
      <th>Value</th>
    </tr>
  </table>

  <div id="map"></div>
`;

// Include Leaflet script
const leafletScript = document.createElement('script');
leafletScript.src = 'https://unpkg.com/leaflet/dist/leaflet.js';
document.body.appendChild(leafletScript);

// Define lookupIP globally
window.lookupIP = function () {
  const ipInput = document.getElementById('ipInput').value;

  // Clear the previous table and markers
  const outputTable = document.getElementById('outputTable');
  outputTable.innerHTML = '<tr><th>Property</th><th>Value</th></tr>';

  // Create map
  const map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Array of API endpoints
  const apiEndpoints = [
    `https://ipinfo.io/${ipInput}/json`,
    `https://ipapi.co/${ipInput}/json/`,
    `https://ipwhois.app/json/${ipInput}`,
    // Add more API endpoints here
  ];

  // Fetch data from each API
  apiEndpoints.forEach((endpoint, index) => {
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        // Populate the output table
        for (const [key, value] of Object.entries(data)) {
          const row = outputTable.insertRow();
          const cell1 = row.insertCell(0);
          const cell2 = row.insertCell(1);
          cell1.textContent = key;
          cell2.textContent = value;
        }

        // Show the location on the map with different colored markers
        const [lat, lon] = data.loc ? data.loc.split(',').map(Number) : [parseFloat(data.latitude), parseFloat(data.longitude)];

        // Use Leaflet's default marker icon (pin)
        const marker = L.marker([lat, lon]);

        marker.addTo(map).bindPopup(`<b>Info from API ${index + 1}</b><br>${JSON.stringify(data, null, 2)}`);
      })
      .catch(error => console.error(`Error fetching API ${index + 1}:`, error));
  });

  // Set the map view based on the first API result
  fetch(apiEndpoints[0])
    .then(response => response.json())
    .then(data => {
      const [lat, lon] = data.loc ? data.loc.split(',').map(Number) : [parseFloat(data.latitude), parseFloat(data.longitude)];
      map.setView([lat, lon], 13);
    })
    .catch(error => console.error('Error fetching IPinfo:', error));
};
