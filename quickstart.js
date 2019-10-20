// https://www.youtube.com/watch?v=XfZcrXsUYRc&t=450s
// 10 mint remaining



const fs = require('fs');
const readline = require('readline');
const {
    google
} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './config/token.json';

// Load client secrets from a local file.
fs.readFile('./config/credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.

    // GETTING ALL FILE 
    // authorize(JSON.parse(content), listFiles);

    // GETTING SPECEFIC FILE
    // authorize(JSON.parse(content), getFile);


    // UPLOAD FILES
    authorize(JSON.parse(content), uploadFile);

});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const {
        client_secret,
        client_id,
        redirect_uris
    } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client); // GET ALL FILES
        // callback(oAuth2Client, '1YEVHGnm3_ju0m-QhIIE87IZ9GIfBIz44gce366h3Psc'); // GET SPECEFIC FILE
    });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
    const drive = google.drive({
        version: 'v3',
        auth
    });
    getlist(drive, '');    
}

function getlist(drive, pageToken) {
    drive.files.list({
        pageSize: 10,
        //q: "name='shayon223344'",
        pageToken: pageToken ? pageToken : '',
        fields: 'nextPageToken, files(id, name)',
        //fields: 'nextPageToken, files(*)', // IT WILL GIVE EVERYTHING
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        const files = res.data.files;
        if (files.length) {
            console.log('Files:');
            processList(files);
            if(res.data.nextPageToken){
                getlist(drive, res.data.nextPageToken)
            }
        } else {
            console.log('No files found.');
        }
    });
}


function processList(files){
    console.log('Processing.......');
    
    files.forEach(file => {
        console.log("File name: "+ file.name + "\n file size: "+ file.size + "\n created time: "+ file.createdTime);             
        console.log(file);        
    });
}


function getFile(auth, fileId){
    const drive = google.drive({version: 'v3', auth});
    drive.files.get({
        fileId,
        fields: '*',
    }, (err, res) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(res.data);
        
    });
}


function uploadFile(auth){
    const drive = google.drive({version: 'v3', auth});
    let fileMetadata = {"name": "test.jpg"};
    let media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream('test.jpg')
    };
    drive.files.create({
        resource: fileMetadata,
        media,
        fields: 'id',
    },
    (err, res)=>{
        if(err){
            console.log("An error to upload file:  " +err);
        }else{
            console.log("file ID: ", res.data.id);
        }
    }
    )
}