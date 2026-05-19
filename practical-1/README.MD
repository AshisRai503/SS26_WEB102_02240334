# WEB102 P1: RESTful Social Media API Design

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 1 / social-media-api

## Aim

Design and implement RESTful API endpoints using proper URI design, HTTP methods, status codes, content negotiation, and structured request/response handling.

## Technologies Used

- Node.js
- Express.js
- Morgan
- CORS
- Helmet
- Nodemon
- JavaScript

## Main Concepts Applied

- RESTful API principles
- Resource-based URI design
- HTTP methods and status codes
- Middleware
- Controllers and routes
- Centralized error handling
- Content negotiation

## Functional Requirements / Features

- Users API with CRUD operations
- Posts API with CRUD operations
- Mock data for users and posts
- Error response utility and error middleware
- JSON/XML response support based on Accept header
- API documentation page

## Setup / How to Run

- Create `social-media-api` folder.
- Run `npm init -y`.
- Install `express`, `morgan`, `cors`, `helmet`, and `nodemon`.
- Create controller, route, middleware, utility, and public documentation files.
- Start the server using the development command.

## Implementation Summary

- Created `server.js` with Express setup and middleware.
- Created mock data for users and posts.
- Built user and post controllers with CRUD logic.
- Created route files for `/users` and `/posts`.
- Added centralized error handling.
- Added content negotiation middleware and API documentation page.

## Testing / Output Evidence

- GET `/users` returned user records.
- POST `/users` created a new user.
- Other REST endpoints were tested with browser or Postman.
- Pagination and response metadata were checked.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- GeeksforGeeks REST API introduction
- GeeksforGeeks RESTful API guide
- GeeksforGeeks Express.js tutorial
- W3Schools Node.js REST API guide
- W3Schools Web APIs introduction
