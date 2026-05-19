# WEB102 P4: Reflection - Connecting TikTok Backend to PostgreSQL with Prisma ORM

## Documentation: Concepts Applied

In this practical, I applied the following main concepts:

- Relational database storage
- Prisma schema models
- Database migration
- Seeding sample data
- Replacing in-memory data with persistent data
- JWT authentication with database users

These concepts helped me understand how the practical works beyond only copying the code. I was able to connect the theory from the report with the actual implementation steps.

## What I Learned

I learned how to use Relational database storage, Prisma schema models, and database migration. I also learned that a working project depends on correct folder structure, correct package installation, and careful testing after every main change.

## Challenges Faced

- Database connection errors
- Permission or migration setup issues
- Internal server error during login
- Confusion about the correct value for `JWT_SECRET`
- Using the correct token format in Postman

## How I Overcame the Challenges

- Checked the database URL and PostgreSQL service.
- Made sure the database existed before migration.
- Set a proper JWT secret in `.env`.
- Used `Bearer <token>` in Postman authorization.
- Generated Prisma Client after schema changes.

## Possible Future Improvements

- Add stronger validation for request bodies.
- Improve error messages from the controllers.
- Add role-based authorization for protected actions.

## Final Reflection

This practical improved my understanding of database integration with Prisma ORM. It also showed me the importance of writing organized code, testing each feature step by step, and documenting the work clearly in GitHub. The practical was useful because it connected classroom theory with real implementation work.
