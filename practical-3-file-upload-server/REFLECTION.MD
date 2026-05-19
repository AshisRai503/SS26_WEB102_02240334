# WEB102 P3: Reflection - File Upload Server using Express and Multer

## Documentation: Concepts Applied

In this practical, I applied the following main concepts:

- Multipart form data
- Express middleware
- Multer disk storage
- File type filtering
- File size limits
- CORS between frontend and backend
- Static file serving

These concepts helped me understand how the practical works beyond only copying the code. I was able to connect the theory from the report with the actual implementation steps.

## What I Learned

I learned how to use Multipart form data, Express middleware, and multer disk storage. I also learned that a working project depends on correct folder structure, correct package installation, and careful testing after every main change.

## Challenges Faced

- Configuring CORS for frontend and backend running on different ports
- Handling file validation clearly
- Returning useful error messages for invalid files or large files
- Displaying PDF preview differently from image preview

## How I Overcame the Challenges

- Set frontend origin in the CORS configuration.
- Used Multer file filter and file size limit.
- Added error handling middleware for Multer errors.
- Modified the frontend preview logic for image and PDF files.

## Possible Future Improvements

- Store file metadata in a database.
- Use cloud storage instead of local upload folder.
- Add authentication before file upload.

## Final Reflection

This practical improved my understanding of file upload handling and validation. It also showed me the importance of writing organized code, testing each feature step by step, and documenting the work clearly in GitHub. The practical was useful because it connected classroom theory with real implementation work.
