var newestVersion = "2.2.0"; // this is the newest available version of the offline file system


function displayInfo() {
  var infoDiv = document.getElementById("info");

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Set up a callback function to handle the file load
  xhr.onload = function() {
    if (xhr.status === 200) {
      // File loaded successfully
      infoDiv.innerHTML = xhr.responseText;
    } else {
      // Error loading the file
      infoDiv.innerHTML = "Error loading info.html";
    }
  };

  // Make a GET request to fetch the info.html file
  xhr.open("GET", "https://raw.githack.com/MegaTheLEGEND/File-Z-backend/main/about/info.html");
  xhr.send();
}

// Call the function to display the info.html content
displayInfo();
