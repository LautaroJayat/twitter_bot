
# Quick Twitter Bot

A Twitter API client for the lazy generation.

Opinionated shorthands for the REST API.


## Installing

### **`npm install quick-twitter-bot`**


## Set Up

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


# Usage

You only need to set up your .env file as it's shown at the begining of the docs. You don't even need to create the Twitter Bot instance, you just require the object with it's methods.

**NOTE:** The output of all this promises is the actual response that the API provides, already parsed in JSON format.


```js
//  First require your keys in the .env file
require('dotenv').config();
//
//  Then require your Twitter Bot Object
const TB = require('quick-twitter-bot');
//
//
```

# Methods

1. [TB.newTweet(status, [options?])](#tbnewtweetstatus-options)

2. [TB.newTweetWithMedia(status, path, [options?])](#tbnewtweetwithmediastatus-path-options)

3. [TB.destroyTweet( id , [options?])](#tbdestroytweet-id--options)

4. [TB.reTweet( id, [options?])](#tbretweet-id-options)

5. [TB.unReTweet( id, [options?])](#tbunretweet123456789123-options)

6. [TB.searchTweets( [ options ] ) )](#tbsearchtweetsoptions)

7. [TB.getTweet( id )](#tbgettweet-id-)

8. [TB.getRetweets( id , [options?])](#tbgetretweets-id--options)

9. [TB.reTweetersIds( [ options ] )](#tbretweetersidsoptions)

10. [TB.reTweetsOfMe( [ options? ] )](#tbretweetsofmeoptions)

11. [TB.userTimeLine( options )](#tbusertimelineoptions)

12. [TB.homeTimeLine( [ options? ] )](#tbhometimelineoptions)

13. [TB.mentionsTimeLine( [ options? ] )](#tbmentionstimelineoptions)

14. [TB.shareMostRetweeted( [ query ] )](#tbsharemostretweetedquery)

1. [TB.shareMostLiked( [ query ] )](#tbsharemostlikedquery)

1. [TB.shareMostRetweetedOf( [ options ] )](#tbsharemostretweetedofoptions)

1. [TB.shareMostLikedOf( [ options ] )](#tbsharemostlikedofoptions)



## `TB.newTweet( status, [ options? ] )`
This method allows to create a new Twit.

**status**

A string containing what you want to tweet.

**options**

The options object should contain only the keys that the API provides.


```js
//  Lets tweet something
TB.newTweet('Hi from my Lazy twitter bot!', options?)
    .then(response=>console.log(response));
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update)


------

## TB.newTweetWithMedia( status, path, [ options? ] )
This method allows you to tweet and have an image in the tweet. The uploading process is managed behind the scenes by the library.

**status**

A string containing what you want to tweet.

**path**

A string the actual path that will be uploaded.

**options**

The options object should contain only the keys that the statuses/update API provides.


```js
//  Now lets post something with an image
TB.newTweetWithMedia('Check my cool photo!', './image.jpg', options?)
    .then(response=>console.log(response))
//  Twitter api server response in JSON format
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update)

-------

## TB.destroyTweet( id , [ options? ] )
This method allows you to destroy one of your tweets.

**id**

A string containing the id of the tweet.

**options**

The options object should contain only the keys that the API provides.


```js
//  Want to destroy that tweet?
TB.destroyTweet('123456789123', options?)
    .then(response=>console.log(response))
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-destroy-id)

-----------------

## TB.reTweet( id, [ options? ] )
This methods allows you to retweet something you want.

**id**

A string containing the id of the tweet.

**options**

The options object should contain only the keys that the API provides.

```js
//  Want to retweet something?
TB.reTweet('123456789123', options?)
    .then(response=>console.log(response))
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-retweet-id)

---------------

## TB.unReTweet( id, [ options? ])
This method allows you to undo one of your retweets.

**id**

A string containing the id of the tweet.

**options**

The options object should contain only the keys that the API provides.


```js
//  Want to destroy that retweet?
TB.unReTweet('123456789123', options?)
    .then(response=>console.log(response))
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-unretweet-id)

-----------

## TB.searchTweets( [ options ] )

This method allows you to use the search API.

**options**

The options object should contain only the keys that the API provides, and at least the **q** key 

    { q: 'query'}

in order to work correctly


```js
//  Now lets search some tweets
TB.searchTweets({q: '#javascript', count: 50, max_id: 123456})
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)

----------

## TB.getTweet( id )

This methods allows you to get information about one specific tweet.

**id**

A string containing the id of the tweet.


```js
//  Now lets view a specific tweet
TB.getTweet('123456789123')
    .then(response=>console.log(response))
```


----------

## TB.getRetweets( id , [ options? ] )
This method retrives the retweets of a specific tweet.

**id**

A string containing the id of a specific string

**options**

The options object should contain only the keys that the API provides

```js
//  Now lets search only the ids of some of your tweets
TB.getRetweets('123456789', [options?])
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets-id)

-----------

## TB.reTweetersIds( [ options ] )
This method allows you to get a list containing the retweeter's id of a specific tweet

**options**

An object containing at least the id of the tweet you want to get the retweeters from

```js
//  Now lets search retweeters of a specific tweet
TB.reTweetersIds({id: '12345789'})
    .then(response=>console.log(response))
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweeters-ids)

---------------------

## TB.reTweetsOfMe( [ options? ] )
This method allows you to know who has been retweeting you

**options**

This method allows an optional object with the options that the API provides.

```js
//  Who have been tweeting you?
TB.reTweetsOfMe(options?)
    .then(response=>console.log(response))
//  This method allows an optional object
//  containing all the optionsallowed 
//  in the statuses/home_timeline spec
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-retweets_of_me)

------------------

## TB.userTimeLine( options ) 
This method allows you to get information about a specific user timeline

**options**

You must provide at leas the screen name or the id of the user in the 'options' object

```js
//  Now lets look the statuses on someone time line
TB.userTimeLine({screen_name: 'super_cool_user'})
    .then(response=>console.log(response))
//  This method allows an object containing all the options
//  allowed in the statuses/user_timeline spec
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline)

-------------------

## TB.homeTimeLine( [ options? ] )
This method allows you to get information about your own timeline

**options**

This method is simple, you don't need to provide options if you don't want ;)

```js
//  Now lets look to our own feed
TB.homeTimeLine(options?)
    .then(response=>console.log(response))
//  This method allows an optional object
//  containing all the optionsallowed 
//  in the statuses/home_timeline spec
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-home_timeline)


-----------------------

## TB.mentionsTimeLine( [ options? ] )
This method allows you to get information about your own timeline

**options**

Returns the 20 most recent mentions (Tweets containing a users's @screen_name) for the authenticating user.

This method is simple, you don't need to provide options if you don't want ;)

```js
//  Now lets look at our mentions feed
TB.mentionsTimeLine(options?)
    .then(response=>console.log(response))
```
[Read more about the options.](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-mentions_timeline)

-------------------


## TB.shareMostRetweeted( [ query ] )
This method allows you to retweet the most retweeted tweet from the response of a specific query.

**query**

The query object should contain only the keys that the API provides, and at least the **q** key 

    { q: 'query'}

in order to work correctly

```js
//  Now lets look at our mentions feed
TB.shareMostRetweeted({q: "#WomanInTech",  lang: 'en'})
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)

-------------------

## TB.shareMostLiked( [ query ] )
This method allows you to retweet the most liked tweet from the response of a specific query.

**query**

The query object should contain only the keys that the API provides, and at least the **q** key 

    { q: 'query'}

in order to work correctly

```js
//  Now lets look at our mentions feed
TB.shareMostLiked({q: "#WomanInTech",  lang: 'en'})
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)

-------------------

## TB.shareMostRetweetedOf( [ options ] )
This method allows you to retweet the most retweeted tweet from the ones that are retrived from a user_timeline query.

**Note:** in order to avoid retweeting unwanted content we are filtering the tweets using this conditions

`tweet.is_quoted_status === false && tweet.in_reply_to_status_id === null`


**options**

You must provide at leas the screen name or the id of the user in the 'options' object


```js
//  Now lets look at our mentions feed
TB.shareMostRetweetedOf(screen_name: 'noob_curious', exclude_replies: true)
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline)

-------------------

## TB.shareMostLikedOf( [ options ] )
This method allows you to retweet the most liked tweet from the ones that are retrived from a user_timeline query.

**Note:** in order to avoid retweeting unwanted content we are filtering the tweets using this conditions

`tweet.is_quoted_status === false && tweet.in_reply_to_status_id === null`


**options**

You must provide at leas the screen name or the id of the user in the 'options' object


```js
//  Now lets look at our mentions feed
TB.shareMostLikedOf(screen_name: 'noob_curious', exclude_replies: true)
    .then(response=>console.log(response))
```

[Read more about the options.](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline)





## To Do
This is just a Quick Beta of the package.


* Add all the API services
* Remove OAuth dependency
* Make Dotenv dependency optional
* Expand this documentation









