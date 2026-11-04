import { useState } from "react";
import type {
  FormPreviewSettings,
  UpdateFormPreviewSetting,
} from "@/src/features/form-preview/types/formPreview.types";

export function useFormPreview() {
  const [settings, setSettings] = useState<FormPreviewSettings>({
    title: "Let’s start a conversation",
    name: "Your name",
    messageHeading: "How can we help?",
  });

  const updateSetting: UpdateFormPreviewSetting = (setting, value) => {
    setSettings((previous) => ({ ...previous, [setting]: value }));
  };

  return { settings, updateSetting };
}
