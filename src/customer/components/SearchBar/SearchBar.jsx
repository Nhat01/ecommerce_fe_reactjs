// Import các thư viện cần thiết
import React from "react";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Thành phần SearchBar
export default function SearchBar() {
   const [expanded, setExpanded] = useState(false);
   const [searchValue, setSearchValue] = useState("");
   const navigate = useNavigate();
   const handleBlur = () => {
      setExpanded(false);
   };

   const handleInputChange = (e) => {
      setSearchValue(e.target.value);
   };

   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         // Chuyển hướng đến trang với query parameter search
         navigate(`/search?search=${searchValue}`);
      }
   };

   return (
      <form
         className={`${
            expanded ? "w-72" : "w-12"
         } cursor-pointer h-12 bg-neutral-200 rounded-full border-4 border-white px-2 flex items-center transition-all duration-1000`}
      >
         <input
            type="search"
            placeholder="Search here ..."
            className={`${
               expanded ? "block" : "hidden"
            } w-full h-full bg-transparent border-0 outline-none z-20 py-2 px-3`}
            onBlur={handleBlur}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
         />
         <MagnifyingGlassIcon
            className={`text-purple-600 h-6 w-6 ${expanded ? "ml-2" : ""}`}
            aria-hidden="true"
            onClick={() => setExpanded(!expanded)}
         />
      </form>
   );
}
