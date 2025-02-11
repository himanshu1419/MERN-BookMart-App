import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { TiTick } from "react-icons/ti";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div className=" rounded-lg transition-shadow duration-300 border-2 border-gray-300 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-96  sm:justify-center gap-4">
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
            />
          </Link>
        </div>

        <div>
          <Link to={`/books/${book._id}`}>
            <h3 className="text-lg font-semibold hover:text-blue-600 mb-3 h-[84px]">
              {book?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5 h-[144px]">
            {book?.description.length > 80
              ? `${book.description.slice(0, 80)}...`
              : book?.description}
          </p>
          <p className="font-medium mb-5">
            ${book?.newPrice}{" "}
            <span className="line-through font-normal ml-2">
              $ {book?.oldPrice}
            </span>
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className=" w-full btn-primary  rounded-lg flex justify-center items-center gap-2  p-2 h-[40px]"
          >
            {cartItems.some((item) => item._id === book._id) ? (
              <span>
                {" "}
                <TiTick size={24} className="inline-block" /> Added To Cart{" "}
              </span>
            ) : (
              <span>
                <FiShoppingCart className="inline-block" /> Add To Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
