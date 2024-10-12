import React from "react";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { FormElements } from "./FormElements";

function PreviewDialogBtn() {
  const { elements } = useDesigner();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"outline"}>Preview</Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Form Preview
          </p>
          <p className="text-sm text-muted-foreground">
            This is how your form will look like to your users.
          </p>
        </div>
        <div className="bg-accent flex flex-col items-center justify-center p-4 bg-[url(/paper.svg)] overflow-y-auto h-full">
          <div className="max-w-full flex flex-col gap-4 flex-grow bg-background h-full w-[600px]  rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />;
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewDialogBtn;
