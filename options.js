// Saves options to chrome.storage
const saveOptions = () => {
  const endpoint = document.getElementById('endpoint').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  chrome.storage.local.set({ 'endpoint': endpoint, 'username': username, 'password': password }, function() {
    console.log('Values saved to local storage.');
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

// Restores text box state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.local.get(
    { endpoint: '', username: '', password: '' },
    (items) => {
      document.getElementById('endpoint').value = items.endpoint;
      document.getElementById('username').value = items.username;
      document.getElementById('password').value = items.password;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);