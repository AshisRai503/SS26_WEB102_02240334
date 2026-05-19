# WEB102 P2: TikTok RESTful API Backend with Express

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 2 / TikTok Server

## Aim

Implement and test a RESTful API backend for a TikTok-style application using Express.js and Node.js while demonstrating CRUD operations, routing, controllers, and API design principles.

## Technologies Used

- Node.js
- Express.js
- CORS
- Morgan
- dotenv
- Nodemon
- JavaScript

## Main Concepts Applied

- RESTful API design
- CRUD operations
- Express routing
- Controllers
- Middleware
- In-memory models
- HTTP request testing

## Functional Requirements / Features

- Video endpoints
- User endpoints
- Comment-related backend structure
- Reactions, follows, and unfollows
- In-memory sample data
- API testing using curl or browser

## Setup / How to Run

- Create a `server` folder and initialize Node.js with `npm init -y`.
- Install `express`, `cors`, `morgan`, and `dotenv`.
- Install `nodemon` as a development dependency.
- Create `src/controllers`, `src/routes`, `src/models`, `src/middleware`, and `src/utils`.
- Create `.env`, `app.js`, and `server.js`.

## Implementation Summary

- Created the Express application and middleware setup.
- Stored sample users, videos, and comments in the model file.
- Created video and user controllers.
- Mapped routes to controller functions.
- Started the server from `src/server.js`.
- Tested endpoints such as GET all videos and POST create user.

## Testing / Output Evidence

- GET `/api/videos` returned video data.
- POST `/api/users` created a sample user.
- GET single user by ID was tested.
- Quick all-in-one tests were performed from the terminal.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- GeeksforGeeks REST API CRUD with ExpressJS
- GeeksforGeeks RESTful API guide
- GeeksforGeeks Express middleware guide
- W3Schools Node.js Express.js
