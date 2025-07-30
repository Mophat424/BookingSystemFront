// import { useForm, type SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useAppDispatch, useAppSelector } from "../../../app/store";
// import { updateUser } from "../../../features/users/userListSlice";
// import { toast } from "sonner";
// import { useEffect } from "react";
// import '../ManageUsers/ManageUsers.css';

// interface PublicUser {
//   user_id: number;
//   first_name: string;
//   last_name: string;
//   email: string;
//   role: "user" | "admin" | null;
//   isVerified?: boolean;
//   created_at?: string;
//   updated_at?: string;
//   image_url?: string;
//   contact_phone?: string;
//   address?: string;
// }

// type ChangeRoleProps = {
//   user: PublicUser | null;
//   isOpen: boolean;
//   onClose: () => void;
// };

// type ChangeRoleInputs = {
//   role: "user" | "admin";
// };

// const schema = yup.object({
//   role: yup.string().oneOf(["user", "admin"]).required("Role is required"),
// });

// const ChangeRole = ({ user, isOpen, onClose }: ChangeRoleProps) => {
//   const dispatch = useAppDispatch();
//   const token = useAppSelector((state) => state.user.token);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { errors },
//   } = useForm<ChangeRoleInputs>({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       role: user ? (user.role as "user" | "admin") : "user",
//     },
//   });

//   useEffect(() => {
//     if (user && isOpen) {
//       setValue("role", user.role as "user" | "admin");
//     } else if (!isOpen) {
//       reset();
//     }
//   }, [user, isOpen, setValue, reset]);

//   const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data) => {
//     console.log("Submitting role change:", data); // Debug log
//     if (!user) {
//       toast.error("No user selected for role change.");
//       return;
//     }
//     if (!token) {
//       toast.error("Authentication token missing.");
//       console.error("No token available");
//       return;
//     }
//     try {
//       console.log("Sending request to:", `http://localhost:8081/auth/users/${user.user_id}`);
//       const response = await fetch(`http://localhost:8081/auth/users/${user.user_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ role: data.role }),
//       });
//       const responseText = await response.text(); // Log full response
//       console.log("API Response:", response.status, responseText);
//       if (!response.ok) {
//         throw new Error(`Failed to update role: ${responseText || response.statusText}`);
//       }
//       const updatedUser = { ...user, role: data.role };
//       dispatch(updateUser(updatedUser));
//       toast.success("Role updated successfully!");
//       onClose();
//     } catch (error) {
//       console.error("Error updating role:", error);
//       toast.error(`Failed to update role: ${error instanceof Error ? error.message : "Unknown error"}`);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <dialog id="role_modal" className="manage-users-modal" open>
//       <div className="manage-users-modal-box">
//         <h3>Change Role for {user?.first_name} {user?.last_name}</h3>
//         <form onSubmit={handleSubmit(onSubmit)} className="manage-users-modal-box form">
//           <label>Select Role:</label>
//           <select {...register("role")} className="manage-users-modal-box select">
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//           {errors.role && <span className="error-text">{errors.role.message}</span>}
//           <div className="modal-action">
//             <button type="submit" className="btn btn-primary">
//               Update Role
//             </button>
//             <button type="button" className="btn" onClick={onClose}>
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </dialog>
//   );
// };

// export default ChangeRole;





import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { updateUser } from "../../../features/users/userListSlice";
import { toast } from "sonner";
import { useEffect } from "react";
import '../ManageUsers/ManageUsers.css';

// Define the API base URL
const API_BASE_URL = "http://localhost:8081";

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

type ChangeRoleProps = {
  user: PublicUser | null;
  isOpen: boolean;
  onClose: () => void;
};

type ChangeRoleInputs = {
  role: "user" | "admin";
};

const schema = yup.object({
  role: yup.string().oneOf(["user", "admin"]).required("Role is required"),
});

const ChangeRole = ({ user, isOpen, onClose }: ChangeRoleProps) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.user.token);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ChangeRoleInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: user ? (user.role as "user" | "admin") : "user",
    },
  });

  useEffect(() => {
    if (user && isOpen) {
      setValue("role", user.role as "user" | "admin");
    } else if (!isOpen) {
      reset();
    }
  }, [user, isOpen, setValue, reset]);

  const onSubmit: SubmitHandler<ChangeRoleInputs> = async (data) => {
    if (!user) {
      toast.error("No user selected for role change.");
      return;
    }
    if (!token) {
      toast.error("Authentication token missing.");
      return;
    }
    try {
      const endpoint = `${API_BASE_URL}/users/${user.user_id}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: data.role }),
      });
      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Failed to update role: ${responseText || response.statusText}`);
      }
      const updatedUser = { ...user, role: data.role };
      dispatch(updateUser(updatedUser));
      toast.success("Role updated successfully!");
      onClose();
    } catch (error) {
      toast.error(`Failed to update role: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  if (!isOpen) return null;

  return (
    <dialog id="role_modal" className="manage-users-modal" open>
      <div className="manage-users-modal-box">
        <h3>Change Role for {user?.first_name} {user?.last_name}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="manage-users-modal-box form">
          <label>Select Role:</label>
          <select {...register("role")} className="manage-users-modal-box select">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <span className="error-text">{errors.role.message}</span>}
          <div className="modal-action">
            <button type="submit" className="btn btn-primary">
              Update Role
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ChangeRole;