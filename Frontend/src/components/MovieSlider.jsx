import React, { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieSlider = (props) => {
  const [content, setContent] = useState([]);
  const { contentType } = useContentStore();

  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/trending`);
      setContent(res.data.trending);
    };
    getContent();
  }, [contentType]);

  // console.log("content is: ", content);

  return (
    content && (
      <div className="bg-black text-white relative px-5 md:px-20">
        <h2 className="mb-4 text-2xl font-bold">Trending Videos</h2>

        <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
          {content.map((item) => (
            <Link
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group"
              key={item.id}
            >
              {console.log(
                item.snippet.thumbnails?.maxres?.url ||
                  item.snippet.thumbnails?.standard?.url
              )}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={
                    item.snippet.thumbnails?.maxres?.url ||
                    item.snippet.thumbnails?.standard?.url
                  }
                  alt="video img"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
              </div>
              <p className="mt-2 text-center">{item.snippet.title}</p>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default MovieSlider;
