import { useState } from "react";

export default function SearchBar({
  city,
  setCity,
  onSearch,
  onLocation,
  recentCities = [],
}) {
  const handleSubmit = (e) => {
      e.preventDefault();
      onSearch();
      console.log("Submitted");
    };

  return (
    <div className="mb-6 space-y-3">

      {/* Input Row */}
      <div className="flex flex-col sm:flex-row gap-2">
        
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(e);
          }}
          placeholder="Search city..."
          className="flex-1 bg-white/20 border border-white/30 text-white placeholder-white/40 px-4 py-3 rounded-2xl backdrop-blur outline-none"
        />
       {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 bg-white text-black px-5 rounded-2xl font-semibold"
        >
          Search
        </button>

        <button
          onClick={onLocation}
          className="w-16 bg-white/20 border border-white/30 px-4 rounded-2xl text-white flex items-center justify-center"
        >
          📍
        </button>
      </div>
      </div>

      {/* Recent Cities */}
      {recentCities.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {recentCities.map((c) => (
            <button
              key={c}
              onClick={() => setCity(c)}
              className="text-xs px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white/70 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}