<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IP Information</title>
  <style>
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

  <h2>IP Information Lookup</h2>
  
  <label for="ipInput">Enter IP Address:</label>
  <input type="text" id="ipInput" placeholder="Enter IP Address">
  <button onclick="lookupIP()">Search</button>

  <table id="outputTable">
    <tr>
      <th>Property</th>
      <th>Value</th>
    </tr>
  </table>

  <script>
    function lookupIP() {
      const ipInput = document.getElementById('ipInput').value;

      // Make a GET request to the IPinfo API
      fetch(`https://ipinfo.io/${ipInput}/json`)
        .then(response => response.json())
        .then(data => {
          // Populate the output table
          const outputTable = document.getElementById('outputTable');
          outputTable.innerHTML = '<tr><th>Property</th><th>Value</th></tr>';

          for (const [key, value] of Object.entries(data)) {
            const row = outputTable.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key;
            cell2.textContent = value;
          }
        })
        .catch(error => console.error('Error fetching IPinfo:', error));
    }
  </script>

</body>
</html>
