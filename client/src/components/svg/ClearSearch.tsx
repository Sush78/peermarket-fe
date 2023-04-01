import React from "react";
import { SVG_NAMESPACE } from "../../utils/constants/generic";

const ClearSearch = () => {
  return (
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
  );
};

export default ClearSearch;
