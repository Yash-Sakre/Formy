"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitType,
} from "../FormElements";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { Switch } from "@/components/ui/switch";
import { CiCalendar } from "react-icons/ci";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const type: ElementsType = "DateField";

const extraAttribute = {
  label: "Date Field",
  helperText: "Pick a Date",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const DateFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,
    extraAttribute,
  }),

  designerBtn: {
    icon: BsFillCalendarDateFill,
    label: "Date field",
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
      <Button
        variant={"outline"}
        className="w-full justify-start text-left font-normal"
      >
        <CiCalendar className="mr-2 h-4 w-4" />
        <span>Pick a Date</span>
      </Button>
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
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitType;
  isValid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [error, setError] = useState(false);

  const { label, helperText, placeholder, required } = element.extraAttribute;

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
      <Popover>
        <PopoverTrigger className="w-full">
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              error && "border-red-500"
            )}
          >
            <CiCalendar className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 ">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date)=>{
              setDate(date);
              
              if(!submitValue) return;

              const value = date?.toUTCString() || "";
              const valid = DateFieldformElement.validate(element,value)
              setError(!valid)

              submitValue(element.id,value);
              
              
            }}
           initialFocus
          />
        </PopoverContent>
      </Popover>
      {helperText && (
        <p className={cn("text-sm font-medium mt-1", error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
