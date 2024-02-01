import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
const Search = ({searchTerm,setSearchTerm}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSearch = () => {
  
  };

  return (
    <>
      <div className="pt-9 pl-2 pr-2 pb-3 ">
        <div
          className={`relative rounded-md w-full md:w-96 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 ${
            isFocused ? "shadow-md" : "shadow-sm"
          }`}
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="w-full h-12 px-4 py-2 border rounded-md outline-none focus:ring-transparent"
          />
          <div className="absolute top-0 right-0 h-full flex items-center pr-4">
              <IoSearchSharp />
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
