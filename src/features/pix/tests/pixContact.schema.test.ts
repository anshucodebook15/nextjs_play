import { describe, expect, it } from "vitest";
import { pixContactSchema } from "@/src/features/pix/schemas/pixContact.schema";

const validInput = { name: "Alex", email: "alex@example.com", message: "Hello" };

describe("pixContactSchema", () => {
  it("accepts valid input and trims surrounding whitespace", () => {
    expect(
      pixContactSchema.parse({
        name: " Alex ",
        email: " alex@example.com ",
        message: " Hello ",
      }),
    ).toEqual(validInput);
  });

  it.each(["name", "email", "message"])("rejects a blank %s", (field) => {
    expect(pixContactSchema.safeParse({ ...validInput, [field]: "" }).success).toBe(false);
    expect(pixContactSchema.safeParse({ ...validInput, [field]: "   " }).success).toBe(false);
  });

  it("rejects malformed email", () => {
    expect(pixContactSchema.safeParse({ ...validInput, email: "invalid" }).success).toBe(false);
  });
});
