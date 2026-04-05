import React, { createContext, useContext, useState } from 'react';

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [data, setData] = useState({ plan: '' });
  const [currentArticle, setCurrentArticle] = useState(null);

  const openInquiry = (planName = '') => {
    console.log(`[InquiryContext] Opening Modal for: ${planName}`);
    setData({ plan: planName });
    setIsOpen(true);
  };

  const closeInquiry = () => setIsOpen(false);

  const openCodex = (article) => {
    console.log(`[InquiryContext] Opening Codex for: ${article.title}`);
    setCurrentArticle(article);
    setIsCodexOpen(true);
  };

  const closeCodex = () => setIsCodexOpen(false);

  return (
    <InquiryContext.Provider value={{ 
      isOpen, openInquiry, closeInquiry, data,
      isCodexOpen, openCodex, closeCodex, currentArticle
    }}>
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);
