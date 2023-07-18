var newestVersion = "2.2.1"; // this is the newest available version of the offline file system


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

  // Append the toast element to the container
  container.appendChild(toast);

  // Set a timeout to remove the toast
  setTimeout(function() {
    toast.style.animation = 'slideOut 0.75s ease-in';
    setTimeout(function() {
      container.removeChild(toast);
    }, 300);
  }, timeout || 5000);
}

//**********************************************************************************************
//                           End Toast config
//**********************************************************************************************
