import React, { useState } from 'react';
import { capitalizeFirstLetter } from '../utils/helpers';
import TemplateWidget from '../utils/widgets/TemplateWidget';
import DocumentViewer from '../components/DocumentViewer';

const HomeView: React.FC = () => {
  const [templates, setTemplates] = useState<{ id: number; name: string; file: File }[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<{ id: number; name: string; file: File } | null>(null);

  const userName = localStorage.getItem('userName') || 'Usuario';

  const openModal = (template: { id: number; name: string; file: File }) => {
    setSelectedTemplate(template);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTemplate(null);
  };

  const handleRemoveTemplate = (id: number) => {
    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-welcome">
          <h1>Bienvenido a Pract<span>ii</span>eReport</h1>
        </div>
        <div className="profile">
          <img src="/profile-icon.png" alt="Profile Icon" className="profile-icon" />
          <span>{capitalizeFirstLetter(userName)}</span>
        </div>
      </div>
      <div className="home-main">
        <div className="search-section">
          <h2>Qué plantilla buscas hoy?</h2>
          <div className="search-bar">
            <i className="pi pi-search search-icon"></i>
            <input type="text" placeholder="Busca tu plantilla deseada" />
          </div>
        </div>
        <div className="recommendations">
          <h3>Te puede interesar:</h3>
          <div className="templates">
            {templates.map((template) => (
              <TemplateWidget
                key={template.id}
                imageSrc="/template-icon.png"
                onClick={() => openModal(template)}
                onRemove={() => handleRemoveTemplate(template.id)}
              />
            ))}
          </div>
        </div>
      </div>
      {selectedTemplate && (
        <DocumentViewer
          template={selectedTemplate}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default HomeView;
