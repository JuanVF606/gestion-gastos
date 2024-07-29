// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-finance-secondary text-white py-6 px-4 mt-8 rounded-finance-lg shadow-md">
      <div className="container mx-auto text-center">
        <p className="font-finance">
          &copy; 2024 Sistema de Finanzas Personales. Todos los derechos
          reservados.
        </p>
        <div className="mt-4 space-x-4">
          <Link to="/privacy" className="footer-link">
            Política de Privacidad
          </Link>
          <Link to="/terms" className="footer-link">
            Términos de Servicio
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
