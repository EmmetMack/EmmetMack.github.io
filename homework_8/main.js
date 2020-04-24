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



document.getElementById('#country-sel').addEventListener('change', getTeams()); // event listner for when a team is selected

//function that gets the teams for a specified league then adds the teams to the Team dropdown menu
function getTeams() {

	selectElement = document.getElementById('country-sel'); 

	console.log(selectElement);
                      
    output = selectElement.options[selectElement.selectedIndex].value; 

    var selectedLeagueId;

    if (output === "england") {
    	console.log("England");
    	selectedLeagueId = EnglandLeagueID;
    } else if (output === "france") {
    	selectedLeagueId = FranceLeagueID;
    	console.log("France");
    } else if (output === "germany") {
    	console.log("Germany");
    	selectedLeagueId = GermanyLeagueID;
    } else if (output ==="italy") {
    	console.log("Italy");
    	selectedLeagueId = ItalyLeagueID;
    } else if (output === "spain") {
    	console.log("Spain");
    	selectedLeagueId = SpainCountryID;
    }

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
		createLeagueStats(teams);
	})
	.catch(err => {
		console.log(err);
	});
}

// document.getElementById('team-sel').addEventListener('change', getPlayers());  event listner for getting the players from a team

//adds the teams for the selected league to the 'Teams' dropdown
function addTeams(teams) {

	document.getElementById('team-sel').options.length = 1; //clear out the dropdown options and then add the new ones

	console.log(teams);

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

function createLeagueStats(teams) {

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

		if (name === "1899Hoffenheim") {
			name = "Hoffenheim";
		}
		
		var data = JSON.parse(eval(prefix + "."+ name.replace(" ", "")));

		var players = data['api']['players'];

		for (var j = 0; j < players.length; j++) {

				var player = new Player(players[j]['player_name'], players[j]['birth_place'], players[j]['birth_country'], players[j]["team_name"]);

				// console.log(player);
				if (!leaguePlayers.includes(player)) {
					leaguePlayers.push(player);
				}			
		}
	}
			
}

function Player(name, city, country, team) {
		this.name = name;
		this.city = city;
		this.country = country;
		this.team = team;
}
