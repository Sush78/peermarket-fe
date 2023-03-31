import { useState } from "react";
import { SVG_NAMESPACE } from "../utils/constants/generic";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    alert(searchText);
  };

  return (
    <div className="font-sans text-black  flex items-center justify-center w-[600px]">
      <div className="border rounded overflow-hidden flex w-[100%] h-9">
        <form onSubmit={onFormSubmit} className="flex w-[100%]">
          <input
            type="text"
            className="px-4 py-2 w-[100%]"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <span
            className="bg-white self-center p-2 cursor-pointer"
            onClick={() => {
              setSearchText("");
            }}
          >
            <svg
              xmlns={SVG_NAMESPACE}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
          <button
            className="flex items-center justify-center px-4 border-l  bg-white"
            type="submit"
          >
            <svg
              className="h-4 w-4 text-grey-dark"
              fill="currentColor"
              xmlns={SVG_NAMESPACE}
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
