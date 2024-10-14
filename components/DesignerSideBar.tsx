import React from "react";

import useDesigner from "./hooks/useDesigner";
import FormElementSidebar from "./FormElementSidebar";
import ElementsPropertiesForm from "./ElementsPropertiesForm";

function DesignerSideBar() {
  const { selectedElement } = useDesigner();
  return (
    <aside
      className="p-4 lg:w-[900px] lg:max-w-[900px] w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 bg-background 
      overflow-y-auto h-full border-l-2 border-muted "
    >
      {!selectedElement && <FormElementSidebar />}
      {selectedElement && <ElementsPropertiesForm />}
    </aside>
  );
}

export default DesignerSideBar;
