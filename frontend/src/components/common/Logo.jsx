import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="text-blue-500 text-xl">
      <img src="/gps-logo.png" alt="logo" className="h-8" />
    </Link>
  );
};

export default Logo;
