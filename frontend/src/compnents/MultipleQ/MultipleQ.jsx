import React, { useState } from 'react';

const MultipleQ = () => {
  const [formData, setFormData] = useState({
    numQ: '',
    question: '',
    questionImg: '',
    Lectanswer: '',
    idL: '',
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Convert the selected file to a data URL
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({
          ...formData,
          questionImg: e.target.result, // Save the image as a data URL
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === 'file' ? selectedFile : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the form data to a JSON string
    const jsonData = JSON.stringify(formData);

    // Save the JSON data, including the image data URL, in localStorage
    localStorage.setItem('formData', jsonData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <div className="row">
            <br/>
          <input 
          placeholder='1'
          id="numQ"
          type="number"
          name="numQ"
          value={formData.numQ}
          onChange={handleChange}
        /><br/>
            <label>write the question:</label>
          </div>
          <div className="row"></div>
        </div>
        

        <textarea
          id="question"
          type="text"
          rows={6}
          cols={50}
          name="question"
          value={formData.question}
          onChange={handleChange}
        />
      </div>

      <br />

      <div className="row">
        <div className="col">
          <div className="row">
            <label>write a potential answer:</label>
          </div>
          <div className="row"></div>
        </div>
        <textarea
          type="text"
          rows={6}
          cols={50}
          name="Lectanswer"
          value={formData.Lectanswer}
          onChange={handleChange}
        />
      </div>

      <br />
      <div>
        <h2>File Upload</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {selectedFile && (
          <div>
            <h3>Selected Image Preview:</h3>
            <img
              src={formData.questionImg} // Display the image using the data URL
              alt="Selected"
              width="200"
            />
          </div>
        )}
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default MultipleQ;
