// Home.tsx
import React, { useState } from 'react';
import TemplateModal from './TemplateModal';

const Home: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <div onClick={handleIconClick}>
        <img src="/template-icon.png" alt="Template Icon" />
      </div>
      <TemplateModal isVisible={modalVisible} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
