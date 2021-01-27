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
                    let emojiList = ["😍", "🥺", "😁", "😂", "👍", "😎", "👽", "😏", "📝", "😘", "😈", "🤓", "🤯", "❤️", "👌", "😩", "🤙", "🤷‍♀️", "😛", "🥳", "🤔", "🥁", "😭", "😺", "😤", "💃", "💅", "😆", "💪", "🙌", "👀", "👻"]
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
                            return fitEmojiList.includes(reaction.emoji.name)
                        }
                        setTimeout(function() {message.channel.send(`10 seconds left until poll "${bracketTitle}" closes!`)}, 50000)
                        const collector = msg.createReactionCollector(filter, {time: 60000})
                        let emoji1 = emoji2 = emoji3 = emoji4 = emoji5 = emoji6 = emoji7 = emoji8 = emoji9 = emoji10 = emoji11 = emoji12 = emoji13 = emoji14 = emoji15 = emoji16 = emoji17 = emoji18 = emoji19 = emoji20 = emoji21 = emoji22 = emoji23 = emoij24 = emoji25 = emoji26 = emoji27 = emoji28 = emoji29 = emoji30 = emoji31 = emoji32 = 0
                       
                        collector.on('collect', (reaction, user) => {
                            if (reaction.emoji.name === '😍') {
                                emoji1 += 1
                            } else if (reaction.emoji.name === '🥺') {
                                emoji2 += 1
                            } else if (reaction.emoji.name === '😁') {
                                emoji3 += 1
                            } else if (reaction.emoji.name === '😂') {
                                emoji4 += 1
                            } else if (reaction.emoji.name === '👍') {
                                emoji5 += 1
                            } else if (reaction.emoji.name === '😎') {
                                emoji6 += 1
                            } else if (reaction.emoji.name === '👽') {
                                emoji7 += 1
                            } else if (reaction.emoji.name === '😏') {
                                emoji8 += 1
                            } else if (reaction.emoji.name === '📝') {
                                emoji9 += 1
                            }else if (reaction.emoji.name === '😘') {
                                emoji10 += 1
                            }else if (reaction.emoji.name === '😈') {
                                emoji11 += 1
                            }else if (reaction.emoji.name === '🤓') {
                                emoji12 += 1
                            }else if (reaction.emoji.name === '🤯') {
                                emoji13 += 1
                            }else if (reaction.emoji.name === '❤️') {
                                emoji14 += 1
                            }else if (reaction.emoji.name === '👌') {
                                emoji15 += 1
                            }else if (reaction.emoji.name === '😩') {
                                emoji16 += 1
                            }else if (reaction.emoji.name === '🤙') {
                                emoji17 += 1
                            }else if (reaction.emoji.name === '🤷‍♀️') {
                                emoji18 += 1
                            }else if (reaction.emoji.name === '😛') {
                                emoji19 += 1
                            }else if (reaction.emoji.name === '🥳') {
                                emoji20 += 1
                            }else if (reaction.emoji.name === '🤔') {
                                emoji21 += 1
                            }else if (reaction.emoji.name === '🥁') {
                                emoji22 += 1
                            }else if (reaction.emoji.name === '😭') {
                                emoji23 += 1
                            }else if (reaction.emoji.name === '😺') {
                                emoji24 += 1
                            }else if (reaction.emoji.name === '😤') {
                                emoji25 += 1
                            }else if (reaction.emoji.name === '💃') {
                                emoji26 += 1
                            }else if (reaction.emoji.name === '💅') {
                                emoji27 += 1
                            }else if (reaction.emoji.name === '😆') {
                                emoji28 += 1
                            }else if (reaction.emoji.name === '💪') {
                                emoji29 += 1
                            }else if (reaction.emoji.name === '🙌') {
                                emoji30 += 1
                            }else if (reaction.emoji.name === '👀') {
                                emoji31 += 1
                            }else if (reaction.emoji.name === '👻') {
                                emoji32 += 1
                            }
                        })
                        collector.on('end', collected => {
                            let emojis = [];
                            let itEmoji = 
                            emojis.push(emoji1, emoji2, emoji3, emoji4)
                            bracketOptions.forEach(function(key, i){
                                let votingChoice = {
                                    option: key,
                                    count: emojis[i]
                                }
                                axios.put(`https://tierbreakerapi.herokuapp.com/bracket/${args[0]}/bulkvote`, votingChoice)
                                .then((res) => {
                                    message.channel.send(`Votes counted for ${votingChoice.option}`)
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