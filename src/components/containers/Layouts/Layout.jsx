// src/components/Layout.js
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  refresh,
  check_authenticated,
  load_user,
  logout,
} from "../../../redux/actions/auth/auth";
import Sidebar from "./Sidebar";
function destroyCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

const Layout = ({
  children,
  refresh,
  check_authenticated,
  load_user,
  user_loading,
  isAuthenticated,
  user,
  logout,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    refresh();
    check_authenticated();
    load_user();
  }, [refresh, check_authenticated, load_user]);

  const handleLogout = () => {
    logout();
    setTimeout(() => {
      alert("You have been logged out successfully");
      destroyCookie("access_token");
    }, 2000);
    navigate("/login");
  };
  return (
    <div className="flex h-screen overflow-y-auto overflow-x-hidden">
      <Sidebar  handleLogout={handleLogout}/>
      <div className="flex-1 flex flex-col ml-0 md:ml-64 lg:ml-72 transition-all duration-300 ease-in-out">
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user_loading: state.auth.user_loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  refresh,
  check_authenticated,
  load_user,
  logout,
})(Layout);
