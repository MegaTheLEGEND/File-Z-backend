// find the element
var element = document.getElementById('stuff');
element.innerHTML = '<h2> share with your friends! Share this download link. download the newest version from this folder.</h2> <br> <h4><a href="https://drive.google.com/drive/folders/1XqZfzWx4XT3Rg8mHimjabHSg_VPg5sm5?usp=share_link" >https://drive.google.com/drive/folders/1XqZfzWx4XT3Rg8mHimjabHSg_VPg5sm5?usp=share_link (FZ2.1.3.zip)</a></h4>   <footer class="w3-content w3-padding-64 w3-text-grey w3-xlarge"><a href="https://github.com/MegaTheLEGEND/File-Z-backend"> <i class="fa fa-github w3-hover-opacity">github</i><a/> </footer>';

// Add CSS styling to the element
element.style.backgroundColor = 'rgba(50, 50, 50, 0.5)';
element.style.borderRadius = '10px';
element.style.padding = '10px';
element.style.margin = '10px';
element.style.width = '75%';




// Append the element to the 'stuff' div
var container = document.getElementById('stuff');
container.appendChild(element);

