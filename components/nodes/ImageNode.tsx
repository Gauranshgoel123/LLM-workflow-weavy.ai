"use client";

import { Handle, Position } from "reactflow";

export default function ImageNode({ data }: any) {
  return (
    <div className="w-[320px] rounded-xl bg-[#16171a] border border-[#2a2c30] text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2c30]">
        <div className="text-sm font-semibold">File</div>
        <div className="text-gray-400">•••</div>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="w-full aspect-[4/3] bg-[#0f1012] border border-[#2a2c30] rounded-lg overflow-hidden flex items-center justify-center">
          {data.image ? (
            <img src={data.image} alt="uploaded" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-500 text-sm">Drop / Upload Image</div>
          )}
        </div>

        <button
          className="mt-3 text-xs text-gray-400 hover:text-white"
          onClick={() => data.onAddMore?.()}
        >
          + Add more images
        </button>
      </div>

      {/* Output handle (green) */}
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        style={{
          background: "#22c55e", // green
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}
