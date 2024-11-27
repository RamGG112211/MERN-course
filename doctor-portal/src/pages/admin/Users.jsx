import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "../../utils/auth/apiRequest";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import SignupForm from "../../components/auth/SignupForm";
import { useSelector } from "react-redux";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For edit and view
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openFormModal, setOpenFormModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false); // New modal state
  const [openViewModal, setOpenViewModal] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const fetchUsers = useCallback(async () => {
    try {
      const token = user?.token;

      const response = await apiRequest({
        method: "GET",
        url: "/users",
        token: token,
      });

      setUsers(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [user]);

  useEffect(() => {
    // console.log("user: ", user);

    if (user) fetchUsers();
  }, [user]);

  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("doctor_portal_user"));
      const token = user.token;

      const response = await apiRequest({
        method: "DELETE",
        url: `/users/${selectedUser._id}`, // Adjust this endpoint as needed
        token: token,
      });

      // Assuming your backend returns user role or authentication status
      if (response) {
        setUsers(users.filter((user) => user._id !== selectedUser._id));
        setOpenDeleteModal(false);
      }
    } catch (error) {
      console.error("Error verifying user role:", error);
      // Optionally handle redirection to login or error page
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("doctor_portal_user"));
      const token = user.token;

      const response = await apiRequest({
        method: "PUT",
        url: `/users/${selectedUser._id}`, // Adjust this endpoint as needed
        token: token,
        data: formData,
      });

      // Assuming your backend returns user role or authentication status
      if (response) {
        setUsers(
          users.map((user) =>
            user._id === selectedUser._id ? { ...user, ...formData } : user
          )
        );
        setOpenFormModal(false);
      }
    } catch (error) {
      console.error("Error verifying user role:", error);
      // Optionally handle redirection to login or error page
    }
  };

  const handleAddUser = async (formData) => {
    try {
      const user = JSON.parse(localStorage.getItem("doctor_portal_user"));
      const token = user.token;

      const response = await apiRequest({
        method: "POST",
        url: `/users`, // Adjust this endpoint as needed
        token: token,
        data: formData,
      });

      // Assuming your backend returns user role or authentication status
      if (response) {
        setUsers([...users, response.data]);
        setOpenAddUserModal(false);
      }
    } catch (error) {
      console.error("Error verifying user role:", error);
      // Optionally handle redirection to login or error page
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Users List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenAddUserModal(true)} // Open add user modal
        style={{ marginBottom: "20px" }}
      >
        Add User
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenDeleteModal(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenFormModal(true);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectedUser(user);
                      setOpenViewModal(true);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update User Modal */}
      <Dialog
        open={openFormModal}
        onClose={() => setOpenFormModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <SignupForm onSubmit={handleUpdate} defaultValues={selectedUser} />
        </DialogContent>
      </Dialog>

      {/* Add User Modal */}
      <Dialog
        open={openAddUserModal}
        onClose={() => setOpenAddUserModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <SignupForm onSubmit={handleAddUser} />
        </DialogContent>
      </Dialog>

      {/* View User Modal */}
      <Dialog
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <p>
                <strong>Name:</strong> {selectedUser.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenViewModal(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Users;
