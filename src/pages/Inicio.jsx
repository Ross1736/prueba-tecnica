import estilo from "./styles/Inicio.module.css";
import { useState, useEffect, useMemo, useContext } from "react";
import Tarjeta from "../components/Tarjeta.jsx";
import Buscador from "../components/Buscador.jsx";
import { GeneralContext } from "../context/Contextos.jsx";

function Inicio() {
  const { datosDb } = useContext(GeneralContext);

  const [textoBuscar, setTextoBuscar] = useState("");
  const [debouncedTextoBuscar, setDebouncedTextoBuscar] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTextoBuscar(textoBuscar);
    }, 350);

    return () => clearTimeout(timer);
  }, [textoBuscar]);

  const productosFiltrados = useMemo(() => {
    return datosDb.filter(
      (e) =>
        e.model.toLowerCase().includes(debouncedTextoBuscar.toLowerCase()) ||
        e.brand.toLowerCase().includes(debouncedTextoBuscar.toLowerCase())
    );
  }, [datosDb, debouncedTextoBuscar]);

  return (
    <main className={estilo.inicio}>
      <Buscador
        cantidad={productosFiltrados.length}
        setTextoBuscar={setTextoBuscar}
      />

      <section className={estilo.grid}>
        {productosFiltrados.map((e) => (
          <Tarjeta key={e.id} producto={e} />
        ))}
      </section>
    </main>
  );
}

export default Inicio;
