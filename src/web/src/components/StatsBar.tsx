"use client";

export function StatsBar() {
  const stats = [
    { label: "Servers", value: "7,234", icon: "📦" },
    { label: "Total Stars", value: "2.1M+", icon: "⭐" },
    { label: "Categories", value: "18", icon: "📂" },
    { label: "Verified", value: "1,203", icon: "✓" },
    { label: "Downloads/mo", value: "480K+", icon: "⬇️" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto px-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className="glass rounded-2xl p-6 text-center group"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <span className="text-3xl mb-3 block">{stat.icon}</span>
          <div className="text-3xl sm:text-4xl font-bold gradient-text group-hover:scale-110 transition-transform">
            {stat.value}
          </div>
          <div className="text-sm text-[#6E6E6E] mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
