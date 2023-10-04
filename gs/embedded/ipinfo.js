<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IP Information with Map</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    <style>
    #map {
      height: 100vh; /* Set height to 100% of viewport height */
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
  </style>
</head>
<body>

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

  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
  <script>
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    function lookupIP() {
      const ipInput = document.getElementById('ipInput').value;

      // Clear the previous table and markers
      const outputTable = document.getElementById('outputTable');
      outputTable.innerHTML = '<tr><th>Property</th><th>Value</th></tr>';
      map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

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
    }
  </script>

</body>
</html>
