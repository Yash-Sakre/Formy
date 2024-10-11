import React from "react";
import useDesigner from "./hooks/useDesigner";
import { FormElements } from "./FormElements";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";

function ElementsPropertiesForm() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col gap-2 w-full ">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/70">Elements Properites</p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose />
        </Button>
      </div>
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  );
}

export default ElementsPropertiesForm;
