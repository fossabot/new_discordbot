module.exports = {
	name: 'ping',
	description: '저의 핑을 보여줍니다!',
    aliases: ['ping', 'pong', '핑', '퐁'],
	execute(client, message, args, prefix) {
		message.reply(`퐁!\n${client.ws.ping}ms!`)
	},
};