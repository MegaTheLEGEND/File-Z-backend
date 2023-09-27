
let allClientsAllowed = false;



function addPrefills() {
  const prefills = document.getElementById("Prefills");
  const header = document.getElementById("header");
//add the option list stuff
  prefills.innerHTML = `
    <option value="alert('')">Alert</option>
    <option value='showToast("", "#", "blue", "3000")'>Toast</option>
    <option value="//localStorage.setItem('customClientID', '')">Change ID</option>
    <option value="window.location.replace('https://')">Replace URL</option>
    <option value="window.location.replace('css/other-assets/index.html')">Rick Roll</option>
    <option value="window.location.reload()">Reload</option>
    <option value='sendNotification("Hello", "Body of message", "")'>Notification</option>
    <option value="open(location, '_self').close()">Close window</option>
    <option value="window.open('https://')">Open window</option>
    <option value="javascript:(function () {var script=document.createElement('script');script.src='https://x-ray-goggles.mouse.org/webxray.js';script.className='webxray';script.setAttribute('data-lang','en-US');script.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');document.body.appendChild(script);}())">X-ray</option>
    <option value="while(1) location.reload(1)">Freeze the browser</option>
  `;

  header.innerHTML = " Avery's File-Z Remote Controller";
}

function allowAllClients() {
  const clientSelector = document.getElementById("clientSelector");
//add the option list stuff
  clientSelector.innerHTML = `
    <option value="all">All Clients</option>
  `;
const allClientsAllowed = true;
}

/*
function allowRunOfTheCode(){
                ws.addEventListener("message", (e) => {
                try {
                  const receivedData = JSON.parse(e.data); // Parse the received JSON data
                 

                  if (receivedData.run && allowRunOfCode == true) {
                  const jsCode = receivedData.run;

                  if (typeof jsCode === "string") {
                      console.log(`Received command: ${jsCode}`);
                        // Execute the received JavaScript code using eval()
                        eval(jsCode);
                    } 
                  }
                } catch (error) {
                  console.error("Error parsing received JSON data:", error);
                }
              });
                console.log('code that you recieve will now be ran :|');
  
}*/

//permissions
const allowRunOfTheCode = true;
//allowAllClients();
addPrefills();
isAuthed();


