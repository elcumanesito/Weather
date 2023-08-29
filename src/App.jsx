/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Typography, TextField, Button, LinearProgress } from "@mui/material";

const API_KEY = "fd3d1e3aff2e41a2af0204259232808";
const API_BASE_URL = "https://api.weatherapi.com/v1";

const App = () => {
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
    fetchWeatherData();
  };

  return (
    <div className="containerPrincipal">
      <div className="containerClimaHoy">
    
      <Typography variant="h4" align="center" gutterBottom>
        Weather App
      </Typography>
      <TextField
        label="Buscar ciudad"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        fullWidth
        style={{ marginBottom: "1rem" }}
      >
        Buscar Clima
      </Button>

      {weatherData && (
        <div className="climaHoy">
          <Typography variant="h6" align="center" gutterBottom>
            Clima Actual en {weatherData.location.name}, {weatherData.location.country}
          </Typography>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <img src={weatherData.current.condition.icon} alt={weatherData.current.condition.text} />
            <Typography variant="h6" style={{ marginLeft: "1rem" }}>
              {weatherData.current.condition.text}
            </Typography>
          </div>
          <Typography variant="h5" align="center">
            Temperatura: {weatherData.current.temp_c} °C
          </Typography>
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
                <img src={day.day.condition.icon} alt={day.day.condition.text} />
                <span>{day.day.maxtemp_c} °C</span>
                <span>{day.day.mintemp_c} °C</span>
              </div>
            ))}
          </div>
        </div>
      )}

{weatherData && (
  <div className="detalles" style={{ marginTop: "2rem" }}>
    
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div className="arriba">
      <div className="wind"><span>Wind Status: {weatherData.current.wind_kph} mph</span></div>
      <div className="humidity"><span >Humidity: {weatherData.current.humidity} %</span>
        <LinearProgress
          variant="determinate"
          value={weatherData.current.humidity}
          sx={{ width: "80%", margin: "0 auto", marginTop: "0.5rem" }}
          min={0}
          max={100}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
          <Typography variant="caption">0</Typography>
          <Typography variant="caption">50</Typography>
          <Typography variant="caption">100</Typography>
        </div>
        </div>
        </div>
        <div className="abajo">
        <div className="visibility"><span>Visibility: {weatherData.current.vis_km} km</span></div>
        <div className="air"><span>Air Pressure: {weatherData.current.pressure_mb} mb</span></div>
        </div>

      </div>
    </div>
  </div>
)}
  <span className="cositaDeAbajo">
  Creado por Danielito, mil tutoriales y Google 
  </span>
    

    </div>

</div>

    
  );
};

export default App;
