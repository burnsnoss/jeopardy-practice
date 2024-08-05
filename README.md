

Design
======


Frontend
--------

React, will pull an entire game at a time from the backend, the game logic will then be played completely on the frontend


Backend
-------

Express, will just pull an entire page from j-archive, parse it, send it to the frontend


Installation (dev) 
==================

Using Ubuntu 22 WSL 2

[Install node via nvm](https://nodejs.org/en/download/package-manager): 
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 22
```

`npm install -g ts-node`

`npm ci`

