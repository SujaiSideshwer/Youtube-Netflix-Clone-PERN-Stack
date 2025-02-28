import {
  fetchYoutubeDataFromAPI,
  fetchYoutubeTrendingVideos,
  fetchYoutubeVideoByID,
} from "../services/rapidapi.service.js";

// Using the movie database API from Youtube API
export async function getUpcomingMovie(req, res) {
  try {
    const data = await fetchYoutubeTrendingVideos();
    // Choose a random single video from the list of trending videos we get from the API
    const randomMovie =
      data.items[Math.floor(Math.random() * data.items?.length)];

    res.json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Using the Youtube APIfor getting that movie's trailer (movie name passed in as 'id')
export async function getMovieTrailers(req, res) {
  const { id } = req.params;
  const alterredId = id.replace(/\s/g, "%20"); //to give inputs with spaces with a + inbetween. eg: 'a b' as 'a%20b'
  try {
    const data = await fetchYoutubeDataFromAPI(alterredId);
    res.json({ success: true, similar: data.items }); //data.items because from the Youtube API that you're using, the videos are shown under items
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Using the Youtube API Trending Videos
export async function getTrendingMovies(req, res) {
  try {
    const data = await fetchYoutubeTrendingVideos();
    res.json({ success: true, trending: data.items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// get a video from youtube API using he video ID
export async function getYoutubeVideobyID(req, res) {
  const { id } = req.params;
  try {
    const data = await fetchYoutubeVideoByID(id);
    res.json({ success: true, content: data.items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Note: Use the description given by the Youtube API for the Trailer as the movie description.
//       Then use the other videos in the same results.contents section as the "Similar Videos"
