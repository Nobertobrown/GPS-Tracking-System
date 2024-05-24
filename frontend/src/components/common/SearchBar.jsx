import { IoSearchOutline } from "react-icons/io5";
import Input from "../common/Input";

export const SearchBar = () => {
  return (
    <div>
      <Input
        icon={<IoSearchOutline />}
        name="search"
        type="text"
        placeholder="Search for ..."
        autoComplete="off"
      />
    </div>
  );
};
