"use client";

import { useState } from "react";
import IconRail from "./IconRail";
import SidebarPanel from "./Sidebar";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string>("quick");

  return (
    <div className="h-full flex">
      <IconRail
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeIcon={activeIcon}
        setActiveIcon={setActiveIcon}
      />

      <div
        className={`
          h-full overflow-hidden
          transition-all duration-500 ease-in-out
          ${collapsed ? "w-0 opacity-0" : "w-80 opacity-100"}
        `}
      >
        <SidebarPanel collapsed={collapsed} />
      </div>
    </div>
  );
}
