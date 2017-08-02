![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Project [1] - P A R I A H

### Lauren Armbrust WDI27


#### First steps to build and run the code:

Here are the steps to begin building and running the code.

- `yarn install` to install dependencies
- `gulp` to compile the source code and open in browser
- `git push heroku master` to deploy to Heroku

> **Note**: You'll need to have `express` installed globally
> `npm i --save express`



#### P A R I A H   ..#inspo

As an artist I know all too well there are not enough user friendly resources online for artists to display their work. PARIAH solves that problem by allowing people to upload their work for free and also have fun exploring some historical works via the Harvard Art Museum API.

Once logged in (either by registering or via Instagram Authorisation) users may immediately begin uploading works to their portfolios.

Uploading images runs Clarifai's general predictions model API and certain relevant keywords are produced. 

Selecting keywords from the list and choosing "History Book" runs the Harvard API and brings back works from history for users to take inspiration (#inspo) from. 

Having the ability to look back in time easily from one vantage point is a way to encourage creative people to consider what exactly inspires the work they produce. Among other things.

&hearts; I would put an image here but couldn't figure out how &hearts;

#### What technologies were used?

Technologies include:

- HTML 5
- SCSS
- JavaScript ES6
- jQuery 3.10
- Gulp
- Node
- NPM
- Git & github
- Express
- Yarn

#### What were the biggest challenges?

1. Biggest challenge overall was linking with the two APIs used. 
2. Certain obstacles with Heroku made for some interesting challenges with which I had much help resolving. AKA proxy requests 
3. Making the two APIs complimentary was challenging as well. By that I mean, activating keywords from the first and diving in to the second in such a way that relevant data was returned in a harmonious manner.

#### R:O:F:L: Regrets Or Fabulously Lucrative?

Overall really pleased, perhaps in future I would:

- When a user browses the historical tiles, would be nice if they went to the profile for the object on Harvards site (so their individual url) rather than simply opening the image in a new tab.
- Add authorisation from facebook and possibly Pinterest

View the app [here](https://fast-taiga-10310.herokuapp.com/)
