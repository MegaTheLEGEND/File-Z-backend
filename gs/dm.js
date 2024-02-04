// Array of items for the list with corresponding links
var items = [
  { text: 'Item 1', link: 'https://example.com/item1' },
  { text: 'Item 2', link: 'https://example.com/item2' },
  { text: 'Item 3', link: 'https://example.com/item3' },
  { text: 'Item 4', link: 'https://example.com/item4' }
];

// Create a new unordered list element
var ul = document.createElement('ul');

// Loop through the items and create list elements with styled links
items.forEach(function (item) {
  var li = document.createElement('li'); // Create a new list item
  var a = document.createElement('a'); // Create a new anchor element

  // Set the text content and href attribute of the anchor element
  a.textContent = item.text;
  a.href = item.link;

  // Apply styles to the anchor element
  a.style.color = 'white';
  a.style.fontSize = '1.2em'; // You can adjust the font size as needed

  // Append the anchor element to the list item
  li.appendChild(a);

  // Append the list item to the unordered list
  ul.appendChild(li);
});

// Apply styles to the unordered list
ul.style.listStyle = 'none'; // Remove default list styles
ul.style.padding = '0'; // Remove default padding

// Append the unordered list to the body of the document
document.body.appendChild(ul);
