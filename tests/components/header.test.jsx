import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import Header from "../../src/components/header";

vi.mock("../../src/components/userData", () => ({
  default: () => <div data-testid="user-area">User Area</div>,
}));

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  test("1. renders the logo", () => {
    renderHeader();
    expect(screen.getByRole("img", { name: /logo/i })).toBeInTheDocument();
  });

  test("2. shows the main navigation links", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Products" })).toHaveAttribute("href", "/products");
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });

  test("3. shows the cart link and user area", () => {
    const { container } = renderHeader();

    expect(container.querySelector('a[href="/cart"]')).toBeInTheDocument();
    expect(screen.getByTestId("user-area")).toBeInTheDocument();
  });
});
