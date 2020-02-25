# Quick Twitter Bot

A Twitter API client for the lazy generation

## Set Up

* Run `npm install quick-twitter-bot`

* Make a `.env` file with your app keys in your root directory, it should look like this:

    ```shell
    CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
    CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ACCESS_TOKEN=1234567891234567891-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    ```


* Add the following lines at the top of your main file

    ```js
    require('dotenv').config();
    const TB = require('quick-twitter-bot');
    ```

* Now you are ready to go

## Usage

```js
//  First require your keys in the .env file
require('dotenv').config();
//
//  Then require your Twitter Bot Object
const TB = require('quick-twitter-bot');
//
//




//  Lets tweet something
TB.newTweet('Hi from my Lazy twitter bot!', options?)
    .then(response=>console.log(response));
//  The output of this promise is the actual response that the API provides,
//  in JSON format.
//  The 'options' object should contain only the keys that the API provides
//
//
//


//  Now lets post something with an image
TB.newTweetWithMedia('Check my cool photo!', './image.jpg', options)
    .then(response=>console.log(response))
//  Twitter api server response in JSON format
//  The 'options' object should contain only the keys that the API provides
//
//
//


//  Want to destroy that tweet?
TB.destroyTweet('123456789123', options?)
    .then(response=>console.log(response))
//  This method only allows a string containing the tweet id as argument
//  and an optional object that allows the status/retweet spec
//
//



//  Want to retweet something?
TB.reTweet('123456789123', options?)
    .then(response=>console.log(response))
//  This method only allows a string containing the tweet id as argument
//  and an optional object that allows the status/retweet spec
//
//



//  Want to destroy that retweet?
TB.unReTweet('123456789123', options?)
    .then(response=>console.log(response))
//  This method only allows a string containing the tweet id as argument
//  and an optional object that allows the status/retweet spec
//
//






//  Now lets search some tweets
TB.search({q: '#javascript', count: 50, max_id: 123456})
    .then(response=>console.log(response))
//  The object provided should contain only the keys that the API provides
//
//
//



//  Now lets search a specific tweet
TB.search('123456789123')
    .then(response=>console.log(response))
//  This method only allows a string containing the tweet id as argument
//
//
//


//  Now lets search only the ids of some of your tweets
TB.getRetweets(options)
    .then(response=>console.log(response))
//  You MUST provide at least {id: 31321},
//  with the id of one of your tweets
//  the options that the API provides also are allowed.



//  Now lets search retweeters of a specific tweet
TB.reTweetersIds(options)
    .then(response=>console.log(response))
//  This method allows a string containing the tweet id as argument
//  and an object with the options that the API provides.



//  Who have been tweeting you?
TB.reTweetsOfMe(options?)
    .then(response=>console.log(response))
//  This method allows an optional object
//  containing all the optionsallowed 
//  in the statuses/home_timeline spec



//  Now lets look the statuses on someone time line
TB.userTimeLine({screen_name: 'super_cool_user'})
    .then(response=>console.log(response))
//  This method allows an object containing all the options
//  allowed in the statuses/user_timeline spec



//  Now lets look to our own feed
TB.homeTimeLine(options?)
    .then(response=>console.log(response))
//  This method allows an optional object
//  containing all the optionsallowed 
//  in the statuses/home_timeline spec


//  Now lets look at our mentions feed
TB.mentionsTimeLine(options?)
    .then(response=>console.log(response))
//  This method allows an optional object
//  containing all the optionsallowed 
//  in the statuses/home_timeline spec
```




## To Do
This is just a Quick Beta of the package.


* Add all the API services
* Remove OAuth dependency
* Make Dotenv dependency optional
* Expand this documentation









