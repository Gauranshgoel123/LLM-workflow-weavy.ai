"use client";

import { Handle, Position } from "reactflow";

export default function TextNode({ data }: any) {
  return (
    <div className="w-[320px] rounded-xl bg-[#16171a] border border-[#2a2c30] text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2c30]">
        <div className="text-sm font-semibold">Prompt</div>
        <div className="text-gray-400">•••</div>
      </div>

      {/* Body */}
      <div className="p-3">
        <textarea
          className="w-full min-h-[80px] rounded-lg bg-[#0f1012] border border-[#2a2c30] p-2 text-sm outline-none resize-none"
          placeholder="Write prompt..."
          value={data.text || ""}
          onChange={(e) => data.onChange?.(e.target.value)}
        />
      </div>

      {/* Output handle (purple) */}
      <Handle
        type="source"
        position={Position.Right}
        id="prompt"
        style={{
          background: "#a855f7", // purple
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}
