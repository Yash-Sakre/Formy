"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitType,
} from "../FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Switch } from "@/components/ui/switch";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { LuHeading2 } from "react-icons/lu";

const type: ElementsType = "SubTitleField";

const extraAttribute = {
  title: "SubTitle Field",
};

const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const SubTitleFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttribute,
  }),

  designerBtn: {
    icon: LuHeading2,
    label: "SubTitle field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (): boolean => {
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttribute: typeof extraAttribute;
};

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { title } = element.extraAttribute;
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <Label className="text-muted-foreground">
        SubTitle field
      </Label>
        <p className="text-lg">{title}</p> 
      
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;

  const { updateElement } = useDesigner();

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: element.extraAttribute.title,
      
    },
  });

  useEffect(() => {
    form.reset(element.extraAttribute);
  }, [element, form]);

  function applyChange(values: PropertiesFormSchemaType) {
    const { title } = values;
    updateElement(element.id, {
      ...element,
      extraAttribute: {
        title,
        
      },
    });
  }

  return (
    <Form {...form}>
      <form
        onBlur={form.handleSubmit(applyChange)}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SubTitle</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.currentTarget.blur();
                    }
                  }}
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />

        
      </form>
    </Form>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
 

}) {
  const element = elementInstance as CustomInstance;

  

  const { title } = element.extraAttribute;

 

  return (
    <p className="text-lg">{title}</p>
  );
}
