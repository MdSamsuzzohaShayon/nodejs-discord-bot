require('dotenv').config()

// EXAMPLE CODE FROM https://discord.js.org/#/
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);
    
  if (msg.content === 'ping') {
    //   IT MEANS IF WE WRITE PING IN OUR SERVER MESSAGE THE BOT REPLIED PONG
    // AND  IF I WRITE ANY MESSAGE IT WILL LOG TO CONSOLE
    msg.reply('Pong!');
  }
});

client.login(process.env.SECRET);