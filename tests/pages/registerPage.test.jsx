import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import toast from "react-hot-toast";
import RegisterPage from "../../src/pages/registerPage";

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

function renderRegister() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
}

async function fillValidForm(user) {
  await user.type(screen.getByPlaceholderText("your first name"), "John");
  await user.type(screen.getByPlaceholderText("your last name"), "Silva");
  await user.type(screen.getByPlaceholderText("your email"), "john@gmail.com");
  await user.type(screen.getByPlaceholderText("your password"), "Password123");
  await user.type(screen.getByPlaceholderText("confirm your password"), "Password123");
}

describe("Register Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. renders the register form", () => {
    renderRegister();

    expect(screen.getByRole("heading", { name: "Register" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your last name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("confirm your password")).toBeInTheDocument();
  });

  test("2. user can fill all required fields", async () => {
    const user = userEvent.setup();
    renderRegister();

    await fillValidForm(user);

    expect(screen.getByPlaceholderText("your first name")).toHaveValue("John");
    expect(screen.getByPlaceholderText("your last name")).toHaveValue("Silva");
    expect(screen.getByPlaceholderText("your email")).toHaveValue("john@gmail.com");
    expect(screen.getByPlaceholderText("your password")).toHaveValue("Password123");
    expect(screen.getByPlaceholderText("confirm your password")).toHaveValue("Password123");
  });

  test("3. password mismatch shows an error", async () => {
    const user = userEvent.setup();
    renderRegister();

    await user.type(screen.getByPlaceholderText("your first name"), "John");
    await user.type(screen.getByPlaceholderText("your last name"), "Silva");
    await user.type(screen.getByPlaceholderText("your email"), "john@gmail.com");
    await user.type(screen.getByPlaceholderText("your password"), "Password123");
    await user.type(screen.getByPlaceholderText("confirm your password"), "Different123");

    await user.click(screen.getByRole("button", { name: "Register Now" }));

    expect(toast.error).toHaveBeenCalledWith("Passwords do not match");
    expect(axios.post).not.toHaveBeenCalled();
  });

  test("4. successful registration calls the users API", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValue({ data: {} });

    renderRegister();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Register Now" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/users/"),
        {
          email: "john@gmail.com",
          password: "Password123",
          firstName: "John",
          lastName: "Silva",
        }
      );
    });
  });

  test("5. successful registration redirects to login", async () => {
    const user = userEvent.setup();
    axios.post.mockResolvedValue({ data: {} });

    renderRegister();
    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Register Now" }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Registration successful! Welcome to I computers."
    );
  });
});
