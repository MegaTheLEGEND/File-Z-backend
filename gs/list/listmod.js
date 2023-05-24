var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("glist").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://megathelegend.github.io/File-Z-backend/gs/list/list.html", true);
xhttp.send();
