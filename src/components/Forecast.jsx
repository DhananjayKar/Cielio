import { WEATHER_ICONS } from "../utils/constants";

export default function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <div className="bg-white/20 border border-white/30 backdrop-blur-md rounded-3xl p-5 text-white">

      <h3 className="text-xs uppercase text-white/50 mb-4">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-5 gap-2">

        {forecast.map((day) => (
          <div
            key={day.dt}
            className="bg-white/10 border border-white/20 rounded-2xl p-3 text-center"
          >
            <p className="text-xs text-white/50 mb-2">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: "short",
              })}
            </p>

            <div className="text-xl mb-2">
              {WEATHER_ICONS[day.icon] || "🌡️"}
            </div>

            <p className="text-sm font-bold">
              {Math.round(day.maxTemp)}°
            </p>

            <p className="text-xs text-white/40">
              {Math.round(day.minTemp)}°
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}