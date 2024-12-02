import "./index.css";
import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import { Rutas } from "./imports/Rutas.jsx";
import { BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu.jsx";
import ContextProvider from "./context/ContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Menu />

      <Routes>
        {Rutas.map((ruta) => (
          <Route key={ruta.id} path={ruta.path} element={ruta.element} />
        ))}
      </Routes>
    </ContextProvider>
  </BrowserRouter>
);
