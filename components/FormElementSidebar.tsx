import React from "react";
import SidebarBtnElement from "./SidebarBtnElement";
import { FormElements } from "./FormElements";

function FormElementSidebar() {
  return (
    <div className=" flex flex-col border-muted p-4 bg-background overflow-y-auto h-full rounded-lg w-full ">
      Elements
      <SidebarBtnElement formElement={FormElements.TextField} />
    </div>
  );
}

export default FormElementSidebar;
