/* global chrome */
const handleSaveLink = async (props) => {
  console.log('data:', props.url)
  const response = await fetch("https://slate-dev.onrender.com/api/v2/create-link", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "SLA2a459dde-9433-43a5-966c-cf5603db59f7TE", // API key
    },
    body: JSON.stringify({
      data: {
        url: props.url
      },
    }),
  });

  console.log('done', response);
  chrome.tabs.sendMessage(parseInt(props.tab), { run: 'UPLOAD_DONE', data: response });
  return response;
}

const handleSaveHistory = async (props) => {
  console.log('saving history')
  return true;
}

const handleSaveBookmark = async (props) => {
  console.log('saving bookmark');
  return true;
}

const handleSaveDownload = async (props) => {
  console.log('saving bookmark');
  return true;
}

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { run: 'LOAD_APP' });
});

chrome.commands.onCommand.addListener((command, tab) => {
  console.log(`Command: ${command}`);
  console.log(`Command: ${tab}`);
  if(command == 'open-app') {
    chrome.tabs.sendMessage(tab.id, { run: 'LOAD_APP' });
  }
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  console.log("there was a message", request);

  console.log("SENDER", sender);

  let filter = null;

  if(request.type === "OPEN_SEARCH") {
    if(request.filter) {

    }
    /*
    chrome.tabs.create({ url: 
      `search.html?query=${request.query}&filter=${request.filter}&id=${sender.tab.id}`
    });
    */
    //Must pass &extension=true for back button function
    chrome.tabs.create({ url: 
      `https://slate.host/?query=${request.query}&filter=${request.filter}&extension=true&id=${sender.tab.id}`
    });
  }

  if(request.type === "GO_BACK") {
    let openId = parseInt(request.id)
    let closeId = parseInt(sender.tab.id)
    chrome.tabs.update(openId, { highlighted: true });
    chrome.tabs.remove(closeId);
  }

  if(request.type === "SAVE_LINK") {
    //console.log('sender: ', sender)
    chrome.tabs.sendMessage(parseInt(sender.tab.id), { run: "OPEN_LOADING" });
    await handleSaveLink({ url: sender.url, tab: sender.tab.id })
  }  
  
});

/*
chrome.runtime.onMessage.addListener(function(request, sender) {
    console.log('something was recieved here')
    if (request.type == "SAVE_LINK") {
      console.log('we are in the background now')
    }
});
*/

const checkMatch = (list, url) => {
  const matches = RegExp(list.join('|')).exec(url);
  return matches;
}

chrome.tabs.onUpdated.addListener(async function(tabId , info , tab) {
  if (info.status == "complete") {

    const blacklist = [
      'chrome://',
      'localhost:'
    ];

    const domains = [
      "slate.host",
      "slate-dev.onrender.com"
    ];

    const isBlacklisted = checkMatch(blacklist, tab.url);
    const isSlate = checkMatch(domains, tab.url);

    if (isBlacklisted) {
      console.log('this is a blacklist');
      return;
    }
    /*
    if (isSlate) {
      
      chrome.storage.local.set({ lastUpdated: Date.now() }, function(data) {
        console.log('Value is set to ' + data);
      });
      

      chrome.storage.local.get( ['lastUpdated'], function(data) {
        console.log('last updated on: ' + data.lastUpdated);

        chrome.history.search({ text: "", maxResults: 0, startTime: data.lastUpdated }, async function(history) {
          console.log('history: ', history);
          let uploadHistory = await handleSaveHistory({ history: history });

          if (uploadHistory) {
            chrome.storage.sync.set({ lastUpdated: Date.now() }, function() {
              console.log('done updating')
            });
          }

        });
      });
    }
    */
  }
});

saveImage = async (info, tabs) => {
  chrome.tabs.sendMessage(tabs.id, { run: 'LOAD_APP', type: 'uploading' });
  let imageUrl = info.srcUrl;
  let filename = imageUrl.replace(/^.*[\\\/]/, '')

  console.log('starting uploading', imageUrl)
  const url = 'https://uploads.slate.host/api/v2/public/upload-by-url';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': "application/json",
      Authorization: 'SLA2a459dde-9433-43a5-966c-cf5603db59f7TE',
    },
    body: JSON.stringify({
      data: {
        url: imageUrl,
        filename: filename,
      },
    }),
  });

  const json = await response.json();
  console.log('done uploading', json)
}

chrome.contextMenus.create({
  title: "Slate",
  id: "parent",
  contexts: ["all"],
});

chrome.contextMenus.create({
  title: "Save to collection",
  contexts: ["image"],
  parentId: "parent",
  id: "image_slate",
  onclick: saveImage,
});

chrome.bookmarks.onCreated.addListener(async function(id, bookmark) {
  console.log('bookmark created!')
  console.log('bookmark data', bookmark)
  //let saveBookmark = await handleSaveBookmark({ bookmark: bookmark })
});

chrome.downloads.onCreated.addListener(async function(download) {
  console.log('download created!')
  console.log('download data', download)
  //let saveBookmark = await handleSaveBookmark({ bookmark: bookmark })
});
