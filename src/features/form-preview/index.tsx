"use client";

import { FormPreviewBox } from "@/src/features/form-preview/components/FormPreviewBox";
import { FormPreviewSettings } from "@/src/features/form-preview/components/FormPreviewSettings";
import { useFormPreview } from "@/src/features/form-preview/hooks/useFormPreview";

export function FormPreviewFeature() {
  const { settings, updateSetting } = useFormPreview();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
          Form studio / Playground
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Small edits. Live possibilities.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
          Shape your form on the left. Watch it come together on the right.
        </p>
        <div className="mt-10 grid items-start gap-6 md:grid-cols-2">
          <FormPreviewSettings settings={settings} onSettingChange={updateSetting} />
          <FormPreviewBox settings={settings} />
        </div>
      </div>
    </main>
  );
}
