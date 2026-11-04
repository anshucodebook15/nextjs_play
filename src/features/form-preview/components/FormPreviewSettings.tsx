import type {
  FormPreviewSettings as PreviewSettings,
  UpdateFormPreviewSetting,
} from "@/src/features/form-preview/types/formPreview.types";

type FormPreviewSettingsProps = {
  settings: PreviewSettings;
  onSettingChange: UpdateFormPreviewSetting;
};

export function FormPreviewSettings({ settings, onSettingChange }: FormPreviewSettingsProps) {
  return (
    <section
      aria-labelledby="settings-heading"
      className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"
    >
      <span className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
        01 / Customize
      </span>
      <h2 id="settings-heading" className="mt-3 text-xl font-semibold">
        Form settings
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Make it yours. Every edit appears in the preview instantly.
      </p>
      <div className="mt-8 space-y-6">
        {(
          [
            ["title", "Form title"],
            ["name", "Name field label"],
            ["messageHeading", "Message heading"],
          ] as const
        ).map(([setting, label]) => (
          <div key={setting}>
            <label htmlFor={`setting-${setting}`} className="mb-2 block text-sm font-medium">
              {label}
            </label>
            <input
              id={`setting-${setting}`}
              value={settings[setting]}
              onChange={(event) => onSettingChange(setting, event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none motion-reduce:transition-none"
            />
          </div>
        ))}
      </div>
      <p className="mt-8 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500">
        This is a playground. Changes reset when you leave or reload.
      </p>
    </section>
  );
}
