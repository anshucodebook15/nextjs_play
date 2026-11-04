import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FormPreviewFeature } from "@/src/features/form-preview";

describe("FormPreviewFeature", () => {
  it("updates all preview text live without losing entered preview values", async () => {
    const user = userEvent.setup();
    render(<FormPreviewFeature />);
    await user.type(screen.getByRole("textbox", { name: "Your name" }), "Alex");

    for (const [label, value] of [
      ["Form title", "Contact our team"],
      ["Name field label", "Full name"],
      ["Message heading", "Your question"],
    ]) {
      const input = screen.getByRole("textbox", { name: label });
      await user.clear(input);
      await user.type(input, value);
    }

    expect(screen.getByRole("heading", { name: "Contact our team" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveValue("Alex");
    expect(screen.getByRole("textbox", { name: "Your question" })).toBeInTheDocument();
    await user.clear(screen.getByRole("textbox", { name: "Name field label" }));
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveValue("Alex");
  });
});
