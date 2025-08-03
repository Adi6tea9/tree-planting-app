import React, { useState } from 'react';
import { UploadCloud } from 'lucide-react';

const AIPlantTips: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      // Placeholder for AI processing logic
      setResult('Healthy plant! Water twice a week and ensure 6 hours of sunlight.');
    }
  };

  return (
    <section className="ai-plant-tips">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">AI Plant Growth Tips</h2>
          <p className="section-description">
            Upload a photo of your plant and get personalized tips for optimal growth.
          </p>
        </div>

        <div className="upload-area">
          <label htmlFor="file-upload" className="custom-file-upload">
            <UploadCloud className="upload-icon" />
            {image ? 'Change Plant Photo' : 'Upload Plant Photo'}
          </label>
          <input id="file-upload" type="file" onChange={handleImageUpload} />
        </div>

        {image && (
          <div className="result-area">
            <h3 className="result-title">Scan Result:</h3>
            <p className="result-text">{result}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPlantTips;

