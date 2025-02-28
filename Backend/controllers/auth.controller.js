import db from "../config/db.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    // If email/password/username is not enterred give error
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check if enterred email is valid using standard RegEx method
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    // check if password length is above 6
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters",
      });
    }

    // check if enterred email already exists
    const existingUseremail = await db.query(
      "SELECT * FROM my_schema.users WHERE email = $1;",
      [email]
    );
    if (existingUseremail.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // check if enterred username already exists
    const existingUserUserName = await db.query(
      "SELECT * FROM my_schema.users WHERE username = $1;",
      [username]
    );
    if (existingUserUserName.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Username already exists",
      });
    }

    // add image randomly from a set
    const profilePics = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const profileImg = profilePics[Math.floor(Math.random())];

    // salting & hashing the password for preventing visibility
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // if all conditions are satisfied, then create a new user based on the given data
    // adding to the users table:
    const addUser = await db.query(
      "INSERT INTO my_schema.users (username, email, password, image) VALUES ($1, $2, $3, $4) RETURNING id;",
      [username, email, hashedPassword, profileImg]
    );
    // adding users to the search history of users table:
    await db.query(
      "INSERT INTO my_schema.search_history (username) VALUES ($1);",
      [username]
    );

    const updatedUserDetails = {
      id: addUser.rows[0].id,
      username: username,
      email: email,
      profileImg: profileImg,
    };

    // generate cookie token if credentials are valid
    generateTokenAndSetCookie(updatedUserDetails.id, res);

    // return 201 status with user details except password
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: updatedUserDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function loginroute(req, res) {
  try {
    const { email, password } = req.body;

    // If email/password/username is not enterred give error
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // finding the user from email
    const user = await db.query(
      "SELECT * FROM my_schema.users WHERE email = $1;",
      [email]
    );
    if (user.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // checking if password is correct
    const isPasswordCorrect = await bcryptjs.compare(
      password,
      user.rows[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // generate cookie token if credentials are valid
    generateTokenAndSetCookie(user.rows[0].id, res);

    return res.status(200).json({
      success: true,
      message: "Logged in",
      user: { ...user.rows[0], password: "" },
    });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function logoutroute(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log("Error in logout controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function authCheck(req, res) {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller: ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
