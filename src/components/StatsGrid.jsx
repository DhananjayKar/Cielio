export default function StatsGrid({ weather, temp }) {
  const stats = [
    { label: "Humidity", value: `${weather.main.humidity}%`, icon: "💧" },
    { label: "Wind", value: `${Math.round(weather.wind.speed * 3.6)} km/h`, icon: "💨" },
    { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, icon: "👁️" },
    { label: "Pressure", value: `${weather.main.pressure} hPa`, icon: "🌡️" },
    { label: "High", value: temp(weather.main.temp_max), icon: "⬆️" },
    { label: "Low", value: temp(weather.main.temp_min), icon: "⬇️" },
    { label: "Sunrise", value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), icon: "🌅" },
    { label: "Sunset", value: new Date(weather.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), icon: "🌇" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm md:text-base">

      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-white/20 border border-white/30 backdrop-blur-md rounded-2xl p-4 text-white backdrop-saturate-150"
        >
          <p className="text-xs text-white/50 uppercase">
            {s.icon} {s.label}
          </p>
          <p className="text-lg font-semibold mt-1">
            {s.value}
          </p>
        </div>
      ))}

    </div>
  );
}