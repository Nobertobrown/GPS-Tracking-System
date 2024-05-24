import Logo from "./common/Logo";
import Button from "./common/Button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="border-b sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur shadow-sm">
      <section className="flex items-center justify-between max-w-7xl mx-auto py-4 px-2">
        <div>
          <Logo />
        </div>
        {location.pathname != "/customers" && (
          <div className="flex items-center gap-4">
            <Link to={"/customers"}>
              <Button text="View Customers" />
            </Link>
          </div>
        )}
      </section>
    </header>
  );
};

export default Navbar;
