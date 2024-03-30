import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import Counter from "./Counter.svelte";

const DEFAULT_TEXT_PROP = "Hello World!";

describe("Counter", () => {
  test("renders", () => {
    render(Counter);

    const plusBtn = screen.getByRole("button", { name: "+" });
    const minBtn = screen.getByRole("button", { name: "-" });

    expect(plusBtn).toBeInTheDocument();
    expect(minBtn).toBeInTheDocument();
    expect(screen.getByText(DEFAULT_TEXT_PROP)).toBeInTheDocument();
  });

  test("renders with custom text", () => {
    render(Counter, { text: "Hello Test Component!" });

    expect(screen.getByText("Hello Test Component!")).toBeInTheDocument();
  });

  test("updates number on button click", async () => {
    render(Counter);

    const user = userEvent.setup();
    const plusBtn = screen.getByRole("button", { name: "+" });
    const minBtn = screen.getByRole("button", { name: "-" });

    await user.click(plusBtn);

    expect(screen.getByText("1")).toBeInTheDocument();

    await user.click(minBtn);

    expect(screen.getByText("0")).toBeInTheDocument();
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
