// ALL MODULES
const {google } = require('googleapis');
// https://github.com/googleapis/google-api-nodejs-client#media-uploads
const drive  = google.drive('v3');
const keys = require('./config/private_key.json');
const path = require('path');
const fs = require('fs');


// MAKE A REQUEST TO RETRIVE AN AUTHORIZATION ALLOWING TO WORK WITH GOOGLE DRIVE
// RETRIVE JWT
// https://github.com/googleapis/google-auth-library-nodejs
let jwToken = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    // https://developers.google.com/identity/protocols/googlescopes#drivev3
    ["https://www.googleapis.com/auth/drive"],
    null
);


jwToken.authorize((authErr) =>{
    if(authErr){
        console.log("Error: "+authErr); 
        return ;        
    }else{
        console.log("Authentication accorded");        
    }
});


// MAKE REQUEST TO GOOGLE DRIVE WEB SERVICE
// https://developers.google.com/drive/api/v3/reference/files/list?apix=true
