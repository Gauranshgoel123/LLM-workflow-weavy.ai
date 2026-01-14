"use client";

import { Handle, Position } from "reactflow";

export default function LLMNode({ data }: any) {
  return (
    <div className="w-[360px] rounded-xl bg-[#16171a] border border-[#2a2c30] text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2c30]">
        <div className="text-sm font-semibold">{data.modelName || "Run Any LLM"}</div>
        <div className="text-gray-400">•••</div>
      </div>

      {/* Body */}
      <div className="p-3">
        <div className="w-full aspect-video bg-[#0f1012] border border-[#2a2c30] rounded-lg overflow-hidden flex items-center justify-center">
          <div className="text-gray-500 text-sm">Output Preview</div>
        </div>

        <button
          className="mt-3 w-full rounded-lg bg-[#1f2125] border border-[#2a2c30] py-2 text-sm hover:bg-[#2a2c30]"
          onClick={() => data.onRun?.()}
        >
          Run Model
        </button>

        <div className="mt-3 text-xs text-gray-500">
          {data.status || "Ready"}
        </div>
      </div>

      {/* Inputs */}
      <Handle
        type="target"
        position={Position.Left}
        id="prompt"
        style={{ background: "#a855f7", width: 10, height: 10 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="image"
        style={{ background: "#22c55e", width: 10, height: 10 }}
      />

      {/* Output */}
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#60a5fa", width: 10, height: 10 }}
      />
    </div>
  );
}
