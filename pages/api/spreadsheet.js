import { google } from 'googleapis';

export default async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  });

  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1PBSbn83mpjWtcqoGVFOe6iuXiL1C5cbdt6xUegUznaM',
    range: 'Form Responses 1!D:DU', //,Form Responses 1!DW1:DW,Form Responses 1!DY1:DZ,Form Responses 1!EC1:FJ
  }).then(({ data }) => {
    // TODO: if this becomes publicly available, create a filter on it to not reveal private info
    res.status(200).json(
      data.values.map(i => i)
    );
  }).catch(err => {
    res.status(500).json({
      err,
    });
  });
};