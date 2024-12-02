import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Inicio from "./Inicio";
import { GeneralContext } from "../context/Contextos";

const mockDatosDb = [
  {
    id: "ZmGrkLRPXOTpxsU4jjAcv",
    brand: "Acer",
    model: "Iconia Talk S",
    price: "170",
    imgUrl:
      "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
  },
  {
    id: "cGjFJlmqNPIwU59AOcY8H",
    brand: "Acer",
    model: "Liquid Z6 Plus",
    price: "250",
    imgUrl:
      "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg",
  },
  {
    id: "8hKbH2UHPM_944nRHYN1n",
    brand: "Acer",
    model: "Liquid Z6",
    price: "120",
    imgUrl:
      "https://itx-frontend-test.onrender.com/images/8hKbH2UHPM_944nRHYN1n.jpg",
  },
];

describe("Página de Inicio", () => {
  it("renderiza todos los productos inicialmente", () => {
    render(
      <BrowserRouter>
        <GeneralContext.Provider value={{ datosDb: mockDatosDb }}>
          <Inicio />
        </GeneralContext.Provider>
      </BrowserRouter>
    );

    // Verifica que se muestren todos los productos
    expect(screen.getByText("Productos: 3")).toBeInTheDocument();
    expect(screen.getByText("Iconia Talk S")).toBeInTheDocument();
    expect(screen.getByText("Liquid Z6 Plus")).toBeInTheDocument();
    expect(screen.getByText("Liquid Z6")).toBeInTheDocument();
  });

  it("filtra productos correctamente", async () => {
    render(
      <BrowserRouter>
        <GeneralContext.Provider value={{ datosDb: mockDatosDb }}>
          <Inicio />
        </GeneralContext.Provider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Buscar producto...");

    fireEvent.change(input, { target: { value: "Iconia" } });

    await waitFor(
      () => {
        expect(screen.getByText("Productos: 1")).toBeInTheDocument();
        expect(screen.getByText("Iconia Talk S")).toBeInTheDocument();
        expect(screen.queryByText("Liquid Z6 Plus")).not.toBeInTheDocument();
        expect(screen.queryByText("Liquid Z6")).not.toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
});
