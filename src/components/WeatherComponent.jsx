/* eslint-disable react/prop-types */

/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Typography, LinearProgress } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const API_KEY = "fd3d1e3aff2e41a2af0204259232808";
const API_BASE_URL = "https://api.weatherapi.com/v1";

const WeatherComponent = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await fetch(
        `${API_BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=es`
      );
      const weatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=6&lang=es`
      );
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeatherData();
    }
  };

  return (
    <div className="containerPrincipal">
      <div className="containerClimaHoy">
       <div className="buscar">
      <input className="input"
          type="text"
          placeholder="Buscar ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <button className="searchButton" onClick={handleSearch}>
          Buscar
        </button>
        </div>

      {weatherData && (
        <div className="climaHoy">

        <img src={weatherData.current.condition.icon}/>
        <div>
        <span className="c">
           {weatherData.current.temp_c} 
        </span>
        <span className="c1">°C</span>
        </div>
        <span className="climita">{weatherData.current.condition.text}</span>
          <span className="lugar">
           <FontAwesomeIcon icon={faLocationDot} />          Clima Actual en {weatherData.location.name},       {weatherData.location.country}
          </span>    
        </div>
      )}
      </div>  
      <div className="derecha">
      {forecastData && (
        <div className="pronostico" style={{ marginTop: "2rem" }}>
          
         <div className="cards">
            {forecastData.forecast.forecastday.slice(1, 6).map(day => (
              <div className="cardPronostico" key={day.date} style={{ textAlign: "center", marginBottom: "1rem" }}>
                <span>
                  {day.date === new Date().toISOString().slice(0, 10) ? "Mañana" : day.date}
                </span>
                <img src={day.day.condition.icon}/>
                <div className="s">
                <span className="s1">{day.day.maxtemp_c} °C</span>
                <span className="s2">{day.day.mintemp_c} °C</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
{weatherData && (
  <div className="detalles" style={{ marginTop: "2rem" }}>
  
        <div className="arriba">
      <div className="wind">
      <span className="ws1">Estado del viento</span>
      <span className="ws2">{weatherData.current.wind_kph} mph</span>
      </div>
      <div className="humidity">
        <span className="hs1">Humedad</span> 
        <span className="hs2">{weatherData.current.humidity} %</span>
        <LinearProgress
          variant="determinate"
          value={weatherData.current.humidity}
          sx={{ width: "80%", margin: "0 auto", marginTop: "0.5rem" }}
          min={0}
          max={100}
        />
        <div className="porcentaje" style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
          <Typography variant="caption">0</Typography>
          <Typography variant="caption">50</Typography>
          <Typography variant="caption">100</Typography>
        </div>
        </div>
        </div>
        <div className="abajo">
        <div className="visibility">
          <span className="vs1">Visibilidad</span>
          <span className="vs2">{weatherData.current.vis_km} km</span>
        </div>
        <div className="air">
          <span className="as1">Presion del aire</span>
          <span className="as2">{weatherData.current.pressure_mb} mb</span>
        </div>
        </div>
  </div>
)}
    </div>
</div> 
  );
};
export default WeatherComponent;
