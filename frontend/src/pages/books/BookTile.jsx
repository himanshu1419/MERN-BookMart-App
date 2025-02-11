import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookTile = ({ book }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="w-full md:w-[230px] lg:w-[250px] p-4  rounded-lg shadow-xl bg-white hover:shadow-lg transition-shadow">
      <Link to={`/books/${book._id}`} className="block">
        <img
          src={getImgUrl(book?.coverImage)}
          alt={book?.title}
          className="w-full h-48 object-fill rounded-md hover:scale-105 transition-transform"
        />
      </Link>

      <div className="mt-4 text-center">
        <Link to={`/books/${book._id}`} className="block">
          <h3 className="text-lg font-semibold hover:text-blue-600 line-clamp-2 h-[56px]">
            {book?.title}
          </h3>
        </Link>

        <p className="text-gray-700 font-medium m-2">
          ${book?.newPrice}{" "}
          <span className="line-through text-gray-500 text-sm m-2">
            ${book?.oldPrice}
          </span>
        </p>

        <button
          onClick={() => handleAddToCart(book)}
          className=" w-full btn-primary  rounded-lg flex justify-center items-center gap-2 h-[40px] p-2"
        >  
        {/* className="btn-primary px-6 space-x-1 flex items-center gap-1 " */}
          {cartItems.some((item) => item._id === book._id) ? (
            <span >
              <TiTick size={20}  className="inline-block"/> Added To Cart
            </span>
          ) : (
            <span>
              <FiShoppingCart className="inline-block" size={20} /> Add To Cart
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default BookTile;
