import React from "react";
import { useLocation } from "react-router-dom";
import { Routes, Navigate, Route } from "react-router-dom";
import Login from "../Pages/Login.jsx";
import Home from "../Pages/Home.jsx";
import { connect } from "react-redux";
import IncomeExpenseForm from "../Pages/IncomeExpenseForm.jsx";
import Budget from "../Pages/Budget.jsx";
import Profile from "../Pages/Profile.jsx";
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <h1 className="text-center font-bold size-32">Validando...</h1>;
};

const AppRoutes = ({ isAuthenticated }) => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* Public pages */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      {/* Private pages */}
      <Route
        path="/intranet/*"
        isAuthenticated={isAuthenticated}
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/presupuestos" element={<IncomeExpenseForm />} />
              <Route path="/presupuestos/lista" element={<Budget />} />
              <Route path="/perfil" element={<Profile/>} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/404" element={<h1>404</h1>} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AppRoutes);
