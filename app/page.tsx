"use client";

import Sidebar from "@/components/sidebar";
import FlowCanvas from "@/components/FlowCanvas";

export default function Home() {
  return (
    <div className="h-screen w-screen flex bg-[#0f1012]">
      <Sidebar />
      <div className="flex-1">
        <FlowCanvas />
      </div>
    </div>
  );
}
