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
  }

  // Function to reset tab settings to default
  function resetTabSettings() {
    document.getElementById('tab-name').value = '';
    document.getElementById('tab-icon').value = '';
    document.title = 'SETTINGS'; // Reset the document title
    setDocumentIcon('images/Z.jpg'); // Reset the document icon
    localStorage.removeItem('tabSettings');
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
    }
  }
