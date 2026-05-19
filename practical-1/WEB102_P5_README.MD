# WEB102 P5: Cloud Storage with Supabase for TikTok Uploads

This file is written for the GitHub practical documentation requirement. It summarizes the instruction, solution, testing evidence, and learning from the submitted practical report.

## Folder / Practical

Practical 5 / Supabase Cloud Storage

## Aim

Replace local file storage in the TikTok web application with Supabase Storage so uploaded videos and thumbnails are stored in cloud buckets and their URLs are saved in the database.

## Technologies Used

- Supabase Storage
- @supabase/supabase-js
- Node.js
- Express.js
- Next.js frontend
- Prisma
- PostgreSQL

## Main Concepts Applied

- Cloud storage buckets
- Public file URLs
- Frontend-to-cloud upload flow
- Backend database record creation
- Storage path tracking
- Environment variables for cloud credentials

## Functional Requirements / Features

- Supabase project setup
- Public `videos` bucket
- Public `thumbnails` bucket
- Storage policies for upload and view
- Backend Supabase client setup
- Frontend Supabase client setup
- Upload service for videos and thumbnails
- Database fields for storage paths

## Setup / How to Run

- Create a Supabase project.
- Create public `videos` and `thumbnails` buckets.
- Add upload and view policies for both buckets.
- Install `@supabase/supabase-js` in backend and frontend.
- Add environment variables using placeholders, not real secret keys.
- Run Prisma migration after adding storage path fields.

## Implementation Summary

- Created backend Supabase configuration in `src/lib/supabase.js`.
- Updated `storageService.js` to upload files and return public URLs.
- Updated `videoController.js` to save `videoUrl`, `thumbnailUrl`, `videoStoragePath`, and `thumbnailStoragePath`.
- Updated Prisma Video model with storage path fields.
- Created frontend Supabase client.
- Created `uploadService.js` for uploading video and thumbnail files to Supabase.
- Updated upload page so files are uploaded to Supabase first, then metadata is sent to the backend.
- Updated video display logic so full HTTPS URLs are used directly.

## Testing / Output Evidence

- Uploaded a sample video and thumbnail.
- Checked Supabase Storage and confirmed files appeared in the correct buckets.
- Opened API routes and verified the latest video record used Supabase URLs.
- Confirmed the frontend could display uploaded video links.

## Notes

- Screenshots and detailed output evidence were included in the submitted practical report.
- This README keeps the explanation clear and concise for GitHub documentation.
- Sensitive values such as API keys, JWT secrets, database passwords, and service role keys should be stored in `.env` files and must not be committed to GitHub.

## References

- Supabase JavaScript upload file documentation
- Supabase retrieve public URL documentation
- GeeksforGeeks Supabase database types guide
- GeeksforGeeks file uploading in Node.js
- W3Schools Node.js upload files
