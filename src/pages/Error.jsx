import estilos from "./styles/Error.module.css";

function Error() {
  return (
    <main className={estilos.error_contenedor}>
      <div className={estilos.error_contenido}>
        <h1 className={estilos.error_titulo}>¡Ups! Algo salió mal</h1>

        <p className={estilos.error_texto}>
          Parece que la variable de entorno <strong>VITE_API_URL</strong> no
          está configurada correctamente.
        </p>

        <p className={estilos.error_codigo}>
          Para que la aplicación funcione correctamente, necesitas configurar
          esta variable en el archivo <code>.env.local</code> de la raíz del
          proyecto. Debe llevar el ultimo slash `/`, tal y como el ejemplo.
        </p>

        <p className={estilos.bloque_codigo}>
          VITE_API_URL=https://example.com/
        </p>

        <p className={estilos.error_codigo}>
          Luego reinicia la aplicación y todo debería funcionar sin problemas.
        </p>
      </div>
    </main>
  );
}

export default Error;
