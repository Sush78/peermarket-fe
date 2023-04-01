import { useEffect, useState } from "react";
import { getSearchUrl } from "../utils/constants/generic";
import ClearSearch from "./svg/ClearSearch";
import SearchIcon from "./svg/SearchIcon";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestions();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if (!searchQuery.length) {
      return;
    }
    const SEARCH_PRODUCT_URL = getSearchUrl(searchQuery);
    const data = await fetch(SEARCH_PRODUCT_URL);
    const json = await data.json();
    setSuggestions(json.suggestions.map((suggestion: any) => suggestion.value));
  };

  const onFormSubmit = (e: any, updatedSearchQuery?: string) => {
    e.preventDefault();
    if (searchQuery.length) {
      setShowSuggestions(false);
      if (updatedSearchQuery?.length) {
        console.log(`Make an Api call for ${updatedSearchQuery}`);
      } else {
        console.log(`Make an Api call for ${searchQuery}`);
      }
    }
  };

  return (
    <div className="font-sans text-black  flex items-center justify-center w-[600px]">
      <div className="border rounded overflow-hidden flex w-[100%] h-9">
        <form onSubmit={onFormSubmit} className="flex w-[100%] bg-white">
          <div className="w-[100%] flex">
            <input
              type="text"
              className="px-4 py-2 w-[100%]"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
                setShowSuggestions(true);
              }}
              onBlur={() =>
                setTimeout(() => {
                  setShowSuggestions(false);
                }, 200)
              }
            />
            {searchQuery.length > 0 && (
              <span
                className=" self-center p-2 cursor-pointer"
                onClick={() => {
                  setSearchQuery("");
                }}
              >
                <ClearSearch />
              </span>
            )}
            <button
              className="flex items-center justify-center px-4 border-l  bg-white"
              type="submit"
            >
              <SearchIcon />
            </button>
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="fixed my-9 bg-white w-[600px] rounded-sm shadow-lg border border-gray-100">
              <ul className="py-1">
                {suggestions.map((s, index) => (
                  <li
                    key={s + index}
                    className="shadow-sm hover:bg-gray-100 px-2 py-0.5"
                    onClick={(e: any) => {
                      setSearchQuery(e.target.innerText);
                      onFormSubmit(e, e.target.innerText);
                    }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
