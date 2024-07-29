// utils/getUserId.js
import {jwtDecode} from "jwt-decode";

export const getUserId = () => {
  const token = localStorage.getItem("access");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id; // Asegúrate de que el campo correcto sea `user_id` o el nombre correspondiente en tu token.
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }
  return null;
};
