import type { FormPreviewSettings } from "@/src/features/form-preview/types/formPreview.types";

export function FormPreviewBox({ settings }: { settings: FormPreviewSettings }) {
  return (
    <section
      aria-labelledby="preview-heading"
      className="min-w-0 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-6 sm:p-8"
    >
      <div className="mb-8 flex items-center justify-between gap-3">
        <h2 id="preview-heading" className="text-sm font-semibold text-slate-600">
          Live preview
        </h2>
        <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </span>
      </div>
      <div className="rounded-2xl border border-white bg-white p-6 shadow-xl shadow-indigo-100/60 sm:p-8">
        <div className="mb-6 h-1.5 w-10 rounded-full bg-indigo-600" />
        <h3 className="min-h-8 text-2xl leading-tight font-semibold tracking-tight break-words">
          {settings.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          We’d love to hear from you. Leave a little note below.
        </p>
        <div className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="preview-name"
              className="mb-2 block min-h-5 text-sm font-medium break-words"
            >
              {settings.name}
            </label>
            <input
              id="preview-name"
              aria-label={settings.name.trim() || "Name"}
              placeholder="e.g. Alex Morgan"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="preview-message"
              className="mb-2 block min-h-5 text-sm font-medium break-words"
            >
              {settings.messageHeading}
            </label>
            <textarea
              id="preview-message"
              aria-label={settings.messageHeading.trim() || "Message"}
              rows={4}
              placeholder="Tell us what’s on your mind…"
              className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>
        <p className="mt-5 text-xs text-slate-400">Preview only · Nothing is sent or saved.</p>
      </div>
    </section>
  );
}
