"use client";

import { Form } from "@prisma/client";
import React from "react";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";
import SaveFormBtn from "./SaveFormBtn";
import Designer from "./Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "./DragOverlayWrapper";

function FormBuilder({ form }: { form: Form }) {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint:{
      delay:300,
      tolerance: 5,
    }
  })

  const sensors = useSensors(mouseSensor,touchSensor);

  return (
    <DndContext sensors={sensors}>
      <main className="flex w-full flex-col container">
        <nav className="flex justify-between items-center border-b-2 p-2 gap-3">
          <div>Form: {form.name}</div>
          <div className="flex justify-center gap-1">
            <PreviewDialogBtn />
            {!form.published && (
              <>
                <SaveFormBtn />
                <PublishFormBtn />
              </>
            )}
          </div>
        </nav>
        <div className="flex  w-full relative flex-grow items-center justify-center overflow-y-auto h-[200px] mt-[5px] ">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
