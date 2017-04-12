//Keys to Twitter
var keys = require("./keys.js")
//NPM twitter package installed
var Twitter = require("twitter");


// var spotify = require('spotify');
var request = require('request');

// See what's in keys. Added .twitterKeys to get inside the object
console.log(keys.twitterKeys);





var myTweets = new Twitter(keys.twitterKeys);

//See what's in myTweets
// console.log(myTweets);


var params = {
	screen_name: 'taipeispeeder'
};

function getTweets() {

	myTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
    		console.log(tweets);
    		console.log("is it working?")
  		}
	});
};

getTweets();

