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
import { Textarea } from "../ui/textarea";
import { BsTextareaResize } from "react-icons/bs";
import { Slider } from "../ui/slider";

const type: ElementsType = "TextAreaField";

const extraAttribute = {
  placeholder: "Value Here...",
  label: "TextArea Field",
  helperText: "helper text",
  required: false,
  rows: 3,
};

const propertiesSchema = z.object({
  placeholder: z.string().max(50),
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  rows: z.number().min(1).max(10),
});

export const TextAreaFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttribute,
  }),

  designerBtn: {
    icon: BsTextareaResize,
    label: "TextArea field",
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
      return currentValue.length > 0;
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

  const { label, helperText, placeholder, required, rows } =
    element.extraAttribute;
  return (
    <div className="flex flex-col gap-1 w-full items-start ">
      <Label className="text-md font-medium flex gap-1">
        {label}
        {required && <p>*</p>}
      </Label>
      <Textarea  readOnly disabled placeholder={placeholder} />
      {helperText && <p className="text-sm font-medium mt-1">{helperText}</p>}
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
      placeholder: element.extraAttribute.placeholder,
      required: element.extraAttribute.required,
      rows: element.extraAttribute.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttribute);
  }, [element, form]);

  function applyChange(values: PropertiesFormSchemaType) {
    const { label, helperText, placeholder, required, rows } = values;
    updateElement(element.id, {
      ...element,
      extraAttribute: {
        label,
        helperText,
        placeholder,
        required,
        rows,
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
          name="placeholder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>placeHolder</FormLabel>
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
              <FormDescription>The Helpertext of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rows"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Rows {form.watch("rows")}</FormLabel>
              <FormControl>
                <Slider defaultValue={[field.value]} min={1} max={10} onValueChange={(value)=>{
                  field.onChange(value[0])
                }}  />
              </FormControl>
            
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
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitType;
  isValid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  const { label, helperText, placeholder, required, rows } =
    element.extraAttribute;

  useEffect(() => {
    setError(isValid === true);
  }, [isValid]);

  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <Label
        className={cn(
          "text-md font-medium flex gap-1",
          error && "text-red-500"
        )}
      >
        {label}
        {required && <p>*</p>}
      </Label>
      <Textarea
        rows={rows}
        className={cn(error && "border-red-500")}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextAreaFieldformElement.validate(
            element,
            e.target.value
          );
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        value={value}
      />
      {helperText && (
        <p className={cn("text-sm font-medium mt-1", error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
