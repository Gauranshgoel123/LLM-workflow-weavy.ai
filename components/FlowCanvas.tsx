"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Connection,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

import { MousePointer2, Hand, Undo2, Redo2, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useFlowStore } from "@/lib/store";

import TextNode from "@/components/nodes/TextNode";
import ImageNode from "@/components/nodes/ImageNode";
import LLMNode from "@/components/nodes/LLMNode";

/* -------------------- Toolbar Component -------------------- */
function Toolbar({
  mode,
  setMode,
  canUndo,
  canRedo,
  undo,
  redo,
}: {
  mode: "select" | "pan";
  setMode: (m: "select" | "pan") => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
}) {
  const { zoomIn, zoomOut, getViewport, setViewport, fitView } = useReactFlow();

  const [zoomPercent, setZoomPercent] = useState(
    Math.round(getViewport().zoom * 100)
  );

  // update zoom percent dynamically
  useEffect(() => {
    const id = setInterval(() => {
      const z = Math.round(getViewport().zoom * 100);
      setZoomPercent(z);
    }, 80);

    return () => clearInterval(id);
  }, [getViewport]);

  const setZoom = (percent: number) => {
    const current = getViewport();
    setViewport(
      { x: current.x, y: current.y, zoom: percent / 100 },
      { duration: 200 }
    );
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-2xl bg-[#16171a] border border-[#2a2c30] px-3 py-2 shadow-lg">
        {/* Select */}
        <button
          onClick={() => setMode("select")}
          className={`p-2 rounded-xl transition ${
            mode === "select"
              ? "bg-[#d9ff6a] text-black"
              : "text-gray-200 hover:bg-[#1f2125]"
          }`}
          title="Select"
        >
          <MousePointer2 size={18} />
        </button>

        {/* Pan/Drag */}
        <button
          onClick={() => setMode("pan")}
          className={`p-2 rounded-xl transition ${
            mode === "pan"
              ? "bg-[#d9ff6a] text-black"
              : "text-gray-200 hover:bg-[#1f2125]"
          }`}
          title="Pan"
        >
          <Hand size={18} />
        </button>

        <div className="w-[1px] h-6 bg-[#2a2c30]" />

        {/* Undo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`p-2 rounded-xl transition ${
            canUndo
              ? "text-gray-200 hover:bg-[#1f2125]"
              : "text-gray-600 cursor-not-allowed"
          }`}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>

        {/* Redo */}
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`p-2 rounded-xl transition ${
            canRedo
              ? "text-gray-200 hover:bg-[#1f2125]"
              : "text-gray-600 cursor-not-allowed"
          }`}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>

        <div className="w-[1px] h-6 bg-[#2a2c30]" />

        {/* Zoom dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-gray-200 hover:bg-[#1f2125] transition"
              title="Zoom options"
            >
              <span className="text-sm">{zoomPercent}%</span>
              <ChevronDown size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-[#16171a] border border-[#2a2c30] text-gray-200">
            <DropdownMenuItem
              onClick={() => zoomIn({ duration: 200 })}
              className="flex justify-between gap-6"
            >
              <span>Zoom in</span>
              <span className="text-gray-400">Ctrl +</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => zoomOut({ duration: 200 })}
              className="flex justify-between gap-6"
            >
              <span>Zoom out</span>
              <span className="text-gray-400">Ctrl −</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#2a2c30]" />

            <DropdownMenuItem
              onClick={() => setZoom(100)}
              className="flex justify-between gap-6"
            >
              <span>Zoom to 100%</span>
              <span className="text-gray-400">Ctrl 0</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => fitView({ padding: 0.2, duration: 250 })}
              className="flex justify-between gap-6"
            >
              <span>Zoom to fit</span>
              <span className="text-gray-400">Ctrl 1</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

/* -------------------- Flow Inner -------------------- */
function FlowInner() {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
  const { screenToFlowPosition } = useReactFlow();

  const nodes = useFlowStore((s) => s.nodes);
  const edges = useFlowStore((s) => s.edges);
  const setNodes = useFlowStore((s) => s.setNodes);
  const setEdges = useFlowStore((s) => s.setEdges);
  const addNodeAt = useFlowStore((s) => s.addNodeAt);
  const updateNodeData = useFlowStore((s) => s.updateNodeData);

  const [mode, setMode] = useState<"select" | "pan">("select");

  // undo/redo placeholder
  const canUndo = false;
  const canRedo = false;
  const undo = () => {};
  const redo = () => {};

  // Custom nodeTypes
  const nodeTypes = {
    textNode: TextNode,
    imageNode: ImageNode,
    llmNode: LLMNode,
  };

  // attach handlers into node.data
  const nodesWithHandlers: Node[] = nodes.map((n) => {
    if (n.type === "textNode") {
      return {
        ...n,
        data: {
          ...n.data,
          onChange: (val: string) => updateNodeData(n.id, { text: val }),
        },
      };
    }

    if (n.type === "llmNode") {
      return {
        ...n,
        data: {
          ...n.data,
          onRun: () => {
            updateNodeData(n.id, { status: "Running..." });
            setTimeout(() => {
              updateNodeData(n.id, { status: "Done (mock)" });
            }, 1000);
          },
        },
      };
    }

    return n;
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes(applyNodeChanges(changes, nodes));
    },
    [nodes, setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges));
    },
    [edges, setEdges]
  );

  // Edge connect coloring logic
  const onConnect = useCallback(
    (connection: Connection) => {
      const sourceNode = nodes.find((n) => n.id === connection.source);

      let stroke = "#9ca3af"; // default gray
      if (sourceNode?.type === "textNode") stroke = "#a855f7"; // purple
      if (sourceNode?.type === "imageNode") stroke = "#22c55e"; // green

      const newEdge: Edge = {
        ...connection,
        id: `e-${connection.source}-${connection.target}-${Date.now()}`,
        animated: true,
        style: {
          stroke,
          strokeWidth: 2,
        },
      };

      setEdges(addEdge(newEdge, edges));
    },
    [nodes, edges, setEdges]
  );

  // Allow drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Drop -> create node at cursor position
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNodeAt(type as "textNode" | "imageNode" | "llmNode", position);
    },
    [addNodeAt, screenToFlowPosition]
  );

  return (
    <div
      ref={reactFlowWrapper}
      className="h-full w-full bg-[#0f1012] relative"
    >
      <ReactFlow
        nodes={nodesWithHandlers}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        panOnDrag={mode === "pan"}
        selectionOnDrag={mode === "select"}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {/* Background */}
        <Background variant="dots" gap={18} size={1} color="#2a2c30" />

        {/* Minimap */}
        <MiniMap position="bottom-right" pannable zoomable />

        {/* Toolbar */}
        <Toolbar
          mode={mode}
          setMode={setMode}
          canUndo={canUndo}
          canRedo={canRedo}
          undo={undo}
          redo={redo}
        />
      </ReactFlow>
    </div>
  );
}

/* -------------------- Export -------------------- */
export default function FlowCanvas() {
  return (
    <ReactFlowProvider>
      <FlowInner />
    </ReactFlowProvider>
  );
}
