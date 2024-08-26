8/5/2024
--------
Creaded node app for backend using `npm init`
This generated package.json

[Installed Typescript](https://www.digitalocean.com/community/tutorials/setting-up-a-node-project-with-typescript)
I didn't use the linked instructions exactly, I think I just used this command: 
```
npm install -g ts-node
```

[Added stuff to gitignore](https://github.com/github/gitignore/blob/main/Node.gitignore)




8/6/2024
--------
Created a typescript React app in the `game` directory following [this tutorial](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/) and [this tutorial](https://create-react-app.dev/docs/adding-typescript/):
```
npx create-react-app game --template typescript
```

Edited tsconfig files and changed file structure, moved `src` to `server`

Changed `package.json` script commands for frontend and backend

Thinking about how I'm going to run this, I will probably just end up using it locally, which means it will basically run out of two terminals, one for frontend, one for back. 

Added 
```
"engines": {
    "node": "22.5.1"
}
```
to `package.json` at the suggestion of the tutorial linked above



8/7/2024
--------
Edited `game/package.json` Typescript version in `"dependencies"`, set it to `^5.5.4` (which I believe is the current most up-to-date Typescript).
Also added `"proxy": "http://localhost:5000"` to `game/package.json` at the suggestion of [this tutorial](https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/).

[package.json tutorial kind of thing](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/)

[tsconfig tutorial kinda thing](https://www.typescriptlang.org/tsconfig/)


8/9/2024
--------
Plan is to finish the backend functionality today, and design a little bit more of the frontend game experience

`[x] design base frontend functionality`

`[x] design backend endpoints`

`[ ] implement backend endpoints` - we only got to the SeasonsList endpoint today

`[x] implement basic backend logging with pino`

Found a [USB Buzzer](https://www.delcomproducts.com/productdetails.asp?PartNumber=706400).



8/11/2024
---------
Just really quickly added some interfaces to the seasons model and set up a function declaration for getSeasonByUrl in the season controller. 




8/13/2024
---------
Going to try to work on GET season and GET game today

`[ ] GET season`

`[ ] GET game`

I ended up implementing a logging method which uses "child" loggers of the pino logger we use to identify the module/method the code resides in.

Having trouble parsing the HTML again bc of weird HTML characters needing 'escaping' so gotta figure that out. installed `lodash`, might not need it though



8/14/2024
---------
Going to try to fix my HTML decoding problem today and finish the backend

Finished season controller (except for some TODOs)

Almost finished game controller, so far we have the title, categories, and jeopardy rounds, just need final jeopardy




8/19/2024
---------
Today I'm going to complete the backend (parse final jeopardy) and get started on the front end



8/20/2024
---------
connecting frontend to backend today, using [this tutorial](https://dev.to/techcheck/creating-a-react-node-and-express-app-1ieg)

created a splash page for the frontend, added some fonts, installed axios and cors for calls to the backend.

added some graphics for the icon and splash page too

- [img tag in react](https://create-react-app.dev/docs/adding-images-fonts-and-files/)
- [jeopardy color palette](https://www.color-hex.com/color-palette/1019329)
- [jeopardy font](https://www.reddit.com/r/Jeopardy/comments/gumlmm/what_font_does_jeopardy_use/)
- [custom fonts in react](https://dev.to/ziqinyeow/how-to-add-custom-font-file-to-your-react-app-31kb)
- [nodejs event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [react playlist](https://youtu.be/ijdCDd8Wg2o?si=X-xs1Vsv6R7skGiH)


8/22/2024
---------
gonna try to do the season list page today and if im lucky, the game select page

[React Routes](https://www.youtube.com/watch?v=xMYo9jaMah8)

ran `npm install react-router-dom` and `npm i @types/react-router-dom` in game 

routed the pages via url. Now I will make the "Start Game" button work and display the seasons list



8/23/2024
---------
having trouble with the useEffect hook. It seems to not want to run

fixed it using this [how-to](https://stackoverflow.com/questions/57847626/using-async-await-inside-a-react-functional-component)


8/26/2024
---------
Gonna organize the seasons list page and get some basic components set up, preferably some components I can use again with the game selection page.

[this tutorial](https://akoskm.com/how-to-type-react-props-with-typescript) was helpful in explaining prop type declarations in react typescript.