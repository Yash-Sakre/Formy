import React, { useTransition } from "react";
import { Button } from "./ui/button";
import useDesigner from "./hooks/useDesigner";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/hooks/use-toast";
import { ImSpinner } from "react-icons/im";

function SaveFormBtn({ id }: { id: number }) {
  const { elements } = useDesigner();
  const [loading, startTransition] = useTransition();

  const updateFormContent = async () => {
    try {
      const JsonElement = JSON.stringify(elements);
      await UpdateFormContent(id, JsonElement);
      toast({
        title: "Form Saved",
        description: "Your form has been saved successfully",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant={"outline"}
      disabled={loading}
      onClick={() => startTransition(updateFormContent)}
    >
      {" "}
      Save {loading && <ImSpinner className="animate-spin" />}
    </Button>
  );
}

export default SaveFormBtn;
