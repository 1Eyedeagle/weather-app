import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const fetchWeatherData = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=da029c6f6013da51e0096cff5e0d1060`;
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data); // Debug response
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Could not find weather data for this location.");
    }
  };

  useEffect(() => {
    fetchWeatherData("Faridabad");
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(location);
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter Location"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            {data?.name ? <p className="bold">{data.name}</p> : null}
          </div>
          <div className="temp">
            {data?.main?.temp ? <h1>{data.main.temp}°C</h1> : null}
          </div>
          <div className="description">
            {data?.weather?.[0]?.description ? (
              <p className="bold">{data.weather[0].description}</p>
            ) : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data?.main?.feels_like ? (
              <p className="bold">{data.main.feels_like}°C</p>
            ) : null}
            <p>Feels Like</p>
          </div>
          <div className="humidity">
            {data?.main?.humidity ? (
              <p className="bold">{data.main.humidity}%</p>
            ) : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data?.wind?.speed ? (
              <p className="bold">{data.wind.speed} km/h</p>
            ) : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
