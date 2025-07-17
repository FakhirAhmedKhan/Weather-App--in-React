import { Search } from "lucide-react";

export default function SearchBar({
  city,
  setCity,
  onSearch,
  searchHistory = [],
  onHistoryClick,
}) {
  const inputStyles =
    "w-full sm:flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50";
  const buttonStyles =
    "w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg border border-white/30 text-white font-medium flex items-center justify-center gap-2 transition-all";

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-6 shadow-xl">
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={onSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city name"
          className={inputStyles}
        />
        <button type="submit" className={buttonStyles}>
          <Search className="w-5 h-5" />
          Search
        </button>
      </form>

      {!!searchHistory.length && (
        <div className="mt-4">
          <p className="text-white/80 text-sm mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((name, i) => (
              <button
                key={i}
                onClick={() => onHistoryClick(name)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-sm text-white transition"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
