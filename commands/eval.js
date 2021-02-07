module.exports = {
	name: 'eval',
	description: '실행',
    aliases: ['실행', 'eval'],
    dev: true,
    execute(client, message, args, prefix) {
        const { inspect } = require('util')
        const arg = message.content.replace(prefix, "").split(" ").slice(1).join(" ")
        if(arg.includes('client.token') || arg.includes('process.exit')) return message.reply('``Inaccessible motion``')
        try {
            const evaled = eval(arg)
            return message.reply(`\n**input**\n\`\`\`js\n${arg}\n\`\`\`\n**output**\n\`\`\`js\n${inspect(evaled, { depth: 0})}\n\`\`\`\n`)
        }catch(error) {
            return message.reply(`\n${error}`)
        }
	},
};