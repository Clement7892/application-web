// src/index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import AppRouter from "./AppRouter";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
