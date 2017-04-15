//Keys to Twitter
var keys = require("./keys.js")
//NPM twitter package installed
var Twitter = require("twitter");
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');


//1. Twiiter 

// See what's in keys. Added .twitterKeys to get inside the object
// console.log(keys.twitterKeys);

//Create my own version of the constructor
var client = new Twitter(keys.twitterKeys);

// Create a var that represents my Twitter handle 
var params = {
	screen_name: 'taipeispeeder'
};

function getTweets() {
	//Get data from Twitter
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			for (var i = 0; i < 20; i ++) {
  				console.log("-- " + tweets[i].text + " --");
  			}
  		}
	});
};

//Set up command to execute getTweets function
if (process.argv[2] == "my-tweets") {
	getTweets();
};


//2. Spotify

//Set up terminal input
var song = process.argv[3];
var noSong = "The Sign";

//Create a function to get song data
function getSong() {
	spotify.search({ type: "track", query: song }, function(error, data) {
		if (!error){
			if (song) {
				// console.log(data.tracks.items[0]);
			    printSongResults(data, 0);
			} 
			if (!song) {
				// console.log("nothing")
				spotify.search({ type: "track", query: noSong }, function(error, data) {
					if (!error) {
				    	printSongResults(data, 3);
					}
				}); 
			};
		};
	});
};

//Set up this function to avoid repeating code
function printSongResults(x, indexNumber) {
	console.log(x.tracks.items[indexNumber].artists[0].name);
    console.log("----------------------------------")
    console.log(x.tracks.items[indexNumber].name);
    console.log("----------------------------------")
    console.log(x.tracks.items[indexNumber].preview_url);
    console.log("----------------------------------")
    console.log(x.tracks.items[indexNumber].album.name);
    console.log("----------------------------------")
}

//Set up command to execute getSong function
if (process.argv[2] == "spotify-this-song") {
	getSong();
};


//3. Request OMBI

//Set up terminal input
var movie = process.argv[3];

//Create a function to get movie data
function getMovie(){

	if(movie){
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&r=json", function (error, response, body) {
			if (!error && response.statusCode === 200) {
				printMovieResults(body);
			};
		});
	}

	if(!movie){
		request("http://www.omdbapi.com/?t=" + "Mr. Nobody" + "&y=&plot=short&r=json", function (error, response, body) {
			if (!error && response.statusCode === 200) {
				printMovieResults(body);
			};
		});
	}
};

//Create this function to avoid repeating code
function printMovieResults(y){
	console.log("Title of the movie: " + JSON.parse(y).Title);
	console.log("Year the movie came out: " + JSON.parse(y).Year);
	console.log("IMDB Rating of the movie: " + JSON.parse(y).imdbRating);
	console.log("Country where the movie was produced: " + JSON.parse(y).Country);
	console.log("Language of the movie: " + JSON.parse(y).Language);
	console.log("Plot: " + JSON.parse(y).Plot);
	console.log("Actors in the movie: " + JSON.parse(y).Actors);
	console.log("Website: " + JSON.parse(y).Website);
}

//Set up command to execute getMovie function
if (process.argv[2] == "movie-this") {
	getMovie();
};


//4. Do what it says

//Access random.tet via node fs
fs.readFile("random.txt", "utf8", function(error, data) {
	// console.log(data);
	
	//Make what's in random.txt into an array
	var dataArr = data.split(",");
	// console.log(dataArr[0] + " " + dataArr[1]);

	var dataCommand = dataArr[0];
	var dataInput = dataArr[1];

	// Create function to call up the song accordingly to waht's in random.txt
	function doThis(){
		if (dataCommand == "spotify-this-song"){
			spotify.search({ type: "track", query: dataInput }, function(error, data) {
				if (!error){
					if (dataInput) {
			    		printSongResults(data, 0);
					}; 
				};
			});
		};
	};

	//Set up command to execute doThis function
	if(process.argv[2] == "do-what-it-says"){
		doThis();
	}
});


 












