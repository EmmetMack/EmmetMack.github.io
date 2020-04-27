import * as EPL from './modules/epl-JSON.js' 
import * as SerieA from './modules/seriea-JSON.js' 
import * as Ligue1 from './modules/ligue1-JSON.js' 
import * as Bundes from './modules/bundes-JSON.js' 
import * as LaLiga from './modules/laliga-JSON.js'

//mapbox library api access token
const mapboxToken = "pk.eyJ1IjoiZW1hY2siLCJhIjoiY2s5N2JrNHduMHRlOTNwbGNraHEwaWd3MyJ9.VvKNrlGdjwUi6dUOaWDx8A"

//Leaflet map stuff
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxToken, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: mapboxToken
}).addTo(mymap);

//country names to codes for geodecoding 
const country_lat = {
	"Andorra": 42.546245,
	"United Arab Emirates": 23.424076,
	"Afghanistan": 33.93911,
	"Antigua and Barbuda": 17.060816,
	"Anguilla": 18.220554,
	"Albania": 41.153332,
	"Armenia": 40.069099,
	"Angola": -11.202692,
	"Argentina": -38.416097,
	"American Samoa": -14.270972,
	"Austria": 47.516231,
	"Australia": -25.274398,
	"Aruba": 12.52111,
	"Azerbaijan" : 40.143105,
	"Bosnia and Herzegovina": 43.915886,
	"Barbados": 13.193887,
	"Bangladesh" : 23.684994,
	"Belgium" : 50.503887,
	"Burkina Faso" : 12.238333,
	"Bulgaria" : 42.733883,
	"Bahrain" : 25.930414,
	"Burundi" : -3.373056,
	"Benin" : 9.30769,
	"Bermuda" : 32.321384,
	"Burnei" : 4.535277,
	"Bolivia" : -16.290154,
	"Brazil" : -14.235004,
	"Bahamas" : 25.03428,
	"Botswana" : -22.328474,
	"Belarus" : 53.709807,
	"Belize" : 17.189877,
	"Canada" : 56.130366,
	"Democratic Republic of the Congo" : -4.038333,
	"Central African Republic" : 6.611111,
	"Congo" : -0.228021,
	"Switzerland" : 46.818188,
	"Côte d'Ivoire": 7.539989,
	"Chile" : -35.675147,
	"Cameroon" : 7.369722,
	"China" : 35.86166,
	"Colombia" : 4.570868,
	"Costa Rica" : 9.748917,
	"Cuba" : 21.521757,
	"Cyprus" : 35.126413,
	'Czech Republic': 49.817492,
	"Germany" : 51.165691,
	"Djibouti" : 11.825138, 
	"Denmark" : 56.26392,
	"Dominican Republic" : 18.735693,
	"Algeria" : 28.033886,
	"Ecuador" : -1.831239,
	"Estonia" : 58.595272,
	"Egypt" : 26.820553,
	"Spain" : 40.463667,
	"Ethiopia" : 9.145,
	"Finland" : 61.92411,
	"Fiji" : -16.578193,
	"Falkland Islands" : -51.796253,
	"Faroe Islands" : 61.892635,
	"France" : 46.227638,
	"Gabon" : -0.803689,
	"England" : 55.378051,
	"Scotland" : 55.953251,
	"Wales" : 51.481583,
	"Northern Ireland" : 54.607868,
	"Republic of Ireland" : 53.41291,
	"Grenada" : 12.262776,
	"Georgia" : 42.315407,
	"Ghana" : 7.946527,
	"Gambia" : 13.443182,
	"Greenland" : 71.706936,
	"Greece" : 39.074208,
	"Guatemala" : 15.783471, 
	"Honduras" : 15.199999,
	"Croatia" : 45.1,
	"Hungary" : 47.162494,
	"Haiti" : 18.971187,
	"Israel" : 31.046051,
	"India" : 20.593684,
	"Iraq" : 33.223191,
	"Iran" : 32.427908,
	"Iceland" : 64.963051,
	"Italy" : 41.87194,
	"Jamaica" : 18.109581,
	"Japan" : 36.204824,
	"Kenya" : -0.023559,
	"Kyrgyzstan" : 41.20438,
	"Republic of Korea" : 35.907757,
	"Kazakhstan" : 48.019573,
	"Morocco" : 31.791702,
	"Montenegro" : 42.708678,
	"Macedonia" : 41.608635,
	"Mali" : 17.570692,
	"Mexico" : 23.634501,
	"Nigeria" : 9.081999,
	"Netherlands": 52.132633,
	"Norway" : 60.472024,
	"New Zealand" : -40.900557,
	"Panama" : 8.537981,
	"Peru" : -9.189967,
	"Poland" : 51.919438,
	"Portugal": 39.399872,
	"Paraguay" : -23.442503,
	"Qatar" : 25.354826,
	"Romania": 45.943161,
	"Serbia" : 44.016521,
	"Russia" : 61.52401,
	"Saudi Arabia" : 23.885942,
	"Sweden" : 60.128161,
	"Slovenia" : 46.151241,
	"Slovakia" : 48.669026,
	"San Marino" : 43.94236,
	"Senegal" : 14.497401,
	"El Salvador" : 13.794185,
	"Togo" : 8.619543,
	"Tunisia" : 33.886917,
	"Turkey" : 38.963745,
	"Trinidad and Tobago": 	10.691803,
	"Tanzania" : -6.369028,
	"Ukraine" :48.379433,
	"United States of America" : 37.09024,
	"Uruguay" : -32.522779,
	"Venezuela" : 6.42375,
	"South Africa" : -30.559482,
	"Zambia" : 13.133897,
	"Zimbabwe" : -19.015438
}

const country_lng = {
	"Andorra": 1.601554,
	"United Arab Emirates": 53.847818,
	"Afghanistan": 67.709953,
	"Antigua and Barbuda": -61.796428,
	"Anguilla": -63.068615,
	"Albania": 20.168331,
	"Armenia": 45.038189,
	"Angola": 17.873887,
	"Argentina": -63.616672,
	"American Samoa": -170.132217,
	"Austria": 14.550072,
	"Australia": 133.775136,
	"Aruba": -69.968338,
	"Azerbaijan" : 47.576927,
	"Bosnia and Herzegovina": 17.679076,
	"Barbados": -59.543198,
	"Bangladesh" : 90.356331,
	"Belgium" : 4.469936,
	"Burkina Faso" : -1.561593,
	"Bulgaria" : 25.48583,
	"Bahrain" : 50.637772,
	"Burundi" : 29.918886,
	"Benin" : 2.315834,
	"Bermuda" : -64.75737,
	"Bolivia" : 63.588653,
	"Brazil" : -51.92528,
	"Bahamas" : -77.39628,
	"Botswana" :24.684866,
	"Belarus" : 27.953389,
	"Belize" : -88.49765,
	"Canada" : -106.346771,
	"Democratic Republic of the Congo" : 21.758664,
	"Central African Republic" : 20.939444,
	"Congo" : 15.827659,
	"Switzerland" : 8.227512,
	"Côte d'Ivoire": -5.54708,
	"Chile" : -71.542969,
	"Cameroon" : 12.354722,
	"China" : 104.195397,
	"Colombia" : -74.297333,
	"Costa Rica" : -83.753428,
	"Cuba" : -77.781167,
	"Cyprus" : 33.429859,
	'Czech Republic': 15.472962,
	"Germany" : 10.451526,
	"Djibouti" : 42.590275,
	"Denmark" : 9.501785,
	"Dominican Republic" : -70.162651,
	"Algeria" : 1.659626,
	"Ecuador" : -78.183406,
	"Estonia" : 25.013607,
	"Egypt" : 30.802498,
	"Spain" : -3.74922,
	"Ethiopia" : 40.489673,
	"Finland" : 25.748151,
	"Fiji" : 179.414413,
	"Falkland Islands" : -59.523613,
	"Faroe Islands" : -6.911806,
	"France" : 2.213749,
	"Gabon" : 11.609444,
	"England" : -3.435973,
	"Scotland" : -3.188267,
	"Wales" : -3.179090,
	"Northern Ireland" : -5.926437,
	"Republic of Ireland" : -8.24389,
	"Grenada" : -61.604171,
	"Georgia" : 43.356892,
	"Ghana" : 	-1.023194,
	"Gambia" : -15.310139,
	"Greenland" : 42.604303,
	"Greece" : 21.824312,
	"Honduras" : -86.241905,
	"Croatia" : 15.2,
	"Haiti" : -72.285215,
	"Hungary" : 19.503304,
	"Israel" : 34.851612,
	"India" :78.96288,
	"Iraq" : 43.679291,
	"Iran" : 53.688046,
	"Iceland" : -19.020835,
	"Italy" : 12.56738,
	"Jamaica" : -77.297508,
	"Japan" : 138.252924,
	"Kenya" : 37.906193	,
	"Kyrgyzstan" : 74.766098,
	"South Korea" : 127.766922,
	"Kazakhstan" : 66.923684,
	"Morocco" : -7.09262,
	"Montenegro" : 19.37439,
	"Macedonia" : 21.745275,
	"Mali" : 3.996166,
	"Mexico" : -102.552784,
	"Nigeria" : 8.675277,
	"Netherlands": 5.291266,
	"Norway" : 8.468946,
	"New Zealand" : 174.885971,
	"Panama" : -80.782127,
	"Peru" : -75.015152,
	"Poland" : 19.145136,
	"Portugal": -8.224454,
	"Paraguay" : -58.443832,
	"Qatar" : 51.183884,
	"Romania": 24.96676,
	"Serbia" : 21.005859,
	"Russia" : 105.318756,
	"Saudi Arabia" : 45.079162,
	"Sweden" : 18.643501,
	"Slovenia" : 14.995463,
	"Slovakia" : 19.699024,
	"San Marino" : 12.457777,
	"Senegal" : -14.452362,
	"El Salvador" : -88.89653,
	"Togo" : 0.824782,
	"Tunisia" : 9.537499,
	"Turkey" : 35.243322,
	"Trinidad and Tobago": -61.222503,
	"Tanzania" : 34.888822,
	"Ukraine" : 31.16558,
	"United States" : -95.712891,
	"Uruguay" : -55.765835,
	"Venezuela": -66.58973,
	"South Africa" : 22.937506,
	"Zambia" : 	27.849332,
	"Zimbabwe": 29.154857
}

//Football API requests

// const EnglandCountryID = "41";
// const FranceCountryID = "47";
// const GermanyCountryID = "49";
// const ItalyCountryID = "64";
// const SpainCountryId = "111";

//league id for top 5 european leagues for the 2019 season
const EnglandLeagueID = "524";
const FranceLeagueID = "525";
const GermanyLeagueID = "754";
const ItalyLeagueID = "891";
const SpainCountryID = "775";
//function that gets the teams for a specified league then adds the teams to the Team dropdown menu


	
var select = document.getElementById('country-sel') // event listner for when a team is selected

select.addEventListener('change', function() { getTeams()}); 

//function that gets the teams for a specified league then adds the teams to the Team dropdown menu
function getTeams() {

	console.log('get teams');
	
	var selectElement = document.getElementById('country-sel'); 
                      
    var output = selectElement.options[selectElement.selectedIndex].value; 

    var selectedLeagueId;

    var teams;

    if (output === "england") {
    	selectedLeagueId = EnglandLeagueID;
    } else if (output === "france") {
    	selectedLeagueId = FranceLeagueID;
    } else if (output === "germany") {
    	selectedLeagueId = GermanyLeagueID;
    } else if (output ==="italy") {
    	selectedLeagueId = ItalyLeagueID;
    } else if (output === "spain") {
    	selectedLeagueId = SpainCountryID;
    } 

    if (typeof(selectedLeagueId) !== "undefined") {
    	fetch("https://api-football-v1.p.rapidapi.com/v2/teams/league/" + selectedLeagueId, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
			"x-rapidapi-key": "51276867f1mshd9408b183cf575ap1f800djsn1decb01b15c8"
		}
		})
		.then(response => response.json())
		.then(data => {
			teams = data['api']['teams'];
			addTeams(teams);
			createPlayerForLeague(teams);
		})
		.catch(err => {
			console.log(err);
		});
    }
    	

}

// document.getElementById('team-sel').addEventListener('change', getPlayers());  event listner for getting the players from a team

//adds the teams for the selected league to the 'Teams' dropdown
function addTeams(teams) {
	console.log("add teams");

	document.getElementById('team-sel').options.length = 1; //clear out the dropdown options and then add the new ones

	var dropdown = document.getElementById("team-sel");

	for (var i = 0; i < teams.length; i ++) {
		var option = document.createElement("option");
		option.text = teams[i]["name"];
		option.value = teams[i]["team_id"];
		dropdown.add(option);
	}
	
}

// function getPlayers() {

// 	selectElement = document.querySelector('#team-sel'); 

// 	console.log(selectElement);
                      
//     output = selectElement.options[selectElement.selectedIndex].value;

//     console.log(output);

//     fetch("https://api-football-v1.p.rapidapi.com/v2/players/team/" + output + "/2019-2020", {
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
// 			"x-rapidapi-key": "51276867f1mshd9408b183cf575ap1f800djsn1decb01b15c8"
// 		}
// 	})
// 	.then(response => response.json())
// 	.then(data => {
// 		console.log(data);
// 		for (var i = 0; i < data.length; i++) {
// 			console.log(data['api']['player_name']);
// 		}
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});
// }

// found at this link https://www.quora.com/How-do-I-make-a-JSON-file-with-JavaScript, just used to download JSON so i wouldn't run into API rate limits
var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

//using this function create player JSON per team in a league, then once JSON is loaded will create player information 
// function createLeagueStats(teams) {
// 	

// 	console.log(teams.length);

// 	for(var i = 0; i < teams.length; i++) {

// 		 fetch("https://api-football-v1.p.rapidapi.com/v2/players/team/" + teams[i]["team_id"] + "/2019-2020", {
// 			"method": "GET",
// 			"headers": {
// 				"x-rapidapi-host": "api-football-v1.p.rapidapi.com",
// 				"x-rapidapi-key": "51276867f1mshd9408b183cf575ap1f800djsn1decb01b15c8"
// 			}
// 		})
// 		.then(response => response.json())
// 		.then(data => {

// 			console.log(data);

// 			var players = data['api']['players'];

// 			var teamName = data['api']['players'][0]['team_name'];

// 			// var teamName = new Blob(JSON.stringify(players, null, parseInt(data['api']['results'])), {type : 'application/json'});
// 			fileName = teamName + ".json";
 
// 			saveData(players, fileName);

// 		    console.log("file saved item set");

// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// 	}
// }

function createPlayerForLeague(teams) {

	var leaguePlayers = [];

	if (teams[0]["country"]=== "England") {
		var prefix = "EPL";
	} else if (teams[0]["country"] === "Italy") {
		var prefix = "SerieA";
	} else if (teams[0]["country"] === "Germany") {
		var prefix = "Bundes";
	} else if (teams[0]["country"] === "France") {
		var prefix = "Ligue1";
	} else if (teams[0]["country"] === "Spain") {
		var prefix = "LaLiga";
	}

	for(var i = 0; i < teams.length; i++) {

		var name = teams[i]["name"] 

		if (name === "1899 Hoffenheim") {
			name = "Hoffenheim";
		}
		var nameJSON = prefix + "." + name.replace(/ /g,'');
		var data = JSON.parse(eval(nameJSON));
		var players = data;
		
		players.forEach(function(player) {
			var playerObj = new Player(player['player_name'], player['birth_place'], player['birth_country'], player["team_name"], country_lat[player["birth_country"]], country_lng[player["birth_country"]]);
			var found = leaguePlayers.some(el => (el.name === playerObj.name && el.team === playerObj.team));
			if (!found) {
				leaguePlayers.push(playerObj);				
			}

		});
	}

	// console.log(leaguePlayers);

	var geoJSON = createGeoJSON(leaguePlayers);
	console.log(geoJSON);
			
}



function createGeoJSON(players) {

	console.log("createGeoJSON called");

	var locationJSON = {
					    "type": "FeatureCollection",
					    "features": []
	};

	//example GeoJSON
	// {
	// 	"geometry": {
	// 				  	"type": "Point",
	// 				     "coordinates": [
	// 				       	-76.9750541388,
	// 				        38.8410857803
	// 				     ]},
	// "type": "Feature",
	// "properties": {
	// 				            "description": "Southern Ave",
	// 				            "marker-symbol": "rail-metro",
	// 				            "title": "Southern Ave",
	// 				            "url": "http://www.wmata.com/rider_tools/pids/showpid.cfm?station_id=107",
	// 				            "lines": [
	// 				                "Green"
	// 				            ],
	// 				           "address": "1411 Southern Avenue, Temple Hills, MD 20748"
	// 				    }
 //        	

	for(var i = 0; i < players.length; i ++) {

		var player = players[i];

		if (locationJSON["features"].length == 0) {
			console.log("features length is zero");
			var newPlayerJSON =  createPlayerJSON(player);
			locationJSON["features"].push(newPlayerJSON);	
		} else {
			for(const [item, value] in locationJSON["features"]){
				console.log("item: " + item);
				console.log("value: " + value);
				if (value["properties"]["place"] == player.country) {
					console.log("found duplicate");
					value["properties"]["count"] += 1;
					value["properties"]["names"].push(player.name);
					value["properties"]["teams"].push(player.team);

				} else {
					var newPlayerJSON = createPlayerJSON(player);
					locationJSON["features"].push(newPlayerJSON);	
				}
			}
		
		}
		
	}

	return locationJSON;
	
}

function createPlayerJSON(player) {

	var playerJSON = {
		"geometry": {
			"type": "Point",
			"cords" : [
				player.lat, player.lng]},

			"type": "Feature",
			"properties": {
				"place": player.country,
				"count": 1,
				"names" : [player.name],
				"teams" : [player.team]
			}
	}

	return playerJSON;

}

function Player(name, city, country, team, lat, lng) {
		this.name = name;
		this.city = city;
		this.country = country;
		this.team = team;
		this.lat = lat
		this.lng = lng;
}
