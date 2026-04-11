import { WEATHER_ICONS } from "../utils/constants";

export default function HourForecast({ hourly, temp }) {

  if (!hourly || hourly.length === 0) return null;

  return (
    <div className="bg-white/20 border border-white/30 backdrop-blur-md rounded-3xl p-5">

      <h3 className="text-xs uppercase opacity-50 mb-4">
        Next 24 Hours
      </h3>

      {/* container */}
      <div className="flex md:grid md:grid-cols-8 gap-3 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide">

        {hourly.map((item) => (

          <div
            key={item.dt}
            className="min-w-[70px] md:min-w-0 text-center bg-white/10 border border-white/20 rounded-2xl p-3 flex-shrink-0"
          >

            <p className="text-xs opacity-50">
              {new Date(item.dt * 1000).getHours()}:00
            </p>

            <div className="text-2xl my-2">
              {WEATHER_ICONS[item.weather[0].icon] || "🌡️"}
            </div>

            <p className="text-sm font-semibold">
              {temp(item.main.temp)}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}