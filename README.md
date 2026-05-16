<div align="center">

# 🟢 CreatingNode

**A TypeScript-powered Node.js HTTP server — built from scratch, step by step.**

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![tsx](https://img.shields.io/badge/tsx-watch%20mode-5dcaa5?style=flat-square)
![License](https://img.shields.io/badge/license-ISC-7c6de8?style=flat-square)

</div>

---

## 📌 About

**CreatingNode** is a hands-on project focused on building a Node.js HTTP server from the ground up using **TypeScript**. It covers everything from initializing the project and configuring TypeScript to running a live-reloading dev server — all without relying on heavy frameworks.

---

## 🛠 Deployment

(https://node-server-eta-rouge.vercel.app)[https://node-server-eta-rouge.vercel.app/]
(https://node-server-eta-rouge.vercel.app/products)[https://node-server-eta-rouge.vercel.app/products]


## 📁 Project Structure

```
CreatingNode/
├── src/
│   └── server.ts        # Main server entry point
├── dist/                # Compiled output (auto-generated)
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Tech Stack

| Tool | Purpose |
|------|---------|
| **TypeScript 6.x** | Strongly-typed JavaScript |
| **tsx** | Run/watch `.ts` files directly (no build step needed in dev) |
| **dotenv** | Load environment variables from `.env` |
| **@types/node** | Node.js type definitions |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v20+`
- [npm](https://www.npmjs.com/) `v9+`

---

## 🛠️ Step-by-Step: Creating a Node.js Server with TypeScript

Follow these steps exactly to recreate this project from scratch.

---

### Step 1 — Initialize the project

```bash
mkdir CreatingNode
cd CreatingNode
npm init -y
```

This creates a `package.json` with default values.

---

### Step 2 — Install dependencies

```bash
# Runtime dependencies
npm install dotenv tsx

# Dev dependencies (TypeScript + Node types)
npm install -D typescript @types/node
```

| Package | Why |
|---------|-----|
| `dotenv` | Reads `.env` file into `process.env` |
| `tsx` | Runs TypeScript directly — no `tsc` compile step needed for dev |
| `typescript` | The TypeScript compiler |
| `@types/node` | Type definitions for Node built-ins (`http`, `fs`, `path`, etc.) |

---

### Step 3 — Configure TypeScript

Create `tsconfig.json` in the root:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "esnext",
    "target": "esnext",
    "types": ["node"],
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

> **Key options explained:**
> - `rootDir` / `outDir` — source lives in `src/`, compiled output goes to `dist/`
> - `strict: true` — enables all strict type-checking rules
> - `verbatimModuleSyntax` — enforces `import type` for type-only imports
> - `isolatedModules` — required for tools like `tsx` that transpile file-by-file

---

### Step 4 — Add npm scripts

Update the `scripts` section in `package.json`:

```json
"scripts": {
  "dev": "tsx watch ./src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

| Script | What it does |
|--------|-------------|
| `npm run dev` | Starts the server with live reload via `tsx watch` |
| `npm run build` | Compiles TypeScript to JavaScript in `dist/` |
| `npm start` | Runs the compiled server in production |

---

### Step 5 — Create the `.env` file

```bash
touch .env
```

Add your environment variables:

```env
PORT=3000
HOST=localhost
```

> ⚠️ **Never commit `.env` to Git.** It's already listed in `.gitignore`.

---

### Step 6 — Create the server

Create the `src/` directory and the server file:

```bash
mkdir src
touch src/server.ts
```

Paste the following into `src/server.ts`:

```typescript
import http from "node:http";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = process.env["PORT"] ?? 3000;
const HOST = process.env["HOST"] ?? "localhost";

const server = http.createServer((req, res) => {
  const url = req.url ?? "/";
  const method = req.method ?? "GET";

  console.log(`[${method}] ${url}`);

  if (url === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server is running!", status: "ok" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
});

server.listen(Number(PORT), HOST, () => {
  console.log(`✅ Server running at http://${HOST}:${PORT}`);
});
```

---

### Step 7 — Run the dev server

```bash
npm run dev
```

You should see:

```
✅ Server running at http://localhost:3000
```

Open your browser or use `curl` to test it:

```bash
curl http://localhost:5000
# → {"message":"Server is running!","status":"ok"}

curl http://localhost:5000/products
# → {"error":"Route not found"}
```

---

### Step 8 — Build for production

```bash
npm run build
```

Compiled files appear in `dist/`. Run in production with:

```bash
npm start
```

---

## 🗂️ .gitignore

Make sure your `.gitignore` includes:

```
node_modules/
dist/
.env
```

---

## 📜 License

This project is licensed under the **ISC License**.

---

<div align="center">

Made with 💚 by [st-shourov12](https://github.com/st-shourov12)

</div>