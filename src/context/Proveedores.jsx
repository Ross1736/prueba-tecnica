import PropTypes from "prop-types";
import { CarritoContext, GeneralContext } from "./Contextos";
import { useEffect, useState } from "react";

const URL_API = import.meta.env.VITE_API_URL;

export const CarritoProvider = ({ children }) => {
  const CARRITO_UUID = "CAR-736c1a92-2j3o";

  const [estadoModalCarrito, setEstadoModalCarrito] = useState(false);

  const [listaCarrito, setListaCarrito] = useState(() => {
    if (typeof window !== "undefined") {
      const carritoGuardado = localStorage.getItem(CARRITO_UUID);
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }
  });

  // AGREGAR
  const agregarProducto = (producto) => {
    setListaCarrito((prev) => {
      const productoExiste = prev.some(
        (item) =>
          item.id === producto.id &&
          item.colorCode === producto.colorCode &&
          item.storageCode === producto.storageCode
      );

      if (productoExiste) {
        return prev;
      }

      const nuevo = [...prev, producto];
      localStorage.setItem(CARRITO_UUID, JSON.stringify(nuevo));
      return nuevo;
    });

    setEstadoModalCarrito(!estadoModalCarrito);
  };

  // ELIMINAR
  const eliminarProductoCarrito = (producto) => {
    setListaCarrito((prev) => {
      const nuevo = prev.filter(
        (item) =>
          !(
            item.id === producto.id &&
            item.colorCode === producto.colorCode &&
            item.storageCode === producto.storageCode
          )
      );

      localStorage.setItem(CARRITO_UUID, JSON.stringify(nuevo));
      return nuevo;
    });
  };

  const DATOS_CONTEXTO = {
    listaCarrito,
    estadoModalCarrito,
    setEstadoModalCarrito,
    agregarProducto,
    eliminarProductoCarrito,
  };

  return (
    <CarritoContext.Provider value={DATOS_CONTEXTO}>
      {children}
    </CarritoContext.Provider>
  );
};

CarritoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const GeneralProvider = ({ children }) => {
  const DATOS_UUID = "datos-736c1a92-2j3o";
  const FECHA_ACTUALIZACION = "fecha-cv2k5o23-1s32";

  const TIEMPO = 3600000;
  // const TIEMPO_PRUEBA = 60000;

  const [datosDb, setDatosDb] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      const datosGuardados = localStorage.getItem(DATOS_UUID);
      const fechaGuardada = localStorage.getItem(FECHA_ACTUALIZACION);

      const horaActual = new Date();
      const fechaUltimaActualizacion = new Date(fechaGuardada);

      if (
        !datosGuardados ||
        !fechaGuardada ||
        horaActual - fechaUltimaActualizacion > TIEMPO
      ) {
        try {
          const consulta = await fetch(`${URL_API}api/product`);
          const respuesta = await consulta.json();

          localStorage.setItem(DATOS_UUID, JSON.stringify(respuesta));
          localStorage.setItem(FECHA_ACTUALIZACION, horaActual.toString());

          setDatosDb(respuesta);
        } catch (error) {
          console.log(error);
          setDatosDb(JSON.parse(datosGuardados));
        }
      } else {
        setDatosDb(JSON.parse(datosGuardados));
      }
    };

    fetchDatos();
  }, []);

  const DATOS_CONTEXTO = { datosDb };

  return (
    <GeneralContext.Provider value={DATOS_CONTEXTO}>
      {children}
    </GeneralContext.Provider>
  );
};

GeneralProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
