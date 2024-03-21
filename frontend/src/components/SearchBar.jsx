import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };
  return (
    <div className="border border-gray-300 rounded-md text-gray-500 flex items-center p-2 px-3 gap-2">
      <IoIosSearch className="text-[1.2rem]" />
      <input
        type="text"
        placeholder="Search By Name, Email or Phone No..."
        value={query}
        onChange={handleChange}
        className="text-[#000]"
      />
    </div>
  );
};

export default SearchBar;
