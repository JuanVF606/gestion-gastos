// src/components/Sidebar.js

import { useState } from 'react';
import { FaHome, FaWallet, FaMoneyBillWave, FaChartLine, FaCogs, FaHeadset, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import UserProfile from '../../../assets/img/commons/UserProfile.jpg';
const Sidebar = ({handleLogout}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isOpen) {
      setIsOpen(false); // Cierra el sidebar al seleccionar un ítem
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <FaHome />, path: '/' },
    { name: 'Perfil', icon: <FaUser />, path: '/intranet/perfil' },
    { name: 'Transacciones', icon: <FaWallet />, path: '/transactions' },
    { name: 'Presupuestos', icon: <FaMoneyBillWave />, path: '/intranet/presupuestos' },
    { name: 'Reportes', icon: <FaChartLine />, path: '/reports' },
    { name: 'Configuración', icon: <FaCogs />, path: '/settings' },
    { name: 'Soporte', icon: <FaHeadset />, path: '/support' },
  ];
  
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="text-white md:hidden fixed top-4 right-4 z-50 bg-gray-800 p-2 rounded-full shadow-lg"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 lg:w-72 z-40`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center p-4 bg-gray-800 border-b border-gray-700">
            <img src={UserProfile} alt="Profile" className="w-24 h-15 rounded-full mr-4" />
            <span className="text-xl font-semibold">Nombre Usuario</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ul className="mt-4">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center py-3 px-4 rounded-md cursor-pointer hover:bg-gray-700 ${location.pathname === item.path ? 'bg-gray-800' : ''}`}
                >
                  <span className="text-xl mr-4">{item.icon}</span>
                  <span className={`font-medium ${!isOpen ? 'hidden md:block' : 'block'}`}>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <button className="flex items-center py-2 px-4 rounded-md bg-gray-700 hover:bg-gray-600 w-full" onClick={handleLogout}>
            <span className="text-xl mr-4"><TbLogout2 /></span>
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
