"use client";

import React, { useCallback, useRef, useState, useTransition } from "react";
import { FormElementInstance, FormElements } from "./FormElements";
import { Button } from "./ui/button";
import { HiCursorClick } from "react-icons/hi";
import { toast } from "@/hooks/use-toast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

function FormSubmitPage({
  formUrl,
  content,
}: {
  formUrl: string;
  content: FormElementInstance[];
}) {
  const formValue = useRef<{ [key: string]: string }>({});
  const formError = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderkey] = useState(new Date().getTime());

  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = useCallback(() => {
    for (const field of content) {
      const actualValue = formValue.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formError.current[field.id] = true;
      }

      if (Object.keys(formError.current).length > 0) {
        return false;
      }

      return true;
    }
  }, [content]);

  const submitValue = useCallback((key: string, value: string) => {
    formValue.current[key] = value;
  }, []);

  const submitForm = async () => {
    formError.current = {};
    const validForm = validateForm();

    if (!validForm) {
      setRenderkey(new Date().getTime());

      toast({
        title: "Form Error",
        description: "Please fill all required fields correctly",
        variant: "destructive",
      });
      return;
    }

    try {
      const jsonContent = JSON.stringify(formValue.current);
      await SubmitForm(formUrl, jsonContent);
      setSubmitted(true);
    } catch {
      toast({
        title: "Form Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return <div className="flex items-center justify-center  w-full  p-8 h-full">
      <div className="max-w-[620px] flex  flex-col gap-4 flex-grow bg-background w-full p-8 
      overflow-y-auto border shadow-xl shadow-blue-700 rounded">
        <h1 className="text-2xl font-bold"> Form Submitted</h1>
        <p className="text-muted-foreground">Thank you for Submitting the form, you can close this page now.</p>
      </div>
    </div>;
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex  flex-col gap-4 items-center justify-center  bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded"
      >
        {content.map((element) => {
          const FormComponent = FormElements[element.type].formComponent;
          return (
            <FormComponent
              key={element.id}
              elementInstance={element}
              submitValue={submitValue}
              isValid={formError.current[element.id]}
              defaultValue={formValue.current[element.id]}
            />
          );
        })}
        <Button
          className="mt-8 "
          onClick={() => startTransition(submitForm)}
          disabled={pending}
        >
          {" "}
          {!pending && (
            <>
              <HiCursorClick /> Submit
            </>
          )}
          {pending && <ImSpinner2 className="animate-spin" />}
        </Button>
      </div>
    </div>
  );
}

export default FormSubmitPage;
