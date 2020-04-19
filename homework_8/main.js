
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