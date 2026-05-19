# WEB102 P3: File Upload Server using Express and Multer

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 3 / File Upload Server

## Aim

Implement a file upload backend using Express.js and Multer, add validation and security checks, and connect it to a frontend application for seamless file handling.

## Technologies Used

- Node.js
- Express.js
- Multer
- CORS
- Morgan
- dotenv
- Axios frontend connection

## Main Concepts Applied

- Multipart form data
- Express middleware
- Multer disk storage
- File type filtering
- File size limits
- CORS between frontend and backend
- Static file serving

## Functional Requirements / Features

- POST `/api/upload` endpoint
- Uploads directory created automatically
- Accept JPEG, PNG, and PDF files
- Reject invalid files
- Limit file size to 5MB
- Serve uploaded files from `/uploads`
- Frontend upload progress and PDF preview support

## Setup / How to Run

- Create `file-upload-server` folder.
- Run `npm init -y`.
- Install `express`, `cors`, `multer`, `morgan`, and `dotenv`.
- Create `server.js`.
- Create `.env` for port and frontend URL.
- Run the backend on port 8000.

## Implementation Summary

- Configured Express middleware and CORS.
- Created the uploads directory using the file system module.
- Configured Multer `diskStorage` with timestamp filenames.
- Added a MIME type filter for JPEG, PNG, and PDF.
- Added file size limit of 5MB.
- Created the `/api/upload` route using `upload.single("file")`.
- Added Multer-specific error handling middleware.
- Updated the frontend Axios request to send files to `http://localhost:8000/api/upload`.

## Testing / Output Evidence

- Uploaded an image successfully from the frontend.
- Uploaded a PDF and displayed filename preview.
- Invalid files showed validation errors.
- Uploaded files were visible inside the uploads directory.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- GeeksforGeeks Express.js guide
- GeeksforGeeks Multer guide
- GeeksforGeeks CORS guide
- GeeksforGeeks Morgan guide
- npm dotenv documentation
