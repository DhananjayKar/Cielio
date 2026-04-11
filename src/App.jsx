import { useEffect, useState, useCallback } from "react";

import {
  getWeatherByCity,
  getForecastByCity,
  getWeatherByCoords,
  getForecastByCoords,
  getAQI,
} from "./services/weatherService";

import {
  formatTime,
  groupForecastByDay,
  getDay,
} from "./utils/helpers";

import {
  WEATHER_GRADIENTS,
  WEATHER_ICONS,
} from "./utils/constants";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import StatsGrid from "./components/StatsGrid";
import HourForecast from "./components/HourForecast";
import Forecast from "./components/Forecast";
import AQICard from "./components/AQICard";
import EmptyState from "./components/EmptyState";
import Loading from "./components/Loading";

export default function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourly, setHourly] = useState(null);
  const [aqi, setAqi] = useState(null);

  const [unit, setUnit] = useState("C");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [recentCities, setRecentCities] = useState(
    JSON.parse(localStorage.getItem("recentCities")) || []
  );

  const [animKey, setAnimKey] = useState(0);

  /* -----------------------------
     Temperature Formatter
  ------------------------------ */

  const temp = useCallback(
    (value) =>
      unit === "C"
        ? `${Math.round(value)}°C`
        : `${Math.round((value * 9) / 5 + 32)}°F`,
    [unit]
  );

  /* -----------------------------
     Recent Cities
  ------------------------------ */

  function addRecentCity(name) {

    const updated = [
      name,
      ...recentCities.filter((c) => c !== name),
    ].slice(0, 5);

    setRecentCities(updated);

    localStorage.setItem(
      "recentCities",
      JSON.stringify(updated)
    );
  }

  /* -----------------------------
     Fetch Weather (City)
  ------------------------------ */

  const fetchWeather = async (cityName) => {

    if (!cityName.trim()) return;

    try {

      setLoading(true);
      setError("");

      const weatherData =
        await getWeatherByCity(cityName);

      const forecastData =
        await getForecastByCity(cityName);

      const lat = weatherData.coord.lat;
      const lon = weatherData.coord.lon;

      const aqiData = await getAQI(lat, lon);

      setWeather(weatherData);

      setForecast(
        groupForecastByDay(forecastData.list)
      );

      setHourly(
        forecastData.list.slice(0, 8)
      );

      setAqi(aqiData);

      addRecentCity(weatherData.name);

      setAnimKey((k) => k + 1);

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  /* -----------------------------
     Fetch Weather (Coords)
  ------------------------------ */

  const fetchByCoords = async (lat, lon) => {

    try {

      setLoading(true);
      setError("");

      const [w, f, a] = await Promise.all([
        getWeatherByCoords(lat, lon),
        getForecastByCoords(lat, lon),
        getAQI(lat, lon),
      ]);

      setWeather(w);

      setForecast(
        groupForecastByDay(f.list)
      );

      setHourly(
        f.list.slice(0, 8)
      );

      setAqi(a);

      addRecentCity(w.name);

      setAnimKey((k) => k + 1);

    } catch (err) {

      setError("Unable to fetch location weather");

    } finally {

      setLoading(false);

    }
  };

  /* -----------------------------
     Geolocation
  ------------------------------ */

  const handleLocation = () => {

    if (!navigator.geolocation) {

      setError("Geolocation not supported");

      return;

    }

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        fetchByCoords(
          pos.coords.latitude,
          pos.coords.longitude
        );

      },

      () => setError("Location permission denied")

    );
  };

  /* -----------------------------
     Auto load last searched city
  ------------------------------ */

  useEffect(() => {

    const savedCity =
      localStorage.getItem("cielio-city");

    if (savedCity) {

      setCity(savedCity);
      fetchWeather(savedCity);

    } else {

      handleLocation();

    }

  }, []);

  /* -----------------------------
     Save last searched city
  ------------------------------ */

  useEffect(() => {

    if (recentCities.length > 0) {

      localStorage.setItem(
        "cielio-city",
        recentCities[0]
      );

    }

  }, [recentCities]);

  /* -----------------------------
     UI Theme
  ------------------------------ */

    const timezone = weather?.timezone || 0;

    const localTime = new Date(
      Date.now() + timezone * 1000
    );

    const hour = localTime.getUTCHours();

    const isNight = hour >= 19 || hour <= 5;
    
    const condition = weather?.weather?.[0]?.main;

    const bg = isNight
      ? WEATHER_GRADIENTS.night[condition] || WEATHER_GRADIENTS.night.default
      : WEATHER_GRADIENTS.day[condition] || WEATHER_GRADIENTS.day.default;

    const isLight =
      weather?.weather?.[0]?.main === "Snow" ||
      weather?.weather?.[0]?.main === "Mist";

    const textColor =
      isLight ? "text-slate-900" : "text-white";

  return (

    <div
      className={`relative min-h-screen bg-gradient-to-br ${bg} transition-all duration-700 p-4 md:p-8 font-sans`}
    >
      <div
        className={`max-w-5xl mx-auto w-full ${textColor}`}
      >

        {/* Header */}

        <Header
          unit={unit}
          setUnit={setUnit}
        />

        {/* Search */}

        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeather(city)}
          onLocation={handleLocation}
          recentCities={recentCities}
        />

        {/* Error */}

        {error && (

          <div className="bg-red-500/10 border-red-400/20 text-red-200 p-3 rounded-xl mb-4">

            {error}

          </div>

        )}

        {/* Loading */}

        {loading && <Loading />}

        {/* Content */}

        {!loading && weather && (

          <div
            key={animKey}
            className="space-y-4 md:space-y-5 fade-in"
          >

            <WeatherCard
              weather={weather}
              temp={temp}
            />

            <StatsGrid
              weather={weather}
              temp={temp}
            />

            <HourForecast
              hourly={hourly}
              temp={temp}
            />

            <Forecast
              forecast={forecast}
              temp={temp}
            />

            <AQICard
              aqi={aqi}
            />

          </div>

        )}

        {/* Empty */}

        {!loading && !weather && !error && (

          <EmptyState />

        )}

        <p className="text-center opacity-50 text-xs mt-8">

          Cielio • Weather Dashboard

        </p>

      </div>

    </div>

  );
}