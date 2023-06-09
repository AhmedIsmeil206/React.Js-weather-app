import './index.css';
import React, { useState } from 'react';
const api = {
  key : "d8edb188b8a9dce1e78b3bc55d1a2c59",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
//general form to fetch a data  
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
  
      return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App winter' : 'App') : 'App'}>
      <main>
        <div className="search">
          <input type="text" className="bar" placeholder="Search City , Country..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
  
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="place">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="temp">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="temp">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;


//app=app
//search-box = search
//location-box = place
//search-bar= bar
//wather = temp


