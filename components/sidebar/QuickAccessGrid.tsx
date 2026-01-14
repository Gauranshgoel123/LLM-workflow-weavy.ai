"use client";

import { Image as ImageIcon, Type, Sparkles } from "lucide-react";

type CardItem = {
  title: string;
  icon: React.ReactNode;
  type: "textNode" | "imageNode" | "llmNode";
  keywords: string[];
};

export default function QuickAccessGrid({ query }: { query: string }) {
  const items: CardItem[] = [
    {
      title: "Text",
      icon: <Type size={20} />,
      type: "textNode",
      keywords: ["text", "prompt", "input"],
    },
    {
      title: "Image",
      icon: <ImageIcon size={20} />,
      type: "imageNode",
      keywords: ["image", "photo", "upload"],
    },
    {
      title: "Run Any LLM",
      icon: <Sparkles size={20} />,
      type: "llmNode",
      keywords: ["llm", "gemini", "run", "ai", "model"],
    },
  ];

  const normalized = query.trim().toLowerCase();

  const filtered = normalized.length
    ? items.filter((item) => {
        const hay = [item.title, ...item.keywords].join(" ").toLowerCase();
        return hay.includes(normalized);
      })
    : items;

  const onDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {filtered.length === 0 ? (
        <div className="col-span-2 text-sm text-gray-400">
          No nodes found.
        </div>
      ) : (
        filtered.map((item) => (
          <div
            key={item.title}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className="h-24 rounded-xl border border-[#2a2c30] bg-[#181a1d]
            flex flex-col items-center justify-center gap-2
            hover:bg-[#202327] cursor-grab active:cursor-grabbing select-none text-white"
          >
            <div>{item.icon}</div>
            <div className="text-sm">{item.title}</div>
          </div>
        ))
      )}
    </div>
  );
}
