const { google } = require('googleapis');
const fs = require('fs');

const CLIENTID = '1037106013632-mj3nsi4uiqjdl9broh2d5qmoueh457j6.apps.googleusercontent.com';
const CLIENTSECRET = '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';
const REDIRECTURL = 'https://developers.google.com/oauthplayground';

const REFRESHTOKEN = '1//04Sb6tCYMI1DFCgYIARAAGAQSNwF-L9IrHjZMypTxoRSKZOSrwncYM_qjKqKzSLcbWOiGTm8SHs91z1v9176caxBdLc16GmdD0J8';


const oauth2Client = new google.auth.OAuth2(
    CLIENTID,
    CLIENTSECRET,
    REDIRECTURL
);

oauth2Client.setCredentials({ refresh_token: REFRESHTOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
});

const filePath = './file.txt';

async function uploadFile() {
    try {
        const response = await drive.files.create({
            requestBody: {
                name: 'test.txt',
                mimeType: 'text/plain'
            },
            media: {
                mimeType: 'text/plain',
                body: fs.createReadStream(filePath)
            }
        });

        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

uploadFile();