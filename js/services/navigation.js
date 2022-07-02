// Imports
import { init as initWeekly } from '../weekly.js';
import { init as initDaily } from '../daily.js';
import { init as initHourly } from '../hourly.js';

// Variables
export var currentPage = 'weekly';
var selectedPage = null;

// Go to page
export function gotoPage(page){
    changeContent('components/' + page).then ( () => {
        switch(page){
            case 'weekly': initWeekly(); break;
            case 'daily': initDaily(); break;
            case 'hourly': initHourly(); break;
        }
        // change the selected page
        if(selectedPage != null)
            document.getElementById('nav-' + selectedPage).style.background = '#F2D0A4';
            document.getElementById('nav-' + page).style.background = '#EDBF82'; 
            selectedPage = page;
    });
}

// Change content
async function changeContent(url){
    // Fetch html document
    var requestUrl = window.location.href + url + '.html'; // Request url
    console.log('Changing content to ' + requestUrl);
    return fetch(requestUrl)
    .then((response)=>response.text())
    .then((html)=>{
        document.getElementById('container').innerHTML=html;
    });
}