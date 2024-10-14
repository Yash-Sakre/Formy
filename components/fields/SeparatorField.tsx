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
import { RiSeparator } from "react-icons/ri";
import { Separator } from "../ui/separator";

const type: ElementsType = "SeparatorField";


export const SeparatorFieldformElement: FormElement = {
  type,

  construct: (id: string) => ({
    id,
    type,

  }),

  designerBtn: {
    icon: RiSeparator,
    label: "Separator field",
  },

  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (): boolean => {
    return true;
  },
};




function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {

  return (
    <div className="flex flex-col gap-1 w-full items-start">
      <Label className="text-muted-foreground">
        Separator field
      </Label>
      <Separator/>
      
    </div>
  );
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {

  return (
    <p>Not properties for this elements. </p>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
 

}) {
  return (
    <Separator/>
  );
}
