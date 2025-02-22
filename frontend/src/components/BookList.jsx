import { Link } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import { useEffect } from "react";

const BookList = () => {
  const { books, fetchBooks } = useBookStore();

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="text-[#252422] bg-[#f5f5f5] px-4 md:px-12 pb-20">
      <h1 className="py-6 text-xl md:text-2xl lg:text-3xl w-full mx-auto max-w-6xl">
        Reader&rsquo;s favourites
      </h1>
      <div className="flex flex-wrap justify-center gap-5 lg:gap-8 max-w-6xl mx-auto">
        {books.map((book, index) => (
          <Link key={index} to={`/book/${book._id}`} className="block">
            <div className="cursor-pointer max-w-36 md:max-w-40 xl:max-w-44 shadow-sm hover:shadow-md rounded-b-md">
              <div className="max-h-48 md:max-h-52 xl:max-h-60 bg-gray-900">
                <img
                  src={book.image}
                  alt="book-img"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="mt-8 p-2 group">
                <h2 className="mb-2 font-semibold text-base md:text-lg truncate" title={book.title}>
                  {book.title}
                </h2>
                <p className="text-sm md:text-base">{book.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
