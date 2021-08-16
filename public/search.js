function start() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = parseInt(urlParams.get('query'));
  console.log('query in search.js', query)
  //document.getElementById("search-input").value = query;
}

function getData() {
  console.log('this worked at least')
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('query');
  const id = urlParams.get('id');
}

document.addEventListener('keydown', function(e) {
  if(window.location.href.startsWith('https://', 'http://')){
    console.log('not running these')
  } else {
    if(e.key === "Escape") {
      console.log('taking you back to your other page')
      const urlParams = new URLSearchParams(window.location.search);
      const id = parseInt(urlParams.get('id'));
      chrome.tabs.update(id, { highlighted: true });
    }
    console.log('keypress:', e.key)

    if(e.key === "ArrowDown") {
      console.log('going down')
    }

    if(e.key === "ArrowUp") {
      console.log('going up')
    }

    if(e.key === "Enter") {
      console.log('going to this page')
    }
  }
});

start();
getData();