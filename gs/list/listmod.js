var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("glist").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://raw.githack.com/MegaTheLEGEND/File-Z-backend/main/gs/list/list.html", true);
xhttp.send();
