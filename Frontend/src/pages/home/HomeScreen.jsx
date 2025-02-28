import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import { Info, Play, Loader } from "lucide-react";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import MovieSlider from "../../components/MovieSlider";

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const category = "trending movies";

  // trendingContent
  //   ? console.log("got trendingContent@@@@")
  //   : console.log("didnt get!!!");

  // To have a shimmering TV animation until we get trendingContent from Youtube API
  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    trendingContent && (
      <>
        <div className="relative h-screen text-white">
          <Navbar />
          <img
            src={trendingContent?.snippet.thumbnails.maxres.url}
            alt="hero img"
            className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          />
          {/* to show some gradient in the hero image we are using this empty translucent div */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
            aria-hidden="true"
          />

          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32  text-white">
            <div
              className="bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
            ></div>

            <div className="max-w-2xl">
              <h1 className="mt-4 text-6xl font-extrabold text-balance">
                {trendingContent?.snippet.title}
              </h1>
              <p className="mt-2 text-lg">
                {(trendingContent?.snippet.publishedAt).split("T")[0]},{" "}
                {(trendingContent?.snippet.publishedAt).split("T")[1]}
              </p>

              {/* <p className="mt-4 text-lg">{trendingContent?.snippet.description}</p> */}
            </div>

            <div className="flex mt-8">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center"
              >
                <Play className="size-6 mr-2 fill-black" />
                Play
              </Link>

              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
              >
                <Info className="size-6 mr-2" />
                More Info
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-10 bg-black py-10">
          <MovieSlider key={category} category={category} />
        </div>
      </>
    )
  );
};

export default HomeScreen;
