import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className="relative w-full max-w-md mx-auto py-6">
      <input
        className="w-full rounded-full py-2 pl-10 pr-4 bg-surface border border-border focus:outline-none focus:border-primary text-text placeholder:text-muted"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
      />
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        size={20}
      />
    </div>
  );
}
