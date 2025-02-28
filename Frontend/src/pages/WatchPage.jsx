import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useGetYoutubeVideos from "../hooks/useGetYoutubeVideos";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const { loading, content, similarContent } = useGetYoutubeVideos();

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  // console.log("similar content is: ", similarContent);

  if (loading)
    return (
      <div className="min-h-screen bg-black p-10">
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-2xl sm:text-5xl font-bold text-balance">
              Content not found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    content &&
    similarContent && (
      <>
        <div className="bg-black min-h-screen text-white">
          <Navbar />
          <div className="mx-auto container px-4 py-8 h-full">
            <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
              <ReactPlayer
                controls={true}
                width={"100%"}
                height={"70vh"}
                className="mx-auto overflow-hidden rounded-lg"
                url={`https://www.youtube.com/watch?v=${id}`}
              />
            </div>
          </div>
          {/* video details */}
          <div
            className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-5xl font-bold text-balance">
                {content?.snippet.title}
              </h2>

              <p className="mt-2 text-lg">
                {(content?.snippet.publishedAt).split("T")[0]},{" "}
                {(content?.snippet.publishedAt).split("T")[1]} |{" "}
                {content?.adult ? (
                  <span className="text-red-600">18+</span>
                ) : (
                  <span className="text-green-600">PG-13</span>
                )}{" "}
              </p>
              <p className="mt-4 text-lg">{content?.snippet.description}</p>
            </div>
          </div>

          {/* similar videos */}
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">Similar Videos</h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                // if (content.snippet.thumbnails.maxres === null) return null;
                // console.log("content: ", content);
                return (
                  <Link
                    key={content.id.videoId}
                    to={`/watch/${content.id.videoId}`}
                    className="w-52 flex-none"
                  >
                    <img
                      // src="/extraction.jpg"
                      src={content.snippet.thumbnails.high.url}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-sm font-semibold">
                      {content.snippet.title}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default WatchPage;
