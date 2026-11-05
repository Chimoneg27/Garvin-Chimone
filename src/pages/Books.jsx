import { Link } from "react-router";
import books from "../data/books.json";
import { Fragment } from "react";

const Books = () => {
  return (
    <div className="min-h-screen w-full bg-white text-black flex flex-col items-center px-6 py-10 md:py14">
      <div className="w-full max-w-7xl">
        <h1 className="my-8 font-bold tracking-tight sm:my-10 md:my-12">
          <Link className="underline" to="/">
            Garvin Chimone
          </Link>{" "}
          / Books
        </h1>

        <i className="text-gray-600">The books in purple are my favorites</i>

        <p className="book-list mt-10 leading-loose">
          {books.map((book, index) => (
            <Fragment
              key={`${book.title}-${book.author}`}
              className={`${book.color}`}
            >
              <span className={`${book.color} text-2xl`}>
                {book.title} - {book.author}
              </span>
              {index < books.length - 1 && (
                <span className="text-black px-4">{" · "}</span>
              )}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Books;
