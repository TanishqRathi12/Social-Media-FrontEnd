import React, { useState } from "react";
import SearchList from "../Components/searchList";
import { searchContest } from "../Context/context";

function SearchComp() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      setSearchResults((prevResults) => [
        ...prevResults,
        { id: prevResults.length + 1, name: search },
      ]);
      setSearch("");
    }
  };

  return (
    <searchContest.Provider value={searchResults}>
       <h1 className="text-xl font-semibold text-gray-600 sm:pl-72 pt-16">This feature is currently in development and will be available globally soon</h1>
      <div className="bg-gray-400 dark:bg-gray-700 h-screen w-screen flex flex-col pt-44 items-center">
        <div>
          <form onSubmit={handleSubmit} className="max-w-[880px] w-full px-4">
            <div className="flex justify-center">
              <input
                type="text"
                name="q"
                value={search}
                onChange={handleChange}
                className="sm:w-96 border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                placeholder="search"
              />
              <input
                type="submit"
                name="Search"
                value="Search"
                className="ml-4 pl-4 pr-4 h-10 mt-1 bg-white text-black rounded-lg"
              />
            </div>
          </form>
        </div>
        <div>
          <SearchList />
        </div>
      </div>
    </searchContest.Provider>
  );
}

export default SearchComp;
