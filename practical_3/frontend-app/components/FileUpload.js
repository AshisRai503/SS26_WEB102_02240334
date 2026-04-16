import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

export default function FileUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadResult, setUploadResult] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setUploadedFile(file);
            
            if (file.type.startsWith('image/')) {
                const previewUrl = URL.createObjectURL(file);
                setFilePreview({
                    url: previewUrl,
                    name: file.name,
                    type: file.type
                });
            } else if (file.type === 'application/pdf') {
                setFilePreview({
                    name: file.name,
                    type: file.type
                });
            } else {
                setFilePreview(null);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
            'application/pdf': []
        },
        maxSize: 5 * 1024 * 1024
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!uploadedFile) {
            alert('Please select a file first');
            return;
        }

        setIsUploading(true);
        setUploadProgress(0);
        setUploadResult(null);

        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);

            const response = await axios.post('http://localhost:8000/api/upload', formData, {
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentage);
                }
            });

            setUploadResult({
                success: true,
                message: 'File uploaded successfully!',
                data: response.data
            });
        } catch (error) {
            console.error('Upload error:', error);
            setUploadResult({
                success: false,
                message: error.response?.data?.error || 'Upload failed'
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
                File Upload
            </h1>
            
            <form onSubmit={handleSubmit}>
                <div 
                    {...getRootProps()} 
                    style={{
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: '40px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#f9f9f9'
                    }}
                >
                    <input {...getInputProps()} />
                    <p>Drag & drop a file here, or click to select</p>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                        Supported: JPEG, PNG, PDF (max 5MB)
                    </p>
                </div>

                {filePreview && (
                    <div style={{ marginTop: '16px' }}>
                        <h3 style={{ fontWeight: '500', marginBottom: '4px' }}>Preview:</h3>
                        <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
                            {filePreview.type?.startsWith('image/') ? (
                                <img 
                                    src={filePreview.url} 
                                    alt={filePreview.name} 
                                    style={{ maxWidth: '100%', maxHeight: '160px' }}
                                />
                            ) : filePreview.type === 'application/pdf' ? (
                                <div style={{ padding: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                                    📄 {filePreview.name}
                                </div>
                            ) : (
                                <div>File selected: {filePreview.name}</div>
                            )}
                        </div>
                    </div>
                )}

                {isUploading && (
                    <div style={{ marginTop: '16px' }}>
                        <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '8px' }}>
                            <div 
                                style={{ 
                                    backgroundColor: '#0070f3', 
                                    borderRadius: '4px', 
                                    height: '8px',
                                    width: `${uploadProgress}%`,
                                    transition: 'width 0.3s'
                                }}
                            />
                        </div>
                        <p style={{ fontSize: '12px', marginTop: '4px' }}>
                            Uploading: {uploadProgress}%
                        </p>
                    </div>
                )}

                {uploadResult && (
                    <div style={{ 
                        marginTop: '16px', 
                        padding: '12px', 
                        borderRadius: '4px',
                        backgroundColor: uploadResult.success ? '#d4edda' : '#f8d7da',
                        color: uploadResult.success ? '#155724' : '#721c24'
                    }}>
                        {uploadResult.message}
                        {uploadResult.success && uploadResult.data && (
                            <div style={{ fontSize: '12px', marginTop: '8px' }}>
                                <p>File: {uploadResult.data.originalName}</p>
                                <p>Size: {(uploadResult.data.size / 1024).toFixed(2)} KB</p>
                                <a 
                                    href={`http://localhost:8000${uploadResult.data.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#0070f3' }}
                                >
                                    View File
                                </a>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isUploading || !uploadedFile}
                    style={{
                        marginTop: '16px',
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#0070f3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    {isUploading ? 'Uploading...' : 'Upload File'}
                </button>
            </form>
        </div>
    );
}