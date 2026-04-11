import { AQI_LABELS } from "../utils/constants";

export default function AQICard({ aqi }) {
  if (!aqi) return null;

  const level = aqi.list[0].main.aqi;
  const data = AQI_LABELS[level];

  const components = aqi.list[0].components;

  return (
    <div className="bg-white/20 border border-white/30 backdrop-blur-md rounded-3xl p-6 text-white">

      <h3 className="text-sm uppercase text-white/50 mb-2">
        Air Quality
      </h3>

      <div className="flex items-center justify-between mb-4">
        <p className={`text-2xl font-bold ${data.color}`}>
          AQI {level} — {data.label}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">

        <div>PM2.5: {components.pm2_5}</div>
        <div>PM10: {components.pm10}</div>
        <div>CO: {components.co}</div>
        <div>NO₂: {components.no2}</div>
        <div>O₃: {components.o3}</div>
        <div>SO₂: {components.so2}</div>

      </div>

    </div>
  );
}