// AdminLayout.jsx
import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <nav>
        <Link to="users">Users</Link>
        <Link to="doctors">Doctors</Link>
        <Link to="hospitals">Hospitals</Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
