import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
// Creación del context
export const PizzasContext = createContext();

// Provider con la fuente de datos
const PizzasProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [actualizarTotal, setActualizarTotal] = useState(false);

  useEffect(() => {
    getPizzas();
  }, []);

  // Obtener las pizzas
  const getPizzas = async () => {
    try {
      const res = await fetch("/pizzas.json");
      const pizzas = await res.json();
      setPizzas(pizzas);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    }
  };

  // Función para agregar al carrito
  const agregarCarrito = ({ id, name, price, img }) => {
    const productoExistente = carrito.find((producto) => producto.id === id); // si la pizza ya existía devolvemos su posición y aumentamos 1

    if (productoExistente) {
      const updatedCarrito = carrito.map((producto) =>
        producto.id === id
          ? { ...producto, count: producto.count + 1 }
          : producto
      );
      setCarrito(updatedCarrito);
    } else {
      // si la pizza no existía la agregamos y actualizamos el carrito
      const nuevoProducto = { id, name, price, img, count: 1 };
      setCarrito([...carrito, nuevoProducto]);
    }

    // Marcar que se debe actualizar el total
    setActualizarTotal(true);
  };

  // Función para eliminar del carrito
  const eliminarCarrito = ({ id }) => {
    // Encontrar el índice del producto en el carrito
    const productoExistenteIndex = carrito.findIndex(
      (producto) => producto.id === id
    );

    if (productoExistenteIndex >= 0) {
      if (carrito[productoExistenteIndex].count > 1) {
        // Disminuir la cantidad si es mayor que 1
        const updatedCarrito = carrito.map((producto) =>
          producto.id === id
            ? { ...producto, count: producto.count - 1 }
            : producto
        );
        setCarrito(updatedCarrito);
      } else {
        // Mostrar confirmación antes de eliminar si la cantidad es 1
        Swal.fire({
          title: "¿Estás seguro de eliminar tu pizza?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, eliminar!",
        }).then((result) => {
          if (result.isConfirmed) {
            // Eliminar el producto del carrito si la cantidad es 1
            const updatedCarrito = [...carrito];
            updatedCarrito.splice(productoExistenteIndex, 1);

            // Actualizar el estado del carrito
            setCarrito(updatedCarrito);

            // Mostrar mensaje de éxito
            Swal.fire({
              title: "¡Eliminada!",
              text: "Tu pizza fue eliminada.",
              icon: "success",
            });
            setActualizarTotal(true);
          }
        });
      }
    }

    // Marcar que se debe actualizar el total si hay cambios en el carrito
    setActualizarTotal(true);
  };

  // Efecto para calcular el total a pagar solo cuando actualizarTotal sea true
  useEffect(() => {
    if (actualizarTotal) {
      const total = carrito.reduce((accumulator, producto) => {
        return accumulator + producto.price * producto.count;
      }, 0);
      setTotalAPagar(total);
      setActualizarTotal(false); // Reiniciar el estado después de actualizar el total
    }
  }, [actualizarTotal, carrito]);

  return (
    <PizzasContext.Provider
      value={{ pizzas, carrito, totalAPagar, agregarCarrito, eliminarCarrito }}
    >
      {children}
    </PizzasContext.Provider>
  );
};

export default PizzasProvider;
