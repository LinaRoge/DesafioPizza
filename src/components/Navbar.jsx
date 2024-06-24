import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { PizzasContext } from "../context/PizzaProvider";
import { useContext } from "react";

const Navbar = () => {
  const { totalAPagar } = useContext(PizzasContext);
  return (
    <div className="navbar text-white ">
      <div className="container d-block">
        <div className="d-flex justify-content-between">
          <div>
            <Link to="/" className="logo-nombre ">
              <h4 className="mb-0">&#127829; Pizzería Mamma Mia!</h4>
            </Link>
          </div>
          <div>
            <Link to="/carrito" className="my-1 mb-0">
              <p className="mb-0 " style={{ color: "white" }}>
                <TiShoppingCart size={30} />${totalAPagar}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
