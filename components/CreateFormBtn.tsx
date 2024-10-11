"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Description } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Control, useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "@/hooks/use-toast";
import { formDataSchemaType, formDataSchema } from "@/schemas/form";
import { CreateForm } from "@/actions/form";
import { FiFilePlus } from "react-icons/fi";
import { useRouter } from "next/navigation";

function CreateFormBtn() {
  const router = useRouter();

  const form = useForm<formDataSchemaType>({
    resolver: zodResolver(formDataSchema),
  });

  async function onSubmit(values: formDataSchemaType) {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Form Created",
        description: "Your form has been created successfully",
      });
      router.push(`/builder/${formId}`);
    } catch (e) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-[190px]  justify-center font-semibold text-2xl gap-2 items-center"
        >
          {" "}
          <FiFilePlus /> Create a new Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create a Form</DialogTitle>
        <DialogDescription>
          Create a new form to start collecting data.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""}></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""}></Textarea>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {!form.formState.isSubmitting && <span>Save</span>}
            {form.formState.isSubmitting && (
              <ImSpinner2 className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateFormBtn;
