module.exports = {
	name: 'profile',
	description: '자신의 프로필을 보여줍니다!',
    aliases: ['avatar', 'profile', '프로필', '아바타'],
    // usage: '<user>',
    // cooldown: 5,
    // guildOnly: true,
	execute(client, message, args, prefix) {
		message.reply(message.author.displayAvatarURL({ format: "png", size: 1024 }));
	},
};