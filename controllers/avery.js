isAuthed()


const prefills = document.getElementById("prefills")

function addPrefills(){

prefills.innerHTML = "    
    
    <option value="alert('')">Alert</option>
    <option value='showToast("", "#", "blue", "3000")'>Toast</option>
    <option value="//localStorage.setItem('customClientID', '')">Change ID</option>
    <option value="window.location.replace('https://')">Replace URL</option>
    <option value="window.location.replace('css/other-assets/index.html')">Rick Roll</option>
    <option value="window.location.reload()">Reload</option>
    <option value='sendNotification("Hello", "Body of message", "") //most browser require a confirmation'>Notification</option>
    <option value="open(location, '_self').close() //this wont work on most browsers">close window</option>
    <option value="window.open('https://') //most browser require a confirmation">open window</option>
    <option value="javascript:(function () {var script=document.createElement('script');script.src='https://x-ray-goggles.mouse.org/webxray.js';script.className='webxray';script.setAttribute('data-lang','en-US');script.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');document.body.appendChild(script);}())">X-ray</option>
    <option value="while(1)location.reload(1)">freezer of the browser</option>    
  

"

}

addPrefills()
