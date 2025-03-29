import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { HiOutlineMenu, HiX } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { clearCart } from "../redux/features/cart/cartSlice";
import logo from "../assets/BookmartLogo.jpg";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();
  const token = localStorage.getItem("token");

  const handleLogOut = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
    dispatch(clearCart());
    logout();
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-2 bg-gray-700">
      <nav className="flex justify-between items-center w-full">
        {/* Left - Logo */}
        <div className="flex items-center">
          <img className="h-10 w-44 object-fill" src={logo} />
        </div>

        <div className="hidden md:flex items-center  w-[80%]">
          <Link to="/">
            <IoHome className="size-6 text-white hover:text-yellow-400 transition-colors" />
          </Link>
          <Link
            to="/books"
            className="text-white hover:text-yellow-400 transition-colors mx-[7%]"
          >
            Books
          </Link>
          <Link
            to="/trending"
            className="text-white hover:text-yellow-400 transition-colors "
          >
            Trending
          </Link>

          {/* Profile / Login */}
          <div className="ml-[50%]">
            {currentUser ? (
              <div className="relative w-[30px]">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User"
                    className={`size-7 rounded-full hover:scale-110 transition-all duration-200 ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-blue-500 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-500 hover:text-white"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-[#FFCE1A]">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6 text-white hover:text-yellow-400" />
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="bg-[#FFCE1A] p-1 sm:px-4 px-2 flex items-center rounded-sm hover:bg-yellow-500 mx-[7%]"
          >
            <HiOutlineShoppingCart />
            <span className="text-sm font-semibold sm:ml-1">
              {cartItems.length || 0}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white text-2xl md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX /> : <HiOutlineMenu />}
        </button>
      </nav>

      {/* Mobile Menu (Only on Small Screens) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 space-y-3 text-white shadow-md z-1">
          <Link
            to="/"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/books"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Books
          </Link>
          <Link
            to="/trending"
            className="block px-4 py-2 hover:bg-gray-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Trending
          </Link>

          {/* Profile / Login */}
          {currentUser ? (
            <button
              onClick={handleLogOut}
              className="block w-full text-left px-4 py-2 hover:bg-gray-600"
            >
              Logout
            </button>
          ) : token ? (
            <Link
              to="/dashboard"
              className="block px-4 py-2 hover:bg-gray-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className=" px-4 py-2 hover:bg-gray-600 flex items-center"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineUser className="mr-2" /> Login
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className=" px-4 py-2 hover:bg-gray-600 flex items-center "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HiOutlineShoppingCart className="mr-2" />
            Cart ({cartItems.length || 0})
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
