import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const location = useLocation();
  const { user,logout } = useAuthStore();

  return (
    <nav className="bg-[#252422] flex justify-between  items-center text-[#fffcf2] px-4 md:px-12 py-4 md:py-6">
      <Link to="/">
        <label className="font-semibold tracking-wider md:text-lg lg:text-cl cursor-pointer">
          FavLib
        </label>
      </Link>
      {user ? (
        <div className="flex items-center space-x-5 md:text-lg cursor-pointer">
          <Link to={"/add-book"}>
            <p
              className={
                location.pathname === "/add-book"
                  ? "bg-[#403D39] px-3 py-2"
                  : ""
              }
            >
              Add Book
            </p>
          </Link>
          <p
              onClick={logout}
            >
              Log out ({user.username})
            </p>
        </div>
      ) : (
        <div className="flex items-center space-x-5 md:text-lg cursor-pointer">
          <Link to={"/log-in"}>
            <p
              className={
                location.pathname === "/log-in" ? "bg-[#403D39] px-3 py-2" : ""
              }
            >
              Login
            </p>
          </Link>
          <Link to={"/sign-up"}>
            <p
              className={
                location.pathname === "/sign-up" ? "bg-[#403D39] px-3 py-2" : ""
              }
            >
              Sign up
            </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
