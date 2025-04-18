import React, { useState } from 'react';
// Remove the useNavigate import since we don't want to navigate away

const UploadPhoto = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // Remove the navigate initialization

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      setSuccess(null);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/v1/contents', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('File uploaded successfully:', data.filename);
        setError(null);
        setSuccess('File uploaded successfully!'); // Show success message instead of navigating
        // Remove the navigation line
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Upload failed. Please try again.');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred during upload. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Photo</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default UploadPhoto;