import React, { createContext, useContext, useState } from 'react';

const InquiryContext = createContext();

export function InquiryProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({ plan: null });

  const openInquiry = (plan = null) => {
    console.log(`[InquirySystem] Opening inquiry modal for: ${plan || 'General Inquiry'}`);
    setData({ plan });
    setIsOpen(true);
  };

  const closeInquiry = () => {
    console.log('[InquirySystem] Closing inquiry modal');
    setIsOpen(false);
  };

  return (
    <InquiryContext.Provider value={{ isOpen, openInquiry, closeInquiry, data }}>
      {children}
    </InquiryContext.Provider>
  );
}

export const useInquiry = () => useContext(InquiryContext);
