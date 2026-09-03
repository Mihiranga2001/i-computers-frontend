import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import toast from "react-hot-toast";
import ReviewPage from "../../src/pages/reviewPage";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ productID: "P001" }),
  };
});

describe("Review Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("1. loads and displays existing reviews", async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          reviewId: "R001",
          email: "customer@gmail.com",
          rating: 5,
          comment: "Excellent laptop",
        },
      ],
    });

    render(<ReviewPage />);

    expect(await screen.findByText("customer@gmail.com")).toBeInTheDocument();
    expect(screen.getByText("Excellent laptop")).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining("/reviews/P001")
    );
  });

  test("2. shows No reviews yet when the product has no reviews", async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<ReviewPage />);

    expect(await screen.findByText("No reviews yet")).toBeInTheDocument();
  });

  test("3. user must be logged in before submitting a review", async () => {
    const user = userEvent.setup();
    axios.get.mockResolvedValue({ data: [] });

    const { container } = render(<ReviewPage />);

    await screen.findByText("No reviews yet");

    const ratingStars = container.querySelectorAll("svg.cursor-pointer");
    await user.click(ratingStars[4]);
    await user.type(screen.getByPlaceholderText("Write your review"), "Very good");
    await user.click(screen.getByRole("button", { name: "Submit Review" }));

    expect(toast.error).toHaveBeenCalledWith("Please login first");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("4. logged-in user can submit a review", async () => {
    const user = userEvent.setup();
    localStorage.setItem("token", "customer-token");

    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({
      data: {
        reviewId: "R002",
        email: "john@gmail.com",
        rating: 5,
        comment: "Amazing product",
      },
    });

    const { container } = render(<ReviewPage />);

    await screen.findByText("No reviews yet");

    const ratingStars = container.querySelectorAll("svg.cursor-pointer");
    await user.click(ratingStars[4]);
    await user.type(
      screen.getByPlaceholderText("Write your review"),
      "Amazing product"
    );
    await user.click(screen.getByRole("button", { name: "Submit Review" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/reviews"),
        {
          productID: "P001",
          rating: 5,
          comment: "Amazing product",
        },
        {
          headers: {
            Authorization: "Bearer customer-token",
          },
        }
      );
    });

    expect(toast.success).toHaveBeenCalledWith("Review added");
    expect(await screen.findByText("Amazing product")).toBeInTheDocument();
  });
});
