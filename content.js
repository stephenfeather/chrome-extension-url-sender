chrome.runtime.sendMessage({ action: 'getData' }, function(response) {
    var endpoint = response.endpoint;
    var username = response.username;
    var password = response.password;
    
    // Use the retrieved values as needed
    console.log('Endpoint:', endpoint);
    console.log('Username:', username);
    console.log('Password:', password);
  });