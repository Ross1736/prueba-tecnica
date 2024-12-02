import estilo from "./styles/Producto.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CarritoContext } from "../context/Contextos";

const URL_API = import.meta.env.VITE_API_URL;

const info = {
  id: "ZmGrkLRPXOTpxsU4jjAcv",
  brand: "Acer",
  model: "Iconia Talk S",
  price: "170",
  imgUrl:
    "https://itx-frontend-test.onrender.com/images/ZmGrkLRPXOTpxsU4jjAcv.jpg",
  networkTechnology: "GSM / HSPA / LTE",
  networkSpeed: "HSPA 42.2/11.5 Mbps  LTE Cat4 150/50 Mbps",
  gprs: "Yes",
  edge: "Yes",
  announced: "2016  August",
  status: "Available. Released 2016  October",
  dimentions: "191.7 x 101 x 9.4 mm (7.55 x 3.98 x 0.37 in)",
  weight: "260",
  sim: "Dual SIM (Micro-SIM/Nano-SIM)",
  displayType: "IPS LCD capacitive touchscreen  16M colors",
  displayResolution: "7.0 inches (~69.8% screen-to-body ratio)",
  displaySize: "720 x 1280 pixels (~210 ppi pixel density)",
  os: "Android 6.0 (Marshmallow)",
  cpu: "Quad-core 1.3 GHz Cortex-A53",
  chipset: "Mediatek MT8735",
  gpu: "Mali-T720MP2",
  externalMemory: "microSD  up to 128 GB (dedicated slot)",
  internalMemory: ["16 GB", "32 GB"],
  ram: "2 GB RAM",
  primaryCamera: ["13 MP", "autofocus"],
  secondaryCmera: ["2 MP", "720p"],
  speaker: "Yes",
  audioJack: "Yes",
  wlan: ["Wi-Fi 802.11 a/b/g/n", "Wi-Fi Direct", "hotspot"],
  bluetooth: ["4.0", "A2DP"],
  gps: "Yes with A-GPS GLONASS",
  nfc: "",
  radio: "FM radio",
  usb: "microUSB 2.0",
  sensors: ["Accelerometer", "proximity"],
  battery: "Non-removable Li-Ion 3400 mAh battery (12.92 Wh)",
  colors: ["Black"],
  options: {
    colors: [
      {
        code: 1000,
        name: "Black",
      },
    ],
    storages: [
      {
        code: 2000,
        name: "16 GB",
      },
      {
        code: 2001,
        name: "32 GB",
      },
    ],
  },
};

function Producto() {
  const { id } = useParams();

  const { agregarProducto } = useContext(CarritoContext);

  const [dato, setDato] = useState(null);

  useEffect(() => {
    const fetchDato = async () => {
      try {
        const consulta = await fetch(`${URL_API}api/product/${id}`);
        const respuesta = await consulta.json();

        setDato(respuesta);

        if (respuesta.options.colors.length > 0) {
          setOpcionesCompra((prev) => ({
            ...prev,
            colorCode: info.options.colors[0].code,
          }));
        }

        if (respuesta.options.storages.length > 0) {
          setOpcionesCompra((prev) => ({
            ...prev,
            storageCode: info.options.storages[0].code,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDato();
  }, [id]);

  const [opcionesCompra, setOpcionesCompra] = useState({
    colorCode: "",
    storageCode: "",
  });
  const [alerta, setAlerta] = useState("Producto agregado al carrito");

  function capturarOpciones(e) {
    const nombre = e.target.dataset.name;
    const valor = e.target.dataset.value;

    setOpcionesCompra((prev) => ({
      ...prev,
      [nombre]: Number(valor),
    }));
  }

  async function agregarProductoCarrito() {
    try {
      const datosEnvio = {
        id: dato.id,
        colorCode: opcionesCompra.colorCode,
        storageCode: opcionesCompra.storageCode,
        color: dato.options.colors.find(
          (f) => f.code === opcionesCompra.colorCode
        ).name,
        storage: dato.options.storages.find(
          (f) => f.code === opcionesCompra.storageCode
        ).name,
      };

      const consulta = await fetch(`${URL_API}api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosEnvio),
      });
      const respuesta = await consulta.json();

      if (respuesta) {
        agregarProducto(datosEnvio);
        setAlerta("Producto agregado al carrito");
      }

      alert(JSON.stringify(respuesta));
    } catch (error) {
      console.log(error);
      setAlerta("No se pudo agregar al carrito");
    }
  }

  if (dato) {
    return (
      <main className={estilo.producto}>
        <section className={estilo.seccion_principal}>
          <picture>
            <img src={dato.imgUrl} alt={dato.model} loading="lazy" />
          </picture>

          <div className={estilo.seccion_principal_informacion}>
            <ul className={estilo.seccion_principal_titulos}>
              <li>
                <b>Brand:</b> {dato.brand}
              </li>
              <li>
                <b>Modelo:</b> {dato.model}
              </li>
              <li>
                <b>Precio:</b> {dato.price}
              </li>
            </ul>

            <div className={estilo.seccion_principal_informacion_lista}>
              <h4>Colores:</h4>

              <ul className={estilo.seccion_principal_opciones}>
                {dato.options.colors.map((e, i) => (
                  <li
                    key={i}
                    onClick={capturarOpciones}
                    data-value={e.code}
                    data-name="colorCode"
                    className={
                      opcionesCompra.colorCode === e.code
                        ? estilo.opcion_activa
                        : estilo.opcion_no_activo
                    }
                  >
                    {e.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className={estilo.seccion_principal_informacion_lista}>
              <h4>Capacidad:</h4>

              <ul className={estilo.seccion_principal_opciones}>
                {dato.options.storages.map((e, i) => (
                  <li
                    key={i}
                    onClick={capturarOpciones}
                    data-value={e.code}
                    data-name="storageCode"
                    className={
                      opcionesCompra.storageCode === e.code
                        ? estilo.opcion_activa
                        : estilo.opcion_no_activo
                    }
                  >
                    {e.name}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={agregarProductoCarrito}>Agregar a carrito</button>

            {alerta && <p className={estilo.alerta}>{alerta}</p>}
          </div>
        </section>

        <section className={estilo.seccion_datos}>
          <table className={estilo.tabla_producto}>
            <thead>
              <tr>
                <th>Propiedad</th>
                <th>Valor</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(dato)
                .filter(
                  ([key]) =>
                    ![
                      "id",
                      "brand",
                      "imgUrl",
                      "model",
                      "price",
                      "options",
                    ].includes(key)
                )
                .map(([key, valor]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {Array.isArray(valor)
                        ? valor.join(", ")
                        : typeof valor === "object"
                        ? JSON.stringify(valor)
                        : valor}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </main>
    );
  }
}

export default Producto;
