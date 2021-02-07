const Discord = require('discord.js')
const { Intents } = require('discord.js')
const client = new Discord.Client({  ws: { intents: Intents.ALL } })
const { prefix, token, dev } = require('./config.json')
client.login(token)
client.on('ready', () => {
    console.log(`${client.user.tag}is Ready`)
})
const cooldowns = new Discord.Collection()
client.commands = new Discord.Collection()
client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return
    const fs = require('fs')
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/)
	const commandName = args.shift().toLowerCase()
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	if (!command) return
    	if (command.args && !args.length) {
            let reply = `인수를 제공하지 않았습니다, ${message.author}!`
            		if (command.usage) {
            			reply += `\n올바른 사용법: \`${prefix}${command.name} ${command.usage}\``
            		}
            		return message.reply(reply)
    	}
        if (message.channel.type === 'dm') {
            return
        }
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection())
        }
        const now = Date.now()
        const timestamps = cooldowns.get(command.name)
        const cooldownAmount = 3000
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000
                return message.reply(`${timeLeft.toFixed(1)} 초 뒤에 \`${command.name}\` 명령어를 사용해주세요!`)
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
         if (command.permissions) {
             	const authorPerms = message.channel.permissionsFor(message.author)
             	if (!authorPerms || !authorPerms.has(command.permissions)) {
             		return message.reply(`이 명령어를 사용할 권한이 부족합니다!\n필요한 권한: ${command.permissions}`)
             	}
             }
             if(command.dev && dev !== message.author.id) {
                 return message.reply('이 명령어는 개발자만 가능합니다!')
             }
	try {
		command.execute(client, message, args, prefix)
	}catch(error) {
        console.log(error)
    }
})