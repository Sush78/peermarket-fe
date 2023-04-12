import React from "react";
import { SVG_NAMESPACE } from "../../utils/constants/generic";

const SearchIcon = () => {
  return (
    <svg
      className="h-4 w-4 text-grey-dark"
      fill="currentColor"
      xmlns={SVG_NAMESPACE}
      viewBox="0 0 24 24"
    >
      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
    </svg>
  );
};

export default SearchIcon;
