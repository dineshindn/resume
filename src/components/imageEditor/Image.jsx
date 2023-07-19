import React, { useState } from 'react';
import './image.css';

function ImageForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);
    // TODO: make API call to save image
  };

  return (
    <form className='imagedummy' onSubmit={handleSubmit}>
      <label htmlFor="image">Upload file:</label>
      <input type="file" id="image" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected Image:</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
        </div>
      )}
    </form>
  );
}

export default ImageForm;
