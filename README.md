## causa existendi

I work on a number of Wordpress sites, and often want to be able to send an image directly to the server for import into the media library.  This extension does just that.  Sends the url of the image to your endpoint, and in our case the server downloads it, where you can do what you want with the url.

## Installation

- Copy `config.js-TEMPLATE` to `config.js`.  
- Edit it as needed to match your setup.
- Install the extension into your chromium based brower.

## Use

- Right click on the icon for options.  This takes endpoint, login, password and stores them in localStorage.  Currently not pulled back into the extension to be used.

- Right click on an image.  You should have a context option to send the url.