const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./index.js', { token: require('./config.json').token, totalShards: 2 });

manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();