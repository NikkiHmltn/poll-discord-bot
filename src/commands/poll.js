const Discord = require('discord.js')
const axios = require('axios')


module.exports = {
    name: 'poll',
    description: '',
    args: true,
    execute(message, args) {
        if (!args[0] || args[0] === "") {
            return message.channel.send('Please make a request for the poll you would like to vote on after `!poll`\nThank you!')
        } else if(args[0]) {

            let bracketTitle = []
            axios.get(`https://tierbreakerapi.herokuapp.com/bracket/${args[0]}`)
            .then((res) => {
                if(res.data.msg) {
                    message.channel.send("Sorry, I can't find that tournament.")
                } else {
                    bracketTitle.push(res.data.title)
                    let obj = (res.data.voting_options.round_options)
                    let bracketOptions = []
                    obj.map((item, i) => {
                        bracketOptions.push(item)
                    })
                    let emojiList = ["😍", "🥺", "😁", "😂"]
                    let fitEmojiList = emojiList.slice(0, bracketOptions.length)
            
                    let result = [];
                    bracketOptions.forEach(function(key, i){result[i] = `\n${key} : ${fitEmojiList[i]}`})

                    const embeded = new Discord.MessageEmbed()
                    .setColor('#42ecf5')
                    .setTitle(bracketTitle)
                    .setDescription(`Please cast your vote, by reacting with the option's emoji adjascent to it!\n ${result}`)

                    message.channel.send(embeded)
                    .then(async msg => {
                        const filter = (reaction) => {
                            return emojiList.includes(reaction.emoji.name)
                        }
                        setTimeout(function() {message.channel.send(`10 seconds left until poll "${bracketTitle}" closes!`)}, 50000)
                        const collector = msg.createReactionCollector(filter, {time: 60000})
                        let emoji1 = emoji2 = emoji3 = emoji4 = 0
                       
                        collector.on('collect', (reaction, user) => {
                            if (reaction.emoji.name === '😍') {
                                emoji1 += 1
                            } else if (reaction.emoji.name === '🥺') {
                                emoji2 += 1
                            } else if (reaction.emoji.name === '😁') {
                                emoji3 += 1
                            } else if (reaction.emoji.name === '😂') {
                                emoji4 += 1
                            }
                        })
                        collector.on('end', collected => {
                            let emojis = [];
                            emojis.push(emoji1, emoji2, emoji3, emoji4)
                            bracketOptions.forEach(function(key, i){
                                let votingChoice = {
                                    option: key,
                                    count: emojis[i]
                                }
                                axios.put(`http://localhost:5000/bracket/${args[0]}/bulkvote`, votingChoice)
                                .then((res) => {
                                    console.log(res)
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                            })
                        })
                       
                    })  
                }
            })
            
        }
    }
}