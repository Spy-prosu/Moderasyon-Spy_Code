const Discord = require("discord.js");//Spy Code
const config = require('../config.js');//Spy Code
module.exports = async client => {
  client.user.setPresence({ activity: { type: "WATCHING", name: `Spy tarafından geliştirildi.`}, status: 'online' })
};

/*
Status kısmı için,

idle: Boşta,
dnd: Rahatsız Etmeyin,
online: Çevrimiçi
*/
//Spy Code