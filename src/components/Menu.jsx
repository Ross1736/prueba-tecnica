import estilo from "./styles/Menu.module.css";
import { Link } from "react-router-dom";
import { ShoppingCart, CircleX } from "lucide-react";
import { useContext, useEffect } from "react";
import { CarritoContext, GeneralContext } from "../context/Contextos";
import PortalCarrito from "./PortalCarrito";

function Menu() {
  const {
    listaCarrito,
    estadoModalCarrito,
    setEstadoModalCarrito,
    eliminarProductoCarrito,
  } = useContext(CarritoContext);

  const { datosDb } = useContext(GeneralContext);

  useEffect(() => {
    if (estadoModalCarrito) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [estadoModalCarrito]);

  return (
    <header className={estilo.menu}>
      <Link to="/">
        <h1>AppPrueba</h1>
      </Link>

      <div
        className={estilo.carrito}
        onClick={() => setEstadoModalCarrito(!estadoModalCarrito)}
      >
        <ShoppingCart color="white" />
        {listaCarrito.length > 0 && <span>{listaCarrito.length}</span>}
      </div>

      {estadoModalCarrito && (
        <PortalCarrito>
          <div
            className={estilo.modal_carrito}
            onClick={() => setEstadoModalCarrito(!estadoModalCarrito)}
          >
            <div
              className={estilo.modal_carrito_contenido}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Carrito de Compras</h3>

              <ul className={estilo.detalles}>
                {listaCarrito.length > 0 ? (
                  listaCarrito.map((e, i) => {
                    const producto = datosDb.find((f) => f.id === e.id);

                    return (
                      <li key={i}>
                        <picture>
                          <img
                            src={producto.imgUrl}
                            alt={e.model || "Imagen del producto"}
                            loading="lazy"
                          />
                        </picture>

                        <div className={estilo.detalles_datos}>
                          <div className={estilo.detalles_datos_info}>
                            <h4>{producto.model}</h4>
                            <p>${Number(producto.price)}</p>
                            <p>
                              <b>Color:</b> {e.color}
                            </p>
                            <p>
                              <b>Storage:</b> {e.storage}
                            </p>
                          </div>

                          <button onClick={() => eliminarProductoCarrito(e)}>
                            Eliminar
                          </button>
                        </div>
                      </li>
                    );
                  })
                ) : (
                  <div className={estilo.carrito_vacio}>
                    <p>No hay productos en el carrito</p>
                  </div>
                )}
              </ul>

              <CircleX
                className={estilo.cerrar}
                color="var(--color-5)"
                onClick={() => setEstadoModalCarrito(!estadoModalCarrito)}
              />
            </div>
          </div>
        </PortalCarrito>
      )}
    </header>
  );
}

export default Menu;
