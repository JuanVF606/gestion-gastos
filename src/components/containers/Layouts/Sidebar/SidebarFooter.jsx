// src/components/Sidebar/SidebarFooter.js
import React from 'react';
import { LockClosedIcon } from '@heroicons/react/24/outline';

const SidebarFooter = () => {
  return (
    <div className="p-4 bg-finance-bg border-t border-finance-secondary lg:hidden">
      <a href="/" className="flex items-center text-finance-error hover:bg-red-600 hover:text-white p-3 rounded-lg transition-colors duration-200">
        <LockClosedIcon className="h-6 w-6 mr-4" />
      </a>
    </div>
  );
};

export default SidebarFooter;
