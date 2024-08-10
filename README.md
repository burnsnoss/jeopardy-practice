Design
======

Frontend
--------

React frontend

The frontend will start on a game select screen that lists the seasons for selection akin to [this j-archive page](https://j-archive.com/listseasons.php). 
It might also have the option for a random game or random game in a given date range.

Players then select a season and get a [list of episodes](https://j-archive.com/showseason.php?season=34),
then they may select the game from that list.

Backend
-------

Express, will just pull an entire page from j-archive, parse it, send it to the frontend.

Endpoints:

1. Get Seasons List
- <b>Input:</b> None
- <b>Output:</b> List of seasons + HTTPS link string
2. Get Season Contents
- <b>Input:</b>: HTTPS link for Season on archive
- <b>Output:</b>: List of Episodes in that season + their HTTPS links
3. Get Game
- <b>Input:</b>: Game HTTPS link
- <b>Output:</b>: Game contents (questions, answers, dollar values)


Installation (dev) 
==================

Using Ubuntu 22 WSL 2

[Install node via nvm](https://nodejs.org/en/download/package-manager): 
```
# install nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# install node version 22
nvm install 22

# install typescript
npm install -g ts-node

# install dependencies
npm ci
```


Run Backend
===========
```
npm run backend
```


Run Frontend
============
```
npm run frontend
```
