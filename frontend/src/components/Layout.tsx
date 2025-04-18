import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Ensure this file exists
import Sidebar from './Sidebar'; // Ensure this file exists

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;