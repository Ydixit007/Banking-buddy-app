import { ReactElement } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ children }: { children: ReactElement }) => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-full mx-auto flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar bg-gray-950">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex-1 px-2 mx-2 text-bankPrimary font-semibold">
              Banking buddy
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal gap-2">
                {/* Navbar menu content here */}
                <li>
                  <Link to={"/dashboard/beneficiaries"}>Beneficiaries</Link>
                </li>
                <li>
                  <Link to={"/dashboard/profile"}>Profile</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <div className="px-5 md:px-0 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-gray-950 gap-2">
          {/* Sidebar content here */}
          <li>
            <Link to={"/dashboard/beneficiaries"}>Beneficiaries</Link>
          </li>
          <li>
            <Link to={"/dashboard/profile"}>Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
