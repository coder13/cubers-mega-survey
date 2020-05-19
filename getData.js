const fs = require('fs');
const {google} = require('googleapis');
const creds = require('./credentials.json');
const token = require('./token.json');
const spreadsheetId = require('./config');

module.exports.getData = async (range) => {
  const { client_secret, client_id, redirect_uris } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  const auth = oAuth2Client.setCredentials(token);

  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId:,
    range
  });
}
