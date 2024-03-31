import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import OptionsSelect from "./OptionsSelect.svelte";

describe("OptionsSelect", () => {
  test("renders", () => {
    render(OptionsSelect);

    const title = screen.getByRole("heading", { level: 1 });
    const optionBtn = screen.getByRole("button", { name: "OAuth 2.0" });
    const submitBtn = screen.getByRole("button", { name: "Get diagram" });

    expect(title).toBeInTheDocument();
    expect(optionBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });
});
