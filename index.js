require('dotenv').config()
// EXAMPLE CODE FROM https://discord.js.org/#/
const Discord = require('discord.js');
const parseArgs = require('minimist');
const client = new Discord.Client();


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);

    // EVERYTHING WILL BE SPLIT IN ARRAY
    // https://www.youtube.com/watch?v=qXzJNEVoQiY&list=PLbyS_i8haRArHUCyChjNaMg1BC3MHdPp7
    const msgarr = msg.content.split(' ');
    console.log(msgarr);

    // IT CONTAIN INSIDE A OBJECT containing array
    let command = parseArgs(msgarr);
    console.log(command);

    let dltUscoreCommand = command._;
    let opts = parseArgs(msgarr);
    delete opts._
    console.log("Delete underscore in the array  : "+ dltUscoreCommand);
    console.log("Options  : " + opts);
    
    
    
    
    
  /*
  if (msg.content === 'ping') {
    //   IT MEANS IF WE WRITE PING IN OUR SERVER MESSAGE THE BOT REPLIED PONG
    // AND  IF I WRITE ANY MESSAGE IT WILL LOG TO CONSOLE
    msg.reply('Pong!');
  }*/

  switch(dltUscoreCommand[0]){
      case 'Hi':
          let sayHi =()=>{
              msg.reply('Hello!');
          }
        //   IT THERE IS A DELAY OPTION IT WILL WAIT FOR DELAY
          if('delay' in opts){
              setTimeout(sayHi, opts.delay);
              console.log("delayed");
              
          }else{
              sayHi()
          }
          break;
  }
});

client.login(process.env.SECRET);