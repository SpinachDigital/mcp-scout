"use client";
import { Github, Twitter, MessageSquare, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#2A2A2A] bg-[#0D0D0D] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold gradient-text">MCP Scout</span>
              <span className="text-xs text-[#6E6E6E] uppercase tracking-wider">Registry</span>
            </div>
            <p className="text-[#B8B8B8] max-w-xs mb-6">
              The definitive registry for Model Context Protocol servers. Discover, install, and manage servers for AI agents.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/mcp-scout" target="_blank" rel="noopener noreferrer" className="text-[#6E6E6E] hover:text-[#00FFAA] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/mcpscout" target="_blank" rel="noopener noreferrer" className="text-[#6E6E6E] hover:text-[#00FFAA] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://discord.gg/mcp-scout" target="_blank" rel="noopener noreferrer" className="text-[#6E6E6E] hover:text-[#00FFAA] transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="mailto:hello@mcp-scout.dev" className="text-[#6E6E6E] hover:text-[#00FFAA] transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Registry</h4>
            <ul className="space-y-2 text-[#B8B8B8]">
              <li><a href="/search" className="hover:text-[#00FFAA] transition-colors">Search Servers</a></li>
              <li><a href="/categories" className="hover:text-[#00FFAA] transition-colors">Categories</a></li>
              <li><a href="/trending" className="hover:text-[#00FFAA] transition-colors">Trending</a></li>
              <li><a href="/verified" className="hover:text-[#00FFAA] transition-colors">Verified Servers</a></li>
              <li><a href="/submit" className="hover:text-[#00FFAA] transition-colors">Submit Server</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-[#B8B8B8]">
              <li><a href="/docs" className="hover:text-[#00FFAA] transition-colors">Documentation</a></li>
              <li><a href="/cli" className="hover:text-[#00FFAA] transition-colors">CLI Guide</a></li>
              <li><a href="/api" className="hover:text-[#00FFAA] transition-colors">API Reference</a></li>
              <li><a href="/blog" className="hover:text-[#00FFAA] transition-colors">Blog</a></li>
              <li><a href="/changelog" className="hover:text-[#00FFAA] transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-[#B8B8B8]">
              <li><a href="/privacy" className="hover:text-[#00FFAA] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#00FFAA] transition-colors">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-[#00FFAA] transition-colors">Security</a></li>
              <li><a href="/cookies" className="hover:text-[#00FFAA] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2A2A2A] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6E6E6E] text-sm">
            © 2024 MCP Scout. Built by <a href="https://github.com/abhishekjha" className="text-[#00FFAA] hover:underline" target="_blank" rel="noopener noreferrer">Abhishek Jha</a> & contributors.
          </p>
          <p className="text-[#6E6E6E] text-sm">
            MCP Scout is not affiliated with Anthropic or the Model Context Protocol project.
          </p>
        </div>
      </div>
    </footer>
  );
}
