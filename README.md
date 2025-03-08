# YouTube & Netflix Clone - PERN Stack

Welcome to the **YouTube & Netflix Clone** project! This repository contains a full-stack web application built using the **PERN (PostgreSQL, Express, React, Node.js)** stack. The project aims to replicate core functionalities of popular streaming platforms like YouTube and Netflix, providing a seamless user experience for browsing, watching, and managing videos.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

This project is a **full-stack web application** that mimics the core functionalities of YouTube and Netflix. It allows users to:

- Browse and search for videos.
- Watch videos with a custom video player.
- Create and manage user accounts.
- Like, comment, and interact with videos.
- Responsive design for both desktop and mobile devices.

The backend is built with **Node.js** and **Express**, using **PostgreSQL** as the database. The frontend is developed with **React**, providing a dynamic and interactive user interface.

---

## Features

### YouTube Clone Features

- **Video Upload**: Users can upload videos with titles, descriptions, and thumbnails.
- **Video Playback**: Custom video player for streaming uploaded videos.
- **Search Functionality**: Search for videos by title, description, or tags.
- **User Interaction**: Like, dislike, and comment on videos.
- **User Profiles**: View and edit user profiles.

### Netflix Clone Features

- **Content Categorization**: Videos are categorized into genres (e.g., Action, Comedy, Drama).
- **Trending Section**: Displays trending videos based on views and likes.
- **Watchlist**: Users can save videos to their watchlist for later viewing.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## Technologies Used

### Frontend

- **React**: JavaScript library for building the user interface.
- **React Router**: For handling client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **CSS**: Custom styling for a clean and modern design.

### Backend

- **Node.js**: JavaScript runtime for server-side development.
- **Express**: Web framework for building RESTful APIs.
- **PostgreSQL**: Relational database for storing data.
- **Sequelize**: ORM for managing database operations.
- **JWT (JSON Web Tokens)**: For user authentication and authorization.

### Other Tools

- **Git**: Version control system.
- **Postman**: For testing API endpoints.
- **Heroku/Netlify**: For deployment (optional).

---

## User Authentication Page

![image](https://github.com/user-attachments/assets/8c3d4a32-fd1a-4616-9a50-d0d0831f7774)
![image](https://github.com/user-attachments/assets/14196447-43e9-41c7-9e5b-2e0a92b1e1f2)
![image](https://github.com/user-attachments/assets/766b57fb-a47b-4dc6-bcc7-14325fd652e4)
(Link to this Github repo in the bottom)

- User can signup here with any email ID and it would redirect to the Signup Page
  ![image](https://github.com/user-attachments/assets/cc000840-ab0a-41c7-b259-bdfc03e53181)

## Signup Page

![image](https://github.com/user-attachments/assets/055c27cf-a295-4458-ba9e-1909900a12af)

- Choose a suitable username and enter a password of 6 character, else it sends this error:
  ![image](https://github.com/user-attachments/assets/92a29f27-f0ec-4b76-962b-fce9ce9b4fad)

- If email is already registered, it shows this error:
  ![image](https://github.com/user-attachments/assets/cc37cd55-64bf-4eb1-8a61-126cbe7a9353)

## Signup Page

- If already registered, click the **Sign In** link and it redirects to this page:
  ![image](https://github.com/user-attachments/assets/3eb850bb-dae7-4f4b-baaa-6b4a5fe92dee)

## Home Page

- After enterring the correct credentials and logging in, the homepage shows a random trending video like this:
  ![image](https://github.com/user-attachments/assets/69f2d12c-6c4a-4f88-9daa-1e061c85320e)
- You can play the video by clicking the **Play** icon or get information about it by clicking **More Info**

- On scrolling down, other trending videos are depicted in a scrollbar fashion. You can select any video to play:
  ![image](https://github.com/user-attachments/assets/317fac8e-69eb-405d-a6b9-9bea289d728b)

- Each video, when clicked, will direct to this type of interface that allows to play the video (using **react-player**):
  ![image](https://github.com/user-attachments/assets/25721446-76f5-47a0-9a74-2b06e68e731d)

## Search Page

- On clicking the search icon, the below search page is shown:
  ![image](https://github.com/user-attachments/assets/bd75f107-9382-4aa0-a5b7-cf1e095ac2ce)

- You can search for any video by typing in the searchbar and it shows this result:
  ![image](https://github.com/user-attachments/assets/3960bde0-a29e-4f9d-bc81-6d6e47bb6a21)
  -These videos can be streamed as mentioned above

## Search History Page

-**Search History** link leads to this interface wherein you can view your searched queries:
![image](https://github.com/user-attachments/assets/69647916-8453-41d3-97bc-9e32fc9a9725)
-You can even delete the certain ones by clicking the dumpster icon.

## Logout

-Finally you can logout by clicking the arrow icon at the last

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   git clone https://github.com/SujaiSideshwer/Youtube-Netflix-Clone-PERN-Stack.git
   cd Youtube-Netflix-Clone-PERN-Stack
   git checkout clean-branch

2. **Install Dependencies**:
   Navigate to the client and server folders and install dependencies for both:
   cd server
   npm install
   cd ../client
   npm install

3. **Set Up the Database**:
   Create a PostgreSQL database and update the config.js file in the server folder with your database credentials.
   Run migrations to set up the database schema:
   cd server
   npx sequelize-cli db:migrate
   Start the Application:

4. **Start the backend server**:
   cd server
   npm start

5. **Start the frontend development server**:
   cd client
   npm start

6. **Access the Application**:
   Open your browser and navigate to http://localhost:3000.

---

## Usage

**Home Page**: Browse videos and categories.

**Search**: Use the search bar to find specific videos.

**User Authentication**: Sign up or log in to access additional features like liking, commenting, and saving videos.

**Video Playback**: Click on any video to start playback.

**Profile Page**: View and edit your profile information.

---

## Tech Stack

- **Frontend**: React.js, Axios, Context API
- **Backend**:
- Node.js: JavaScript runtime environment
- Express.js: Web framework for Node.js
- bcrypt.js: Password hashing
- JWT: User Authentication
- Multer: File uploads
- Dotenv: Environment variables
- Cors: Cross-Origin Resource Sharing
- pg: PostgreSQL client
- Nodemon: Development server auto-restart
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens), bcrypt.js
- **File Storage**: Multer for handling video uploads

## Folder Structure

```bash
📂 backend
│   ├─ config         # Database and JWT configurations
│   ├─ controllers    # Business logic for API endpoints
│   ├─ middleware     # Authentication middleware
│   ├─ models        # Database models
│   ├─ routes        # API endpoints
│   └─ index.js      # Main server file
│
📂 frontend
│   ├─ src
│   │   ├─ components # Reusable UI components
│   │   ├─ context    # Global state management
│   │   ├─ pages      # Page components (Login, Home, VideoPlayer)
│   │   ├─ services   # API service calls
│   │   └─ App.js     # Main React component
└─ README.md
```

---

### Prerequisites

- Node.js
- PostgreSQL

### Backend Setup

```bash
cd backend
npm install
# Create .env file with DB and JWT configs
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend folder with the following:

```env
DATABASE_URL=postgres://username:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| POST   | /api/auth/register  | Register a new user |
| POST   | /api/auth/login     | Login user          |
| GET    | /api/videos         | Fetch all videos    |
| POST   | /api/videos/upload  | Upload new video    |
| POST   | /api/videos/like    | Like a video        |
| POST   | /api/videos/comment | Add comment         |

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes.

## Contact

- GitHub: [SujaiSideshwer](https://github.com/SujaiSideshwer)
- Email: sideshwersujai1999@example.com
