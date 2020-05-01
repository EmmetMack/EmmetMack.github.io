import * as EPL from './modules/epl-JSON.js' 
import * as SerieA from './modules/seriea-JSON.js' 
import * as Ligue1 from './modules/ligue1-JSON.js' 
import * as Bundes from './modules/bundes-JSON.js' 
import * as LaLiga from './modules/laliga-JSON.js'

//mapbox library api access token
const mapboxToken = "pk.eyJ1IjoiZW1hY2siLCJhIjoiY2s5N2JrNHduMHRlOTNwbGNraHEwaWd3MyJ9.VvKNrlGdjwUi6dUOaWDx8A"

//Leaflet map stuff
// var mymap = L.map('mapid').setView([51.509865, -0.118092], 4);

// L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + mapboxToken, {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 17,
//     id: 'mapbox/light-v10',
//     tileSize: 516,
//     zoomOffset: -1,
//     accessToken: mapboxToken
// }).addTo(mymap);

//changed to mapbox only bc makes it easier to do the heatmap

var map = new mapboxgl.Map({
	container: 'mapid',
	style: 'mapbox://styles/mapbox/dark-v10',
	center: [-120, 50],
	zoom: 2,
	accessToken: mapboxToken
});


// Add a geojson point source.
// Heatmap layers also work with a vector tile source.

//country names to codes for geodecoding 
const country_lat = {
	"Andorra": 42.546245,
	"United Arab Emirates": 23.424076,
	"Afghanistan": 33.93911,
	"Antigua and Barbuda": 17.060816,
	"Anguilla": 18.220554,
	"Albania": 41.153332,
	"Armenia": 40.069099,
	"Netherlands Antilles": 12.226079,
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
	"Brunei" : 4.535277,
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
	"Grenada":12.262776,
	"England" : 51.509865,
	"Scotland" : 55.953251,
	"Wales" : 51.481583,
	"Northern Ireland" : 54.607868,
	"Republic of Ireland" : 53.41291,
	"Grenada" : 12.262776,
	"Georgia" : 42.315407,
	"French Guiana":3.933889,
	"Ghana" : 7.946527,
	"Gambia" : 13.443182,
	"Gibraltar": 36.137741,
	"Greenland" : 71.706936,
	"Guinea": 9.945587,
	"Guadeloupe":16.995971,
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
	"Lithuania": 55.169438,
	"Luxembourg": 49.815273,
	"Latvia": 56.879635,
	"Morocco" : 31.791702,
	"Montenegro" : 42.708678,
	"Macedonia" : 41.608635,
	"Mali" : 17.570692,
	"Mexico" : 23.634501,
	"Mozambique": -18.665695,
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
	"USA" : 37.09024,
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
	"Netherlands Antilles":-69.060087,
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
	"Brunei": 114.727669,
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
	"Grenada":-61.604171,
	"England" : -0.118092,
	"Scotland" : -3.188267,
	"Wales" : -3.179090,
	"Northern Ireland" : -5.926437,
	"Republic of Ireland" : -8.24389,
	"Grenada" : -61.604171,
	"Georgia" : 43.356892,
	"French Guiana": -53.125782,
	"Ghana" : 	-1.023194,
	"Gambia" : -15.310139,
	"Gibraltar": -5.345374,
	"Greenland" : 42.604303,
	"Guinea":-9.696645,
	"Guadeloupe":-62.067641,
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
	"Republic of Korea" : 127.766922,
	"Kazakhstan" : 66.923684,
	"Lithuania": 23.881275,
	"Luxembourg": 6.129583,
	"Latvia": 24.603189,
	"Morocco" : -7.09262,
	"Montenegro" : 19.37439,
	"Macedonia" : 21.745275,
	"Mali" : 3.996166,
	"Mexico" : -102.552784,
	"Mozambique": 35.529562,
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
	"USA" : -95.712891,
	"Uruguay" : -55.765835,
	"Venezuela": -66.58973,
	"South Africa" : 22.937506,
	"Zambia" : 	27.849332,
	"Zimbabwe": 29.154857
}

const countries = [
	"Andorra",
	"United Arab Emirates",
	"Afghanistan",
	"Antigua and Barbuda",
	"Anguilla",
	"Albania",
	"Armenia",
	"Netherlands Antilles",
	"Angola",
	"Argentina",
	"American Samoa",
	"Austria",
	"Australia",
	"Aruba",
	"Azerbaijan" ,
	"Bosnia and Herzegovina",
	"Barbados",
	"Bangladesh",
	"Belgium",
	"Burkina Faso",
	"Bulgaria" ,
	"Bahrain" ,
	"Burundi" ,
	"Benin" ,
	"Bermuda" ,
	"Brunei" ,
	"Bolivia" ,
	"Brazil" ,
	"Bahamas" ,
	"Botswana",
	"Belarus" ,
	"Belize" ,
	"Canada",
	"Democratic Republic of the Congo" ,
	"Central African Republic" ,
	"Congo" ,
	"Switzerland" ,
	"Côte d'Ivoire",
	"Chile" ,
	"Cameroon" ,
	"China",
	"Colombia" ,
	"Costa Rica",
	"Cuba" ,
	"Cyprus" ,
	'Czech Republic',
	"Germany" ,
	"Djibouti" , 
	"Denmark",
	"Dominican Republic",
	"Algeria",
	"Ecuador",
	"Estonia",
	"Egypt",
	"Spain",
	"Ethiopia",
	"Finland",
	"Fiji",
	"Falkland Islands",
	"Faroe Islands",
	"France" ,
	"Gabon" ,
	"Grenada",
	"England",
	"Scotland",
	"Wales" ,
	"Northern Ireland",
	"Republic of Ireland",
	"Grenada",
	"Georgia",
	"French Guiana",
	"Ghana",
	"Gambia",
	"Gibraltar",
	"Greenland",
	"Guinea",
	"Guadeloupe",
	"Greece",
	"Guatemala", 
	"Honduras",
	"Croatia",
	"Hungary",
	"Haiti" ,
	"Israel",
	"India",
	"Iraq",
	"Iran",
	"Iceland" ,
	"Italy",
	"Jamaica",
	"Japan" ,
	"Kenya",
	"Kyrgyzstan",
	"Republic of Korea",
	"Kazakhstan",
	"Lithuania",
	"Luxembourg",
	"Latvia",
	"Morocco",
	"Montenegro" ,
	"Macedonia",
	"Mali",
	"Mexico",
	"Mozambique",
	"Nigeria",
	"Netherlands",
	"Norway",
	"New Zealand",
	"Panama" ,
	"Peru",
	"Poland" ,
	"Portugal",
	"Paraguay",
	"Qatar" ,
	"Romania",
	"Serbia" ,
	"Russia",
	"Saudi Arabia" ,
	"Sweden" ,
	"Slovenia",
	"Slovakia" ,
	"San Marino",
	"Senegal" ,
	"El Salvador" ,
	"Togo" ,
	"Tunisia",
	"Turkey" ,
	"Trinidad and Tobago",
	"Tanzania" ,
	"Ukraine" ,
	"USA" ,
	"Uruguay",
	"Venezuela",
	"South Africa" ,
	"Zambia",
	"Zimbabwe"]

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
			teamsGlobal = teams; //global array of teams that changes when a new team was selected
			addTeams(teams);
			createPlayerForLeague(teams);
		})
		.catch(err => {
			console.log(err);
		});
    }
    	

}
var teamsGlobal;

// document.getElementById('team-sel').addEventListener('change', getPlayers());  event listner for getting the players from a team

//adds the teams for the selected league to the 'Teams' dropdown
function addTeams(teams) {
	console.log("add teams");

	document.getElementById('team-sel').options.length = 1; //clear out the dropdown options and then add the new ones

	var dropdown = document.getElementById("team-sel");

	for (var i = 0; i < teams.length; i ++) {
		var option = document.createElement("option");
		option.text = teams[i]["name"];
		option.value = teams[i]["name"];
		dropdown.add(option);
	}
	
}


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


var teamSelected = false;
//code to add circles to map for a specific team
var teamSelect = document.getElementById("team-sel"); // event listner for when a team is selected

teamSelect.addEventListener('change', function() {
	console.log("Even listener called");
	teamSelected = true;
	createPlayerForLeague(teamsGlobal);
 }); 

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

	if (typeof(teamSelect) !== "undefined" && teamSelect.value !== "Pick team here") {
		    console.log("In team select if")
		   	var output = teamSelect.options[teamSelect.selectedIndex].value; 
		    console.log("output.value: " + output.value);
		    var filteredLeaguePlayers = leaguePlayers.filter(function(el) {
		    	return el.team === output;
       		});
    	console.log("filteredLeaguePlayers: " + JSON.stringify(filteredLeaguePlayers));
    	var myGeoJSON = createGeoJSON(filteredLeaguePlayers);
    	teamSelected = false;
    } else {
    	var myGeoJSON = createGeoJSON(leaguePlayers);
    }
 
	console.log(myGeoJSON);
	
	var text = map.getLayer("country-count");
	var circleLayer = map.getLayer("soccer-point");
	var source = map.getSource("soccer");

	if (typeof text === "undefined") {

	} else {
		map.removeLayer("country-count");
	}

	if (typeof circleLayer === "undefined") {

	} else {
		map.removeLayer("soccer-point");
	}


	if (typeof source === "undefined") {

	} else {
		map.removeSource("soccer");

	}
	
	
	map.addSource('soccer', {
		'type': 'geojson',
		'data': myGeoJSON,
	});

	map.addLayer(
	{
	'id': 'soccer-point',
	'type': 'circle',
	'source': 'soccer',
	'minzoom': 1,
	'paint': {
	// Size circle radius by earthquake magnitude and zoom level
		'circle-radius': [
			'interpolate',
			['linear'],
			['zoom'],
			1,
			['interpolate', ['linear'], ['get', "count"], 0, 5,7, 10, 15, 20, 25, 30],
			7,
			['interpolate', ['linear'], ['get', "count"], 0, 5,7, 10, 15, 20, 25, 30],
			16, ['interpolate', ['linear'], ['get', 'count'],0, 3, 4, 5, 7, 10, 15, 25]
			],
		// Color circle by earthquake magnitude
		'circle-color': [
		'interpolate',
		['linear'],
		['get', 'count'],
		0,
		'#FFFFFF',
		1,
		'#D8EBCC',
		10,
		'#B1D799',
		20,
		'#8BC467',
		35,
		'#64B034',
		100,
		'#3E9D02'
		],
		'circle-stroke-color': 'white',
		'circle-stroke-width': 1
		
		}});

	 map.addLayer({
        id: "country-count",
        type: "symbol",
        source: "soccer",
        layout: {
        "text-field": ['get', "count"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12
        },
        paint: {
		  "text-color": "#000000"
		}
      });

	map.on('click', 'soccer-point', function(e) {
	  new mapboxgl.Popup()
	    .setLngLat(e.features[0].geometry.coordinates)
	    .setHTML('<b>Country: </b>' + " " + e.features[0].properties.country + '<b> Count: </b>' + " " + e.features[0].properties.count)
	    .addTo(map);
	});
	
}


var maxCount = -1;
var total = 0;
function createGeoJSON(players) {

	console.log("createGeoJSON called");

	var locationJSON = {
					    type: "FeatureCollection", 
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
 	total = 0;
 	var countryCounts = {};
 	 countries.forEach(function(place) {
 		var count = players.reduce((acc, cur) => cur.country === place ? ++acc : acc, 0);

 		if (count !== 0) {
 			countryCounts[place] = count;
 			if (count > maxCount) {
 				maxCount = count;
 			}

 			total += count;
 		}
 	});
 	
 	console.log(countryCounts);
 	var countryProbs = {};
 	Object.keys(countryCounts).forEach(function(key) {
  			var countryJSON = {
	 			"geometry": {

					"type": "Point",
					"coordinates" : [
						country_lng[key], country_lat[key]]},

				"type": "Feature",
				"properties": {
					"country": key,
					"rel_mag": countryCounts[key]/ maxCount,
					"count": countryCounts[key]
				}
 			}
 			countryProbs[key] = countryCounts[key] / total; //probabilitiy of a player being from that country for that league
 			locationJSON["features"].push(countryJSON);
 		
 	});

 	console.log("countryProbs: " + JSON.stringify(countryProbs));
	// for(var i = 0; i < players.length; i ++) {

	// 	var player = players[i];

	// 	if (locationJSON["features"].length == 0) {
	// 		console.log("features length is zero");
	// 		var newPlayerJSON =  createPlayerJSON(player);
	// 		locationJSON["features"].push(newPlayerJSON);	
	// 	} else {

	// 			locationJSON["features"].forEach(function(feature) {
	// 				console.log("Feature: " + feature);
	// 				if (feature["properties"]["place"] == player.country) {
	// 					console.log("found duplicate");
	// 					feature["properties"]["count"] += 1;
	// 					feature["properties"]["names"].push(player.name);
	// 					feature["properties"]["teams"].push(player.team);
	// 				} else {
	// 					var newPlayerJSON = createPlayerJSON(player);
	// 					locationJSON["features"].push(newPlayerJSON);	
	// 				}

	// 		});
	// 		// for(const [item, value] in JSON.parse(locationJSON["features"])){
	// 		// 	console.log("item: " + item);
	// 		// 	console.log("value: " + value);
	// 		// 	if (value["properties"]["place"] == player.country) {
	// 		// 		console.log("found duplicate");
	// 		// 		value["properties"]["count"] += 1;
	// 		// 		value["properties"]["names"].push(player.name);
	// 		// 		value["properties"]["teams"].push(player.team);

	// 		// 	} else {
	// 		// 		var newPlayerJSON = createPlayerJSON(player);
	// 		// 		locationJSON["features"].push(newPlayerJSON);	
	// 		// 	}
	// 		// }
		
	// 	}
		
	// }

	return locationJSON;
	
}


function Player(name, city, country, team, lat, lng) {
		this.name = name;
		this.city = city;
		this.country = country;
		this.team = team;
		this.lat = lat
		this.lng = lng;
}
