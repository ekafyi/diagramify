import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import Error, { title } from "./Error.svelte";

describe("Error", () => {
  test("renders", () => {
    render(Error);

    const container = screen.getByRole("alert", { name: title });

    expect(container).toBeInTheDocument();
  });
});
