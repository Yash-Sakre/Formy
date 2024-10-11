"use client"

import { useContext } from "react";
import { DesignerContenxt } from "../context/DesignerContext";

export default function useDesigner() {
  const context = useContext(DesignerContenxt);

  if (!context) {
    throw new Error("useDesigner must be used within a <DesignerProvider />");
  }

  return context;
}
