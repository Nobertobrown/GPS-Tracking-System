import Logo from "./common/Logo";
import { IoMenuOutline } from "react-icons/io5";
import NotificationBell from "./NotificationBell";
// import Button from "./common/Button";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const location = useLocation();
  const navOptions = [
    {
      name: "home",
      path: "/",
    },
    {
      name: "customers",
      path: "/customers",
    },
    {
      name: "products",
      path: "/products",
    },
  ];

  return (
    <header className="border-b sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur shadow-sm">
      <nav className="flex items-center max-w-7xl mx-auto py-4 px-2">
        <div className="mr-auto">
          <Logo />
        </div>
        <ul className="items-center hidden md:flex">
          {navOptions.map(({ name, path }, idx) => (
            <li key={idx}>
              <Link
                to={path}
                href="#!"
                className="capitalize block md:inline-block px-4 md:px-3 py-2.5 md:py-0.5 text-base text-slate-800 transition-all duration-300 ease-linear hover:text-blue-500 [&.active]:text-blue-500"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex items-center ml-auto">
          <li>
            <NotificationBell/>
          </li>
        </ul>
        <div className="md:hidden ml-1">
          <button className="flex items-center justify-center size-[37.5px] p-0 text-white rounded-md bg-blue-500 border-blue-500 hover:text-white hover:bg-blue-600 hover:border-blue-600 focus:text-white focus:bg-blue-600 focus:border-blue-600 focus:ring focus:ring-blue-100 active:text-white active:bg-blue-600 active:border-blue-600 active:ring active:ring-blue-100">
            <IoMenuOutline className="text-xl" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
