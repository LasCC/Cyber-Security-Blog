import Fuse from "fuse.js";
import { useState } from "react";

const Search = (poststosearch: any) => {
  const [input, setinput] = useState("");

  const fuse = new Fuse(poststosearch.poststosearch, {
    keys: ["data.title", "data.description"],
  });

  return (
    <>
      <div className="flex items-center border border-zinc-800 px-3 py-2 gap-2 shadow-sm sm:text-sm">
        <span className="pointer-events-none text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            ></path>
          </svg>
        </span>

        <label htmlFor="SearchBox" className="sr-only">
          Search Posts
        </label>

        <input
          type="text"
          id="SearchBox"
          autoComplete="off"
          placeholder="Search for Posts"
          className="w-full outline-none bg-transparent focus:bg-transparent target:bg-transparent"
          value={input}
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
      </div>
      <div className="pt-8">
        {fuse.search(input).map((result: any, index: any) => (
          <a href={`/blog/${result.item.slug}`} key={index}>
            <div className="p-2 border-b border-zinc-800 hover:bg-zinc-800 hover:text-white transition-all ease-in-out duration-300 cursor-pointer">
              {result.item.data.title}
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default Search;
