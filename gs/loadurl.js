// Get the URL from the command line arguments or the browser URL params
const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('url');

// Create a new XMLHttpRequest object
const xhr = new XMLHttpRequest();

// Define a callback function to handle the response
xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    // Request successful
    switch (urlParams.get("type")) {
      case "js": {
        var F = new Function(xhr.responseText);
        return F();
      }
      default: {
        document.documentElement.innerHTML = xhr.responseText;
        // Update the base element href
        const baseElement = document.createElement('base');
        baseElement.setAttribute('href', 'https://megathelegend.github.io/' + url);
        document.head.appendChild(baseElement);
      }
    }
  } else {
    // Request failed
    console.error('Error:', xhr.statusText);
  }
};

// Open the request
xhr.open('GET', 'https://megathelegend.github.io/' + url, true);

// Send the request
xhr.send();
