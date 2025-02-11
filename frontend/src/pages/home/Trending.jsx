import React, { useState, useEffect } from "react";
import BookTile from "../books/BookTile";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";
import ReactPaginate from "react-paginate";

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure","Marketing"];
const ITEMS_PER_PAGE = 8;

const BooksPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  const { data: books = [], isLoading } = useFetchAllBooksQuery();

 const trendingBooks= books.filter(book => book.trending)

  // Filter books based on category selection
  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? trendingBooks
      : trendingBooks.filter((book) => book.category.toLowerCase() === selectedCategory.toLowerCase());

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);

  // Reset page when category changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory]);

  // Get books for current page
  const paginatedBooks = filteredBooks.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className="py-10 w-full">
      <h2 className="text-3xl font-semibold mb-6">Trending Books</h2>

      {/* Category Filter */}
      <div className="mb-6 flex items-center">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Book List */}
      {isLoading ? (
        <p>Loading books...</p>
      ) : paginatedBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedBooks.map((book) => (
            <BookTile key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={"← Prev"}
          nextLabel={"Next →"}
          pageCount={totalPages}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"flex justify-center mt-6 space-x-2"}
          pageClassName={"px-3 py-1 border rounded-md cursor-pointer"}
          activeClassName={"bg-gray-600 text-white"}
          previousClassName={"px-4 py-2 border rounded-md cursor-pointer"}
          nextClassName={"px-4 py-2 border rounded-md cursor-pointer"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      )}
    </div>
  );
};

export default BooksPage;