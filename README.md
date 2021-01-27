# Poll-Bot for Discord

This bot is created for the purpose of polling votes for current rounds of bracket tournaments from Tier Breaker app. This front end repo can be found at [https://github.com/NikkiHmltn/tier-breaker](https://github.com/NikkiHmltn/tier-breaker). 

Tier Breaker is hassle-free tournament creation. No signups required, no passwords to keep track of.
To access the live site, visit [tierbreaker.herokuapp.com](https://tierbreaker.herokuapp.com).

The API used in this bot can be found at [github.com/sschneeberg/tierbreaker_backend](https://github.com/sschneeberg/tierbreaker_backend). It will give you the route information you need. 

# Getting the Bot on Your Server

1. Copy or Paste the link into your url bar: `https://discord.com/oauth2/authorize?client_id=803448758447898626&scope=bot`
    Note: You *MUST* be an admin of your discord guild to invite the bot to your server. 
2. That's it! Type `!help <bracket key here>` and you will have 5 minutes to vote on the rounds before the bot will tally and send your votes to the tournament on `tierbreaker.herokuapp.com`

# Notes

Users can vote more than once using the discord bot, please note that is expected behavior. It's not necessary to install any repos pertaining to Tier Breaker to run this discord bot. All you need is your secret bracket key given after you have created one on the website! 

![bot screenshot](https://i.imgur.com/083G4Nt.png)

######