import { key } from "../weekly.js";
import { keyH } from "../hourly.js";
import { showLocation } from "../main.js";

var apiKey = "1RDnpQ1Oex1eVDMm5FtoB092MLs4AgJZ";

// access the location through the browser
export async function geolocation(){
    if (!"geolocation" in navigator) {
		return alert("This browser don't support geolocation.");
	}
    var latitude = document.getElementById("lat-label");
    var longitude = document.getElementById("long-label");

    const onGrantedLocation = location => {
        console.log("Location obtained: ", location);
        const coordenates = location.coords;
        latitude.innerText = coordenates.latitude + ",";
        longitude.innerText = coordenates.longitude;

        getCityKey(coordenates.latitude, coordenates.longitude).then((response)=>{key(response);})
        getCityKey(coordenates.latitude, coordenates.longitude).then((response)=>{keyH(response);})
        getCityKey(coordenates.latitude, coordenates.longitude).then((response)=>{showLocation(response);})
    }
    const onLocationError = err => {
        latitude.innerText = "Error obtaining location: " + err.message;
        longitude.innerText = "Error obtaining location: " + err.message;
        console.log("Error obtaining location: ", err);
    }
    // request options
    const opc = {
        enableHighAccuracy: true, // High precision
        maximumAge: 0, // No cache
        timeout: 5000 // Wait 5s
    };

    latitude.innerText = "Loading...";
    longitude.innerText = "Loading...";
    navigator.geolocation.getCurrentPosition(onGrantedLocation, onLocationError, opc);
}

export async function getCityKey(lat, long) {
    // geolocation API
    var apiUrl =
      "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=";
    // Request
    var requestUrl = apiUrl + apiKey + "&q=" + lat + "%2C" + long;
    // Fetch response
    return await fetch(requestUrl)
      .then((response) => {
        return response.json();
      })
      .catch((response) => {
        console.log(response);
      });
  }