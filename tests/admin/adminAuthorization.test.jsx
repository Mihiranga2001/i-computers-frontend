import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import AdminPage from "../../src/pages/adminPage";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../../src/pages/admin/adminOrdersPage", () => ({
  default: () => <div>Admin Orders Page</div>,
}));

vi.mock("../../src/pages/admin/adminProductsPage", () => ({
  default: () => <div>Admin Products Page</div>,
}));

vi.mock("../../src/pages/admin/adminAddProductPage", () => ({
  default: () => <div>Add Product Page</div>,
}));

vi.mock("../../src/pages/admin/adminUpdateProductPage", () => ({
  default: () => <div>Update Product Page</div>,
}));

vi.mock("../../src/pages/admin/adminUsersPage", () => ({
  default: () => <div>Admin Users Page</div>,
}));

vi.mock("../../src/pages/admin/adminReviewPage", () => ({
  default: () => <div>Admin Reviews Page</div>,
}));

function renderAdmin() {
  return render(
    <MemoryRouter>
      <AdminPage />
    </MemoryRouter>
  );
}

describe("Admin Authorization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("1. user without a token is not given admin content", () => {
    renderAdmin();

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
    expect(axios.get).not.toHaveBeenCalled();
  });

  test("2. admin user receives access to the admin menu", async () => {
    localStorage.setItem("token", "admin-token");
    axios.get.mockResolvedValue({
      data: {
        firstName: "Admin",
        role: "admin",
      },
    });

    renderAdmin();

    expect(await screen.findByText("Admin")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Orders/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Products/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Users/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Reviews/i })).toBeInTheDocument();

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/users/"),
      {
        headers: {
          Authorization: "Bearer admin-token",
        },
      }
    );
  });

  test("3. normal customer is not given admin content", async () => {
    localStorage.setItem("token", "customer-token");
    axios.get.mockResolvedValue({
      data: {
        firstName: "John",
        role: "customer",
      },
    });

    renderAdmin();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });

  test("4. authorization API failure does not show admin content", async () => {
    localStorage.setItem("token", "invalid-token");
    axios.get.mockRejectedValue(new Error("Unauthorized"));

    renderAdmin();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.queryByText("Admin")).not.toBeInTheDocument();
  });
});
