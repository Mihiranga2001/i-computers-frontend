import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import axios from "axios";
import toast from "react-hot-toast";
import ForgetPasswordPage from "../../src/pages/forgetPasswordPage";

const mockNavigate = vi.hoisted(() => vi.fn());

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
    useNavigate: () => mockNavigate,
  };
});

function renderResetPage() {
  return render(
    <MemoryRouter>
      <ForgetPasswordPage />
    </MemoryRouter>
  );
}

async function moveToOtpForm(user) {
  axios.get.mockResolvedValue({
    data: {},
  });

  await user.type(
    screen.getByPlaceholderText("Enter your email"),
    "john@gmail.com"
  );

  await user.click(
    screen.getByRole("button", {
      name: "Send OTP",
    })
  );

  await screen.findByText("Enter OTP and New Password");
}

describe("Password Reset Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("1. renders the password reset page", () => {
    renderResetPage();

    expect(
      screen.getByText("Reset Your Password")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Send OTP",
      })
    ).toBeInTheDocument();
  });

  test("2. sending OTP calls the correct API and shows OTP form", async () => {
    const user = userEvent.setup();

    axios.get.mockResolvedValue({
      data: {},
    });

    renderResetPage();

    await user.type(
      screen.getByPlaceholderText("Enter your email"),
      "john@gmail.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Send OTP",
      })
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });

    expect(axios.get.mock.calls[0][0]).toContain(
      "/users/send-otp/john@gmail.com"
    );

    expect(
      await screen.findByPlaceholderText("Enter OTP")
    ).toBeInTheDocument();

    expect(toast.success).toHaveBeenCalledWith(
      "OTP sent to your email"
    );
  });

  test("3. different new passwords show an error", async () => {
    const user = userEvent.setup();

    renderResetPage();

    await moveToOtpForm(user);

    await user.type(
      screen.getByPlaceholderText("Enter OTP"),
      "123456"
    );

    await user.type(
      screen.getByPlaceholderText("Enter New Password"),
      "NewPass123"
    );

    await user.type(
      screen.getByPlaceholderText("Confirm New Password"),
      "WrongPass123"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Reset Password",
      })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "Passwords do not match"
    );

    expect(axios.post).not.toHaveBeenCalled();
  });

  test("4. successful password reset calls API and redirects to login", async () => {
    const user = userEvent.setup();

    renderResetPage();

    await moveToOtpForm(user);

    axios.post.mockResolvedValue({
      data: {},
    });

    await user.type(
      screen.getByPlaceholderText("Enter OTP"),
      "123456"
    );

    await user.type(
      screen.getByPlaceholderText("Enter New Password"),
      "NewPass123"
    );

    await user.type(
      screen.getByPlaceholderText("Confirm New Password"),
      "NewPass123"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Reset Password",
      })
    );

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    expect(axios.post.mock.calls[0][0]).toContain(
      "/users/validate-otp"
    );

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Password reset successful"
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
