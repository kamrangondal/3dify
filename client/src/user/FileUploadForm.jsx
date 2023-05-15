import React, { useState } from 'react';
import axios from 'axios';

const DownloadFile = () => {
  const [fileId, setFileId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  

  const handleDownload = async () => {


    try {
      const response = await axios.get(`http://localhost:4000/fileDownload/${fileId}`, {
        responseType: 'blob', // Set the response type to 'blob' to receive the file data
      });

      const link = document.createElement('a');
      // Create a URL for the file data
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      
      link.href = url;

      // Extract the file extension from the fileId or provide a default extension
      const fileExtension = "glb";
      link.download = `downloaded.${fileExtension}`;

      link.click();


      // Reset error message
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error downloading file');
    }
  };

  const handleClear = () => {
    // Clear the file data from state
    setFileId('');
    setErrorMessage('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleDownload}>Download File</button>
      <button onClick={handleClear}>Clear</button>
      {errorMessage && <p>{errorMessage}</p>}

    </div>
  );
};

const FileUploadForm = () => {
  const [file, setFile] = useState(null);
  const [productId, setProductId] = useState('');
  const [uploadedProduct, setUploadedProduct] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleProductIdChange = (event) => {
    setProductId(event.target.value);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', productId);

      const response = await axios.post('http://localhost:4000/fileUpload', formData);
      setUploadedProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <input type="text" value={productId} onChange={handleProductIdChange} placeholder="Product ID" />
      <button onClick={handleFileUpload}>Upload</button>
      {uploadedProduct && (
        <div>
          <h4>Uploaded Product:</h4>
          <p>Product ID: {uploadedProduct._id}</p>
          <p>Filename: {uploadedProduct.file.originalname}</p>
        </div>
      )}
    </div>
    <div>
    <DownloadFile />
    </div>
    </>
  );
};

export default FileUploadForm;
