// Read tab settings from local storage
const tabSettings = JSON.parse(localStorage.getItem('tabSettings'));

// Function to set the document icon
function setDocumentIcon(iconUrl) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'icon';
  link.href = iconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);
}

// Check if tab settings exist
if (tabSettings) {
  document.title = tabSettings.name; // Set the document title
  setDocumentIcon(tabSettings.icon); // Set the document icon
} else {
  // Set default values as the page's respective title and icon
  const pageTitle = document.title;
  const pageIcon = document.querySelector("link[rel*='icon']")?.href;

  document.title = pageTitle; // Set the document title
  setDocumentIcon(pageIcon); // Set the document icon
}
