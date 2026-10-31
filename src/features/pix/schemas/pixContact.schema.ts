import { z } from "zod";

export const pixContactSchema = z.object({
  name: z.string().trim().min(1, "Enter your name."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
  message: z.string().trim().min(1, "Enter a message."),
});

export type PixContactInput = z.infer<typeof pixContactSchema>;
