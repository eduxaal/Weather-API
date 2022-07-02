//variables
var apiKey = "1RDnpQ1Oex1eVDMm5FtoB092MLs4AgJZ";

export function init(){
    console.log("Initializing daily forecast...");
}

/* export function key(key) {
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
    var apiUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/1day/";
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
} */