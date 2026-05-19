# WEB102 P6: Reflection - Node.js Token Authentication with JWT

## Documentation: Concepts Applied

In this practical, I applied the following main concepts:

- Token-based authentication
- JSON Web Token header, payload, and signature
- Password hashing
- Bearer token authorization header
- Protected route middleware
- Environment variables

These concepts helped me understand how the practical works beyond only copying the code. I was able to connect the theory from the report with the actual implementation steps.

## What I Learned

I learned how to use Token-based authentication, JSON Web Token header, payload, and signature, and password hashing. I also learned that a working project depends on correct folder structure, correct package installation, and careful testing after every main change.

## Challenges Faced

- Understanding that JWT payload is encoded, not encrypted
- Remembering to send token as `Authorization: Bearer <token>`
- Keeping password hidden in the user list response
- Working with in-memory users that disappear when the server restarts

## How I Overcame the Challenges

- Stored only safe user details in JWT payload.
- Used bcryptjs to hash passwords before saving.
- Used middleware to protect private routes.
- Mapped users to remove password before returning the list.

## Possible Future Improvements

- Store users in a database instead of an in-memory array.
- Add refresh tokens or token expiry handling.
- Add stronger password validation and email format validation.

## Final Reflection

This practical improved my understanding of token-based authentication. It also showed me the importance of writing organized code, testing each feature step by step, and documenting the work clearly in GitHub. The practical was useful because it connected classroom theory with real implementation work.
