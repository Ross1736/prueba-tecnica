import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Producto from "./Producto";
import { CarritoContext } from "../context/Contextos";

beforeAll(() => {
  global.alert = vi.fn();
});

afterAll(() => {
  global.alert.mockRestore();
});

global.fetch = vi.fn();

const mockProducto = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  brand: "Acer",
  model: "Iconia Talk S",
  price: "170",
  imgUrl:
    "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
  options: {
    colors: [
      { code: 1000, name: "Black" },
      { code: 1001, name: "White" },
    ],
    storages: [
      { code: 2000, name: "16 GB" },
      { code: 2001, name: "32 GB" },
    ],
  },
};

describe("Página de Producto", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    global.fetch.mockImplementation((url) => {
      if (url.includes("api/product")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockProducto),
        });
      }
      if (url.includes("api/cart")) {
        return Promise.resolve({
          json: () => Promise.resolve(true),
        });
      }
    });
  });

  it("renderiza la información básica del producto", async () => {
    render(
      <MemoryRouter initialEntries={["/producto/ZmGrkLRPXOTpxsU4jjAcv"]}>
        <Routes>
          <Route
            path="/producto/:id"
            element={
              <CarritoContext.Provider value={{ agregarProducto: vi.fn() }}>
                <Producto />
              </CarritoContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Acer/)).toBeInTheDocument();
      expect(screen.getByText(/Iconia Talk S/)).toBeInTheDocument();
      expect(screen.getByText(/170/)).toBeInTheDocument();
    });
  });

  it("permite seleccionar color y almacenamiento", async () => {
    render(
      <MemoryRouter initialEntries={["/producto/ZmGrkLRPXOTpxsU4jjAcv"]}>
        <Routes>
          <Route
            path="/producto/:id"
            element={
              <CarritoContext.Provider value={{ agregarProducto: vi.fn() }}>
                <Producto />
              </CarritoContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Black")).toBeInTheDocument();
      expect(screen.getByText("White")).toBeInTheDocument();
      expect(screen.getByText("16 GB")).toBeInTheDocument();
      expect(screen.getByText("32 GB")).toBeInTheDocument();
    });
  });

  it("agrega producto al carrito", async () => {
    const mockAgregarProducto = vi.fn();

    render(
      <MemoryRouter initialEntries={["/producto/ZmGrkLRPXOTpxsU4jjAcv"]}>
        <Routes>
          <Route
            path="/producto/:id"
            element={
              <CarritoContext.Provider
                value={{ agregarProducto: mockAgregarProducto }}
              >
                <Producto />
              </CarritoContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const colorOption = screen.getByText("Black");
      const storageOption = screen.getByText("16 GB");
      const addToCartButton = screen.getByText("Agregar a carrito");

      fireEvent.click(colorOption);
      fireEvent.click(storageOption);
      fireEvent.click(addToCartButton);
    });

    await waitFor(() => {
      expect(mockAgregarProducto).toHaveBeenCalled();
      expect(
        screen.getByText("Producto agregado al carrito")
      ).toBeInTheDocument();
    });
  });
});
