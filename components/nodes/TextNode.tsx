"use client";

import { Handle, Position } from "reactflow";
import { useRef } from "react";

export default function TextNode({ data }: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (data?.onChange) {
      data.onChange(e.target.value);
    }
  };

  const handleTextAreaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleTextAreaMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Stop propagation on the wrapper to prevent node selection
    e.stopPropagation();
  };

  return (
    <div 
      className="w-[320px] rounded-xl bg-[#16171a] border border-[#2a2c30] text-white shadow-lg"
      onClick={handleWrapperClick}
    >
      {/* Header - DRAGGABLE */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2c30]">
        <div className="text-sm font-semibold">Prompt</div>
        <div className="text-gray-400">•••</div>
      </div>

      {/* Text area - NOT DRAGGABLE, TYPEABLE */}
      <div className="p-3">
        <textarea
          ref={textareaRef}
          className="nodrag w-full min-h-[90px] rounded-lg bg-[#0f1012] border border-[#2a2c30] p-2 text-sm text-white outline-none resize-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition-colors cursor-text"
          placeholder="Write prompt..."
          value={data?.text ?? ""}
          onChange={handleChange}
          onClick={handleTextAreaClick}
          onMouseDown={handleTextAreaMouseDown}
          onKeyDown={(e) => e.stopPropagation()}
          spellCheck="true"
          autoComplete="off"
        />
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id="prompt"
        style={{ background: "#a855f7", width: 10, height: 10 }}
      />
    </div>
  );
}
