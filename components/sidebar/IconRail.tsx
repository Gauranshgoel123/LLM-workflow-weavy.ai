"use client";

import {
  Search,
  Clock,
  LayoutGrid,
  Image as ImageIcon,
  Play,
  Boxes,
  Plus,
} from "lucide-react";

type RailItem = {
  id: string;
  icon: React.ReactNode;
};

export default function IconRail({
  collapsed,
  setCollapsed,
  activeIcon,
  setActiveIcon,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeIcon: string;
  setActiveIcon: (id: string) => void;
}) {
  const items: RailItem[] = [
    { id: "search", icon: <Search size={18} /> },
    { id: "history", icon: <Clock size={18} /> },
    { id: "quick", icon: <LayoutGrid size={18} /> },
    { id: "media", icon: <ImageIcon size={18} /> },
    { id: "run", icon: <Play size={18} /> },
    { id: "assets", icon: <Boxes size={18} /> },
    { id: "add", icon: <Plus size={18} /> },
  ];

 const handleClick = (id: string) => {
  // If you click the SAME icon that's already active → toggle collapse
  if (id === activeIcon) {
    setCollapsed(!collapsed);
    return;
  }

  // If you click a DIFFERENT icon → make it active and KEEP sidebar open
  setActiveIcon(id);
  setCollapsed(false);
};


  return (
    <div className="h-full w-14 bg-[#111214] flex flex-col items-center py-3 gap-3">
      {/* Logo */}
      <button
        onClick={() => handleClick("quick")}
        className="text-white font-bold text-xl mb-2"
      >
        W
      </button>

      {items.map((item) => {
        const isActive = item.id === activeIcon;

        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition
              ${
                isActive
                  ? "bg-[#d9ff6a] text-black"
                  : "text-gray-300 hover:bg-[#1b1d20] hover:text-white"
              }`}
          >
            {item.icon}
          </button>
        );
      })}

      <div className="flex-1" />
    </div>
  );
}
