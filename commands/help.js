module.exports = {
	name: 'help',
	description: '명령어의 도움말을 보여줍니다!',
    aliases: ['도움말', '도움', 'help'],
	execute(client, message, args, prefix) {
        const data = [];
        const { commands } = message.client;
        if(!args[0]) {
        data.push('내 모든 명령 목록은 다음과 같습니다!');
data.push(commands.map(command => command.name).join(', '));
data.push(`\n더 자세한 명령어 도움말을 알고 싶다면 \`${prefix}help [command name]\``);

return message.author.send(data, { split: true })
	.then(() => {
		if (message.channel.type === 'dm') return;
		message.reply('DM으로 도움말을 보냈습니다! DM을 확인해주세요!');
	})
	.catch(error => {
		console.error(`${message.author.tag}님에게 도움 DM을 보낼 수 없습니다.\n`, error);
		message.reply('DM을 보낼 수 없습니다! DM이 비활성화되어 있는지 확인해주세요!');
	});
}
if(args[0]) {
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply(`${args} 라는 명령어를 찾지 못하였습니다!`);
        }
        
        data.push(`**이름:** ${command.name}`);
        
        if (command.aliases) data.push(`**별칭:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**설명:** ${command.description}`);
        if (command.usage) data.push(`**사용법:** ${prefix}${command.name} ${command.usage}`);
        if(command.cooldown) data.push(`**쿨타임:** ${command.cooldown} 초`);
        
        message.reply(data, { split: true });
    }
	},
};