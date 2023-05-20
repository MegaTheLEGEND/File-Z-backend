fetch('https://raw.githack.com/MegaTheLEGEND/File-Z-backend/main/tools/list.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Unable to retrieve data');
    }
    return response.json();
  })
  .then(data => {
    const linkList = document.getElementById('linkList');
    const listTitle = document.querySelector('.list-title');
    listTitle.textContent = data.listTitle;

    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', searchLinks);

    const linkItems = data.urls.map(url => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.textContent = url;

      listItem.appendChild(anchor);
      return listItem;
    });

    linkItems.forEach(item => {
      linkList.appendChild(item);
    });

    function searchLinks() {
      const query = searchInput.value.toLowerCase();
      linkItems.forEach(item => {
        const linkText = item.querySelector('a').textContent.toLowerCase();
        if (linkText.includes(query)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
  })
  .catch(error => {
    console.log('Error fetching link list:', error);
    const linkList = document.getElementById('linkList');
    linkList.textContent = 'Are you offline? We could not retrieve the data.';
  });
