import { create } from "zustand";
import { Edge, Node } from "reactflow";

type NodeKind = "textNode" | "imageNode" | "llmNode";

type FlowStore = {
  nodes: Node[];
  edges: Edge[];
  addNodeAt: (type: NodeKind, position: { x: number; y: number }) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeData: (id: string, patch: any) => void;
};

export const useFlowStore = create<FlowStore>((set, get) => ({
  nodes: [],
  edges: [],

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  updateNodeData: (id, patch) => {
    set({
      nodes: get().nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...patch } } : n
      ),
    });
  },

  addNodeAt: (type, position) => {
    const id = `${type}-${Date.now()}`;

    const baseData: any = {};

    if (type === "textNode") {
      baseData.text = "";
    }
    if (type === "imageNode") {
      baseData.image = null;
    }
    if (type === "llmNode") {
      baseData.modelName = "Gemini";
      baseData.status = "Ready";
      baseData.output = "";
    }

    const newNode: Node = {
      id,
      type,
      position,
      data: baseData,
    };

    set({ nodes: [...get().nodes, newNode] });
  },
}));
