// find the element
var element = document.getElementById('stuff');
element.innerHTML = '<h2> share with your friends! Share this download link.</h2> <br> <h4><a href="hhttps://drive.google.com/u/0/uc?id=1IZHSmcLa2UBGjNeO3GR_jaRPJO4oXz-u&export=download" >https://drive.google.com/u/0/uc?id=1IZHSmcLa2UBGjNeO3GR_jaRPJO4oXz-u&export=download</a></h4>';

// Add CSS styling to the element
element.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
element.style.borderRadius = '10px';
element.style.padding = '10px';
element.style.margin = '10px';
element.style.width = '75%';


// Append the element to the 'stuff' div
var container = document.getElementById('stuff');
container.appendChild(element);

