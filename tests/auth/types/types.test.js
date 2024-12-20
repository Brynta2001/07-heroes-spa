import { types } from "../../../src/auth/types/types";

/* eslint-disable no-undef */
describe('Pruebas en "Types.js"', () => {
  test("debe de regresar estos types", () => {
    expect(types).toEqual({
      login: "[auth] login",
      logout: "[auth] logout",
    });
  });
});
