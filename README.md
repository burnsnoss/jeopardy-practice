

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
# install nvm 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# install node version 22
nvm install 22

# install typescript
npm install -g ts-node`

# install dependencies
npm ci
```


Run Backend (dev)
=================

```
npm run dev
```

