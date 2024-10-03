import React, { useState } from 'react';
import './style.css'
interface FileUploadModalProps {
  showModal: boolean;
  onClose: () => void;
  onFileUpload: (title: string, file: File) => void;
}

// File Upload Modal Component
const FileUploadModal: React.FC<FileUploadModalProps> = ({ showModal, onClose, onFileUpload }) => {
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title && file) {
      onFileUpload(title, file);
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
            <label>Başlık:</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Dosya:</label>
            <input  type="file" onChange={handleFileChange} required />
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
