import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import ProductPage from "../../src/pages/productPage";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../../src/components/productCard", () => ({
  default: ({ product }) => (
    <div data-testid="product-card">{product.name}</div>
  ),
}));

const products = [
  {
    productID: "P001",
    name: "Gaming Laptop",
    price: 250000,
  },
  {
    productID: "P002",
    name: "Gaming Mouse",
    price: 12000,
  },
];

describe("Product Listing Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. shows loader before products finish loading", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(<ProductPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("2. loads products from the products API", async () => {
    axios.get.mockResolvedValue({ data: products });

    render(<ProductPage />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/products")
      );
    });

    expect(await screen.findByPlaceholderText("Search products...")).toBeInTheDocument();
  });

  test("3. displays products returned by the API", async () => {
    axios.get.mockResolvedValue({ data: products });

    render(<ProductPage />);

    expect(await screen.findByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.getByText("Gaming Mouse")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  test("4. searching calls the search API and displays search results", async () => {
    axios.get
      .mockResolvedValueOnce({ data: products })
      .mockResolvedValueOnce({
        data: [{ productID: "P003", name: "RTX 5090", price: 600000 }],
      });

    render(<ProductPage />);

    const search = await screen.findByPlaceholderText("Search products...");
    fireEvent.change(search, { target: { value: "RTX" } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenLastCalledWith(
        expect.stringContaining("/products/search/RTX")
      );
    });

    expect(await screen.findByText("RTX 5090")).toBeInTheDocument();
  });

  test("5. an empty product response renders no product cards", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<ProductPage />);

    await screen.findByPlaceholderText("Search products...");

    expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
  });
});
