# Express Boilerplate!

This is a boilerplate project used for starting new projects!

## Set up

Complete the following steps to start a new project (NEW-PROJECT-NAME):

1. Clone this repository to your local machine `git clone BOILERPLATE-URL NEW-PROJECTS-NAME`
2. `cd` into the cloned repository
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`
4. Install the node dependencies `npm install`
5. Move the example Environment file to `.env` that will be ignored by git and read by the express server `mv example.env .env`
6. Edit the contents of the `package.json` to use NEW-PROJECT-NAME instead of `"name": "express-boilerplate",`

## Optional Installs
7. Postgrator CLI - `npm install postgrator-cli --save-dev`
    - edit contents of `package.json` to include `"scripts": {"migrate": "postgrator --config postgrator-config.js",}`
8. BCryptJS - `npm i bcryptjs`
9. Cors - `npm install cors`
10. JSONWebToken - `npm install jsonwebtoken`
11. Knex - `npm i knex`
12. PG - `npm i pg`
13. Treeize - `npm i treeize`
14. XSS - `npm i xss`

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

Run debbugging experience `ndb start` 

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
