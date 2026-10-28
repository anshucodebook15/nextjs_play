"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  pixContactSchema,
  type PixContactInput,
} from "@/src/features/pix/schemas/pixContact.schema";

export function usePixContactForm() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const form = useForm<PixContactInput>({
    resolver: zodResolver(pixContactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = form.handleSubmit(() => {
    setHasSubmitted(true);
  });

  function clearFeedback() {
    setHasSubmitted(false);
  }

  return { ...form, onSubmit, hasSubmitted, clearFeedback };
}
