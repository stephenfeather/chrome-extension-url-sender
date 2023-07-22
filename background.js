
importScripts("config.js");
console.info('background.js Loaded');
console.info('Using Endpoint: ', endpoint);

chrome.contextMenus.create({
  title: "Send Image URL to API",
  contexts: ["image"],
  id: "sendMyImageUrl",
});

// Add a listener for the context menu item click event
chrome.contextMenus.onClicked.addListener(function (info) {
  console.log('Context Listener Fired');
  if ("sendMyImageUrl" === info.menuItemId) {
    sendImageUrlToApi(info);
  }
});
chrome.action.onClicked.addListener(function (tab) {
  console.log('Extension Icon Clicked.');
    sendImageUrlToApi(tab);
});

function sendImageUrlToApi(infoOrTab){
  let url;

  if (infoOrTab.srcUrl) {
    // Triggered by event with info object
    url = infoOrTab.srcUrl;
  } else if (infoOrTab.url) {
    // Triggered by event with tab object
    url = infoOrTab.url;
  } else {
    console.error('Invalid event object:', infoOrTab);
    return;
  }

  const headers = new Headers();
  headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));
  headers.append("accept", "application/json");
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'POST',
    mode: "same-origin",
    credentials: "omit",
    headers: headers,
    body: JSON.stringify({ url })
  };

  fetch(endpoint, requestOptions) 
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.info(data);
    })
    .catch(error => console.log('error', error));

};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getData') {
    chrome.storage.local.get(['endpoint', 'username', 'password'], function(result) {
      var data = {
        endpoint: result.endpoint,
        username: result.username,
        password: result.password
      };
      sendResponse(data);
    });
    
    return true; // Indicates that sendResponse will be called asynchronously
  }
});
