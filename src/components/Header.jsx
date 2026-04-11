import { useState } from "react";

export default function Header({ unit, setUnit }) {
  return (
    <div className="flex items-center justify-between mb-6">
      
      {/* Brand */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Cielio
        </h1>
        <p className="text-white/50 text-sm">
          Your window to the sky
        </p>
      </div>

      {/* Unit Toggle */}
      <button
        onClick={() => setUnit(unit === "C" ? "F" : "C")}
        className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur hover:scale-[1.02] active:scale-[0.98] transition-transform"
      >
        °{unit} → °{unit === "C" ? "F" : "C"}
      </button>
    </div>
  );
}