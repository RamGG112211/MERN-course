import React from 'react'
import { Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div>
      AdminDashboard
      <Outlet />
    </div>
  );
}
