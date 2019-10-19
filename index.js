// https://www.youtube.com/watch?v=MiPpQzW_ya0



const {google} = require('googleapis');
const keys = require('./config/keys.json');
const client = new google.auth.JWT(
    // https://developers.google.com/identity/protocols/googlescopes
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
);


client.authorize((err, tokens)=>{
    if(err){
        console.log(err);    
        return;    
    }else{
        console.log("Connected");
        gsrun(client);
    }
});


gsrun = async (cl)=>{
    const gsapi = google.sheets({version: 'v4', auth: cl});
    const opt = {
        spreadsheetId : '1Ntr1iWR7mtHUnGSklkqobhMqLEwbuKQIfuvzce4D740',
        range: 'A8:K16'
    };

    let data = await gsapi.spreadsheets.values.get(opt);
    console.log(data);
    
}