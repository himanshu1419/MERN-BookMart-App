import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { IoHome } from "react-icons/io5";

import avatarImg from "../assets/avatar.png";
import { useState, useEffect } from "react";
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
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, loginUser, logout } = useAuth();

  const handleLogOut = () => {
    setIsDropdownOpen(false);
    navigate("/");
    dispatch(clearCart());
    logout();
  };

  const token = localStorage.getItem("token");

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-2 bg-gray-700">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div className="flex items-center md:gap-4 gap-2">
          <img className="h-10 w-44 object-fill" src={logo} />
          <Link to="/">
            <IoHome className="size-6  text-white  hover:text-yellow-400 transition-colors" />
          </Link>

          <Link
            to="/books"
            className="text-white ml-8  hover:text-yellow-400 transition-colors"
          >
            Books
          </Link>

          <Link
            to="/trending"
            className="text-white ml-8 hover:text-yellow-400 transition-colors "
          >
            Trending
          </Link>
        </div>

        {/* rigth side */}
        <div className="relative flex items-center md:space-x-5 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className={`size-7 rounded-full hover:scale-110 transition-all duration-200  ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* show dropdowns */}
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
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary ">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                {" "}
                <HiOutlineUser className="size-6 text-white hover:text-yellow-400" />
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm hover:bg-yellow-500"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
