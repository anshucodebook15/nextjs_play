"use client";

import { usePixContactForm } from "@/src/features/pix/hooks/usePixContactForm";

const inputClassName =
  "w-full rounded-md border border-foreground/25 bg-background px-3 py-2 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background aria-invalid:border-red-600";

export function PixContactForm() {
  const {
    register,
    formState: { errors, isSubmitting },
    onSubmit,
    hasSubmitted,
    clearFeedback,
  } = usePixContactForm();

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      onChange={clearFeedback}
      aria-label="Contact form"
      aria-describedby="pix-form-description"
      className="border-foreground/20 bg-background w-full max-w-xl space-y-6 rounded-lg border p-6"
    >
      <p id="pix-form-description" className="text-sm opacity-70">
        All fields are required. This demo validates your message locally; it does not send or save
        it.
      </p>

      <div className="space-y-2">
        <label htmlFor="pix-name" className="block text-sm font-medium">
          Name
        </label>
        <input
          {...register("name")}
          id="pix-name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "pix-name-error" : undefined}
          className={inputClassName}
        />
        {errors.name && (
          <p id="pix-name-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="pix-email" className="block text-sm font-medium">
          Email
        </label>
        <input
          {...register("email")}
          id="pix-email"
          type="email"
          autoComplete="email"
          required
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "pix-email-error" : undefined}
          className={inputClassName}
        />
        {errors.email && (
          <p id="pix-email-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="pix-message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          {...register("message")}
          id="pix-message"
          rows={5}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "pix-message-error" : undefined}
          className={`${inputClassName} min-h-32 resize-y`}
        />
        {errors.message && (
          <p id="pix-message-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-background focus-visible:ring-foreground focus-visible:ring-offset-background rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      <p role="status" className="text-sm">
        {hasSubmitted
          ? "Your form passed validation. Your message has not been sent or saved."
          : ""}
      </p>
    </form>
  );
}
