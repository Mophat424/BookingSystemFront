// // src/dashboard/AdminDashboard/Profile.tsx
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { logout } from "../../features/login/userSlice";
// import { useGetUserByIdQuery } from "../../features/users/usersAPI";
// import UpdateProfile from "./ManageUsers/UpdateProfile";
// import type { RootState } from "../../app/store";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);
//   const userId = user?.user_id;

//   const { data, isLoading, error, refetch } = useGetUserByIdQuery(userId ?? 0, {
//     skip: !userId,
//   });

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error loading profile</p>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md h-screen">
//           <h2 className="text-xl font-semibold mb-4">User Information</h2>
//           <div className="flex flex-col items-center mb-4 gap-4 border border-gray-300 p-4 rounded">
//             <img
//               src={data?.image_url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
//               alt="User Avatar"
//               className="w-28 rounded-full mr-4 border-2 border-gray-400"
//             />
//             <div>
//               <h3 className="text-lg font-bold">Name: {data?.first_name} {data?.last_name}</h3>
//               <p className="text-gray-600">User ID: {data?.user_id}</p>
//               <p className="text-gray-600">Email: {data?.email}</p>
//               <p className="text-gray-600">Role: {data?.role}</p>
//               {/* Removed isVerified since it's not in your schema; add if needed */}
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2 justify-center">
//             <button
//               className="btn btn-primary flex mx-auto"
//               onClick={() => {
//                 (document.getElementById("update_profile_modal") as HTMLDialogElement)?.showModal();
//               }}
//             >
//               Update Profile
//             </button>
//             <button
//               className="btn btn-primary flex mx-auto"
//               onClick={() => {
//                 dispatch(logout());
//                 navigate("/");
//               }}
//             >
//               LogOut
//             </button>
//           </div>
//         </div>
//       )}
//       {data && <UpdateProfile user={data} refetch={refetch} />}
//     </div>
//   );
// };

// export default Profile;




// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../../features/login/userSlice";
// import { useGetUserByIdQuery } from "../../features/users/usersAPI";
// import UpdateProfile from "./ManageUsers/UpdateProfile";
// import type { RootState } from "../../app/store";

// const Profile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state: RootState) => state.user);
//   const userId = user?.id; // Changed from user_id to id

//   const { data, isLoading, error, refetch } = useGetUserByIdQuery(userId ?? 0, {
//     skip: !userId,
//   });

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error loading profile</p>
//       ) : (
//         <div className="bg-white p-6 rounded-lg shadow-md h-screen">
//           <h2 className="text-xl font-semibold mb-4">User Information</h2>
//           <div className="flex flex-col items-center mb-4 gap-4 border border-gray-300 p-4 rounded">
//             <img
//               src={data?.image_url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
//               alt="User Avatar"
//               className="w-28 rounded-full mr-4 border-2 border-gray-400"
//             />
//             <div>
//               <h3 className="text-lg font-bold">Name: {data?.first_name} {data?.last_name}</h3>
//               <p className="text-gray-600">User ID: {data?.user_id}</p> {/* Keep as user_id if API returns it */}
//               <p className="text-gray-600">Email: {data?.email}</p>
//               <p className="text-gray-600">Role: {data?.role}</p>
//               {/* Removed isVerified since it's not in your schema; add if needed */}
//             </div>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2 justify-center">
//             <button
//               className="btn btn-primary flex mx-auto"
//               onClick={() => {
//                 (document.getElementById("update_profile_modal") as HTMLDialogElement)?.showModal();
//               }}
//             >
//               Update Profile
//             </button>
//             <button
//               className="btn btn-primary flex mx-auto"
//               onClick={() => {
//                 dispatch(logout());
//                 navigate("/");
//               }}
//             >
//               LogOut
//             </button>
//           </div>
//         </div>
//       )}
//       {data && <UpdateProfile user={data} refetch={refetch} />}
//     </div>
//   );
// };

// export default Profile;





import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/login/userSlice";
import { useGetUserByIdQuery } from "../../features/users/usersAPI";
import UpdateProfile from "./ManageUsers/UpdateProfile";
import type { RootState } from "../../app/store";
import { useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const userId = user?.id; // Changed from user_id to id

  const { data, isLoading, error, refetch } = useGetUserByIdQuery(userId ?? 0, {
    skip: !userId,
  });

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const handleOpenUpdate = () => {
    setIsUpdateOpen(true);
  };

  const handleCloseUpdate = () => {
    setIsUpdateOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading profile</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md h-screen">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="flex flex-col items-center mb-4 gap-4 border border-gray-300 p-4 rounded">
            <img
              src={data?.image_url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
              alt="User Avatar"
              className="w-28 rounded-full mr-4 border-2 border-gray-400"
            />
            <div>
              <h3 className="text-lg font-bold">Name: {data?.first_name} {data?.last_name}</h3>
              <p className="text-gray-600">User ID: {data?.user_id}</p>
              <p className="text-gray-600">Email: {data?.email}</p>
              <p className="text-gray-600">Role: {data?.role}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              className="btn btn-primary flex mx-auto"
              onClick={handleOpenUpdate}
            >
              Update Profile
            </button>
            <button
              className="btn btn-primary flex mx-auto"
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              LogOut
            </button>
          </div>
        </div>
      )}
      {data && (
        <UpdateProfile
          user={data}
          isOpen={isUpdateOpen}
          onClose={handleCloseUpdate}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Profile;