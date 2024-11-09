import React, { useState, useEffect } from "react";
import axios from "./axios";
import Loading from "./SearchHOC";
import searchList from "./searchList";



async function fetchAllUsers() {
  try {
    const response = await axios.get(`/users`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching all users:", error);
    return [];
  }
}

function SearchComp() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const SearchListWithLoading = Loading(searchList);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
      setSearchResults(users);
      setLoading(false);
    };
    getUsers();
  }, []);

  const handleChange = (e) => {
    const searchQuery = e.target.value;
    setSearch(searchQuery);
    const filteredResults = allUsers.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
      <div className="bg-gray-400 dark:bg-gray-700 h-full w-full flex flex-col pt-44 items-center">
        <div>
          <form onSubmit={(e) => e.preventDefault()} className="max-w-[880px] w-full px-4">
            <div className="flex justify-center">
              <input
                type="text"
                name="q"
                value={search}
                onChange={handleChange}
                className="sm:w-96 border h-12 shadow p-4 rounded-full dark:text-gray-800 dark:border-gray-700 dark:bg-gray-200"
                placeholder="Search by username"
              />
            </div>
          </form>
        </div>
        <div>
          <SearchListWithLoading data={searchResults} isLoading={loading}  />
        </div>
      </div>
  );
}

export default SearchComp;
