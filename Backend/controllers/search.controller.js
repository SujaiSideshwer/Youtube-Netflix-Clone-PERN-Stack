import { fetchYoutubeDataFromAPI } from "../services/rapidapi.service.js";
import db from "../config/db.js";

export async function searchMovie(req, res) {
  const { query } = req.params;
  const alterredQuery = query.replace(/\s/g, "%20");
  const userDetails = req.user;
  try {
    const response = await fetchYoutubeDataFromAPI(alterredQuery);

    if (Object.keys(response.items).length === 0) {
      //using .items because the youtube API gives results in an object with key items
      return res.status(404).send(null);
    }

    // if there are null elements in search_history then we need to remove them before adding another search query:
    const searchHistoryCheckForNullFromDB = await db.query("SELECT search_history FROM my_schema.search_history WHERE username=$1;", [userDetails["username"]]);

    const searchHistoryCheckForNull = searchHistoryCheckForNullFromDB.rows[0].search_history;
  
    const searchHistoryElementsWithoutNull = searchHistoryCheckForNull.filter((elem)=>elem===elem);

    const nullElementsFromSearchHistory = searchHistoryCheckForNull.filter((elem)=>elem===null);

    if(nullElementsFromSearchHistory.length > 0){
      await db.query(
        "UPDATE my_schema.search_history SET search_history=ARRAY [$1::jsonb] WHERE username=$2;",
        [
          JSON.stringify(searchHistoryElementsWithoutNull[0]),
          userDetails["username"],
        ]
      );

      for (let iter = 1; iter < searchHistoryElementsWithoutNull.length; iter++) {
        await db.query("UPDATE my_schema.search_history SET search_history=ARRAY [$1::jsonb] WHERE username=$2;",
          [JSON.stringify(searchHistoryElementsWithoutNull[iter]), userDetails["username"]])
      }
    }

    // Note: For now I'm just adding the searched query to the search history.
    // Later on add the relevant details you get from the response.contents section according to your UI
    await db.query(
      "INSERT INTO my_schema.search_history (username, search_history) VALUES ($1, ARRAY [$2 :: JSONB]) ON CONFLICT (username) DO UPDATE SET search_history = search_history.search_history || EXCLUDED.search_history;",
      [
        userDetails["username"], //we get user details from the action of protectRoute.js (which uses the jwt token details to get user using ID)
        JSON.stringify({
          searchID: response.items[0].id.videoId,
          searchQuery: query,
          searchDate: new Date(),
        }),
      ]
    );

    res.status(200).json({ success: true, content: response.items });
  } catch (error) {
    console.log("Error in search controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function getSearchHistory(req, res) {
  const userDetails = req.user;
  try {
    const userHistoryFromDB = await db.query(
      "SELECT search_history FROM my_schema.search_history WHERE username=$1;",
      [userDetails["username"]]
    );
    const userHistory = userHistoryFromDB.rows[0].search_history;

    res.status(200).json({ success: true, content: userHistory });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// for now we are using an id that user enterred via postman and deleting the search history present in
// our db based on that id as index.
export async function removeItemFromSearchHistory(req, res) {
  const { id } = req.params;
  const userDetails = req.user;

  try {
    const userHistoryFromDB = await db.query(
      "SELECT search_history FROM my_schema.search_history WHERE username=$1;",
      [userDetails["username"]]
    );

    const userHistory = userHistoryFromDB.rows[0]["search_history"];

    // single function that deletes specific index of an array
    // first part:
    const userHistoryAfterDeletingPart1 = userHistory.slice(0, parseInt(id));
    // second part:
    const userHistoryAfterDeletingPart2 = userHistory.slice(parseInt(id)+1, userHistory.length);
    const userHistoryAfterDeleting = userHistoryAfterDeletingPart1.concat(userHistoryAfterDeletingPart2);

    // removing null values from the array as it stops frontend from functioning
    const userHistoryAfterDeletingWithoutNullValues =
      userHistoryAfterDeleting.filter((element) => (element = element));
      
    // update the first element after removing the history using id normally (since it overwrites)
    await db.query(
      "UPDATE my_schema.search_history SET search_history=ARRAY [$1::jsonb] WHERE username=$2;",
      [
        JSON.stringify(userHistoryAfterDeletingWithoutNullValues[0]),
        userDetails["username"],
      ]
    );

    // appending the rest using loop and on conflict condition
    for (
      let iterator = 1;
      iterator < userHistoryAfterDeletingWithoutNullValues.length;
      iterator++
    ) {
      await db.query(
        "INSERT INTO my_schema.search_history (username, search_history) VALUES ($1, ARRAY [$2 :: JSONB]) ON CONFLICT (username) DO UPDATE SET search_history = search_history.search_history || EXCLUDED.search_history;",
        [
          userDetails["username"],
          JSON.stringify(userHistoryAfterDeletingWithoutNullValues[iterator]),
        ]
      );
    }

    res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller: ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
