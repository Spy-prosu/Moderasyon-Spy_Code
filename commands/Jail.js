const Discord = require("discord.js"),
client = new Discord.Client();
const db = require("quick.db")//Spy Code
const moment = require("moment")//Spy Code
const conf = require('../config.js');
const a = require('../config.js');

module.exports.run = async (client, message, args) => {

let reawEmbed = new Discord.MessageEmbed().setColor("f1f1f1").setFooter("Spy bebeğim çok mükemmelsin :)").setTimestamp().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
let embed = reawEmbed;
  
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
let sebep = args.splice(1).join(" ") || "Sebep belirtilmedi!";

if (!message.member.roles.cache.has(a.jailSorumlusu) && !message.member.hasPermission("ADMINISTRATOR")) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Bu komutu kullanmak için gerekli yetkilere sahip değilsiniz!`))
message.react(a.no);
return;
};

if (!member) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Geçerli bir üye belirtmelisiniz!`))
message.react(a.no);  
return;
};

if (member.id === message.author.id) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Kendinize ceza veremezsiniz!`))
message.react(a.no); //Spy Code 
return;
};

if (message.member.roles.highest.position <= member.roles.highest.position) {
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.no)} Belirttiğiniz üye sizden üst/eşit pozisyonda!`))
message.react(a.no);  
return;
}

member.roles.set([a.jailRolu]).catch();
message.channel.send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle cezalıya atıldı!`));
message.guild.channels.cache.get(a.jailLog).send(reawEmbed.setDescription(`${client.emojis.cache.get(a.yes)} ${member} kullanıcısı ${message.author} tarafından "${sebep}" sebebiyle cezalıya atıldı!`));
db.set(`jailli.${member.id}`, "jailli");
db.add(`jailSayi.${member.id}`, 1);
db.add(`jailSayiYT.${message.author.id}`, 1)
db.push(`sicil.${member.id}`, {Ceza: "jail", Yetkili: message.author.id, Sebep: sebep})
db.add(`cezaPuani.${member.id}`, 15)
};

exports.config = {
  name: "jail",
  guildOnly: true,
  aliases: ["cezalı"],
};
