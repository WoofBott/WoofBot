const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("hello World")
})

app.listen(3000, () => {
  console.log("Project is ready!")
})

let Discord = require("discord.js")
let client = new Discord.Client()

client.on("ready", () => {
  client.setMaxListeners(0)
  client.user.setUsername("Woof")
  client.user.setPresence({ activity: { name: "w?help"}, status: "online" })
});
client.snipe = new Discord.Collection()
client.on("messageDelete", deletedMsg => {
  client.snipe.set(deletedMsg.channel.id, deletedMsg)
})

client.on("message", message => {
  const args = message.content.split(" ").slice(1)
  if (message.content === "w?ping") {
 let embed = new Discord.MessageEmbed()
 .setTitle("🏓 Pong!")
 .setDescription(`**${client.ws.ping}ms** Latency!`)
 .setColor("RANDOM")
 .setFooter(
 `Requested by ${message.author.username}`,
 message.author.displayAvatarURL()
 );
 message.channel.send(embed);
 }
 //Nameme Command//
  if(message.content === "w?nameme") {
    let nicknames = ["Stupid", "Asshole", "Nobody", "Beatiful", "Wonderful"]
    message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]} is your new name!`)
  }
  //Kill Command//
  if(message.content.startsWith("w?kill")) {
 let victim = message.mentions.users.first()
 if(!victim) message.reply("Mention someone to Kill")
 else{
let replies = [ (`${victim} has been shot`), (`${victim} has been stabbed`), (`${victim} has been drowned`), 
 (`${victim} has been electrified`), (`A goose honked at ${victim} to death`), 
 (`Some psychopath zapped ${victim} with his laser eyes`), 
 (`${victim} ate a poisonous potato`), (`${victim} died from slowmode being to long`), 
 (`${victim} was run over by car`), (`${victim} was pushed in lava`), (`${victim} was banned by the server owner`), 
 (`${victim} was found dead in a dumpster`), 
 (`Someone named Joe was found chewing on ${victim}'s leg`), (`${victim} got drunk and fell in the water`), 
 (`${victim} made a deal with the devil`), (`${victim} was hacked by an 
Oreo`), (`An alien named MEE6 abducted ${victim} in their sleep`),]

 message.channel.send(`${replies[Math.floor(Math.random() * replies.length)]}`) 
 }
 }
 //Kick Command//
  if(message.content.startsWith("w?kick")) {
    if(message.member.hasPermission("KICK_MEMBERS")) {
      let member = message.mentions.members.first()
      if(!member) message.channel.send("Please mention someone")
      else {
        member.kick().then(mem => {
          message.channel.send(`Kicked ${mem.user.username}`)
        })
      }
    } else {
      message.reply("You don't have permission to do that")
    }
  }
  //Ban Command//
   if(message.content.startsWith("w?ban")) {
    if(message.member.hasPermission("BAN_MEMBERS")) {
      let member = message.mentions.members.first()
      if(!member) message.channel.send("Please mention someone")
      else {
        member.ban().then(mem => {
          message.channel.send(`Banned ${mem.user.username}`)
        })
      }
    } else {
      message.reply("You don't have permission to do that")
    }
  }
  //Snipe Command//
  if(message.content.startsWith("w?snipe")) {
    let channel = message.mentions.channels.first() || message.channel
    let msg = client.snipe.get(channel.id)
    if(!msg) return message.channel.send("There is nothing to snipe.")
    let embed = new Discord.MessageEmbed()
    .setTitle(msg.author.tag)
    .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))
    .setColor("RANDOM")
    .setDescription(msg.content)
    if(msg.attachments.first()) embed.setImage(msg.attachments.first().url)
    message.channel.send(embed)
  }
  //Poop Command//
  if(message.content === "w?poop") {
    message.channel.send("ew")
  }
  //Dog Command//
  if(message.content === "w?dog") {
    let embed = new Discord.MessageEmbed()
    .setTitle("The only cute dog is me")
    .setImage("https://media.discordapp.net/attachments/820079304297283636/840300341559820388/DogDrawing1.png?width=461&height=510")
    .setColor("RANDOM")
    .setFooter("Woof");
    message.channel.send(embed);
  }
  //Wow Command//
if(message.content === "w?wow") {
    let embed = new Discord.MessageEmbed()
    .setTitle("Wow")
    .setImage("https://media.discordapp.net/attachments/820079304297283636/841827445991669790/wow.png?width=677&height=510")
    .setColor("RANDOM")
    .setFooter("Woof");
    message.channel.send(embed);
}
//Purge Command//
if(message.content.startsWith("w?purge")){
let arg = message.content.split(" ")
if(message.member.hasPermission("MANAGE_MESSAGES")) {
let clear = arg[1];
if(!clear) return message.channel.send(`:x: | \`Incorrect usage of command you need to provide an amount of messages to Clear.\` 
**Example:** \`w?purge 50\` `)
if(isNaN(clear)) return message.channel.send(":x: | ``Please Put a Valid Number to Clear messages.``")
if(clear > 100) return message.channel.send(":x: | ``I can't Clear more than 100 messages.``")
if(clear < 1) return message.channel.send(":x: | ``You cannot Clear less than 1 message.``")

message.channel.bulkDelete(clear)
message.channel.send(`:white_check_mark: | \`Succesfully cleared ${clear} messages! | If purge fails please make sure I have MANAGE_MESSAGES to make the purge seccessful.\` `)
.then(message => 
 message.delete({timeout: 10000})
 )
}else{
message.reply("You dont have perms!")
} 
}
//Invite Command//
if(message.content === "w?invite") {
 let embed = new Discord.MessageEmbed()
 .setTitle("invite me to your server")
 .setDescription("https://discord.com/api/oauth2/authorize?client_id=839878868340310057&permissions=8&scope=bot")
 .setColor("#277ECD")
 .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL())
 message.channel.send(embed)
}
//Help Command//
    if(message.content === "w?help") {
    let embed = new Discord.MessageEmbed()
    .setTitle("Commands")
    .setDescription("Bot prefix: `w?` \n\n**Owner** \n`WIP` \n**Moderation** \n`kick`,`ban`,`purge` \n**Utility** \n`slowmode`,`nuke`,`google` \n**Posting** \n`announce`,`report`,`poll` \n**Roles** \n`WIP` \n**Fun** \n`nameme`,`ping`,`kill`,`snipe`,`poop`,`dog`,`wow`,`gayrate`,`meme`,`8ball`,`topic`,`hug`,`hack`,`slap` \n**Information** \n`invite`,`botinfo`,`membercount`,`support`,`servers`,`avatar`,`serverinfo`,`whois`,`vote`")
    .setColor("#e9c172")
    .setFooter("Woof - Version 1.2");
    message.channel.send(embed);
  }
  //Helptest Command//
  if(message.content === "w?helptest") {
    let embed = new Discord.MessageEmbed()
    .setTitle("Test Commands")
    .setDescription("Bot prefix: `w?` \n\n**Owner** \n`None for testing` \n**Moderation** \n`mute`,`warn` \n**Utility** \n`timer`,`ysearch` \n**Posting** \n`None for testing` \n**Roles** \n`None for testing` \n**Fun** \n`dm`,`Rreact`,`react`,`thank`,`roast`,`kiss`,`NANI` \n**Information** \n`embed`")
    .setColor("#e9c172")
    .setFooter("Woof - Version 1.0.2");
    message.channel.send(embed);
  }
  //Embed Command//
  if(message.content === "w?embed") {
 let embed = new Discord.MessageEmbed()
 .setTitle("this is Emded title")
 .setDescription("this is Embed description")
 .setColor("RANDOM")
 .setFooter("This is embed footer")
 message.channel.send(embed)
}
//Dm Command//
if(message.content === "w?dm") {
message.author.send("time to spam dm's")
}
//Send a message and react//
if(message.content === "w?Rreact"){
message.channel.send('dumb')
    .then(sentMessage => sentMessage.react("👍"))
    .catch(console.error);
}
//Botinfo Command//
if(message.content === "w?botinfo") {
  let embed = new Discord.MessageEmbed()
  .setTitle("Bot Info")
  .setColor("RANDOM")
  .setDescription("Info: Woof")
  .addField(`Bot made by RB#4674`,`------------------`)
  .addField(`⏱| **${client.ws.ping}ms** Latency.`,`------------------`)
  .addField(`Help command: w?help`,`------------------`)
  .addField(`Bot prefix: w?`,`------------------`)
  .addField(`Requested by ${message.author.username}`,`------------------`)
  .setFooter("Woof")
  .setTimestamp()
  message.channel.send(embed)
}
//Report Commad//
if (message.content.startsWith("w?report")) {
  let args = message.content
  .split(" ")
  .slice(1)
  if(!args[0]) return message.channel.send("You Need To Mention The Bug In Order To Report Something")
 const reportlog = new Discord.MessageEmbed()
         .setTitle(`${message.author.username} Submitted A New Bug Report`) 
      .setColor('RANDOM')
       .setAuthor(
        `${message.author.tag}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
.setDescription(args.join(" "))
.setFooter(`Sent in From ${message.guild} Server`)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setTimestamp()
client.channels.cache.get('840121760375767051').send(reportlog).then (sentMessage => {
    sentMessage.react(`✅`)
    sentMessage.react(`🚫`)
  })
  message.channel.send("Your Report has succesfully been sent.")
}
//Announce Command//
if(message.content.startsWith('w?announce')){
 const anntext = message.content.slice("".length).trim().split(/ +/);
anntext.shift().toLowerCase().split(" ")[0]
 let embed = new Discord.MessageEmbed()
 .setDescription(`**${anntext.join(" ")}**`)
 .setColor("RANDOM")
 message.channel.send(embed)
}
//Membercount Command//
if(message.content === "w?membercount") {
 let embed = new Discord.MessageEmbed()
 .setColor("#fca4a4")
 .setAuthor(`Member Count of ${message.guild}`, message.guild.iconURL({ dynamic: true }))
 .setTitle("Members")
 .setDescription (`Total: ${message.guild.members.cache.size}\n Humans: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
 .setThumbnail(message.guild.iconURL({ dynamic: true }))
 .setFooter(`Requested by ${message.author.username}`)

 message.channel.send(embed)
}
//Gayrate Command//
if (message.content.startsWith("w?gayrate")) {
 let victim = message.mentions.users.first()
 let rand = Math.round(Math.random() * 110 + 1);
 if (!victim) console.log("")

 else {
 let embed = new Discord.MessageEmbed()
 .setTitle(`GAYRATE`)
 .setDescription(`${victim} is ${rand}% GAY! :rainbow_flag:`)
 .setColor("#BFFF00")
 .setFooter("100% accurate 😳")
 message.channel.send(embed)
 }
}
//React Command//
if (message.content === 'w?react') {
 message.react("😎");
}
//Nuke Command//
 if (message.content.startsWith('w?nuke')) {
if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("you don't have the permission for that.");
if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("I don't have the permission for that.");

message.channel.clone({position: message.channel.rawPosition }).then(ch => { ch.send('Channel nuked'); })
message.channel.delete();
}
//Thank Command//
if(message.content.startsWith("w?thank")) {
let victim = message.mentions.users.first()
 if(!victim) message.reply("Mention someone to thank.")
 else{
 message.channel.send(`${victim} Was thanked by ${message.author}!`)
 }
 }
 //Slowmode Command//
 if(message.content.toLowerCase().startsWith("w?slowmode")){
 if (message.member.hasPermission("MANAGE_CHANNELS")) {
 let sentence = message.content.split(" ");
 sentence.shift();
 sentence = sentence.join(" "); 
 if(sentence != null){
 message.channel.setRateLimitPerUser(sentence);
 }

 message.reply(`This chat now has a slowmode of ${sentence} seconds!`)
 } else {
 message.reply("You don't have perms to do that...")
 } 
}
//Timer Command//
 if(message.content.toLowerCase().startsWith('w?timer')){
 const args = message.content.split(' ').splice(1);
 if(!args[0]) return message.channel.send('please include a valid time');
 if(isNaN(args[0])) return message.channel.send('please include a valid number');
 if(!args[1]) return message.channel.send('you have to include something for me to remind you with')
 setTimeout(() => {
 const msg = args.splice(1).join(' ');
 message.channel.send(`${message.author}, ${msg}`)
 }, parseInt(args[0], 10) * 1000)
}
//Support Server Command//
if(message.content === "w?support") {
    message.channel.send("https://discord.gg/rgmrT3c8Vk")
  }
  //Poll Command//
 if (message.content.toLowerCase().startsWith("w?poll")) {
let args = message.content.split(" ").slice(1);
let sentence = args.join(" ")
if (!message.content.includes("/")) {
if (!sentence) return message.reply("Correct Usage: `w?poll test`")
     if (sentence.includes("@everyone") || sentence.includes("@here")) {
      console.log(message.author.username + " said :-  " + sentence)
      message.reply("don't even think about it")
      return;
    }

    message.delete();
 message.channel.send(`**${message.author.username}#${message.author.discriminator}** Asks: **${sentence}**`).then(pollTopic => {
    pollTopic.react(`✅`);
    pollTopic.react(`❌`);
    })
} else {
  sntnce = sentence.split("/")
  let embed = new Discord.MessageEmbed()
  .setTitle(message.author.tag + " Made A Poll!")
  .setDescription(":one: " + sntnce[0] + "\n:two: " + sntnce[1])
  .setFooter("Vote For The One You Choose!")
  .setColor("#4169e1")
message.channel.send(embed).then(m => {

    m.react("1️⃣");
    m.react("2️⃣");
    })
 
}
}
//Google Search Command//
if (message.content.toLowerCase().startsWith("w?google")) { 
let args = message.content.split(" ").slice(1);
let sentence = args.join("+")
       let sntnce = message.content.split(' ');
    sntnce.shift();
    sntnce = sntnce.join(' ');
    if (!sentence) return message.reply('Please specify a search query.');
     let embed = new Discord.MessageEmbed()
      .setTitle('You Searched Google')
      .setDescription(
        `**Your Search Query:** ${sntnce}\n\n **Search Result** - [Click Here](https://www.google.com/search?q=${sentence}&oq=${sentence}&aqs=chrome.0.69i59l2j0l2j69i60j69i61l2j69i65.1147j0j7&sourceid=chrome&ie=UTF-8)`
      )
      .setColor('GREEN')
      .setFooter(' ');
    message.channel.send(embed);
  }
  //Roast Command//
  if (message.content.startsWith("w?roast")) {
    let victim = message.mentions.users.first()
    if (!victim) message.reply("MENTION SOMEONE TO ROAST!")
    else {
      let replies = [`${victim}, YOUR MOM GAYYYYYYY!`, `MIRRORS CAN'T TALK, LUCKILY FOR ${victim} THEY CAN'T LAUGH OR SCREAM EITHER.`, `IF LAUGHTER IS THE BEST MEDICINE, THEN ${victim}'s FACE MUST BE CURING THE WORLD.`, `${victim}, SOMEDAY YOU'LL GO FAR.. AND I HOPE YOU REMAIN THERE`, `${victim} IS AS USELESS AS THE "UEUE" IN "QUEUE"`]
      message.channel.send(replies[Math.floor(Math.random() * replies.length)])

    }
  }
  //Youtube Search Command//
  if (message.content.toLowerCase().startsWith("w?youtube")) {
   let sentence = message.content.split(" ");
 sentence.shift();
 sentence = sentence.join(" ");
 if (!sentence) message.reply("Please specify a search query.")
 let embed = new Discord.MessageEmbed()
 .setTitle("You Searched YouTube")
 .setDescription(`**Your Search Query:** ${sentence}\n\n **Search Result** - [Click Here](https://www.youtube.com/results?search_query=${sentence})\n If search fails, make sure to replace the spaces in the search query, if you have them, to the + sign\nExample: >youtube-search pop+cat+furry+video`)
 .setColor("GREEN")
 .setFooter(" ")
 message.channel.send(embed)
}
//Warn Command//
if (message.content.startsWith("w?warn")) {
   let dUser = message.mentions.users.first()
   let e = message.author;
    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("You can't use that command!")
    if (!dUser) return message.channel.send("Can't find user!")

    if (dUser.bot) return message.reply("You can't warn bots . Stay away from my kin")

    if (dUser.id === e.id) {
      message.reply("You can't warn yourself!")
    }

    let sentence = message.content.split(" ");
    sentence.shift();
    sentence = sentence.join(" ").slice(22);
    if (!sentence) return message.reply("Please provide a reason!")
    
    dUser.send(`${dUser}, You have been warned for: **${sentence}** in ${message.guild}`)//stop

    let embed = new Discord.MessageEmbed()
     .setTitle("WARNING!")
     .setColor("BLUE")
     .addField("Person Warned" , `${dUser.username}`)
     .addField("Warned by" , `${e.username}`)
     .addField("Reason" , `${sentence}`)
     .setTimestamp()
    message.channel.send(embed)
}
//Slap Command//
if(message.content.startsWith("w?slap")){
 let slap =["https://cdn.discordapp.com/attachments/820079304297283636/846992529198546954/slap1.gif", "https://cdn.discordapp.com/attachments/820079304297283636/846992537431834624/slap2.gif","https://cdn.discordapp.com/attachments/820079304297283636/846992548928815134/slap3.gif","https://cdn.discordapp.com/attachments/820079304297283636/846992608769212426/slap5.gif","https://cdn.discordapp.com/attachments/820079304297283636/846992611893968896/slap4.gif","https://cdn.discordapp.com/attachments/820079304297283636/846992620110741504/slap6.gif"]
 let victim = message.mentions.users.first()
if(!victim) return message.reply("**Yeah...don't do that to yourself**");
let embed = new Discord.MessageEmbed()
 .setTitle(`${message.author.username} slapped ${victim.tag}`)
 .setImage(`${slap[Math.floor(Math.random() * slap.length)]}`)
 .setColor("RANDOM")
 .setFooter(`UwU`);

 message.channel.send(embed)
 
}
//Kiss Command//
if(message.content.startsWith("w?kiss")){
 let kiss =["https://cdn.discordapp.com/attachments/820079304297283636/846990552590319616/kiss1.gif", "https://cdn.discordapp.com/attachments/820079304297283636/846990558933024788/kiss2.gif","https://cdn.discordapp.com/attachments/820079304297283636/846990566617382945/kiss3.gif","https://cdn.discordapp.com/attachments/820079304297283636/846990709872525352/kiss4.gif","https://cdn.discordapp.com/attachments/820079304297283636/846990716047589376/kiss5.gif","https://cdn.discordapp.com/attachments/820079304297283636/846990719347327006/kiss6.gif"]
 let victim = message.mentions.users.first()
if(!victim) return message.reply("**Yeah...ummm kissing youself?**");
let embed = new Discord.MessageEmbed()
 .setTitle(`${message.author.username} kissed ${victim.tag}`)
 .setImage(`${kiss[Math.floor(Math.random() * kiss.length)]}`)
 .setColor("RANDOM")
 .setFooter(`UwU`);

 message.channel.send(embed)
 
}
//Hug Command//
if(message.content.startsWith("w?hug")){
 let hug =["https://cdn.discordapp.com/attachments/820079304297283636/846986467716890664/hug1.gif", "https://cdn.discordapp.com/attachments/820079304297283636/846986478604779550/hug2.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995400757739580/hug3.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995403962187816/hug4.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995406390296576/hug5.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995455476498442/hug6.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995459528458321/hug7.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995463185498183/hug8.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995498450681856/hug9.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995501785415680/hug10.gif","https://cdn.discordapp.com/attachments/820079304297283636/846995504399384586/hug11.gif"]
 let victim = message.mentions.users.first()
if(!victim) return message.reply("**Its sad to hug yourself**");
let embed = new Discord.MessageEmbed()
 .setTitle(`${message.author.username} hugged ${victim.tag}`)
 .setImage(`${hug[Math.floor(Math.random() * hug.length)]}`)
 .setColor("RANDOM")
 .setFooter(`UwU`);

 message.channel.send(embed)
 
}
//8ball Command//
if (message.content.toLowerCase().startsWith("w?8ball")) {
    let replies = ["Yes","No","Maybe","Not sure","Shut up you rat!","sure, why not","when you grow a braincell, yes","THAT'S A SOLID ****NO****","Nah that sucks tbh"]
    let randomized = replies[Math.floor(Math.random() *     replies.length)]
    let sentence = message.content.split(" ");
    sentence.shift();
    sentence = sentence.join(" ");
    if (!sentence) message.reply("WHAT DO YOU WANT TO ASK 8BALL?")
    let embed = new Discord.MessageEmbed()
    .setTitle("8Ball")
    .addField("Your Question", `${sentence}`)
    .addField("8Ball:", `${randomized}`)
    .setColor("RANDOM")
    .setFooter(" ")
    message.channel.send(embed)
}
//Help dm command//
client.on("message", message => {

if (message.content === "w?helpdm") {
  const DM = message.author
  DM.send('What you need help for?')   
return message.reply("Check Your Dm's!")
}
})
//Shower Thoughts Command//
if (message.content === "w?showert") {
    let nicknames = ["i wonder how much more advanced the world would be if we didn't require sleep", "if you would have been born one year earlier/later, you would have had a completely different set of friends at school and as a result would probably have been a very different person", "humans require years of training to not shit themselves", "admitting you don't know something is better than pretending you do", "things weren't better when you were a kid, you just didn't notice the trash around you", "some people take your advice and then ignore it, because they want an audience more than guidance", "if life is unfair to everyone, it is technically fair", "am i bored as you are? can be read backwards and still make sense", " does my doctor have his own doctor? if so, can't i just ask his doctor who his doctor is and so on until I follow the chair to the world's most ultimate doctor", "english can be weird but can be understood through tough thorough thought though", "you have no idea what you have forgotten about", "you know you've become an adult when you realise that sleep is a reward and not a punishment", "the problem with society is they are people"]
    message.channel.send(`${nicknames[Math.floor(Math.random() * nicknames.length)]}`)
  }
  //ack Command//
  if(message.content.startsWith("w?hack")) {
const user = message.mentions.users.first();
if(!user) return message.channel.send("Mention Someone to hack")
message.channel.send("**[25%]** Finding IP..").then(m => {
setTimeout(() => {
m.edit("**[50%]** IP FOUND! Looking for email and password..").then(m2 => {
setTimeout(() => {
m2.edit(`**[75%]** DONE! email: ${user.username}@icloud.com | password: XjdhgikshGdk`).then(m3 => {
setTimeout(() => {
m3.edit("**[100%]** Deleting System32..").then(m4 => {
setTimeout(() => {
m4.edit(`done hacking ${user}! all info was sent online.`)
}, 5500);
});
}, 2800);
});
}, 4500);
});
}, 5000);
});
};
if(message.content.toLowerCase().startsWith("w?whois")) {
let user = message.mentions.users.first() || message.author;
let member = message.mentions.members.first() || message.member;
let e = new Discord.MessageEmbed()
.setColor("#C724B1")
.setTimestamp()
.addFields({
name: "User Joined Server At",
value: member.joinedAt
}, {
name: "User Created At",
value: user.createdAt
}, {
name: "User Name & Tag",
value: user.tag
}, {
name: "User ID",
value: user.id
})
.setThumbnail(user.displayAvatarURL({ dynamic: true }))
message.channel.send(e);
};
//Mute Command//
if(message.content === "w?mute") {
    message.channel.send("RB needs to work on this command because he is lazy!")
  }
  //Topic Command//
  if(message.content === "w?topic") {
let replies = ["How do you like your eggs cooked?", "At what age would you consider someone to be old?", "Are you a clean or messy?", "What is your favorite food?", "What are some things that you should not not say during a job interview?", "Describe yourself in one sentence.", "What is your favorite childhood memory?", "Do you prefer a quiet night at home or going out to a big party?","What is your biggest fear?","What do you do when you're bored?", "Would you rather be stuck in a house with someone you hate or be stuck in a house alone?", "What movies have you re-watched the most number of times?", "What are your hobbies?", "What is your favorite pizza topping?", "What kind of music do you like to listen to?", "Who was the last person you had a good conversation with?", "What is the best piece of advice that you've received?","If you became president, what is the first thing you would do?","What motivates you?"] 
message.channel.send(replies[Math.floor(Math.random() * replies.length)]) 
}
//Meme Command//
const https = require('https');
 const url = 'https://www.reddit.com/r/memes/hot/.json?limit=100';

 if (message.content.startsWith('w?meme')) {
 https.get(url, result => {
 var body = '';
 result.on('data', chunk => {
 body += chunk;
 });

 result
 .on('end', () => {
 var response = JSON.parse(body);
 var index =
 response.data.children[Math.floor(Math.random() * 99) + 1].data;

 var link = 'https://reddit.com' + index.permalink;

 if (index.post_hint !== 'image') {
 var text = index.selftext;
 const textembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setColor('RANDOM')
 .setURL(link);

 message.channel.send(textembed);
 }

 var image = index.preview.images[0].source.url.replace('&amp;', '&');
 var title = index.title;
 var subRedditName = index.subreddit_name_prefixed;

 if (index.post_hint !== 'image') {
 const textembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setColor('RANDOM')
 .setURL(link);

 message.channel.send(textembed);
 }
 const imageembed = new Discord.MessageEmbed()
 .setTitle(`${title}`)
 .setImage(image)
 .setColor('RANDOM')
 .setURL(link);
 message.channel.send(imageembed);
 })
 .on('error', function(e) {
 console.log('Got an error: ', e);
 });
 });
 }
 //Server Info Command//
 if(message.content === "w?serverinfo") {
 let embed = new Discord.MessageEmbed()
 .setColor("RANDOM")
 .setTitle("Server Info")
 .setImage(message.guild.iconURL)
 .setDescription(`${message.guild}'s Information.`)
 .addField("Member Count", `This server has ${message.guild.memberCount} member(s).`)
 .addField("Emoji Count", `This server has ${message.guild.emojis.cache.size} emoji(s).`)
 .addField("Roles Count", `This server has ${message.guild.roles.cache.size} role(s).`)
 message.channel.send(embed)
}
//Avatar Command//
if (message.content === "w?avatar" || message.content === "w?Avatar" || message.content === "w?AVATAR") { 
 let embed = new Discord.MessageEmbed()
.setTitle("Your avatar!")
.setImage(`${message.author.displayAvatarURL({dynamic : true})}`)
.setColor("PURPLE")
.setFooter(`${message.author.username}`)
message.channel.send(embed)
}
//Nani Command//
if(message.content === "w?NANI") {
  message.channel.send("omae wa mou shindeiru!")
}
if(message.content === "omae wa mou shindeiru!") {
  let image = new Discord.MessageAttachment("https://cdn.glitch.com/7b813d65-71de-402b-9260-182eb1b439da%2F6830720b-45fd-4d4d-b56d-690cc938fddb.image.png?v=1616121693614")
  message.channel.send(image)
}
//Server Count Command//
if (message.content === "w?servers") {
 let serversEmbed = new Discord.MessageEmbed()
 .setTitle(`Woof server count`)
 .setDescription(`Woof is in **${client.guilds.cache.size}** Servers!`)
 .setColor(`BLUE`)
 .setFooter(
 `Requested by ${message.author.username}`,
 message.author.displayAvatarURL()
 );
 message.channel.send(serversEmbed);
 }
 //Vote Command//
 if(message.content === "w?vote") {
 let embed = new Discord.MessageEmbed()
 .setTitle("Vote for me")
 .setDescription("[Vote](https://top.gg/bot/839878868340310057/vote)")
 .setColor("RANDOM")
 .setFooter("Woof")
 message.channel.send(embed)
}
});

client.login(process.env.token)
