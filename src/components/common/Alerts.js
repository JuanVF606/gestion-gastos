import Swal from "sweetalert2";

export const Error = ({ message }) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    timer: 2000,
    timerProgressBar: true,
  });
  return null;
};

export const Success = ({ message }) => {
  Swal.fire({
    icon: "success",
    title: "Éxito",
    text: message,
    timer: 2000,
    timerProgressBar: true,
  });
  return null;
}