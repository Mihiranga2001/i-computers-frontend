import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import toast from "react-hot-toast";
import CheckoutPage from "../../src/pages/checkOut";

const mockNavigate = vi.hoisted(() => vi.fn());

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
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

const cart = [
  {
    productID: "P001",
    name: "Gaming Laptop",
    price: 1000,
    labelledPrice: 1200,
    quantity: 2,
    image: "laptop.jpg",
  },
];

function renderCheckout() {
  return render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/checkout",
          state: cart,
        },
      ]}
    >
      <CheckoutPage />
    </MemoryRouter>
  );
}

describe("Checkout Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("1. renders the checkout cart and Order Now button", () => {
    renderCheckout();

    expect(screen.getAllByText("Gaming Laptop").length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: "Order Now" })).toBeInTheDocument();
  });

  test("2. displays the correct order total", () => {
    renderCheckout();

    expect(screen.getAllByText("LKR. 2000.00").length).toBeGreaterThan(0);
  });

  test("3. user can enter name, phone and address", async () => {
    const user = userEvent.setup();
    renderCheckout();

    const fields = screen.getAllByRole("textbox");

    await user.type(fields[0], "John Silva");
    await user.type(fields[1], "0771234567");
    await user.type(fields[2], "Colombo, Sri Lanka");

    expect(fields[0]).toHaveValue("John Silva");
    expect(fields[1]).toHaveValue("0771234567");
    expect(fields[2]).toHaveValue("Colombo, Sri Lanka");
  });

  test("4. user without token is redirected to login", async () => {
    const user = userEvent.setup();
    renderCheckout();

    await user.click(screen.getByRole("button", { name: "Order Now" }));

    expect(toast.error).toHaveBeenCalledWith(
      "You must be logged in to place an order"
    );
    expect(mockNavigate).toHaveBeenCalledWith("/login");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("5. logged-in user can place an order", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "customer-token");
    axios.post.mockResolvedValue({ data: {} });

    renderCheckout();

    const fields = screen.getAllByRole("textbox");
    await user.type(fields[0], "John Silva");
    await user.type(fields[1], "0771234567");
    await user.type(fields[2], "Colombo");

    await user.click(screen.getByRole("button", { name: "Order Now" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/orders"),
        {
          name: "John Silva",
          address: "Colombo",
          phone: "0771234567",
          items: [
            {
              productID: "P001",
              quantity: 2,
            },
          ],
        },
        {
          headers: {
            Authorization: "Bearer customer-token",
          },
        }
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Order placed successfully");
    expect(mockNavigate).toHaveBeenCalledWith("/orders");
  });

  test("6. order API failure displays an error", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "customer-token");
    axios.post.mockRejectedValue(new Error("Server error"));

    renderCheckout();

    await user.click(screen.getByRole("button", { name: "Order Now" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Error placing order");
    });
  });
});
