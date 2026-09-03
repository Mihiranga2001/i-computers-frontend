import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import toast from "react-hot-toast";
import LoginPage from "../../src/pages/loginPage";

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

vi.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => vi.fn(),
}));

vi.mock("../../src/components/loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderLogin() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe("Login Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  test("1. renders the login form", () => {
    renderLogin();

    expect(screen.getByRole("heading", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Login$/i })).toBeInTheDocument();
  });

  test("2. user can type an email", async () => {
    const user = userEvent.setup();
    renderLogin();

    const email = screen.getByPlaceholderText("your email");
    await user.type(email, "lawasi@gmail.com");

    expect(email).toHaveValue("lawasi@gmail.com");
  });

  test("3. user can type a password", async () => {
    const user = userEvent.setup();
    renderLogin();

    const password = screen.getByPlaceholderText("your password");
    await user.type(password, "lawasi1");

    expect(password).toHaveValue("lawasi1");
  });

  test("4. successful login stores the token", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValue({
      data: {
        token: "test-token",
        role: "customer",
      },
    });

    renderLogin();

    await user.type(screen.getByPlaceholderText("your email"), "lawasi@gmail.com");
    await user.type(screen.getByPlaceholderText("your password"), "lawasi1");
    await user.click(screen.getByRole("button", { name: /^Login$/i }));

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("test-token");
    });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/users/login"),
      {
        email: "lawasi@gmail.com",
        password: "lawasi1",
      }
    );
  });

  test("5. admin login redirects to the admin page", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValue({
      data: {
        token: "admin-token",
        role: "admin",
      },
    });

    renderLogin();

    await user.type(screen.getByPlaceholderText("your email"), "admin@gmail.com");
    await user.type(screen.getByPlaceholderText("your password"), "admin123");
    await user.click(screen.getByRole("button", { name: /^Login$/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });

    expect(toast.success).toHaveBeenCalled();
  });

  test("6. invalid login shows an error message", async () => {
    const user = userEvent.setup();
    axios.post.mockRejectedValue(new Error("Invalid credentials"));

    renderLogin();

    await user.type(screen.getByPlaceholderText("your email"), "wrong@gmail.com");
    await user.type(screen.getByPlaceholderText("your password"), "wrong");
    await user.click(screen.getByRole("button", { name: /^Login$/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Login failed! Please check your credentials and try again."
      );
    });

    expect(localStorage.getItem("token")).toBeNull();
  });
});
