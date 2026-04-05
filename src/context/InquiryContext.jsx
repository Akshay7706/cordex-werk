import React, { createContext, useContext, useState } from 'react';

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [data, setData] = useState({ plan: '' });
  const [currentArticle, setCurrentArticle] = useState(null);
  const [activeProject, setActiveProject] = useState(null);

  const openInquiry = (planName = '') => {
    setData({ plan: planName });
    setIsOpen(true);
  };

  const closeInquiry = () => setIsOpen(false);

  const openCodex = (article) => {
    setCurrentArticle(article);
    setIsCodexOpen(true);
  };

  const closeCodex = () => setIsCodexOpen(false);

  const openProject = (project) => {
    setActiveProject(project);
    setIsProjectOpen(true);
  };

  const closeProject = () => setIsProjectOpen(false);

  return (
    <InquiryContext.Provider value={{ 
      isOpen, openInquiry, closeInquiry, data,
      isCodexOpen, openCodex, closeCodex, currentArticle,
      isProjectOpen, openProject, closeProject, activeProject
    }}>
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);
