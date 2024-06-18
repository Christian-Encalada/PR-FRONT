import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';
import PagePreview from './PagePreview';
import './DocumentPreview.css'; // Importa el archivo CSS

interface DocumentPreviewProps {
  filePath: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ filePath }) => {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    const fetchDocument = async () => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const pageSize = 1000; // Aproximadamente 1000 caracteres por página
      const documentPages = [];

      for (let i = 0; i < result.value.length; i += pageSize) {
        documentPages.push(result.value.slice(i, i + pageSize));
      }

      setPages(documentPages);
    };

    fetchDocument();
  }, [filePath]);

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="document-preview">
      {pages.length > 0 && <PagePreview content={pages[currentPage]} />}
      <div className="navigation-buttons">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>{"<"}</button>
        <button onClick={handleNextPage} disabled={currentPage === pages.length - 1}>{">"}</button>
      </div>
    </div>
  );
};

export default DocumentPreview;
