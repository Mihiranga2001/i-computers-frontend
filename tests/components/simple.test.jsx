import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";

function TestComponent() {
  return <h1>i-Computers</h1>;
}

describe("Simple Test", () => {
  test("shows i-Computers text", () => {
    render(<TestComponent />);

    expect(screen.getByText("i-Computers")).toBeInTheDocument();
  });
});