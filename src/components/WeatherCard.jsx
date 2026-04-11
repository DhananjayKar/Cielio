import { WEATHER_ICONS } from "../utils/constants";

export default function WeatherCard({ weather, temp }) {
  const icon = WEATHER_ICONS[weather.weather[0].icon] || "🌡️";

  return (
    <div className="bg-white/20 border border-white/30 backdrop-blur-md rounded-3xl p-6 md:p-8 text-white">

      <div className="flex items-center justify-between">

        {/* Left */}
        <div>
          <p className="text-white/70 text-sm uppercase">
            {new Date().toLocaleDateString(undefined, {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-1">
            {weather.name}, {weather.sys.country}
          </h2>

          <p className="text-white/70 capitalize mt-1">
            {weather.weather[0].description}
          </p>
        </div>

        {/* Right */}
        <div className="text-right flex items-center gap-4">
          <span className="text-6xl md:text-7xl">
            {icon}
          </span>

          <div>
            <p className="text-5xl md:text-6xl font-bold">
              {temp(weather.main.temp)}
            </p>

            <p className="text-white/60 text-sm">
              Feels like {temp(weather.main.feels_like)}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}