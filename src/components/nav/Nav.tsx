// // src/components/nav/Nav.tsx
// import logo from '../../assets/images/logo.png';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../../app/store';
// import './Nav.css';

// const Nav = () => {
//   const userRole = useSelector((state: RootState) => state.user.user?.role);
//   const userToken = useSelector((state: RootState) => state.user.token);
//   const isAdmin = userRole === 'admin';
//   const isUser = userRole === 'user';

//   // Debug log to check initial state
//   console.log('Nav - userToken:', userToken, 'userRole:', userRole);

//   return (
//     <div className="nav-container">
//       <div className="navbar">
//         <div className="navbar-start">
//           <img src={logo} alt="EventMaster Logo" className="logo" />
//         </div>
//         <div className="navbar-center">
//           <ul className="nav-links">
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/about">About</NavLink></li>
//             {userToken && (
//               <li>
//                 <NavLink to={isAdmin ? '/admin/dashboard' : isUser ? '/user/dashboard' : '/dashboard/analytics'}>
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="navbar-end">
//           {!userToken && (
//             <div className="auth-links">
//               <NavLink to="/register">Register</NavLink>
//               <NavLink to="/login">Login</NavLink>
//             </div>
//           )}
//           {userToken && <button className="profile-btn">Profile</button>}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav;




// import logo from '../../assets/images/logo.png';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../features/login/userSlice';
// import type { RootState } from '../../app/store';
// import './Nav.css';

// const Nav = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userRole = useSelector((state: RootState) => state.user.user?.role);
//   const userToken = useSelector((state: RootState) => state.user.token);
//   const isAdmin = userRole === 'admin';
//   const isUser = userRole === 'user';

//   // Debug log to check initial state
//   console.log('Nav - userToken:', userToken, 'userRole:', userRole);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate('/');
//   };

//   return (
//     <div className="nav-container">
//       <div className="navbar">
//         <div className="navbar-start">
//           <img src={logo} alt="EventMaster Logo" className="logo" />
//         </div>
//         <div className="navbar-center">
//           <ul className="nav-links">
//             <li><NavLink to="/">Home</NavLink></li>
//             <li><NavLink to="/about">About</NavLink></li>
//             {userToken && (
//               <li>
//                 <NavLink to={isAdmin ? '/admin/dashboard' : isUser ? '/user/dashboard' : '/dashboard/analytics'}>
//                   Dashboard
//                 </NavLink>
//               </li>
//             )}
//           </ul>
//         </div>
//         <div className="navbar-end">
//           {!userToken && (
//             <div className="auth-links">
//               <NavLink to="/register">Register</NavLink>
//               <NavLink to="/login">Login</NavLink>
//             </div>
//           )}
//           {userToken && (
//             <button className="profile-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Nav;





import logo from '../../assets/images/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/login/userSlice';
import type { RootState } from '../../app/store';
import './Nav.css';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state: RootState) => state.user.user?.role);
  const userToken = useSelector((state: RootState) => state.user.token);
  const isAdmin = userRole === 'admin';
  const isUser = userRole === 'user';

  // Debug log to check initial state
  console.log('Nav - userToken:', userToken, 'userRole:', userRole);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="nav-container">
      <div className="navbar">
        <div className="navbar-start">
          <img src={logo} alt="EventMaster Logo" className="logo" />
        </div>
        <div className="navbar-center">
          <ul className="nav-links">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            {userToken && (
              <li>
                <NavLink to={isAdmin ? '/admin/dashboard' : isUser ? '/user/dashboard' : '/dashboard/analytics'}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end">
          {!userToken && (
            <div className="auth-links">
              <NavLink to="/register">Register</NavLink>
              <NavLink to="/login">Login</NavLink>
            </div>
          )}
          {userToken && (
            <button className="profile-btn" onClick={handleLogout} aria-label="Logout">
              <i className="fas fa-sign-out-alt"></i> {/* Font Awesome logout icon */}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;