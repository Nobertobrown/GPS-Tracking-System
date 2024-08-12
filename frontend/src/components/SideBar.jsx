import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  IoCloseOutline,
  IoCubeOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const SideBar = ({ isOpen, toggle }) => {
  const variants = {
    open: {
      x: 0,
      transition: {
        stiffness: 1,
      },
    },
    closed: {
      x: "100%",
      transition: {
        duration: 0.3,
        delay: 0.15,
      },
    },
  };

  const navOptions = [
    {
      name: "home",
      path: "/",
      icon: <IoHomeOutline />,
    },
    {
      name: "customers",
      path: "/customers",
      icon: <IoPeopleOutline />,
    },
    {
      name: "products",
      path: "/products",
      icon: <IoCubeOutline />,
    },
  ];

  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ stiffness: 100, ease: "easeOut" }}
      className="fixed bg-white z-50 inset-y-0 flex md:hidden flex-col w-full shadow min-[375px]:w-64 right-0"
    >
      <div className="flex py-4 px-4">
        <IoCloseOutline
          className="text-xl ml-auto cursor-pointer"
          onClick={() => toggle()}
        />
      </div>
      <ul className="w-full divide-y border-y">
        {navOptions.map(({ name, path, icon }) => (
          <li
            key={name}
            className="px-4 py-3 hover:text-blue-500 w-full text-base"
          >
            <Link className="flex items-center gap-2 capitalize" to={path}>
              {icon} {name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default SideBar;
