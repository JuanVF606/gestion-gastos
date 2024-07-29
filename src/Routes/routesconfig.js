// routesConfig.js
import Login from "../Pages/Login.jsx";
import Home from "../Pages/Home.jsx";

const routes = {
  public: [
    {
      path: "/login",
      element: <Login />,
    },
  ],
  private: [
    {
      path: "/intranet",
      element: <Home />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/dashboard", element: <Home /> },
      ],
    },
  ],
};

export default routes;
