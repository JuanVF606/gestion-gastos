// src/components/Layout.js

import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-y-auto overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 md:ml-64 lg:ml-72 transition-all duration-300 ease-in-out">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
