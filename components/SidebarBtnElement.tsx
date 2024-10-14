import React from "react";
import { FormElement } from "./FormElements";
import { Button } from "./ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { label, icon: Icon } = formElement.designerBtn;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant={"outline"}
      className={cn(
        "flex-col gap-2 w-full h-[100px] cursor-grab ",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.attributes}
      {...draggable.listeners}
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-md ">{label}</p>
    </Button>
  );
}

export function SidebarBtnElementOverlay({
  formElement,
}: {
  formElement: FormElement;
}) {
  const { label, icon: Icon } = formElement.designerBtn;
  

  return (
    <Button
      variant={"outline"}
      className="flex-col gap-2 w-1/2 h-[100px] cursor-grab "
    >
      <Icon className="h-8 w-8 text-primary cursor-grab" />
      <p className="text-xs ">{label}</p>
    </Button>
  );
}

export default SidebarBtnElement;
