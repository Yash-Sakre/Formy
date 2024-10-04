import { z } from "zod";

export const formDataSchema = z.object({
    name: z.string().min(4),
    description: z.string().optional(),
  });
  
export  type formDataSchemaType = z.infer<typeof formDataSchema>;
  