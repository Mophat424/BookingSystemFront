import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/store";
import { setLoading, setUsers, setError } from "../../../features/users/userListSlice";
import ChangeRole from "./ChangeRole";
import UpdateProfile from "./UpdateProfile";
import '../ManageUsers/ManageUsers.css';

interface PublicUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: "user" | "admin" | null;
  isVerified?: boolean;
  created_at?: string;
  updated_at?: string;
  image_url?: string;
  contact_phone?: string;
  address?: string;
}

const Users = () => {
  const { users, loading, error } = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
  const { token, user: authUser } = useAppSelector((state) => state.user) as { token: string | null; user: PublicUser | null };
  const [selectedUser, setSelectedUser] = useState<PublicUser | null>(null);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<PublicUser | null>(null);
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token || !authUser?.role) {
        console.log("No token or role:", { token, authUser });
        return;
      }
      dispatch(setLoading());
      try {
        console.log("Fetching from:", authUser.role === 'admin' ? 'http://localhost:8081/Users/' : `http://localhost:8081/Users?userId=${authUser.user_id}`);
        const response = await fetch(authUser.role === 'admin' ? 'http://localhost:8081/Users/' : `http://localhost:8081/Users?userId=${authUser.user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Fetch error:", response.status, errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("Fetched users:", result);
        dispatch(setUsers(result));
      } catch (err: unknown) {
        let message = 'Network error occurred';
        if (err instanceof Error) message = err.message;
        console.error("Fetch error details:", err);
        dispatch(setError(message));
      }
    };
    fetchUsers();
  }, [dispatch, token, authUser]);

  const handleOpenRole = (user: PublicUser) => {
    setSelectedUser(user);
    setIsRoleOpen(true);
  };

  const handleCloseRole = () => {
    setIsRoleOpen(false);
    setSelectedUser(null);
  };

  const handleOpenUpdate = (user: PublicUser) => {
    setSelectedUserForUpdate(user);
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setIsUpdateOpen(false);
    setSelectedUserForUpdate(null);
  };

  return (
    <div>
      <ChangeRole user={selectedUser} isOpen={isRoleOpen} onClose={handleCloseRole} />
      <UpdateProfile
        user={selectedUserForUpdate}
        isOpen={isUpdateOpen}
        onClose={handleCloseUpdate}
        refetch={() => {
          if (authUser?.role === 'admin') dispatch(setUsers([...users]));
        }}
      />
      {loading && <p className="manage-users-loading">Loading users...</p>}
      {error && <p className="manage-users-error">Error fetching users: {error}</p>}
      {users.length > 0 ? (
        <div className="manage-users-table-container">
          <table className="manage-users-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Verified</th>
                <th className="actions-column">Actions</th> {/* Added class for width control */}
              </tr>
            </thead>
            <tbody>
              {users.map((user: PublicUser) => (
                <tr key={user.user_id}>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`manage-users-badge ${user.role === "admin" || user.isVerified ? "manage-users-badge-success" : "manage-users-badge-warning"}`}>
                      {user.role === "admin" || user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleOpenRole(user)}
                    >
                      Change Role
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleOpenUpdate(user)}
                    >
                      Update Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="manage-users-error">No users found.</p>
      )}
    </div>
  );
};

export default Users;






