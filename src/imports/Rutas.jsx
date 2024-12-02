import Inicio from "../pages/Inicio.jsx";
import Producto from "../pages/Producto.jsx";

export const Rutas = [
  {
    id: 1,
    path: "/",
    element: <Inicio />,
  },
  {
    id: 2,
    path: "/producto/:id",
    element: <Producto />,
  },
  {
    id: 3,
    path: "/*",
    element: <Inicio />,
  },
];
