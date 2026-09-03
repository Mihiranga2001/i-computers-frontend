import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import AdminProductsPage from "../../src/pages/admin/adminProductsPage";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const product = {
  productID: "P001",
  name: "Gaming Laptop",
  price: 250000,
  labelledPrice: 275000,
  category: "Laptop",
  brand: "ASUS",
  model: "ROG-001",
  stock: 10,
  isAvailable: true,
  images: ["laptop.jpg"],
};

function renderAdminProducts() {
  return render(
    <MemoryRouter>
      <AdminProductsPage />
    </MemoryRouter>
  );
}

describe("Admin Products Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    axios.get.mockResolvedValue({ data: [product] });
  });

  test("1. loads products from the products API", async () => {
    renderAdminProducts();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/products")
      );
    });

    expect(await screen.findByText("Gaming Laptop")).toBeInTheDocument();
  });

  test("2. displays important product details", async () => {
    renderAdminProducts();

    expect(await screen.findByText("P001")).toBeInTheDocument();
    expect(screen.getByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.getByText("250000")).toBeInTheDocument();
    expect(screen.getByText("275000")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("ASUS")).toBeInTheDocument();
    expect(screen.getByText("ROG-001")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  test("3. Edit button navigates with the selected product", async () => {
    const user = userEvent.setup();
    renderAdminProducts();

    await screen.findByText("Gaming Laptop");
    await user.click(screen.getByRole("button", { name: "Edit" }));

    expect(mockNavigate).toHaveBeenCalledWith(
      "/admin/update-product",
      { state: product }
    );
  });

  test("4. Add Product link points to the add-product page", async () => {
    const { container } = renderAdminProducts();

    await screen.findByText("Gaming Laptop");

    expect(
      container.querySelector('a[href="/admin/add-product"]')
    ).toBeInTheDocument();
  });

  test("5. deleting a product calls the delete API with admin token", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "admin-token");
    axios.delete.mockResolvedValue({ data: {} });

    renderAdminProducts();

    await screen.findByText("Gaming Laptop");

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(
      screen.getByText("Are you sure you want to delete product P001?")
    ).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole("button", { name: "Delete" });
    await user.click(deleteButtons[1]);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        expect.stringContaining("/products/P001"),
        {
          headers: {
            Authorization: "Bearer admin-token",
          },
        }
      );
    });
  });
});
