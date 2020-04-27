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
const country_codes = {
	"Andorra": "AD",
	"United Arab Emirates": "AE",
	"Afghanistan": "AF",
	"Antigua and Barbuda": "AG",
	"Anguilla": "AI",
	"Albania": "AL",
	"Armenia": "AM",
	"Angola": "AO",
	"Argentina": "AR",
	"American Samoa": "AS",
	"Austria": "AT",
	"Australia": "AU",
	"Aruba": "AW",
	"Azerbaijan" : "AZ",
	"Bosnia and Herzegovina": "BA",
	"Barbados": "BB",
	"Bangladesh" : "BD",
	"Belgium" : "BE",
	"Burkina Faso" : "BF",
	"Bulgaria" : "BG",
	"Bahrain" : "BH",
	"Burundi" : "BI",
	"Benin" : "BJ",
	"Bermuda" : "BM",
	"Bolivia" : "BO",
	"Bonaire" : "BQ",
	"Brazil" : "BR",
	"Bahamas" : "BS",
	"Botswana" : "BW",
	"Belarus" : "BY",
	"Belize" : "BZ",
	"Canada" : "CA",
	"Democratic Republic of the Congo" : "CD",
	"Central African Republic" : "CF",
	"Congo" : "CG",
	"Switzerland" : "CH",
	"Côte d'Ivoire": "CI",
	"Chile" : "CL",
	"Cameroon" : "CM",
	"China" : "CN",
	"Colombia" : "CO",
	"Costa Rica" : "CR",
	"Cuba" : "CU",
	"Cyprus" : "CY",
	'Czech Republic': "CZ",
	"Germany" : "DE",
	"Denmark" : "DK",
	"Algeria" : "DZ",
	"Ecuador" : "EC",
	"Estonia" : "EE",
	"Egypt" : "EG",
	"Spain" : "ES",
	"Ethiopia" : "ET",
	"Finland" : "FI",
	"Fiji" : "FJ",
	"Falkland Islands" : "FK",
	"Faroe Islands" : "FO",
	"France" : "FR",
	"Gabon" : "GA",
	"England" : "GB",
	"Scotland" : "GB",
	"Wales" : "GB",
	"Northern Ireland" : "GB",
	"Republic of Ireland" : "IE",
	"Grenada" : "GD",
	"Georgia" : "GE",
	"Ghana" : "GH",
	"Gambia" : "GM",
	"Greenland" : "GL",
	"Greece" : "GR",
	"Honduras" : "HN",
	"Croatia" : "HR",
	"Hungary" : "HU",
	"Israel" : "IL",
	"India" : "IN",
	"Iraq" : "IQ",
	"Iran" : "IR",
	"Iceland" : "IS",
	"Italy" : "IT",
	"Jamaica" : "JM",
	"Japan" : "JP",
	"Kenya" : "KE",
	"Kyrgyzstan" : "KG",
	"Republic of Korea" : "KR",
	"Kazakhstan" : "KZ",
	"Morocco" : "MA",
	"Montenegro" : "ME",
	"Mexico" : "MX",
	"Nigeria" : "NG",
	"Netherlands": "NL",
	"New Zealand" : "NZ",
	"Panama" : "PA",
	"Peru" : "PE",
	"Poland" : "PL",
	"Portugal": "PT",
	"Paraguay" : "PY",
	"Qatar" : "QA",
	"Romania": "RO",
	"Serbia" : "RS",
	"Russian Federation" : "RU",
	"Saudi Arabia" : "SA",
	"Sweden" : "SE",
	"Slovenia" : "SI",
	"Slovakia" : "SK",
	"San Marino" : "SM",
	"Senegal" : "SN",
	"El Salvador" : "SV",
	"Togo" : "TG",
	"Turkey" : "TR",
	"Ukraine" : "UA",
	"United States of America" : "UA",
	"Uruguay" : "UY",
	"South Africa" : "ZA"
}

const maps_api_key = "AIzaSyATi23iBvfHagwQ5C_U3-qPzCfBJCTzouE";

var geocoder = new google.maps.Geocoder();

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
		console.log(players);
		
		players.forEach(function(player) {
			if (!(leaguePlayers.some(el => (el.name === player.name && el.team === player.team)))) {
					geocoder.geocode( {address: getLocationString(player["birth_place"], player["birth_country"])}, function(results, status) {

					if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
						var google_location = results[0].geometry.location,
							lat = google_location.lat(),
							lng = google_location.lng();

						console.log("player name: " + player['player_name']);
						var playerObj = new Player(player['player_name'], player['birth_place'], player['birth_country'], player["team_name"], lat, lng);

					
						console.log(player);
						
						leaguePlayers.push(playerObj);		
					}
				});
					
			}
			
		});
	}

	createGeoJSON(leaguePlayers);
			
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
	// 				    "type": "Feature",
	// 				    "properties": {
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

	console.log(players.length);
	for(var i = 0; i < players.length; i ++) {

		var player = players[i];

		// var location = getLocationString(player.city, player.country);
		console.log("features array length: " + locationJSON["features"].length);
		console.log("features array: " + locationJSON["features"]);
		if (locationJSON["features"].length == 0) {
			var newPlayerJSON =  createPlayerJSON(player);
			console.log("playerJSON: " + JSON.stringify(newPlayerJSON));
			console.log("locationJSON: " + JSON.stringify(locationJSON));
			console.log("features" + locationJSON["features"]);
			locationJSON["features"].push(newPlayerJSON);	
			console.log("features array length after pushing: " + locationJSON["features"].length);
		} else {
			console.log("feature length in else statement: " + locationJSON["features"].length);
			for (var j = 0; j < locationJSON["features"].length; j ++ ) {
				console.log("looping through features");
				console.log("locationJSON: " + JSON.stringify(locationJSON));
				if (locationJSON["features"][j]["geometry"]["properties"]["place"] == getLocationString(player.city, player.country)) {
					locationJSON["features"][j]["geometry"]["properties"]["count"] += 1;
					locationJSON["features"][j]["geometry"]["properties"]["names"].push(player.name);
					locationJSON["features"][j]["geometry"]["properties"]["teams"].push(player.team);

				} else {
					var newPlayerJSON = createPlayerJSON(player);
					console.log("playerJSON: " + newPlayerJSON);
					locationJSON["features"].push(newPlayerJSON);	
					console.log("features array length after pushing: " + locationJSON["features"].length);
				}
			}
		
		}
		
	}
	
	console.log(JSON.stringify(locationJSON));

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
				"place": getLocationString(player.name, player.country),
				"count": 1,
				"names" : [player.name],
				"teams" : [player.team]
			}
	}

	return playerJSON;

}


function getLocationString(city, country) {
	if (city) {
		return city +", " + country_codes[country];
	} else {
		return country_codes[country];
	}
	
}

function Player(name, city, country, team, lat, lng) {
		this.name = name;
		this.city = city;
		this.country = country;
		this.team = team;
		this.lat = lat
		this.lng = lng;
}
