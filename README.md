
# 📌 Weavy.ai Clone

A minimal clone of the Weavy-style workflow builder UI built using **Next.js + React Flow + Tailwind + shadcn/ui**.
This project focuses on recreating the core **sidebar layout**, **node editor canvas**, and **workflow node interactions**.

---

## 🚀 Tech Stack

* **Next.js (App Router)**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** (UI components)
* **Lucide Icons**
* **React Flow** (workflow canvas)
* **Zustand** (state management for nodes + edges)

---

## ✅ Features Implemented (Current Progress)

### 1) Sidebar UI (Weavy-style)

* Collapsible sidebar layout
* Left **icon rail navigation**
* Sidebar remains open while switching icons
* Active icon highlights in yellow
* Smooth collapse animation
* **Quick Access grid** contains only:

  * **Text**
  * **Image**
  * **Run Any LLM**

### 2) Search UI in Sidebar

* Search input UI added
* Filters nodes/cards shown in sidebar (Quick Access)

### 3) Workflow Canvas (React Flow)

* Infinite dotted grid background
* Drag & drop nodes from sidebar to canvas
* Nodes appear at drop position
* MiniMap enabled (bottom-right)
* Zoom support (mouse / controls)

### 4) Bottom Control Toolbar (Canvas)

A custom bottom control bar similar to Weavy:

* Select tool
* Pan tool
* Undo/Redo buttons *(placeholder for now)*
* Zoom dropdown with:

  * Zoom In
  * Zoom Out
  * Zoom to 100%
  * Zoom to Fit
* Zoom percent updates dynamically

### 5) Custom Nodes UI

Implemented custom workflow nodes:

✅ **Prompt Node (Text Node)**

* Prompt card UI with textarea field
* Purple output handle
* Edge output connects to model node

⚠️ *Note:* Text input behavior is still under debugging in current build.

✅ **Image Node**

* File card UI with checkerboard background
* Click-to-upload UI design
* Green output handle
* Edge output connects to model node

✅ **LLM Node**

* Model card UI (Gemini placeholder)
* Output preview placeholder UI
* “Run Model” button UI *(mock handler currently)*

### 6) Custom Edges (Color + Animation)

When connecting nodes:

* **Text → Purple animated edge**
* **Image → Green animated edge**
* Default edges use neutral styling

---

## 📁 Project Structure

```bash
weavy-clone/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── FlowCanvas.tsx
│   ├── nodes/
│   │   ├── TextNode.tsx
│   │   ├── ImageNode.tsx
│   │   └── LLMNode.tsx
│   │
│   ├── sidebar/
│   │   ├── Sidebar.tsx
│   │   └── QuickAccessGrid.tsx
│   │
│   └── ui/
│       └── (shadcn components)
│
├── lib/
│   └── store.ts
│
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run the development server

```bash
npm run dev
```

App runs on:

```bash
http://localhost:3000
```

---

## 🧠 How It Works (High-Level)

### Drag & Drop Nodes

* Nodes are dragged from sidebar cards
* Canvas reads node type through `dataTransfer`
* New nodes are created at cursor position using React Flow coordinates

### Nodes & Edges State

* Node + Edge state is managed through **Zustand**
* Custom nodes are registered through `nodeTypes`
* Edge styling is decided based on source node type

---

## ✅ Current Limitations / TODO

### Fix / Improve

* Finalize interactive typing inside TextNode textarea
* Finalize image upload preview handling inside ImageNode
* Add proper undo/redo history tracking
* Add persistence (save/load workflows)

### Future Enhancements

* Integrate LLM model execution via Gemini API
* Workflow export & import (need to save to database (PostgreSQL))
* Multi-node selection features

