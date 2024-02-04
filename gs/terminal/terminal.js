const url = 'File-Z-backend/gs/terminal/terminal.html';
const urlParams = new URLSearchParams(window.location.search);

const xhr = new XMLHttpRequest();

xhr.onload = function() {
  if (xhr.status >= 200 && xhr.status < 400) {
    switch (urlParams.get("type")) {
      case "js": {
        const dynamicFunction = new Function(xhr.responseText);
        dynamicFunction();
        break;
      }
      default: {
        // Replace only the body content, preserving existing scripts
        document.body.innerHTML = xhr.responseText;

        // Update the base element href
        const baseElement = document.createElement('base');
        baseElement.setAttribute('href', 'https://megathelegend.github.io/' + url);
        document.head.appendChild(baseElement);
      }
    }
  } else {
    console.error('Error:', xhr.statusText);
  }
};

xhr.open('GET', 'https://megathelegend.github.io/' + url, true);
xhr.send();
