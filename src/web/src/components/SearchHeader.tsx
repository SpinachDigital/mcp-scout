"use client";
import { useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

export function SearchHeader() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query)}&category=${category}&sort=${sortBy}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="flex items-center gap-2 bg-[#161616] border border-[#2A2A2A] rounded-xl overflow-hidden hover:border-[#00FFAA]/30 transition-colors">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-4 text-[#6E6E6E] hover:text-[#00FFAA] transition-colors flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E6E]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search MCP servers... (e.g. filesystem, github, postgres)"
              className="w-full bg-transparent px-4 py-4 pl-12 text-lg text-white placeholder-[#6E6E6E] focus:outline-none"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={!query.trim()}
            className="px-6 py-4 bg-[#00FFAA] text-[#0D0D0D] font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 flex flex-wrap items-center gap-3 animate-in slide-in-from-top-2 duration-200">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 bg-[#161616] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#00FFAA]"
            >
              <option value="">All Categories</option>
              <option value="filesystem">Filesystem</option>
              <option value="database">Database</option>
              <option value="api">API & Integration</option>
              <option value="development">Development Tools</option>
              <option value="ai">AI & ML</option>
              <option value="communication">Communication</option>
              <option value="productivity">Productivity</option>
              <option value="security">Security</option>
              <option value="monitoring">Monitoring</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#161616] border border-[#2A2A2A] rounded-lg text-white text-sm focus:outline-none focus:border-[#00FFAA]"
            >
              <option value="stars">Most Stars</option>
              <option value="updated">Recently Updated</option>
              <option value="name">Name A-Z</option>
              <option value="verified">Verified First</option>
            </select>
          </div>
        )}
      </div>
    </form>
  );
}
