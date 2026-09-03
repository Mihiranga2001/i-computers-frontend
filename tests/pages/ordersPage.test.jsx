import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import OrdersPage from "../../src/pages/ordersPage";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("../../src/components/viewOrderInfoCustomer", () => ({
  default: ({ order }) => (
    <button data-testid={`view-${order.orderId}`}>View Order</button>
  ),
}));

const order = {
  orderId: "ORD001",
  email: "john@gmail.com",
  name: "John Silva",
  date: "2026-08-29T10:00:00.000Z",
  status: "pending",
  total: 250000,
};

describe("Orders Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("1. shows a loader while orders are loading", () => {
    axios.get.mockReturnValue(new Promise(() => {}));

    render(<OrdersPage />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("2. loads orders with the stored authorization token", async () => {
    localStorage.setItem("token", "customer-token");
    axios.get.mockResolvedValue({ data: [] });

    render(<OrdersPage />);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining("/orders"),
        {
          headers: {
            Authorization: "Bearer customer-token",
          },
        }
      );
    });
  });

  test("3. displays order information returned by the API", async () => {
    axios.get.mockResolvedValue({ data: [order] });

    render(<OrdersPage />);

    expect(await screen.findByText("ORD001")).toBeInTheDocument();
    expect(screen.getByText("john@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("John Silva")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText("LKR. 250000.00")).toBeInTheDocument();
    expect(screen.getByTestId("view-ORD001")).toBeInTheDocument();
  });

  test("4. empty response shows the order table with no order rows", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<OrdersPage />);

    await screen.findByRole("table");

    // One row remains: the table heading row.
    expect(screen.getAllByRole("row")).toHaveLength(1);
  });
});
