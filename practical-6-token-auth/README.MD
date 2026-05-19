# WEB102 P6: Node.js Token Authentication with JWT

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 6 / node-token-auth

## Aim

Build and test a basic authentication API in Node.js using Express, bcryptjs, dotenv, and jsonwebtoken.

## Technologies Used

- Node.js
- Express.js
- jsonwebtoken
- bcryptjs
- dotenv
- Thunder Client

## Main Concepts Applied

- Token-based authentication
- JSON Web Token header, payload, and signature
- Password hashing
- Bearer token authorization header
- Protected route middleware
- Environment variables

## Functional Requirements / Features

- User registration route
- Password hashing with bcryptjs
- Login route returning JWT
- JWT verification middleware
- Protected profile route
- Get all users route without returning passwords
- Error responses for missing, invalid, or fake tokens

## Setup / How to Run

- Create `node-token-auth` folder.
- Run `npm init -y`.
- Install `express`, `jsonwebtoken`, `bcryptjs`, and `dotenv`.
- Create `.env` with `JWT_SECRET` and `PORT`.
- Create `routes/auth.js`, `routes/protected.js`, and `middleware/verifyToken.js`.
- Run the server using `node server.js`.

## Implementation Summary

- Created an Express server and enabled JSON request bodies.
- Created register route that validates email/password and hashes the password.
- Created login route that compares password and signs a JWT.
- Created `verifyToken` middleware to check the Authorization header.
- Created protected profile route that only works with a valid token.
- Created `/auth/users` route that returns user id, name, and email without password.

## Testing / Output Evidence

- Registered a user successfully.
- Logged in and received a JWT token.
- Accessed protected profile route with a valid token.
- Confirmed profile access failed without token.
- Confirmed profile access failed with fake token.
- Registered a user with name and listed all safe users.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- JWT.io introduction
- Express documentation
- npm bcryptjs documentation
- npm dotenv documentation
- npm jsonwebtoken documentation
