import "./App.css";
import config from "./config";
import { useEffect, useState } from "react";
import TempDetails from "./components/TempDetails";
import WeatherDetails from "./components/WeatherDetails.jsx";
import SearchBar from "./components/SearchBar";

function App() {
  const { API_TOKEN } = config;
  const [currentData, setCurrentData] = useState({});
  const [forecastData, setForecastData] = useState({});

  const [canUpdate, setCanUpdated] = useState(true);

  const [searchQuery, setSearchQuery] = useState("Sydney" || "");

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    // Preforms a API request and fetches data
    Promise.all([
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=metric&appid=${API_TOKEN}`
      ),
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${searchQuery}&units=metric&appid=${API_TOKEN}`
      ),
    ])
      .then(async ([weather, forecast]) => {
        if (weather.ok && forecast.ok) {
          const a = await weather.json();
          const b = await forecast.json();

          setCurrentData(a);
          setForecastData(b);
          setIsLoading(false);
        } else {
          console.error("Enter a correct city name");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateData = (e) => {
    fetchData();
    e.preventDefault();
  };

  return (
    <div className="container">
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        updateData={updateData}
      />
      {isLoading ? (
        <h1>LOADING PLEASE WAIT</h1>
      ) : (
        <TempDetails currentData={currentData} forecastData={forecastData} />
      )}
      {isLoading ? null : (
        <WeatherDetails currentData={currentData} forecastData={forecastData} />
      )}
    </div>
  );
}

export default App;
