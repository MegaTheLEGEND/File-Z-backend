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
 var askBeforeUnload=localStorage.getItem("askOnCloseLS");
  window.onload = function() {
    if (askBeforeUnload) {
      showToast('Protecting you from teachers closing your tab :)', '#', 'hotpink', 4500);
    }
  }

  window.onbeforeunload=function(e){
    if(askBeforeUnload)return'Someone may be attempting to close you window. Please confirm or deny this action.';
  }

