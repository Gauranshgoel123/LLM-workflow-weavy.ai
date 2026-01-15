import { create } from "zustand";
import { Edge, Node } from "reactflow";

type NodeKind = "textNode" | "imageNode" | "llmNode";

type FlowStore = {
  nodes: Node[];
  edges: Edge[];

  addNodeAt: (type: string, position: { x: number; y: number }) => void;

  setNodes: (updater: Node[] | ((prev: Node[]) => Node[])) => void;
  setEdges: (updater: Edge[] | ((prev: Edge[]) => Edge[])) => void;

  updateNodeData: (id: string, patch: Record<string, any>) => void;
};

export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],

  setNodes: (updater) =>
    set((state) => ({
      nodes: typeof updater === "function" ? updater(state.nodes) : updater,
    })),

  setEdges: (updater) =>
    set((state) => ({
      edges: typeof updater === "function" ? updater(state.edges) : updater,
    })),

  updateNodeData: (id, patch) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
      ),
    });
  },

  addNodeAt: (type, position) => {
    // ✅ HARD FIX: normalize type coming from drag drop
    let normalizedType: NodeKind;

    if (type === "textNode" || type === "TextNode" || type === "text") {
      normalizedType = "textNode";
    } else if (type === "imageNode" || type === "ImageNode" || type === "image") {
      normalizedType = "imageNode";
    } else if (type === "llmNode" || type === "LLMNode" || type === "llm") {
      normalizedType = "llmNode";
    } else {
      // fallback
      normalizedType = "textNode";
    }

    const id = `${normalizedType}-${Date.now()}`;

    let data: any = {};
    if (normalizedType === "textNode") data = { text: "" };
    if (normalizedType === "imageNode") data = { image: "" };
    if (normalizedType === "llmNode")
      data = { modelName: "Gemini", status: "Ready" };

    const newNode: Node = {
      id,
      type: normalizedType, //MUST MATCH nodeTypes KEY
      position,
      data,
    };

    set({ nodes: [...get().nodes, newNode] });
  },
}));
