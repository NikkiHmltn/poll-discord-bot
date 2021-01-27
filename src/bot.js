require('dotenv').config();

const fs = require('fs')
const Discord = require('discord.js')
const bot = new Discord.Client({ws: {intents: Discord.Intents.ALL}})
bot.commands = new Discord.Collection()
const prefix = "!"

const commandFiles = fs.readdirSync(__dirname + "/commands").filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name, command)
}

bot.on('ready', () => {
    console.log(`Poll-bot has logged in`)
})

bot.on('message', async message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply(`I can't find anything like that.`);
    }

})


bot.login(process.env.SAYAKA_BOT_TOKEN);
