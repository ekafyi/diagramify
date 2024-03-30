import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import Prompter from "./Prompter.svelte";

describe("Prompter", () => {
  test("renders", () => {
    render(Prompter);

    const form = screen.getByRole("form", { name: "Ask Gemini" });
    const input = screen.getByRole("textbox", { name: "Write your prompt" });
    const btn = screen.getByRole("button", { name: "Submit", type: "Submit" });

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
});
