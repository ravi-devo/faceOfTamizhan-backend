# Project Name Backend

This repository contains the backend code for the **Project Name** application. This backend is built using [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/) framework and uses [MongoDB](https://www.mongodb.com/) as the database.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [API Documentation](#api-documentation)
  - [Users](#users)
  - [Posts](#posts)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the backend server, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/ravi-devo/faceOfTamizhan-backend.git
    ```

2. Install dependencies:

    ```bash
    cd faceOfTamizhan-backend
    npm install
    ```

3. Set up environment variables:
   
    Create a `.env` file in the root directory of the backend and define the required environment variables. You can use the `.env.example` file as a template.

4. Start the server:

    ```bash
    npm start
    ```

    The server should now be running at `http://localhost:3000`.

## Features

- **User Authentication:** Allows users to sign up, log in, and log out securely.
- **Post Management:** Enables users to create, read and delete posts.
- **Comments and Likes:** Users can comment on posts and like or dislike posts.
- **Authorization:** Implements role-based access control to restrict certain actions to authenticated users only.
- **Error Handling:** Includes robust error handling to provide informative error messages to the client.

## API Documentation

### Users

- **POST /api/users/register:** Register a new user.
- **POST /api/users/login:** Authenticate and login a user.
- **POST /api/users/logout:** Log out the currently authenticated user. (Requires authentication)

### Posts

#### Create, Get, and Delete Posts

- **POST /api/posts/:** Create a new post. (Requires authentication)
- **GET /api/posts/:** Retrieve all posts. (Requires authentication)
- **GET /api/posts/myPost:** Retrieve posts created by the current user. (Requires authentication)
- **DELETE /api/posts/:postId:** Delete a specific post by ID. (Requires authentication)

#### Like and Dislike Posts

- **POST /api/posts/:postId/like:** Like a post. (Requires authentication)
- **POST /api/posts/:postId/dislike:** Dislike a post. (Requires authentication)

#### Comments

- **POST /api/posts/:postId/comment:** Add a comment to a post. (Requires authentication)
- **DELETE /api/posts/:postId/comment/:commentId:** Delete a comment from a post. (Requires authentication)

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements, please open an issue or create a pull request.
