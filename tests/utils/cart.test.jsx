import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  getCart,
  addToCart,
  emptyCart,
  getCartTotal,
} from "../../src/utils/cart";

// Mock toast messages
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
  },
}));

// Sample product for testing
const product = {
  productID: "PROD001",
  name: "Gaming Laptop",
  price: 200000,
  labelledPrice: 220000,
  images: ["laptop.jpg"],
};

describe("Cart Functions", () => {

  // Clear localStorage before every test
  beforeEach(() => {
    localStorage.clear();
  });

  test("empty cart returns an empty array", () => {
    const cart = getCart();

    expect(cart).toEqual([]);
  });

  test("new product can be added to cart", () => {
    addToCart(product, 1);

    const cart = getCart();

    expect(cart).toHaveLength(1);
    expect(cart[0].productID).toBe("PROD001");
    expect(cart[0].name).toBe("Gaming Laptop");
    expect(cart[0].quantity).toBe(1);
  });

  test("same product quantity increases", () => {
    addToCart(product, 1);
    addToCart(product, 2);

    const cart = getCart();

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
  });

  test("product quantity can decrease", () => {
    addToCart(product, 3);

    addToCart(product, -1);

    const cart = getCart();

    expect(cart[0].quantity).toBe(2);
  });

  test("product is removed when quantity becomes zero", () => {
    addToCart(product, 1);

    addToCart(product, -1);

    const cart = getCart();

    expect(cart).toEqual([]);
  });

  test("emptyCart clears all products", () => {
    addToCart(product, 2);

    emptyCart();

    const cart = getCart();

    expect(cart).toEqual([]);
  });

  test("getCartTotal calculates the correct total", () => {
    addToCart(product, 2);

    const total = getCartTotal();

    expect(total).toBe(400000);
  });

});