import { DAYS } from "./constants";

// /* -----------------------------
//    Temperature Conversions
// ------------------------------ */

// export function kelvinToCelsius(k) {
//   return Math.round(k - 273.15);
// }

// export function kelvinToFahrenheit(k) {
//   return Math.round((k - 273.15) * 9 / 5 + 32);
// }

/* -----------------------------
   Time Formatting
------------------------------ */

export function formatTime(unix) {
  return new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* -----------------------------
   Get Day Name
------------------------------ */

export function getDay(unix) {
  return DAYS[new Date(unix * 1000).getDay()];
}

/* -----------------------------
   Group Forecast Into Days
------------------------------ */

export function groupForecastByDay(list) {
  const days = {};

  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();

    if (!days[date]) {
      days[date] = [];
    }

    days[date].push(item);
  });

  return Object.entries(days)
    .slice(1, 6)
    .map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);

      const noonItem =
        items.find(
          (i) => new Date(i.dt * 1000).getHours() === 12
        ) || items[Math.floor(items.length / 2)];

      return {
        dt: noonItem.dt,
        minTemp: Math.min(...temps),
        maxTemp: Math.max(...temps),
        icon: noonItem.weather[0].icon,
        description: noonItem.weather[0].description,
      };
    });
}