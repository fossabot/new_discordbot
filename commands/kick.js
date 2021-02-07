module.exports = {
	name: 'kick',
	description: '멤버를 킥 합니다!',
    aliases: ['킥', 'kick', '추방'],
    permissions: 'KICK_MEMBERS',
	execute(client, message, args, prefix) {
        const user = message.mentions.members.first()
        const reason = args[2] ? args[2] : "사유 없음"
        if(!user) return message.reply('킥 할 유저를 맨션해주세요!')
        if(message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply()
        user.kick({ reason: reason })
            message.reply(`${user.user.tag} 님을 킥 하였습니다!`)
        }
    }