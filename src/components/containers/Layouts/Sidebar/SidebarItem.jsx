// src/components/Sidebar/SidebarItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItem = ({ icon: Icon, label, href }) => {
  return (
    <li>
      <Link to={href} className="flex items-center text-finance-text hover:bg-finance-primary hover:text-white p-3 rounded-lg transition-colors duration-200">
        <Icon className="h-6 w-6 mr-4" />
        <span className="text-lg font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
