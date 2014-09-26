var Browser = require('zombie');
var browser = new Browser({ site: 'http://localhost:3000' });

exports.browser = browser;
