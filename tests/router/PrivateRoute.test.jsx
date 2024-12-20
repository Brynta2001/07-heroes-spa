import { screen } from "@testing-library/dom";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

/* eslint-disable no-undef */
describe("Pruebas en <PrivateRoute />", () => {
  test("debe de mostrar el children si está autenticado", () => {
    // Es necesario sobreescribir la implementacion del método setItem de localStorage
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        name: "Bryan",
        id: "123",
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Ruta privada")).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });
});
