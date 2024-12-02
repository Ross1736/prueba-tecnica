import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Buscador from "./Buscador";

describe("Buscador Component", () => {
  it("renderiza la cantidad de productos correctamente", () => {
    const mockSetTextoBuscar = vi.fn();

    render(<Buscador cantidad={10} setTextoBuscar={mockSetTextoBuscar} />);

    const cantidadProductos = screen.getByText("Productos: 10");
    expect(cantidadProductos).toBeInTheDocument();
  });

  it("llama a setTextoBuscar cuando se escribe en el input", () => {
    const mockSetTextoBuscar = vi.fn();

    render(<Buscador cantidad={5} setTextoBuscar={mockSetTextoBuscar} />);

    const input = screen.getByPlaceholderText("Buscar producto...");

    fireEvent.change(input, { target: { value: "Acer" } });

    expect(mockSetTextoBuscar).toHaveBeenCalledWith("Acer");
  });
});
