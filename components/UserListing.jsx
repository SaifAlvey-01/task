"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Link from 'next/link';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [genderFilter, setGenderFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=50"
        );
        setUsers(response.data.results);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Apply filters
    let filteredResults = users;
    if (genderFilter) {
      filteredResults = filteredResults.filter(
        (user) => user.gender === genderFilter
      );
    }
    if (searchQuery) {
      filteredResults = filteredResults.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredUsers(filteredResults);
  }, [users, genderFilter, searchQuery]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="bg-[#F7F9FB] w-full h-full py-1">
      <Header text={"User Listing"} />
      <div className=" py-5 ml-1 mr-2 flex flex-wrap px-4">
        <div className="flex-col shadow font-freesans bg-white border-b border-slate-200 rounded-lg mt-[-25px] h-full w-full">
          <div className="flex items-center justify-between pt-12 mx-5">
            {/* Gender Filter */}
            <div className="mb-6">
              <label
                htmlFor="genderFilter"
                className="block text-gray-700 font-bold mb-2"
              >
                Filter by Gender:
              </label>
              <select
                id="genderFilter"
                className="border rounded-lg py-2 text-gray-700 px-2 w-full focus:outline-none focus:border-blue-500"
                value={genderFilter}
                onChange={handleGenderFilterChange}
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="mb-6">
              <label
                htmlFor="searchInput"
                className="block text-gray-700 font-bold mb-2"
              >
                Search by Name:
              </label>
              <input
                id="searchInput"
                type="text"
                className="border rounded-lg py-2 text-gray-700 px-4 w-full focus:outline-none focus:border-blue-500"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by name"
              />
            </div>
          </div>

          {/* User List */}
          <ul className="grid grid-cols-1 mx-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUsers.map((user) => (
              <li
                key={user.login.uuid}
                className="bg-white cursor-pointer rounded-lg shadow-md p-4"
              >
                <Link href={`/${user.login.uuid}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{`${user.name.first} ${user.name.last}`}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-700">{`${user.location.city}, ${user.location.country}`}</p>
                    </div>
                    <div>
                      <img
                        src={user.picture.medium}
                        alt="Profile"
                        className="w-12 h-12 rounded-full"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center pt-4 pb-14">
            {Array.from({
              length: Math.ceil(filteredUsers.length / usersPerPage),
            }).map((_, index) => (
              <button
                key={index}
                className={`mx-2 py-2 px-4 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-700"
                } hover:bg-blue-400 hover:text-white focus:outline-none focus:bg-blue-400 focus:text-white`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserListing;
