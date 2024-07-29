// src/components/Sidebar/SidebarHeader.js
import React from 'react';

const SidebarHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between h-16 bg-finance-primary text-white px-4 lg:px-6">
      <span className="text-xl font-finance">Logo</span>
      <button onClick={onClose} className="lg:hidden p-2 text-white hover:bg-finance-primary hover:bg-opacity-70 rounded-full">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default SidebarHeader;
