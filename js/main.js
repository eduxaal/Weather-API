// imports
import { gotoPage } from "./services/navigation.js";
import { geolocation } from "./services/geolocation.js";
// Events
window.addEventListener('load', () => { init(); })

// Init
export function init() {
    console.log('Initializing main...');
    
    //change page function
    changePage();

    // invoke the function for the coordenates
    geolocation();
}

function changePage(){
    // show home
    gotoPage('weekly');

    // events
    document.getElementById('nav-weekly').addEventListener('click', () => { 
        gotoPage('weekly'); 
    });
    document.getElementById('nav-daily').addEventListener('click', () => { 
        gotoPage('daily'); 
    });
    document.getElementById('nav-hourly').addEventListener('click', () => { 
        gotoPage('hourly'); 
    });
}

export function showLocation(location){
    document.getElementById("location-label").textContent = location.LocalizedName;
}

export function formatDate(date) {
    var option = { month: "short", day: "numeric" };
    var date = new Date(date)
      .toLocaleDateString("us", option)
      .replace(/ /g, " ")
      .replace(".", "")
      .replace(/-([a-z])/, function (x) {
        return " " + x[1].toUpperCase();
      });
    return date;
  }
  
  export function time(hour) {
    var h = new Date(hour).getHours();
    var m = new Date(hour).getMinutes();
    var time = h + ":" + m;
    return time;
  }

// Handle error
function errorHandler(errorMessage) {
    console.log(errorMessage);
}