# WEB102 P5: Reflection - Cloud Storage with Supabase for TikTok Uploads

## Documentation: Concepts Applied

In this practical, I applied the following main concepts:

- Cloud storage buckets
- Public file URLs
- Frontend-to-cloud upload flow
- Backend database record creation
- Storage path tracking
- Environment variables for cloud credentials

These concepts helped me understand how the practical works beyond only copying the code. I was able to connect the theory from the report with the actual implementation steps.

## What I Learned

I learned how to use Cloud storage buckets, Public file URLs, and frontend-to-cloud upload flow. I also learned that a working project depends on correct folder structure, correct package installation, and careful testing after every main change.

## Challenges Faced

- Correctly configuring Supabase URL and keys
- Avoiding local storage logic after switching to cloud storage
- Creating proper bucket policies
- Handling full Supabase URLs in the frontend
- Keeping secret keys out of public frontend code

## How I Overcame the Challenges

- Used backend service key only in backend environment variables.
- Used anon/public key only for frontend Supabase client.
- Created separate helper functions for video and thumbnail uploads.
- Checked whether a URL starts with `http` before adding backend URL.
- Verified bucket contents directly in Supabase dashboard.

## Possible Future Improvements

- Make buckets private and use signed URLs for stronger security.
- Add delete logic to remove files from Supabase when videos are deleted.
- Validate file size and type before cloud upload.

## Final Reflection

This practical improved my understanding of cloud storage integration. It also showed me the importance of writing organized code, testing each feature step by step, and documenting the work clearly in GitHub. The practical was useful because it connected classroom theory with real implementation work.
