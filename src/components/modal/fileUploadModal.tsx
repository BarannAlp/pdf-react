import React, { useState } from 'react';
import './style.css'

interface FileUploadModalProps {
  showModal: boolean;
  onClose: () => void;
  onFileUpload: (files: File[]) => void;
}

// File Upload Modal Component
const FileUploadModal: React.FC<FileUploadModalProps> = ({ showModal, onClose, onFileUpload }) => {
  const [files, setFiles] = useState<File[]>([]); // Updated state to store an array of files

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files); // Convert FileList to array
      setFiles(selectedFiles);
  
      
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length > 0) {
      onFileUpload(files); // Pass multiple files to onFileUpload
      onClose(); // Close the modal after successful submission
    } else {
      alert("Lütfen başlık ve dosyayı doldurun.");
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Talimat Yükle</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Dosya:</label>
            <input
              type="file"
              onChange={handleFileChange}
              multiple // Allow multiple file selection
              required
            />
          </div>
          <div className="actions">
            <button type="submit">Yükle</button>
            <button type="button" onClick={onClose}>
              Kapat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileUploadModal;
