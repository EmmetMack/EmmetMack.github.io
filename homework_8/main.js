
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


function getTeams() {

	selectElement = document.querySelector('#country-sel'); 

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
	})
	.catch(err => {
		console.log(err);
	});
}

function addTeams(teams) {

	document.getElementById('team-sel').options.length = 0; //clear out the dropdown options and then add the new ones

	console.log(teams);

	var dropdown = document.getElementById("team-sel");

	for (var i = 0; i < teams.length; i ++) {
		var option = document.createElement("option");
		option.text = teams[i]["name"];
		option.value = teams[i]["team_id"];
		dropdown.add(option);
	}
	
}

