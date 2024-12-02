import "./index.css";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { Rutas } from "./imports/Rutas.jsx";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import ContextProvider from "./context/ContextProvider.jsx";

const API_URL = import.meta.env.VITE_API_URL;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      {API_URL && <Menu />}

      <Routes>
        {Rutas.map((ruta) => (
          <Route key={ruta.id} path={ruta.path} element={ruta.element} />
        ))}
      </Routes>
    </ContextProvider>
  </BrowserRouter>
);
