export default function Loading() {
  return (
    <div className="space-y-4 md:space-y-5 animate-pulse">

      {/* Main card */}
      <div className="h-40 bg-white/20 rounded-3xl border border-white/30" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array(8).fill(0).map((_, i) => (
          <div
            key={i}
            className="h-20 bg-white/20 rounded-2xl border border-white/30"
          />
        ))}
      </div>

      {/* Forecast */}
      <div className="h-32 bg-white/20 rounded-3xl border border-white/30" />
    </div>
  );
}