import React, { useState } from 'react';
import './style.css';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please choose a file!');
      return;
    }

    setUploading(true);
    setSuccess(false);
    setError(false);
    setErrorMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Sending the file to the Flask backend server
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      console.log(response);

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(true);
        setErrorMessage(data.error || 'An error occurred while uploading the file.');
      }
    } catch (err) {
      console.error('Error uploading file:', err);
      setError(true);
      setErrorMessage('Failed to upload file. Please check the server or CORS settings.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Your CSV File</h2>
      <form onSubmit={handleSubmit} className="file-upload-form">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="upload-btn" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>

      {success && <p className="success-message">File uploaded successfully!</p>}
      {error && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default FileUpload;
