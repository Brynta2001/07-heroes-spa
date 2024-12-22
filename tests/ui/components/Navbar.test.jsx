import { fireEvent, render, screen } from "@testing-library/react";
import { AuthContext } from "../../../src/auth";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui";

/* eslint-disable no-undef */
const mockUseNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockUseNavigate,
}));

describe("Pruebas en <Navbar />", () => {
  const contextValue = {
    logged: true,
    user: {
      name: "Bryan",
    },
    logout: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe de mostrar el nombre del usuario", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Bryan")).toBeTruthy();
  });

  test("debe de llamar el logout y navigate cuando se hace clic en el botón", () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole("button");
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();
    expect(mockUseNavigate).toHaveBeenCalledWith("/login", { replace: true });
  });
});
