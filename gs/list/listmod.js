var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("glist").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://megathelegend.github.io/File-Z-backend/gs/list/list.html", true);
xhttp.send();




//handler for the search box
var devmodevar = localStorage.getItem("DevMode");
    document.getElementById('gsearchbar').addEventListener('input', filterLinks);

function filterLinks() {
    console.log("Function triggered");

    var searchValue = document.getElementById('gsearchbar').value.toUpperCase().replace(/ /g, '');
    var links = document.querySelectorAll('#glist>a');

    links.forEach(function(link) {
        link.style.display = link.textContent.toUpperCase().includes(searchValue) ? 'block' : 'none';
    });

    if (searchValue.indexOf("RICK") !== -1) {
        window.location.replace("css/other-assets/index.html");
    }
    if((devmodevar === "true") && (searchValue.indexOf("devmode") !== -1)){
        window.open("/");
    }
}
