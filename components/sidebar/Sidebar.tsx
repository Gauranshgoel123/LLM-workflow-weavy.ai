"use client";

import { useMemo, useState } from "react";
import QuickAccessGrid from "./QuickAccessGrid";

export default function SidebarPanel({ collapsed }: { collapsed: boolean }) {
  const [query, setQuery] = useState("");

  return (
    <div className="h-full w-80 bg-[#141518] text-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="font-semibold text-lg">File Name</div>
        <button className="text-gray-300 hover:text-white">⌄</button>
      </div>

      {/* Search */}
      <div className="mt-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full rounded-lg bg-[#1c1e22] border border-[#2a2c30] px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Quick access */}
      <div className="mt-6">
        <div className="text-lg font-semibold mb-3">Quick access</div>
        <QuickAccessGrid query={query} />
      </div>

      {/* Toolbox section */}
      <div className="mt-10">
        <div className="text-lg font-semibold mb-2">Toolbox</div>
        <div className="text-sm text-gray-400">Editing</div>
      </div>
    </div>
  );
}
