"use client";

import { Handle, Position } from "reactflow";
import { Upload } from "lucide-react";
import { useRef } from "react";

export default function ImageNode({ data }: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      data.onUpload?.(base64);
    };
    reader.readAsDataURL(file);

    // ✅ allow re-uploading same file again
    e.target.value = "";
  };


  return (
    <div className="w-[320px] rounded-xl bg-[#16171a] border border-[#2a2c30] text-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-[#2a2c30]">
        <div className="text-sm font-semibold">File</div>
        <div className="text-gray-400">•••</div>
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Upload Area */}
        <div
          onClick={openFilePicker}
          className="w-full h-[260px] rounded-lg border border-[#2a2c30] overflow-hidden cursor-pointer
          flex items-center justify-center relative bg-[#0f1012]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.06) 75%, rgba(255,255,255,0.06)), linear-gradient(45deg, rgba(255,255,255,0.06) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.06) 75%, rgba(255,255,255,0.06))",
            backgroundPosition: "0 0, 12px 12px",
            backgroundSize: "24px 24px",
          }}
        >
          {/* Hidden input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Preview */}
          {data.image ? (
            <img
              src={data.image}
              alt="uploaded"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-300">
              <Upload size={22} />
              <div className="text-sm font-medium">
                Click to upload
              </div>
            </div>
          )}
        </div>

        {/* Optional small text */}
        {!data.image && (
          <div className="mt-2 text-xs text-gray-500">
            Upload an image from your device
          </div>
        )}
      </div>

      {/* Output handle (green) */}
      <Handle
        type="source"
        position={Position.Right}
        id="image"
        style={{
          background: "#22c55e",
          width: 10,
          height: 10,
        }}
      />
    </div>
  );
}
