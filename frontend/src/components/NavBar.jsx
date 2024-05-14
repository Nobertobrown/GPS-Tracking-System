import { Link } from "react-router-dom";
import Logo from "./common/Logo";

const pages = [];

const Navbar = () => {
  return (
    <header className="border-b sticky top-0 z-50 bg-white bg-opacity-50 backdrop-blur shadow-sm">
      <section className="flex items-center justify-between max-w-7xl mx-auto py-4 px-2">
        <div>
          <Logo />
        </div>

        <div className="hidden md:flex items-center gap-4">
          <nav>
            <ul className="flex items-center gap-3 ">
              {pages.map(({ page, path }) => (
                <li key={page} className="hover:text-blue-500">
                  <Link to={path}>{page}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <section className="md:hidden border-y flex absolute w-full bg-white -z-10">
        <ul className="w-full divide-y">
          {pages.map(({ page, path }) => (
            <li key={page} className="px-4 py-2 hover:text-blue-500 w-full">
              <Link className="block" to={path}>
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
};

export default Navbar;
