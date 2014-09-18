
// settings for local CouchDB
exports.db = 'http://127.0.0.1:5984/';

// settings for CouchDB in cloud (i.e. Cloudant)
// exports.db = 'https://<user>:<password>@<username>.cloudant.com/';

//change them to something similar like
exports.emailType = 'SMTP';
exports.emailSettings = {
  service: 'Gmail',
  auth: {
    user: 'paigetech@gmail.com',
    pass: 'lbbikpivqozorgcz'
  }
};
