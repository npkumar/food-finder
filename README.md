# Food Finder

> Opinionated curated list of good food available around your neighbourhood.

## Live Application
Works best on a mobile!
[FoodFinder](https://food-finder-earth.herokuapp.com/)

Please use `https` since we use the [GeoLocation API](https://developers.google.com/web/updates/2016/04/geolocation-on-secure-contexts-only)

## Usage
1. Ensure, location access is allowed on your phone or browser
<div>
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/location_prompt.png" alt="Allow Location" width="250" height="450" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/allow_location.png" alt="Location Settings" width="250" height="450" />
</div>

2. From home screen, get recommendations on restaurants nearby. Clicking on a card, provides more details. Get directions opens up google maps if on an android phone. 
<div>
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/home.png" alt="Home" width="250" height="450" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/restaurant_list.png" alt="List" width="250" height="450" align="left"/>
  <img src="https://github.com/npkumar/food-finder/blob/master/screenshots/restaurant_detail.png" alt="Detail" width="250" height="450" />
</div>

3. One cannot add reviews unless signed in. Follow the signin/signup process to authenticate yourself.
<div>
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/singin_singup.png" alt="Signin Signup" width="250" height="450" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/signin.png" alt="Signin" width="250" height="450" align="left" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/after_login.png" alt="Signin success" width="250" height="450" />
</div>

4. Once signed in, add review button is enabled. Add a review!
<div>
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/add_review_enabled.png" alt="Review enabled" width="250" height="450" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/add_review.png" alt="Add review" width="250" height="450" align="left" align="left" />
<img src="https://github.com/npkumar/food-finder/blob/master/screenshots/after_adding_review.png" alt="After add review" width="250" height="450" />
</div>

## Local Development
1. Clone this repository. App was last tested on `Node v9.3.0`
2. Keys and Credentials:

2.1. Firebase for backend authentication and as database. Do get the required keys from [Firebase](https://firebase.google.com/docs/web/setup).

Because of firebase, we don't need a schema prepared beforehand. However, the design for reviews follows a simple pattern like
```
your-firebase-database
--reviews
  --restaurant1
  --restaurant2
    -LongKey1
      created: "2018-03-17T21:15:00+08:00"
      restaurantId: "island-creamery-singapore"
      review: "The good stuff"
      username: "monkey"
    -LongKey2
      created: "2018-03-17T21:15:48+08:00"
      restaurantId: "island-creamery-singapore"
      review: "Rum and Beer flavours!"
      username: "getnpk"
```

Firebase Database Rules
```
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

2.2. Yelp API for nearby business based on location from [Yelp Developers](https://www.yelp.com/developers/documentation/v3/get_started)

3. Populate contents of `src/config.json` with above data. For example:
```
{
  "firebase": {
    "apiKey": "apiKey",
    "authDomain": "authDomain",
    "databaseURL": "https://database-url.firebaseio.com",
    "projectId": "projectId",
    "storageBucket": "bucket.appspot.com",
    "messagingSenderId": "9999999999"
  },
  "yelp": {
    "authorization": "Bearer VeryLongKeyHere",
    "baseUrl": "https://api.yelp.com/v3/businesses/search"
  }
}
```

4. Run `npm run dev`. Good to go!

## Production Deployment on Heroku
1. Set up Heroku toolchain [Toolchain](https://devcenter.heroku.com/articles/heroku-cli)
2. Use a git branch called `heroku` specifically for Heroku deployments
3. Changes to be made on `heroku` branch

3.1. Remove `/dist/` from `.gitignore`. We need this folder to be deployed

3.2. `src/config.json` is to be commited unlike in `master` branch

## Build and deploy to production
1. `heroku login`
2. Set up a heroku project and point heroku to that project
```heroku git:remote --app <YOUR-PROJECT-NAME-HERE>```
For example, `git remote -v` now shows you:
```
heroku  https://git.heroku.com/food-finder-earth.git (fetch)
heroku  https://git.heroku.com/food-finder-earth.git (push)
```
At this stage, ensure `master` has all the changes you need to push to production.

3. Checkout `heroku` branch with `git checkout heroku`

4. Rebase `heroku` with `master` with `git pull --rebase origin master`

5. Build for production with `npm run build`. This step will update our `dist` folder with latest changes.

6. Add all changes and commit with a version


```
git add -A
git commit -m "Deploy version 1.0.2"
```

7. Finally deploy to heroku
```
git push heroku heroku:master --force
```

8. Done!

## CI and deployment
Can consider automating above steps by a simple shell script and or using [Travis-Heroku-Specific-Branch](https://docs.travis-ci.com/user/deployment/heroku/#Deploying-Specific-Branches) to deploy a specific branch to Heroku.


This project was built with [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
