import { createPortal } from "react-dom";

function PortalCarrito({ children }) {
  return createPortal(children, document.body);
}

export default PortalCarrito;
