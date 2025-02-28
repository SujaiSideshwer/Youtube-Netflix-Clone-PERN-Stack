import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  // Create a Date object from the input date string
  const date = new Date(dateString);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract the month, day, and year from the Date object
  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  // Return the formatted date string
  return `${month} ${day}, ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get(`/api/v1/search/history`);
        var intermediateNullValueRemovalArray = res.data.content.filter(
          (elem) => (elem = elem)
        );
        setSearchHistory(intermediateNullValueRemovalArray);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (index) => {
    try {
      await axios.delete(`/api/v1/search/history/${index}`);
      setSearchHistory(
        searchHistory.filter((item, itemIndex) => itemIndex !== index)
      );
    } catch (error) {
      toast.error("Failed to delete search item");
    }
  };

  if (searchHistory?.length === 0) {
    return (
      <div className="bg-black min-h-screen text-white">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Search History</h1>
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("search history is: ", searchHistory);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
          {searchHistory?.map((entry, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded flex items-start"
            >
              <div className="flex flex-col">
                <span className="text-white text-lg">{entry.searchQuery}</span>
                <span className="text-gray-400 text-sm">
                  {formatDate(entry.searchDate)}
                </span>

                <Trash
                  className="size-5 ml-4 mt-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                  onClick={() => handleDelete(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
