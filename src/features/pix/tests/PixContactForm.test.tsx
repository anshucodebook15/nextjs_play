import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { PixContactForm } from "@/src/features/pix/components/PixContactForm";

describe("PixContactForm", () => {
  it("shows required errors and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<PixContactForm />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter your email.")).toBeInTheDocument();
    expect(screen.getByText("Enter a message.")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toHaveFocus();
  });

  it("allows correction of invalid email and clears feedback when editing", async () => {
    const user = userEvent.setup();
    render(<PixContactForm />);
    const email = screen.getByRole("textbox", { name: "Email" });
    const message = screen.getByRole("textbox", { name: "Message" });

    await user.type(screen.getByRole("textbox", { name: "Name" }), "Alex");
    await user.type(email, "invalid");
    await user.type(message, "Hello Pix");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();

    await user.clear(email);
    await user.type(email, "alex@example.com");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your form passed validation. Your message has not been sent or saved.",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(message).toHaveValue("Hello Pix");

    await user.type(message, "!");
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });
});
