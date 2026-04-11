export const WEATHER_GRADIENTS = {
    day: {
      Clear: "from-amber-400 via-orange-400 to-sky-500",
      Clouds: "from-slate-400 via-slate-500 to-slate-600",
      Rain: "from-slate-600 via-blue-700 to-slate-800",
      Drizzle: "from-blue-400 via-blue-500 to-slate-600",
      Thunderstorm: "from-slate-800 via-purple-900 to-slate-900",
      Snow: "from-blue-100 via-slate-200 to-blue-300",
      Mist: "from-slate-400 via-slate-300 to-slate-500",
      default: "from-indigo-200 via-blue-300 to-sky-400",
    },

    night: {
      Clear: "from-indigo-900 via-blue-900 to-slate-900",
      Clouds: "from-slate-700 via-slate-800 to-slate-900",
      Rain: "from-slate-800 via-blue-900 to-black",
      Drizzle: "from-blue-700 via-slate-800 to-slate-900",
      Thunderstorm: "from-black via-purple-950 to-slate-900",
      Snow: "from-slate-700 via-slate-800 to-slate-900",
      Mist: "from-slate-700 via-slate-800 to-slate-900",
      default: "from-indigo-900 via-blue-900 to-slate-900",
    }
  };

// Weather icons
export const WEATHER_ICONS = {
  "01d": "☀️",
  "01n": "🌙",
  "02d": "⛅",
  "02n": "☁️",
  "03d": "☁️",
  "03n": "☁️",
  "04d": "☁️",
  "04n": "☁️",
  "09d": "🌧️",
  "09n": "🌧️",
  "10d": "🌦️",
  "10n": "🌧️",
  "11d": "⛈️",
  "11n": "⛈️",
  "13d": "❄️",
  "13n": "❄️",
  "50d": "🌫️",
  "50n": "🌫️",
};

// Days for forecast display
export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// AQI labels
export const AQI_LABELS = {
  1: { label: "Good", color: "text-green-400" },
  2: { label: "Fair", color: "text-yellow-400" },
  3: { label: "Moderate", color: "text-orange-400" },
  4: { label: "Poor", color: "text-red-400" },
  5: { label: "Very Poor", color: "text-purple-400" },
};