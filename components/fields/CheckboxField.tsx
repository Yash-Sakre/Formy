"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitType,
} from "../FormElements";
import { IoMdCheckbox } from "react-icons/io";
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
import { Checkbox } from "../ui/checkbox";


const type: ElementsType = "CheckboxField";

const extraAttribute = {
 
  label: "CheckBox Field",
  helperText: "helper text",
  required: false,
};

const propertiesSchema = z.object({

  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckboxFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttribute,
  }),

  designerBtn: { 
    icon: IoMdCheckbox,
    label: "Checkbox field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttribute.required) {
      return currentValue === "true";
    }

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

  const { label, helperText, required } = element.extraAttribute;
  const id=`checkbox-${element.id}`

  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id}/>
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && <p>*</p>}
        </Label>
        <Input readOnly disabled  />
        {helperText && <p className="text-sm font-medium mt-1">{helperText}</p>}
      </div>
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
      label: element.extraAttribute.label,
      helperText: element.extraAttribute.helperText,
      
      required: element.extraAttribute.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttribute);
  }, [element, form]);

  function applyChange(values: PropertiesFormSchemaType) {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttribute: {
        label,
        helperText,
        required,
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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
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
              <FormDescription>
                The label of the field. <br /> It will be displayed above the
                field
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      

        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Helpher Text</FormLabel>
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
              <FormDescription>The placeHolder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-lg">
              <div>
                <FormLabel>Required</FormLabel>
                <FormDescription>The placeHolder of the field.</FormDescription>
              </div>
              <FormControl></FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
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
  submitValue,
  isValid,
  defaultValue
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitType;
  isValid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState<boolean>(defaultValue === "true" ? true : false);
  const [error, setError] = useState(false);

  const { label, helperText, required } = element.extraAttribute;

  useEffect(() => {
    setError(isValid === true);
  }, [isValid]);


  const id=`checkbox-${element.id}`

  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} checked={value} className={cn(error && "border-red-500")} onCheckedChange={(checked)=>{
        let value = false;
        if(checked == true) value = true;

        if(!submitValue) return;
        const valid = CheckboxFieldformElement.validate(element,value === true ? "true" : "false")
        setError(!valid)
        submitValue(element.id,value === true ? "true" : "false")

      }} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id} className={cn(error && "text-red-500")}>
          {label}
          {required && <p>*</p>}
        </Label>
        <Input readOnly disabled  />
        {helperText && <p className={cn("text-sm font-medium mt-1",error && "text-red-500")}>{helperText}</p>}
      </div>
    </div>

  );
}
