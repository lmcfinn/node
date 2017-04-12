//Keys to Twitter
var keys = require("./keys.js")
//NPM twitter package installed
var Twitter = require("twitter");


var spotify = require('spotify');
var request = require('request');


//1. Twiiter 

// See what's in keys. Added .twitterKeys to get inside the object
// console.log(keys.twitterKeys);


//Create my own version of the constructor
var client = new Twitter(keys.twitterKeys);

// Create a var that represents my Twitter handle 
var params = {
	screen_name: 'taipeispeeder'
};


function listTweets() {
	//Get data from Twitter
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < 20; i ++) {
  				console.log("--" + tweets[i].text + "--");
  			}
  		}
	});
}


if(process.argv[2] == "my-tweets") {
	listTweets();
};




//2. Spotify



