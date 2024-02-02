
 // Function to set the document icon
  function setDocumentIcon(iconUrl) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = iconUrl;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Function to save tab settings to local storage and update document title and icon
  function saveTabSettings() {
    const tabName = document.getElementById('tab-name').value;
    const tabIcon = document.getElementById('tab-icon').value;

    const tabSettings = {
      name: tabName,
      icon: tabIcon
    };

    localStorage.setItem('tabSettings', JSON.stringify(tabSettings));
    document.title = tabName; // Set the document title
    setDocumentIcon(tabIcon); // Set the document icon
    showToast('Tab name and title saved.', 's.html', 'blue', 4000); 
  }

  // Function to reset tab settings to default
  function resetTabSettings() {
    document.getElementById('tab-name').value = '';
    document.getElementById('tab-icon').value = '';
    document.title = 'SETTINGS'; // Reset the document title
    setDocumentIcon('images/Z.jpg'); // Reset the document icon
    localStorage.removeItem('tabSettings');
   	showToast('Tab name and title reset.', 's.html', 'blue', 4000);   
  }

  // Event listener for Save button
  document.getElementById('save-btn').addEventListener('click', saveTabSettings);

  // Event listener for Reset button
  document.getElementById('reset-btn').addEventListener('click', resetTabSettings);

  // Load tab settings when the page is loaded
  window.addEventListener('DOMContentLoaded', loadTabSettings);

  function loadTabSettings() {
    const tabSettings = JSON.parse(localStorage.getItem('tabSettings'));
    if (tabSettings) {
      document.getElementById('tab-name').value = tabSettings.name;
      document.getElementById('tab-icon').value = tabSettings.icon;
      document.title = tabSettings.name; // Set the document title
      setDocumentIcon(tabSettings.icon); // Set the document icon
      showToast('Tab name and title loaded.', 's.html', 'blue', 4000);   
    }
  }

//this is for changing the backend url but imma not add that rn
//event listener for new backend url button.

/*
document.getElementById('backend-set').addEventListener('click', setNewBackend);

 function setNewBackend() { 
      document.getElementById('newBackend').value = url;
      showToast('Custom Backend loaded. === '+url, 's.html', 'green', 4000);   
      localStorage.setItem('backendUrl', url)
  }

*/
// start config for "ask before closing" button

var askOnClose = localStorage.getItem("askOnCloseLS");
var askOnCloseButton = document.getElementById("askOnClosebtn");

// Update the checkbox based on the value in localStorage
askOnCloseButton.checked = askOnClose === "true"; // Convert the value to a boolean

function askFunction() {
  if (askOnCloseButton.checked) {
    showToast('Anti-close enabled', '#', 'green', 2000);
    localStorage.setItem("askOnCloseLS", "true");
  } else {
    showToast('Anti-close disabled', '#', 'green', 2000);
    localStorage.setItem("askOnCloseLS", "false");
  }
}




    // Function to save the client ID to local storage
    function saveClientID() {
        var newClientID = document.getElementById("Client-ID").value;
        if ((newClientID !== null) && (newClientID.length >= 6)){
             localStorage.setItem("customClientID", newClientID);
             showToast("Saved '" +newClientID + "'", "#", "green", "2000");
        }else{
             showToast("Invalid name '" +newClientID + "'. Name must be at least 6 characters." , "#", "red", "2000");
        }
}


    // Function to populate the input field with the stored client ID on page load
    function populateClientID() {
        var storedClientID = localStorage.getItem("customClientID");
        document.getElementById("Client-ID").value = storedClientID;
}

window.addEventListener('load', populateClientID);


function devFunction() {
  if (devmode.checked) {
    showToast('DevMode enabled', '#', 'yellow', 2000);
    localStorage.setItem("DevMode", "true");
  } else {
    showToast('DevMode disabled', '#', 'yellow', 2000);
    localStorage.setItem("DevMode", "false");
  }
}

