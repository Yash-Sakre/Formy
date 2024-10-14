"use client";

import React, { useState } from "react";
import DesignerSideBar from "./DesignerSideBar";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesigner from "./hooks/useDesigner";
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from "./FormElements";
import { idGenerator } from "@/lib/idGenerator";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";

function Designer() {
  const {
    elements,
    addElements,
    selectedElement,
    setSelectedElement,
    removeElements,
  } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;

      const designerbtn = active.data?.current?.isDesignerBtnElement;

      // Case 1
      const isDroppingOverDesignerDropArea =
        over?.data.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        designerbtn && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElements = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        addElements(elements.length, newElements);
        return;
      }

      //Case 2

      const isDroppingOverDesignerElementTopHalf =
        over?.data.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElementBottomHalf =
        over?.data.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        designerbtn && isDroppingOverDesignerElement;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElements = FormElements[type as ElementsType].construct(
          idGenerator()
        );

        const overId = over?.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) throw new Error("element not found");

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        addElements(indexForNewElement, newElements);
        return;
      }

      //case 3

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDraggingDesignerElement && isDroppingOverDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over?.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );
        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error("element not found");

        const activeElement = { ...elements[activeElementIndex] };
        removeElements(activeId);

        let newIndex = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          newIndex = overElementIndex + 1;
        }

        addElements(newIndex, activeElement);
      }
    },
  });

  return (
    <div className="flex w-full h-full ">
      <div
        className="p-4 w-full bg-[url(/paper.svg)] border bg-accent"
        onClick={() => {
          if (selectedElement) setSelectedElement(null);
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn(
            "bg-background max-w-[920px] h-full  rounded-xl border m-auto  flex flex-col  justify-start flex-1 overflow-y-auto flex-grow",
            droppable.isOver && "ring-4 ring-primary ring-inset"
          )}
        >
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold justify-center">
              Drop Here
            </p>
          )}

          {droppable.isOver && elements.length === 0 && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20"></div>
            </div>
          )}

          {elements.length > 0 && (
            <div className="flex flex-col text-foreground gap-2 p-4 w-full">
              {elements.map((element) => {
                return (
                  <DesginerElementWrapper key={element.id} element={element} />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <DesignerSideBar />
    </div>
  );
}

function DesginerElementWrapper({ element }: { element: FormElementInstance }) {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const { removeElements, setSelectedElement } = useDesigner();

  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div
      ref={draggable.setNodeRef}
      className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset w-full"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute  w-full h-1/2 rounded-t-lg top-0"
      ></div>
      <div
        ref={bottomHalf.setNodeRef}
        className="absolute  w-full h-1/2 rounded-t-lg bottom-0"
      ></div>
      {mouseIsOver && (
        <>
          <div className="h-full absolute right-0 ">
            <Button
              className="flex h-full justify-center bg-red-500 border rounded-lg rounded-l-none "
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElements(element.id);
              }}
            >
              <BiSolidTrash className="h-4 w-4 " />{" "}
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse ">
            <p className="text-sm text-muted-foreground">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 rounded-lg rounded-b-none w-full bg-primary h-[4px] "></div>
      )}
      <div
        className={cn(
          "h-[120px] bg-accent/40 border px-4 py-2 flex w-full items-center rounded-lg pointer-events-none",
          mouseIsOver && "opacity-30"
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 rounded-lg rounded-t-none w-full bg-primary h-[4px] "></div>
      )}
    </div>
  );
}

export default Designer;
