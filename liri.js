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
  				console.log("-- " + tweets[i].text + " --");
  			}
  		}
	});
};

if (process.argv[2] == "my-tweets") {
	listTweets();
};


//2. Spotify

var song = process.argv[3];

function getSong() {
	spotify.search({ type: "track", query: song }, function(error, data) {
		if (error) {
			song = "The Sign"			
		    console.log(data.tracks.items[3].artists[0].name);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[3].name);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[3].preview_url);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[3].album.name);
		    return;
		} else {
			// console.log(data.tracks.items[0]);
		    console.log(data.tracks.items[0].artists[0].name);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[0].name);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[0].preview_url);
		    console.log("----------------------------------")
		    console.log(data.tracks.items[0].album.name);
		    console.log("----------------------------------")
		}
	});
};

if (process.argv[2] == "spotify-this-song") {
	getSong();
};








