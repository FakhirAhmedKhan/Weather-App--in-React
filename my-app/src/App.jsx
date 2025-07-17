import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import ErrorMessage from "./ErrorMessage";
import WeatherDetails from "./WeatherDetails";

const apiKey = "4eb9ad45d0fe50fb1c946e09e7e409dc";
const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

const formatWeather = (data) => ({
  city: data.name,
  country: data.sys.country,
  temperature: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  condition: data.weather[0].main,
  windSpeed: data.wind.speed,
  humidity: data.main.humidity,
  visibility: data.visibility / 1000,
  pressure: data.main.pressure,
});

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  const searchWeather = async (name) => {
    setError("");
    try {
      const res = await fetch(apiUrl(name));
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(formatWeather(data));
      setSearchHistory((prev) => {
        const updated = [
          name,
          ...prev.filter((c) => c.toLowerCase() !== name.toLowerCase()),
        ].slice(0, 5);
        localStorage.setItem("weatherHistory", JSON.stringify(updated));
        return updated;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setCity("");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) searchWeather(city.trim());
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("weatherHistory");
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("weatherHistory"));
    if (saved) setSearchHistory(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather App</h1>
          <p className="text-blue-100">Get current weather for any city</p>
        </header>

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={handleSearch}
          searchHistory={searchHistory}
          onHistoryClick={searchWeather}
        />

        {searchHistory.length > 0 && (
          <div className="text-center mb-4">
            <button
              onClick={clearHistory}
              className="mt-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/20 border border-white/20 rounded-md transition-all"
            >
              Clear History
            </button>
          </div>
        )}

        <ErrorMessage message={error} />
        {weather && <WeatherDetails weather={weather} />}

        <footer className="text-center mt-8 text-white/60">
          Powered by OpenWeatherMap API
        </footer>
      </div>
    </div>
  );
}
