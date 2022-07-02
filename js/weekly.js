// Imports
import { formatDate } from "./main.js";
import { time } from "./main.js";

//variables
var apiKey = "1RDnpQ1Oex1eVDMm5FtoB092MLs4AgJZ";

export async function init() {
  console.log("Initializing weekly forecast...");
}

export function key(key) {
  var keyLocation = key.Key;
  getConditions(keyLocation).then((response) => {
    try {
      showConditions(response.DailyForecasts);
    } catch {
      errorHandler();
    }
  });
}

export async function getConditions(cityKey) {
  // forecast API
  var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
  // Request
  var requestUrl = apiUrl + cityKey + "?apikey=" + apiKey;
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
        var tMin, tMax;
        var currentTime = new Date();
        var currentTime = currentTime.getHours(); 

        template.querySelector("#forecast-date").textContent = formatDate(e.Date).toUpperCase();

        // precipitation true/false
        if(e.Day.HasPrecipitation == true) 
            template.querySelector("#precipitation").textContent = "Precipitation: Yes";
        else template.querySelector("#precipitation").textContent = "Precipitation: No";

        // take the values of the temperature then convert them to Celsius, after that round them
        tMin = e.Temperature.Minimum.Value; tMax = e.Temperature.Maximum.Value;
        // C = (5/9)*(F-32)
        tMin = (5 / 9)*(tMin - 32); tMax = (5 / 9)*(tMax - 32);
        template.querySelector("#temp").textContent = Math.round(tMax) + "°C / " + Math.round(tMin) + "°C";

        // if we are over 6h and before 19h take the Day values, otherwise take the Night values
        if(currentTime <= 6 && currentTime >= 19){
            template.querySelector("#icon-phrase").textContent = e.Day.IconPhrase;
            template.querySelector("#wIcon").src = `icons/icons/${e.Day.Icon}.svg`;
        }
        else {
            template.querySelector("#icon-phrase").textContent = e.Night.IconPhrase;
            template.querySelector("#wIcon").src = `icons/icons/${e.Night.Icon}.svg`;
        }

        let clone = document.importNode(template, true); //clone fragment
        fragment.appendChild(clone); //add clone to fragment

        /* // current temperature
        document.getElementById("current-temp").textContent = Math.round(tMax); */
    });
    //add fragment to parent
    document.getElementById("template-forecast").appendChild(fragment);
}

// Handle error
function errorHandler(errorMessage) {
  console.log(errorMessage);
}
