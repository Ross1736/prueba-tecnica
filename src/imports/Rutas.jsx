import Inicio from "../pages/Inicio.jsx";
import Producto from "../pages/Producto.jsx";
import Error from "../pages/Error.jsx";

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
    path: "/error",
    element: <Error />,
  },
  {
    id: 5,
    path: "/*",
    element: <Inicio />,
  },
];
