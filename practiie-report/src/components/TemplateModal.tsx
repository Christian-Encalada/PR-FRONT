// TemplateModal.tsx
import React from 'react';
import './TemplateModal.css';
import DocumentPreview from './DocumentPreview';

interface TemplateModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <DocumentPreview filePath="/INFORMES DE PRACTICAS PRE-PROFESIONALES.docx" />
      </div>
    </div>
  );
};

export default TemplateModal;
