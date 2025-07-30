// import { useState } from "react";
// import { useAppSelector } from "../../../app/store";
// import "../UserDashboard.css";

// const ProfileManagement = () => {
//   const { user, token } = useAppSelector((state) => state.user) as { user: { id?: number; email?: string }; token: string | null };
//   const [profile, setProfile] = useState({ email: user.email || "", newPassword: "" });
//   const [message, setMessage] = useState<string | null>(null);

//   const handleUpdate = async () => {
//     try {
//       const response = await fetch(`http://localhost:8081/Users/${user.id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(profile),
//       });
//       if (!response.ok) throw new Error("Update failed");
//       setMessage("Profile updated successfully!");
//     } catch {
//   setMessage("Update failed. Please try again.");
// }

//   };

//   return (
//     <div className="user-dashboard-card">
//       <h2>Profile Management</h2>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={profile.email}
//           onChange={(e) => setProfile({ ...profile, email: e.target.value })}
//         />
//       </div>
//       <div>
//         <label>New Password:</label>
//         <input
//           type="password"
//           value={profile.newPassword}
//           onChange={(e) => setProfile({ ...profile, newPassword: e.target.value })}
//         />
//       </div>
//       <button className="user-dashboard-btn user-dashboard-btn-primary" onClick={handleUpdate}>
//         Update Profile
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ProfileManagement;



import { useState } from "react";
import { useAppSelector } from "../../../app/store";
import "./ProfileManagement.css"; // Updated import

const ProfileManagement = () => {
  const { user, token } = useAppSelector((state) => state.user) as { user: { id?: number; email?: string }; token: string | null };
  const [profile, setProfile] = useState({ email: user.email || "", currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleEmailUpdate = async () => {
    if (!profile.email || !user.id || !token) {
      setMessage("Invalid email or authentication issue.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/Users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: profile.email }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Update failed: ${errorText}`);
      }
      setMessage("Email updated successfully!");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Email update failed. Please try again.");
    }
  };

  const handlePasswordUpdate = async () => {
    if (!profile.currentPassword || !profile.newPassword || !user.id || !token) {
      setMessage("Please fill in all password fields.");
      return;
    }
    if (profile.newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8081/Users/${user.id}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: profile.currentPassword,
          newPassword: profile.newPassword,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Password update failed: ${errorText}`);
      }
      setMessage("Password updated successfully!");
      setProfile((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      setIsUpdatingPassword(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Password update failed. Please try again.");
    }
  };

  return (
    <div className="profile-management-card">
      <h2>Profile Management</h2>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="Enter new email"
        />
        <button
          className="profile-management-btn profile-management-btn-primary"
          onClick={handleEmailUpdate}
          disabled={!profile.email || profile.email === user.email}
        >
          Update Email
        </button>
      </div>
      <div>
        <button
          className="profile-management-btn profile-management-btn-secondary"
          onClick={() => setIsUpdatingPassword(true)}
        >
          Change Password
        </button>
        {isUpdatingPassword && (
          <div className="password-update">
            <label>Current Password:</label>
            <input
              type="password"
              value={profile.currentPassword}
              onChange={(e) => setProfile((prev) => ({ ...prev, currentPassword: e.target.value }))}
              placeholder="Enter current password"
            />
            <label>New Password:</label>
            <input
              type="password"
              value={profile.newPassword}
              onChange={(e) => setProfile((prev) => ({ ...prev, newPassword: e.target.value }))}
              placeholder="Enter new password"
            />
            <button
              className="profile-management-btn profile-management-btn-primary"
              onClick={handlePasswordUpdate}
            >
              Save Password
            </button>
            <button
              className="profile-management-btn profile-management-btn-secondary"
              onClick={() => setIsUpdatingPassword(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      {message && <p className={message.includes("success") ? "success-message" : "error-message"}>{message}</p>}
    </div>
  );
};

export default ProfileManagement;














// import { useState } from "react";
// import { useAppSelector } from "../../../app/store";
// import "./ProfileManagement.css";

// const ProfileManagement = () => {
//   const { user, token } = useAppSelector((state) => state.user) as { user: { id?: number; email?: string }; token: string | null };
//   const [profile, setProfile] = useState({ email: user.email || "", currentPassword: "", newPassword: "" });
//   const [message, setMessage] = useState<string | null>(null);
//   const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

//   const handleEmailUpdate = async () => {
//     if (!profile.email || !user.id || !token) {
//       setMessage("Invalid email or authentication issue.");
//       return;
//     }

//     try {
//       const requestBody = { email: profile.email, updateType: "email" };
//       console.log("Email Update Request:", { url: `http://localhost:8081/auth/update/${user.id}`, method: "POST", body: requestBody });
//       const response = await fetch(`http://localhost:8081/auth/update/${user.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Email Update Response:", errorText);
//         throw new Error(`Update failed: ${errorText}`);
//       }
//       const result = await response.json();
//       setMessage(result.message || "Email updated successfully!");
//     } catch (error) {
//       setMessage(error instanceof Error ? error.message : "Email update failed. Please try again.");
//     }
//   };

//   const handlePasswordUpdate = async () => {
//     if (!profile.currentPassword || !profile.newPassword || !user.id || !token) {
//       setMessage("Please fill in all password fields.");
//       return;
//     }
//     if (profile.newPassword.length < 6) {
//       setMessage("New password must be at least 6 characters.");
//       return;
//     }

//     try {
//       const requestBody = {
//         currentPassword: profile.currentPassword,
//         newPassword: profile.newPassword,
//         updateType: "password",
//       };
//       console.log("Password Update Request:", { url: `http://localhost:8081/auth/update/${user.id}`, method: "POST", body: requestBody });
//       const response = await fetch(`http://localhost:8081/auth/update/${user.id}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(requestBody),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         console.log("Password Update Response:", errorText);
//         throw new Error(`Password update failed: ${errorText}`);
//       }
//       const result = await response.json();
//       setMessage(result.message || "Password updated successfully!");
//       setProfile((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
//       setIsUpdatingPassword(false);
//     } catch (error) {
//       setMessage(error instanceof Error ? error.message : "Password update failed. Please try again.");
//     }
//   };

//   return (
//     <div className="profile-management-card">
//       <h2>Profile Management</h2>
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={profile.email}
//           onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
//           placeholder="Enter new email"
//         />
//         <button
//           className="profile-management-btn profile-management-btn-primary"
//           onClick={handleEmailUpdate}
//           disabled={!profile.email || profile.email === user.email}
//         >
//           Update Email
//         </button>
//       </div>
//       <div>
//         <button
//           className="profile-management-btn profile-management-btn-secondary"
//           onClick={() => setIsUpdatingPassword(true)}
//         >
//           Change Password
//         </button>
//         {isUpdatingPassword && (
//           <div className="password-update">
//             <label>Current Password:</label>
//             <input
//               type="password"
//               value={profile.currentPassword}
//               onChange={(e) => setProfile((prev) => ({ ...prev, currentPassword: e.target.value }))}
//               placeholder="Enter current password"
//             />
//             <label>New Password:</label>
//             <input
//               type="password"
//               value={profile.newPassword}
//               onChange={(e) => setProfile((prev) => ({ ...prev, newPassword: e.target.value }))}
//               placeholder="Enter new password"
//             />
//             <button
//               className="profile-management-btn profile-management-btn-primary"
//               onClick={handlePasswordUpdate}
//             >
//               Save Password
//             </button>
//             <button
//               className="profile-management-btn profile-management-btn-secondary"
//               onClick={() => setIsUpdatingPassword(false)}
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//       {message && <p className={message.includes("success") ? "success-message" : "error-message"}>{message}</p>}
//     </div>
//   );
// };

// export default ProfileManagement;






