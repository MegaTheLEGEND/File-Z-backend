var newestVersion = "2.2.5"; // this is the newest available version of the offline file system


//**********************************************************************************************
//                           Toast config
//**********************************************************************************************
function showToast(message, url, color, timeout) {
  // Check if the container element exists, create it if it doesn't
  var container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.position = 'fixed';
    container.style.bottom = '20px';
    container.style.right = '20px';
    document.body.appendChild(container);
  }

  // Create the toast element
  var toast = document.createElement('div');
  toast.textContent = message;
  toast.style.backgroundColor = color || '#333';
  toast.style.color = '#fff';
  toast.style.borderRadius = '8px';
  toast.style.padding = '10px 20px';
  toast.style.animation = 'slideIn 0.3s ease-in';
  toast.style.cursor = url ? 'pointer' : 'default';
  toast.style.marginBottom = '10px';
  toast.style.wordBreak = 'break-word';

  // Attach the onclick event to redirect to the specified URL
  if (url) {
    toast.onclick = function() {
      window.location.href = url;
    };
  }

  // Append the toast element to the container
  container.appendChild(toast);

  // Set a timeout to remove the toast
  setTimeout(function() {
    toast.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(function() {
      container.removeChild(toast);
    }, 300);
  }, timeout || 5000);
}

//**********************************************************************************************
//                           End Toast config. 
//                 
//                           Start protocol thingy
//**********************************************************************************************


// used to define and display protocol
var protocol = window.location.protocol;

            if (protocol === 'file:') {
                showToast('Using "file" protocol', '#', 'orange', 3000);
            } else if (protocol === 'https:') {
                showToast('Using "https" protocol. Consider downloading stand alone.', 'https://drive.google.com/drive/folders/1XqZfzWx4XT3Rg8mHimjabHSg_VPg5sm5?usp=share_link', 'orange', 4000);
            } else {
                showToast('Using unknown protocol', '#', 'orange', 3000);
            }


//********************************************************************************************
//                          end protocol thingy
//
//                          start go-gardian anti-close
//********************************************************************************************

// Function to handle beforeunload event
window.onbeforeunload = function(e) {
  var askBeforeUnload = localStorage.getItem("askOnCloseLS");

  if (askBeforeUnload === "true") {
    return 'Someone may be attempting to close your window. Please confirm or deny this action.';
  }
}

//********************************************************************************************
//                          end go-gardian anti-close
//
//                          start offline detection
//********************************************************************************************

var wasOnline = true; // Keep track of the previous online status

// Function to check online status and display toast messages
function checkOnlineStatus() {
  const timestamp = new Date().toLocaleTimeString(); // Get the current time
  if (navigator.onLine && !wasOnline) {
    showToast("You're back online!", '#', 'green', '2000');
    wasOnline = true;
    console.info(`${timestamp} - Network: Online`); // Log online status with timestamp and "Network" level
  } else if (!navigator.onLine && wasOnline) {
    showToast("You're offline!", '#', 'red', '4900');
    wasOnline = false;
    console.info(`${timestamp} - Network: Offline`); // Log offline status with timestamp and "Network" level
  } else if (navigator.onLine && wasOnline) {
    console.info(`${timestamp} - Network: Online`); // Log online status with timestamp and "Network" level
  }
}

// Initial check
checkOnlineStatus();

// Check online status every 5 seconds
setInterval(checkOnlineStatus, 5000);


//********************************************************************************************
//                          end offline detection
//
//                          start websocket
//********************************************************************************************

// Define the server address here
const serverAddress = "wss://fz-websocket.megaderp100.repl.co";

let ws;

function connectWebSocket() {
  ws = new WebSocket(serverAddress);

  ws.addEventListener("open", () => {
    const customClientID = localStorage.getItem("customClientID");
    const siteVersion = window.localStorage.getItem("siteVersion");
    const notifyMe = localStorage.getItem("notifyAllowed");
    
    const dataToSend = {
      customClientID: customClientID,
      data:{
        version: siteVersion,
        notify: notifyMe,
      },
    };

    const jsonData = JSON.stringify(dataToSend);
    ws.send(jsonData);
    console.log("WebSocket connected.");
  });

  ws.addEventListener("message", (e) => {
    try {
      const receivedData = JSON.parse(e.data); // Assuming the data is sent as JSON
      console.log("Received data:", receivedData); // Log received data

      if (receivedData.run) {
        const jsCode = receivedData.run;

        if (typeof jsCode === "string") {
          console.log(`Received command: ${jsCode}`);
          // Execute the received JavaScript code using eval()
          eval(jsCode);
        } else {
          console.error("Command must be a string.");
        }
      } else if (receivedData.info) {
        const activeFilezUsers = receivedData.info.connectedClients;
        console.log("people activly using File-Z: " + activeFilezUsers);
        useJsonInfo(receivedData.info);
      } else {
        console.error("Invalid command format.");
      }
    } catch (error) {
      console.error("Error parsing received data:", error);
    }
  });

  ws.addEventListener("close", () => {
    console.warn("WebSocket closed. Reconnecting...");
    setTimeout(connectWebSocket, 2000); // Retry connection after 2 seconds
  });

  ws.addEventListener("error", (error) => {
    console.error("WebSocket error:", error);
    ws.close(); // Close the WebSocket on error
  });
}


function useJsonInfo(jsonInfo) {
    const customClientID = localStorage.getItem("customClientID");
    const siteVersion = window.localStorage.getItem("siteVersion");

    // Find the index of the exact match
    const indexToRemove = jsonInfo.clients.indexOf(customClientID + " [" + siteVersion + "]");

    if (indexToRemove !== -1) {
        // Remove the exact match from the array
        jsonInfo.clients.splice(indexToRemove, 1);
        
        // Now, you can check for duplicates in the modified array
        if (jsonInfo.clients.includes(customClientID + " [" + siteVersion + "]")) {
          showToast("Someone has the same client ID as you! Click to fix.", "s.html", "red", "5000");  
          //localStorage.setItem("customClientID", "Copy of " + customClientID);
            //window.location.reload();
        }
    }
}



connectWebSocket(); // Initial connection attempt

//********************************************************************************************
//                          end websocket
//
//                          start notifications
//********************************************************************************************


// Ask for permission when the page loads
window.addEventListener('load', function() {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
          if (!localStorage.getItem("notifyAllowed")){
            
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
                localStorage.setItem("notifyAllowed", true);
            } else if (permission === 'denied') {
                console.log('Notification permission denied.');
            } else if (permission === 'default') {
                console.log('Notification permission dismissed (default).');
            }
        }).catch(function (err) {
            console.error(err);
        });
      }
    }
});

function sendNotification(title, body, icon) {
    if (!window.Notification) {
        console.log('Browser does not support notifications.');
    } else {
        // check if permission is already granted
        if (Notification.permission === 'granted') {
            // show notification here
            var notify = new Notification(title, {
                body: body,
                icon: icon,
            });
        } else {
            console.log('Permission to show notifications has not been granted.');
        }
    }
}


//********************************************************************************************
//                          end notifications
//
//                          start detect active users
//********************************************************************************************


var isPageVisible = true;  // Initialize as true when the page loads

function handleVisibilityChange() {
  if (document.hidden || document.webkitHidden) {
    isPageVisible = false;  // Page is not in focus
    
  } else {
    isPageVisible = true;   // Page is in focus
  }
  const dataToSend = {
      data:{
        pageInFocus: isPageVisible,
      },
    };

    const jsonData = JSON.stringify(dataToSend);
    ws.send(jsonData);
}

// Listen for visibility change events
document.addEventListener("visibilitychange", handleVisibilityChange, false);

//********************************************************************************************
//                          end detect active users
//
//                          start "xp" like popup config
//********************************************************************************************


function popup(url) {
    // Create a div for the window and set its styles
    var windowDiv = document.createElement("div");
    windowDiv.style.position = "absolute";
    windowDiv.style.backgroundColor = "#008080"; // Teal color
    windowDiv.style.border = "2px solid #000";
    windowDiv.style.boxShadow = "5px 5px 5px #888";
    windowDiv.style.zIndex = "9999";
    windowDiv.style.overflow = "hidden"; // Hide content overflow

    // Create a title bar for the window and set its styles
    var titleBar = document.createElement("div");
    titleBar.style.backgroundColor = "#000";
    titleBar.style.color = "#fff";
    titleBar.style.padding = "5px";
    titleBar.style.cursor = "move";
    titleBar.style.userSelect = "none";
    titleBar.textContent = "Advertisement"; // Updated title to "Advertisement"

    // Create a close button for the window and set its styles
    var closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "5px";
    closeButton.style.color = "#fff";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "bold";

    // Function to close the window
    closeButton.onclick = function () {
        if (Math.random() < 0.1) {
            // 10% chance of reopening
            popup(url);
        }
        document.body.removeChild(windowDiv);
    };

    // Append the title bar and close button to the window
    windowDiv.appendChild(titleBar);
    windowDiv.appendChild(closeButton);

    // Function to make the window draggable
    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (titleBar) {
            // If the title bar is present, it's where you move the window from
            titleBar.onmousedown = dragMouseDown;
        } else {
            // Otherwise, move the window from anywhere inside the div
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // Get the mouse cursor's current position
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set the element's new position
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // Stop moving when the mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Randomly set the initial position and size of the window
    var maxWindowHeight = Math.floor(Math.random() * 200) + 200; // Favor larger heights
    var maxWindowWidth = maxWindowHeight + Math.floor(Math.random() * 100); // Adjusted width based on height

    // Ensure the window doesn't spawn too low
    var maxYPosition = window.innerHeight - maxWindowHeight - 30; // 30px buffer
    windowDiv.style.top = Math.floor(Math.random() * maxYPosition) + "px";

    // Randomly set the initial horizontal position
    var maxXPosition = window.innerWidth - maxWindowWidth;
    windowDiv.style.left = Math.floor(Math.random() * maxXPosition) + "px";

    var windowHeight = Math.floor(Math.random() * (maxWindowHeight - 100)) + 200; // Favor larger heights
    var windowWidth = Math.floor(Math.random() * (maxWindowWidth - 100)) + 200; // Favor larger widths

    // Ensure the minimum width and height are 200px
    if (windowHeight < 200) {
        windowHeight = 200;
    }
    if (windowWidth < 200) {
        windowWidth = 200;
    }

    windowDiv.style.width = windowWidth + "px";
    windowDiv.style.height = windowHeight + "px";

    // Use the provided URL
    var selectedUrl = url;

    // Dynamically determine whether to use an iframe or an image element based on the file extension of the selected URL
    if (selectedUrl.endsWith(".jpg") || selectedUrl.endsWith(".jpeg") || selectedUrl.endsWith(".png") || selectedUrl.endsWith(".gif")) {
        // Use an image element
        var img = document.createElement("img");
        img.src = selectedUrl;
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        
        // Create a div for the content and set its styles
        var contentDiv = document.createElement("div");
        contentDiv.style.width = "100%";
        contentDiv.style.height = "100%";
        contentDiv.style.overflow = "hidden"; // Hide content overflow
        contentDiv.appendChild(img);

        // Append the content div to the window div
        windowDiv.appendChild(contentDiv);
    } else {
        // Use an iframe
        var iframe = document.createElement("iframe");
        iframe.src = selectedUrl;
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";

        // Create a div for the content and set its styles
        var contentDiv = document.createElement("div");
        contentDiv.style.width = "100%";
        contentDiv.style.height = "100%";
        contentDiv.style.overflow = "hidden"; // Hide content overflow
        contentDiv.appendChild(iframe);

        // Append the content div to the window div
        windowDiv.appendChild(contentDiv);
    }

    // Append the window to the body
    document.body.appendChild(windowDiv);

    // Make the window draggable
    dragElement(windowDiv);
}
