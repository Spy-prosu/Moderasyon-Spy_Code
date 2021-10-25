const Discord = require("discord.js")  //Spy Code  
const client = new Discord.Client();   //Spy Code   
const config = require("./config.js") //Spy Code
const a = require("./config.js") //Spy Code
const fs = require("fs");//Spy Code
const db = require("quick.db"); //Spy Code               
require('./util/Loader.js')(client);  //Spy Code  

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {                    
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`); //Spy Code
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name);//Spy Code
    });
  });
})

client.login(config.token);//Spy Code

client.on("guildMemberAdd", member => {
if (db.fetch(`jailli.${member.id}`)) {
member.guild.channels.cache.get(config.jailLog).send(new Discord.MessageEmbed().setFooter("Reawen sana serendiada laf ediyolarmış :(").setColor("010000").setTimestamp().setDescription(`
${client.emojis.cache.get(config.no)} ${member} ( \`${member.id}\` ) isimli kullanıcı jailli iken çıkıp girdiği için tekrar jaillendi!
`))
member.roles.set([a.jailRolu]);//Spy Code
}
})

client.on("guildMemberAdd", member => {
  if (db.fetch(`muteli.${member.id}`)) {
  member.guild.channels.cache.get(config.muteLog).send(new Discord.MessageEmbed().setFooter("Reawen sana serendiada laf ediyolarmış :(").setColor("010000").setTimestamp().setDescription(`
  ${client.emojis.cache.get(config.no)} ${member} ( \`${member.id}\` ) isimli kullanıcı muteli iken çıkıp girdiği için tekrar mutelendi!
  `))
  member.roles.add(a.muteRolu);//Spy Code
  }
  })
