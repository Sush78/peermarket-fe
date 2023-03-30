import { useState } from "react";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const onSearchClick = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      console.log(searchText);
    }
  };

  return (
    <div className="font-sans text-black  flex items-center justify-center w-[600px]">
      <div className="border rounded overflow-hidden flex w-[100%]">
        <input
          type="text"
          className="px-4 py-2 w-[100%]"
          placeholder="Search..."
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="flex items-center justify-center px-4 border-l  bg-white"
          onClick={onSearchClick}
        >
          <svg
            className="h-4 w-4 text-grey-dark"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
