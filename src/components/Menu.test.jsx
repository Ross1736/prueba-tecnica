import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Menu";
import { CarritoContext, GeneralContext } from "../context/Contextos";

const mockCarritoContext = {
  listaCarrito: [],
  estadoModalCarrito: false,
  setEstadoModalCarrito: () => {},
  eliminarProductoCarrito: () => {},
};

const mockGeneralContext = {
  datosDb: [],
};

describe("Menu Component", () => {
  it("renderiza el link correctamente", () => {
    render(
      <BrowserRouter>
        <CarritoContext.Provider value={mockCarritoContext}>
          <GeneralContext.Provider value={mockGeneralContext}>
            <Menu />
          </GeneralContext.Provider>
        </CarritoContext.Provider>
      </BrowserRouter>
    );

    const link = screen.getByText("AppPrueba");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });
});
