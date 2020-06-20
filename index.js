const Discord = require('discord.js');
const client = new Discord.Client();
const request = require('request');
const { prefix, token } = require('./config.json');

client.on('message', message => {
	if (message.content === `${prefix}ping`) {
		message.channel.send('Pong');
	}
	else if(message.content === `${prefix}status`) {
		request('https://api.mcsrvstat.us/2/WildnessSMP.serv.gs', (error, respone, body) =>{
			if(!error && respone.statusCode == 200) {
				const imported = JSON.parse(body);
				
				const online = imported['online'];
				
					const playerscount = imported['players'].online;
					let onlinee = online ? "Online": "Offline";
					const exampleEmbed = new Discord.MessageEmbed()
						.setColor('#0099ff')
						.setDescription('Server Status')
						.addFields(
							{ name: 'Server Status', value: onlinee  },
							{ name: '# Players', value: playerscount },
						)
						.setTimestamp()
					message.channel.send(exampleEmbed);
			}
		});

	/*else if(message.content === `${prefix}plugins`) {
		request('https://api.mcsrvstat.us/2/WildnessSMP.serv.gs', (error, respone, body) =>{
			if(!error && respone.statusCode == 200) {
				const imported = JSON.parse(body);
				const pugins = imported['plugins'];
				
				

				const wow = JSON.stringify(pugins.names);
				wow.replace('"',"");
				message.channel.send(wow);
		}
		});*/
	}

});

client.once('ready', () => {
	console.log('Ready!');
});
client.login(process.env.token);
