//http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=JwkMEdbsAtAi3hoHMByOScrOLYfcYWZV&q=benha




//api key



//http://dataservice.accuweather.com/forecasts/v1/daily/5day/83238?apikey=JwkMEdbsAtAi3hoHMByOScrOLYfcYWZV



//response





"use strict";




let currentDayCard = document.getElementById('currentDayCard');
let tomorrowDayCard = document.getElementById('tomorrowDayCard');
let dayAftertomorrowCard = document.getElementById('dayAftertomorrowCard');
let searchInput = document.getElementById('searchInput').value;
let findBtn=document.getElementById('findBtn');
let finalRes;
let result = {};

async function getKey(searchInput){
const api=await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=JwkMEdbsAtAi3hoHMByOScrOLYfcYWZV&q=${searchInput}`)
const Res=await api.json();
 finalRes=await Res[0].Key;
}

async function weather(finalRes) {
  let condition = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${finalRes}?apikey=JwkMEdbsAtAi3hoHMByOScrOLYfcYWZV`)
  result = await condition.json();
}
async function waiting() {
  await getKey('cairo')
   weather('127164');
 
}
waiting();

function displayWeatherData() {

  currentDayCard.innerHTML = `
                              <div class="day d-flex justify-content-between bg-info-subtle p-2 rounded-2 ">
                              <h3 id="currentDay"></h3>
                              <h3 id="currentDate" class="date">${result.forecast.forecastday[0].date}</h3>
                              </div>
                              <div class="card-body">
                              <div class="weatherDegree d-flex justify-content-between align-items-center">
                              <h2 id="degree" class="">${result.current.temp_c}<sup>o</sup>c</h2>
                              <img id="weatherDescription" width="42%" src="${result.current.condition.icon}">
                              </div>
                              <div class="word my-3">
                              <p id="weatherWord">${result.current.condition.text}</p>
                              </div>

                              <div class="weatherIcons d-flex ">
                              <div class="d-flex mx-2 justify-content-evenly align-items-lg-baseline me-2 rain">
                              <i id="rain" class="fa-solid fa-umbrella"></i>
                              <p id="rainPercent">${result.current.cloud}%</p>
                              </div>
                              <div class="d-flex mx-2 justify-content-evenly align-items-lg-baseline me-2 wind">
                              <i id="wind" class="fa-solid fa-wind"></i>
                              <p id="windspeed">${result.current.wind_kph}</p>
                              </div>
                              <div class="d-flex mx-2 justify-content-evenly align-items-lg-baseline me-2 direction">
                              <i id="direction" class="fa-solid fa-compass"></i>
                              <p id="directionInWords">${result.current.wind_dir}</p>
                              </div>
                              </div>
                              </div>
`
  tomorrowDayCard.innerHTML =
    `<div class="card p-5  ">
                              <div class='bg-info-subtle p-2 rounded-2'><h3 id="day" class="next-day text-center px-5">Sunday</h3></div>
                              
                              <div class="card-body text-center px-5">
                              <div class="div"><img src="${result.forecast.forecastday[1].day.condition.icon}" width="50%" alt=""></div>
                              <h5 class="px-4">${result.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h5>
                              <p>${result.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></p>
                              <h4>${result.forecast.forecastday[1].day.condition.text}</h4>
                              </div>                                
`
  dayAftertomorrowCard.innerHTML = `
                              <div class="card p-5  ">
                              <div class='bg-info-subtle p-2 rounded-2'><h3 id="day" class="next-day text-center px-5">Sunday</h3></div>
                              
                              <div class="card-body text-center px-5">
                              <div class="div"><img src="${result.forecast.forecastday[2].day.condition.icon}" width="50%" alt=""></div>
                              <h5 class="px-4">${result.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h5>
                              <p>${result.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></p>
                              <h4>${result.forecast.forecastday[2].day.condition.text}</h4>
                              </div>
                              </div>`
}




// // function day(){
// //   let daysArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// //   let day = new Date().getDay();
// //   dayName = daysArray[day];  
// // }
// findBtn.addEventListener('click', function () {
//   findInput;
//   displayWeatherData();
//  })