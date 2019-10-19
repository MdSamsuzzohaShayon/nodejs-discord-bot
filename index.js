// https://www.youtube.com/watch?v=MiPpQzW_ya0



const {google} = require('googleapis');
const keys = require('./config/keys.json');
const keysOpt = require('./config/keys');
const client = new google.auth.JWT(
    // https://developers.google.com/identity/protocols/googlescopes
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);



// AUTHENTICATING TO GOOGLE SPRIDE SHEET
client.authorize((err, tokens)=>{
    if(err){
        console.log(err);    
        return;    
    }else{
        console.log("Connected");
        gsrun(client);
    }
});




/*
USEING CLIENT AUTH,
GET DATA FROM SHEET, 
MAKE A GET REQUEST
*/
gsrun = async (cl)=>{

    const gsapi = google.sheets({version: 'v4', auth: cl});

    // SETTING OPTIONS FOR GET METHOD
    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
    const opt = {
        spreadsheetId : keysOpt.spreadsheetId,
        range: 'A8:K16'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log("data properties: " + data);
    console.log("values fo data: " + data.data.values);    
}