import { formatDate } from "./main.js";

var apiKey = "1RDnpQ1Oex1eVDMm5FtoB092MLs4AgJZ";

export async function init() {
    console.log("Initializing hourly forecast...");
}

export function keyH(key) {
    var keyLocation = key;
    getConditions(keyLocation).then((response) => {
      try {
        showConditions(response);
      } catch {
        errorHandler();
      }
    });
  }
  
async function getConditions(cityKey) {
    // forecast API
    var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/";
    // Request
    var requestUrl = apiUrl + "241912" + "?apikey=" + apiKey;
    // Fetch response
    return fetch(requestUrl)
      .then((response) => {
        return response.json();
    })
    .catch((response) => {
        console.log(response);
    });
}

async function showConditions(conditions) {
    // template
    let template = document.getElementById("template-forecast").content;
    let fragment = document.createDocumentFragment();

    // read conditions
    conditions.forEach((e) => {
        console.log(e);
        var temperature;
        /* var currentTime = new Date();
        var currentTime = currentTime.getHours(); 

        template.querySelector("#forecast-date").textContent = formatDate(e.DateTime).toUpperCase();
        template.querySelector("#icon-phrase").textContent = e.IconPhrase;

        // precipitation true/false
        if(e.HasPrecipitation == true) 
            template.querySelector("#precipitation").textContent = "Precipitation: Yes";
        else template.querySelector("#precipitation").textContent = "Precipitation: No"; */

        // take the values of the temperature then convert them to Celsius, after that round them
        temperature = e.Temperature.Value; 
        // C = (5/9)*(F-32)
        temperature = (5 / 9)*(temperature - 32);
        /* template.querySelector("#temp").textContent = Math.round(temperature) + "°C";

        // if we are over 6h and before 19h take the Day values, otherwise take the Night values
        if(currentTime <= 6 && currentTime >= 19){
            template.querySelector("#wIcon").src = `icons/icons/${e.WeatherIcon}.svg`;
        }
        else {
            template.querySelector("#wIcon").src = `icons/icons/${e.WeatherIcon}.svg`;
        }

        let clone = document.importNode(template, true); //clone fragment
        fragment.appendChild(clone); //add clone to fragment */

        // current temperature
        document.getElementById("current-temp").textContent = Math.round(temperature);
    });
    //add fragment to parent
    document.getElementById("template-forecast").appendChild(fragment);
}