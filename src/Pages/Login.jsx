import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  login,
  refresh,
  check_authenticated,
  load_user,
} from "../redux/actions/auth/auth";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ login, isAuthenticated, refresh, load_user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    if (!username) tempErrors.username = "requerido*";
    if (!password) tempErrors.password = "requerido*";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      // Limpiar mensajes previos
      setMessage("");
      const loginSuccess = await login(username, password);
      if (!loginSuccess) {
        setMessage("Error al iniciar sesión, correo y/o contraseña incorrectos");
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setMessage("Inicio de sesión exitoso");
      refresh();
      load_user();
      navigate("/intranet/dashboard");
    }
  }, [isAuthenticated, refresh, load_user, navigate]);

  return (
    <div className="bg-login flex items-center justify-center">
      <div className="card-finance w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-finance-text">
          Sistema de Finanzas Personales
        </h2>
        <p className="text-center text-finance-secondary">
          Ingresa tus credenciales para acceder al sistema
        </p>
        <form onSubmit={handleSubmit}>
          {message && <div className={message.includes("Error") ? "error" : "success"}>{message}</div>}
          <div className="mb-4">
            <label className="block text-finance-text mb-2" htmlFor="username">
              Correo:
            </label>
            <input
              className={`input-finance ${errors.username && "border-finance-error"}`}
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="juanperez@gmail.com"
            />
            {errors.username && <p className="error-text">{errors.username}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-finance-text mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className={`input-finance ${errors.password && "border-finance-error"}`}
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button className="btn-finance" type="submit">
              Iniciar Sesión
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-finance-primary hover:text-teal-700"
              href="/#"
            >
              Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  login,
  refresh,
  check_authenticated,
  load_user,
})(Login);
