const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

/* -----------------------------
   Current Weather (by city)
------------------------------ */
export async function getWeatherByCity(city) {
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  return res.json();
}

/* -----------------------------
   Forecast (5-day / 3-hour)
------------------------------ */
export async function getForecastByCity(city) {
  const res = await fetch(
    `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Forecast not available");
  }

  return res.json();
}

/* -----------------------------
   Weather by Coordinates
------------------------------ */
export async function getWeatherByCoords(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Location weather not found");
  }

  return res.json();
}

/* -----------------------------
   Forecast by Coordinates
------------------------------ */
export async function getForecastByCoords(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Forecast not available");
  }

  return res.json();
}

/* -----------------------------
   Air Pollution (AQI)
------------------------------ */
export async function getAQI(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error("AQI not available");
  }

  return res.json();
}