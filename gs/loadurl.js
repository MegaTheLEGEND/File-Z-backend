//future "add stuff" page to load from url. i will figure it out later


// Get the URL from the command line arguments or the browser URL params
const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');
const source = urlParams.get('baseurl');
var home = undefined;

if (source == 1){
     source = "megathelegend.github.io";
  } else if (source == 2){
     source = "m-a.github.io"
  }



// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Define a callback function to handle the response
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    // Request successful
    document.documentElement.innerHTML = xhr.responseText;
  } else {
    // Request failed
    console.error('Error:', xhr.statusText);
  }
};

// Open the request
xhr.open('GET', "https://"+ source + url, true);
alert("https://"+ source + url)
// Send the request
xhr.send();

