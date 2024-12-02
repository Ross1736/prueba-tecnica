import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Tarjeta from "./Tarjeta";

const mockProducto = {
  id: "cGjFJlmqNPIwU59AOcY8H",
  imgUrl:
    "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg",
  model: "Liquid Z6 Plus",
  brand: "Acer",
  price: "257",
};

describe("Tarjeta Component", () => {
  it("renderiza correctamente los datos del producto", () => {
    render(
      <BrowserRouter>
        <Tarjeta producto={mockProducto} />
      </BrowserRouter>
    );

    expect(screen.getByText("Acer")).toBeInTheDocument();
    expect(screen.getByText("Liquid Z6 Plus")).toBeInTheDocument();
    expect(screen.getByText("$257.00")).toBeInTheDocument();

    const imagen = screen.getByAltText("Liquid Z6 Plus");
    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute(
      "src",
      "https://itx-frontend-test.onrender.com/images/cGjFJlmqNPIwU59AOcY8H.jpg"
    );
  });

  it("tiene el enlace correcto al producto", () => {
    render(
      <BrowserRouter>
        <Tarjeta producto={mockProducto} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/producto/cGjFJlmqNPIwU59AOcY8H");
  });
});
