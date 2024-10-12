"use client";

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
  Dispatch,
} from "react";
import { FormElement, FormElementInstance } from "../FormElements";

type DesignerContenxtType = {
  elements: FormElementInstance[];
  setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
  addElements: (index: number, element: FormElementInstance) => void;
  removeElements: (id: string) => void;
  updateElement: (id: string, element: FormElementInstance) => void;

  selectedElement: FormElementInstance | null;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
};

export const DesignerContenxt = createContext<DesignerContenxtType | null>(
  null
);

export function DesignerContextProvider({ children }: { children: ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);

  const addElements = (index: number, element: FormElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev];
      newElements.splice(index, 0, element);
      return newElements;
    });
  };

  const removeElements = (id: string) => {
    setElements((prev) => prev.filter((e) => e.id !== id));
  };

  const updateElement = (id: string, element: FormElementInstance) => {
    setElements((prev) => {
      const newElement = [...prev];
      const index = newElement.findIndex((el) => el.id === id);
      newElement[index] = element;
      return newElement;
    });
  };

  return (
    <DesignerContenxt.Provider
      value={{
        elements,
        setElements,
        addElements,
        removeElements,
        setSelectedElement,
        selectedElement,
        updateElement,
      }}
    >
      {children}
    </DesignerContenxt.Provider>
  );
}
