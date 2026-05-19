# WEB102 P4: Connecting TikTok Backend to PostgreSQL with Prisma ORM

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 4 / Prisma Connection

## Aim

Connect the TikTok backend application to a PostgreSQL database using Prisma ORM and perform database migration, Prisma Client generation, seeding, authentication, and API testing.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- Prisma Client
- Postman
- JWT
- bcrypt

## Main Concepts Applied

- Relational database storage
- Prisma schema models
- Database migration
- Seeding sample data
- Replacing in-memory data with persistent data
- JWT authentication with database users

## Functional Requirements / Features

- PostgreSQL database named `tiktok_db`
- Prisma models for users, videos, comments, likes, and follows
- Prisma migration using `npx prisma migrate dev --name init`
- Prisma Client generation
- Database seed script
- Register and login API testing in Postman

## Setup / How to Run

- Create the PostgreSQL database `tiktok_db`.
- Install project dependencies.
- Configure `.env` with `DATABASE_URL` and `JWT_SECRET`.
- Check `prisma/schema.prisma`.
- Run migration and generate Prisma Client.
- Run seed command to insert sample data.

## Implementation Summary

- Configured PostgreSQL as the Prisma datasource.
- Defined models for TikTok application resources.
- Ran Prisma migration to create database tables.
- Generated Prisma Client.
- Updated controllers to use Prisma instead of in-memory arrays.
- Implemented registration and login using hashed passwords and JWT.
- Tested protected routes using Bearer token in Postman.

## Testing / Output Evidence

- POST `/api/users/register` created a user in PostgreSQL.
- POST `/api/users/login` returned a JWT token.
- Seed command inserted sample users, videos, comments, likes, and follows.
- Postman confirmed backend routes were reading from the database.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- PostgreSQL documentation
- Prisma documentation
- Postman Learning Center
- Node.js documentation
- Express documentation
