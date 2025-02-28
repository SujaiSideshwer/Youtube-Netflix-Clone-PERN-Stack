import React, { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/movie/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, make sure you are searching under the right category"
        );
      } else {
        toast.error("An error occurred, please try again later");
      }
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded "bg-gray-700"
              ${
                activeTab === "movie" ? "bg-red-600" : "bg-gray-700"
              } hover:bg-red-700`}
            onClick={() => {
              setContentType("movie");
              setResults([]);
            }}
          >
            Reset
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search for a video"}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            return (
              <div key={result.id.videoId} className="bg-gray-800 p-4 rounded">
                <Link
                  key={result.id.videoId}
                  to={`/watch/${result.id.videoId}`}
                  onClick={() => {
                    setContentType("movie");
                  }}
                >
                  <img
                    src={result.snippet.thumbnails.high.url}
                    alt={result.snippet.title}
                    className="w-full h-auto rounded"
                  />
                  <h2 className="mt-2 text-xl font-bold">
                    {result.snippet.title}
                  </h2>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
