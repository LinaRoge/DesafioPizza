import { useContext } from "react";
import { PizzasContext } from "../context/PizzaProvider";
import Navbar from "./Navbar";

const Carrito = () => {
  const { carrito, totalAPagar, agregarCarrito, eliminarCarrito } =
    useContext(PizzasContext);

  return (
    <div>
      <Navbar />
      <div className="detalleCarrito">
        <h2>Detalle de Compra</h2>
        <ul>
          {carrito.map((producto) => (
            <li
              className="d-flex justify-content-between"
              key={producto.id}
              style={{ margin: "10px 0", listStyleType: "none" }}
            >
              <div>
                <img
                  style={{ width: "50px", marginRight: "10px" }}
                  src={producto.img}
                  alt=""
                />{" "}
                {producto.name.charAt(0).toUpperCase() + producto.name.slice(1)}
              </div>
              <div>
                ${producto.price * producto.count}{" "}
                <button
                  className="decrementa"
                  onClick={() => {
                    eliminarCarrito(producto);
                  }}
                >
                  <b>- </b>
                </button>{" "}
                {producto.count}{" "}
                <button
                  className="incrementa"
                  onClick={() => {
                    agregarCarrito(producto);
                  }}
                >
                  <b>+ </b>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <p>
          <b>Total a Pagar: ${totalAPagar}</b>
        </p>
      </div>
    </div>
  );
};

export default Carrito;
