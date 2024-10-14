"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitType,
} from "../FormElements";
import { RxDropdownMenu } from "react-icons/rx";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "@/hooks/use-toast";

const type: ElementsType = "SelectField";

const extraAttribute = {
  placeholder: "Value Here...",
  label: "Select Field",
  helperText: "helper text",
  required: false,
  options: [],
};

const propertiesSchema = z.object({
  placeholder: z.string().max(50),
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  options: z.array(z.string()).default([]),
});

export const SelectFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttribute,
  }),

  designerBtn: {
    icon: RxDropdownMenu,
    label: "Select field",
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

  const { label, helperText, placeholder, required } = element.extraAttribute;
  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <Label className="text-md font-medium flex gap-1">
        {label}
        {required && <p>*</p>}
      </Label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </Select>
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

  const { updateElement , setSelectedElement } = useDesigner();

  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttribute.label,
      helperText: element.extraAttribute.helperText,
      placeholder: element.extraAttribute.placeholder,
      required: element.extraAttribute.required,
      options: element.extraAttribute.options,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttribute);
  }, [element, form]);

  function applyChange(values: PropertiesFormSchemaType) {
    const { label, helperText, placeholder, required, options } = values;
    updateElement(element.id, {
      ...element,
      extraAttribute: {
        label,
        helperText,
        placeholder,
        required,
        options,
      },
    });

    toast({
      title: "Success",
      description: "Field properties updated successfully",
     
    })

    setSelectedElement(null);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(applyChange)}
        
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
              <FormDescription>The placeHolder of the field.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>Options</FormLabel>
                <Button
                  variant={"outline"}
                  className="gap-2"
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("New options"));
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={(e) => {
                        e.preventDefault();
                        const newOptions = [...field.value]
                        newOptions.splice(index,1)
                        field.onChange(newOptions)

                      }}
                    ><AiOutlineClose/></Button>
                  </div>
                ))}
              </div>
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

        <Button type="submit" className="w-full">
          Save
        </Button>
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

  const { label, helperText, placeholder, required, options } =
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
      <Select
      defaultValue={value}
        onValueChange={(value) => {
          setValue(value);
          if (!submitValue) return;

          const valid = SelectFieldformElement.validate(element, value);
          setError(!valid);
          submitValue(element.id, value);
        }}
      >
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            return (
              <SelectItem value={option} key={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {helperText && (
        <p className={cn("text-sm font-medium mt-1", error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
