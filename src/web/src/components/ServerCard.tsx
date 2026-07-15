"use client";
import { Star, Fork, CheckCircle, Bookmark, ExternalLink, Terminal } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface ServerCardProps {
  server: {
    name: string;
    description: string;
    author: string;
    stars: number;
    forks: number;
    license: string;
    tags: string[];
    verified: boolean;
    featured: boolean;
    lastUpdated: string;
  };
}

export function ServerCard({ server }: ServerCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={cn(
        "glass rounded-2xl p-6 transition-all duration-300",
        "hover:border-[#00FFAA]/40 hover:shadow-[0_0_40px_rgba(0,255,170,0.08)]",
        "group"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#6E6E6E]">{server.author.split("/")[0]}</span>
          <span className="text-[#6E6E6E]">/</span>
          <span className="font-medium text-white">{server.name.split("/")[1] || server.name}</span>
          {server.verified && (
            <CheckCircle className="w-4 h-4 text-[#00FFAA]" aria-label="Verified" />
          )}
          {server.featured && (
            <Bookmark className="w-4 h-4 text-[#FFB800]" aria-label="Featured" />
          )}
        </div>
      </div>

      <p className="text-[#B8B8B8] text-base leading-relaxed mb-4 line-clamp-2">
        {server.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {server.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium bg-[#161616] border border-[#2A2A2A] rounded-full text-[#8B8B8B] hover:border-[#00FFAA]/30 hover:text-[#00FFAA] transition-colors"
          >
            {tag}
          </span>
        ))}
        {server.tags.length > 4 && (
          <span className="px-2.5 py-1 text-xs font-medium bg-[#161616] border border-[#2A2A2A] rounded-full text-[#6E6E6E]">
            +{server.tags.length - 4}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#2A2A2A]">
        <div className="flex items-center gap-6 text-sm text-[#6E6E6E]">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {formatNumber(server.stars)}
          </span>
          <span className="flex items-center gap-1">
            <Fork className="w-4 h-4" />
            {formatNumber(server.forks)}
          </span>
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[#161616] rounded-full">
            {server.license}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
              "bg-[#161616] border border-[#2A2A2A] text-[#B8B8B8]",
              "hover:bg-[#00FFAA] hover:border-[#00FFAA] hover:text-[#0D0D0D]"
            )}
          >
            <Terminal className="w-4 h-4 mr-1.5 inline" />
            Install
          </button>
          <a
            href={`https://github.com/${server.name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#6E6E6E] hover:text-[#00FFAA] transition-colors"
            aria-label="View on GitHub"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
