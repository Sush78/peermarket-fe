import { SVG_NAMESPACE } from "../utils/constants/generic";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-2 md:space-x-4 p-2">
        <svg
          xmlns={SVG_NAMESPACE}
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Link
              to={`/myBets`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <li className="px-4 menu-item" onClick={() => setIsOpen(false)}>
                My Bets
              </li>
            </Link>
            <Link
              to={`/`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <li className="px-4 menu-item" onClick={() => setIsOpen(false)}>
                My Pools
              </li>
            </Link>
            <Link
              to={`/createPool`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <li className="px-4 menu-item" onClick={() => setIsOpen(false)}>
                Create Pool
              </li>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
