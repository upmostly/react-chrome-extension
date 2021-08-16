/* global chrome */
if(window.location.href.startsWith('https://slate.host')) {

  if(window.location.href.includes('extension=true')) {

    document.addEventListener('keydown', function(e) {
      console.log('e is slate only', e)
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      console.log('id:', id)
      chrome.runtime.sendMessage({ 
        type: 'GO_BACK',
        id: id 
      });
    });

  }
  //TODO: Have the extension change the 'download chrome extension' button
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  console.log('something was found in content.js', request)

  if(request.run === "LOAD_APP") {
    main();
    //window.postMessage({ type: "UPLOAD_IMAGE" }, "*");
    return true;
  }

  if(request.run === "OPEN_LOADING") {
    console.log('ready to opent the loader')
    window.postMessage({ type: "OPEN_LOADING" }, "*");
    return true;
  }

  if(request.run === "UPLOAD_DONE") {
    console.log('we recieved a messge that the upload is complete')
    window.postMessage({ type: "UPLOAD_DONE", data: request.data }, "*");
    return true;
  }

});

function main() {
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        console.log(html)
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        console.log(styleStashHTML)
        // eslint-disable-next-line no-undef
        $(styleStashHTML).prependTo('body');
      })
      .catch((error) => {
        console.warn(error);
      });
  }  

}

async function saveLink(props) {
  const response = await fetch("https://slate-dev.onrender.com/api/v2/create-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic SLA4220b548-56d0-484a-84ab-c8726676115dTE", // API key
    },
    body: JSON.stringify({
      data: {
        url: props.url,
      },
    }),
  });
  console.log('DONE UPLOAD')

  return response;
}

window.addEventListener("message", function(event) {
  console.log('yes an event was called', event);

  if(event.data.type === "OPEN_SEARCH") {
    event.preventDefault();
    chrome.runtime.sendMessage({ type: 'OPEN_SEARCH', query: event.data.query });
  }

  if(event.data.type === "SAVE_LINK") {
    event.preventDefault();
    console.log('sending link message from content script', event.data)
    chrome.runtime.sendMessage({ type: "SAVE_LINK", url: event.data.url });
  }

  if(event.data.type === "UPLOAD_START") {
    window.postMessage({ type: "UPLOAD_START" }, "*");
  }


  if (event.source !== window) return;
  onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_EXTENSION_ID")) {
    window.postMessage({ type: "EXTENSION_ID_RESULT", extensionId: chrome.runtime.id }, "*");
  }
  
  if(event.data.type && (event.data.type === "SAVE_LINK")) {
    //let save = await saveLink({ url: event.data.url });
    //console.log('save 567: ', save)
    console.log('we are in content script right now');
    chrome.runtime.sendMessage({ type: 'SAVE_LINK' });
  }
}


