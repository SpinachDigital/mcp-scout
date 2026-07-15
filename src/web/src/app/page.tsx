'use client';

import { Suspense } from "react";
import { SearchHeader } from "@/components/SearchHeader";
import { ServerGrid } from "@/components/ServerGrid";
import { StatsBar } from "@/components/StatsBar";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold gradient-text">MCP Scout</span>
                <span className="hidden sm:inline text-xs text-[#6E6E6E] uppercase tracking-wider">Registry</span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm text-[#6E6E6E]">
                <a href="/search" className="hover:text-[#00FFAA] transition-colors">Search</a>
                <a href="/categories" className="hover:text-[#00FFAA] transition-colors">Categories</a>
                <a href="/trending" className="hover:text-[#00FFAA] transition-colors">Trending</a>
                <a href="/docs" className="hover:text-[#00FFAA] transition-colors">Docs</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/mcp-scout/mcp-scout" target="_blank" rel="noopener noreferrer" className="hidden sm:block px-4 py-2 text-sm font-medium text-[#0D0D0D] bg-[#00FFAA] rounded-lg hover:opacity-90 transition-opacity">
                View on GitHub
              </a>
              <button className="px-4 py-2 text-sm font-medium bg-[#161616] border border-[#2A2A2A] rounded-lg hover:bg-[#2A2A2A] transition-colors">
                Get CLI
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,170,0.08)_0%,transparent_70%)]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#00FFAA]/10 blur-[200px] animate-float"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00FFAA]/10 border border-[#00FFAA]/20 text-[#00FFAA] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00FFAA] animate-pulse"></span>
                Live Registry • 7,000+ Servers
              </span>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
                Discover <span className="gradient-text">MCP Servers</span>
              </h1>
              <p className="text-xl sm:text-2xl text-[#B8B8B8] max-w-2xl mx-auto mb-10">
                The definitive registry for Model Context Protocol servers. Search, install, and manage servers for AI agents.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <SearchHeader />
              </div>
            </div>
            
            <StatsBar />
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Trending Servers</h2>
                <p className="text-[#6E6E6E] mt-1">Most starred this week</p>
              </div>
              <a href="/trending" className="text-[#00FFAA] hover:underline text-sm font-medium">View all →</a>
            </div>
            <Suspense fallback={<ServerGridSkeleton />}>
              <ServerGrid trending={true} limit={6} />
            </Suspense>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-[#111111] border-y border-[#2A2A2A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4">Ready to build with MCP?</h2>
              <p className="text-xl text-[#B8B8B8]">Install the CLI and start adding servers to your agents in seconds.</p>            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <pre className="bg-[#0D0D0D] border border-[#2A2A2A] rounded-xl p-6 text-sm overflow-x-auto max-w-2xl w-full">
                <code className="text-[#00FFAA]">npm install -g mcp-scout</code>
                <code className="text-[#FFB800]">
mcp-scout search "filesystem"</code>
                <code className="text-[#6E6E6E]">
mcp-scout install owner/repo</code>
              </pre>
              <a href="https://github.com/mcp-scout/mcp-scout" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-[#00FFAA] text-[#0D0D0D] font-bold rounded-xl hover:opacity-90 transition-opacity">
                View on GitHub →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ServerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 1, 2, 3, 4, 5, 6].map(i => (
        <div key={i} className="glass rounded-2xl p-6 animate-pulse">
          <div className="h-6 bg-[#2A2A2A] rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-[#2A2A2A] rounded w-full mb-2"></div>
          <div className="h-4 bg-[#2A2A2A] rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );
}
