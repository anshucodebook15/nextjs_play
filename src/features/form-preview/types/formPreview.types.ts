export type FormPreviewSettings = {
  title: string;
  name: string;
  messageHeading: string;
};

export type UpdateFormPreviewSetting = (setting: keyof FormPreviewSettings, value: string) => void;
