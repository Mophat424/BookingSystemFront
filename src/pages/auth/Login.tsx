// // src/pages/auth/Login.tsx
// import { useDispatch, useSelector } from 'react-redux';import {  } from '../../features/login/userSlice';
// import type { RootState, AppDispatch } from '../../app/store';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './auth.css';

// const Login = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { error, loading, isAuthenticated, user } = useSelector((state: RootState) => state.user); // Include user in selector
//   const navigate = useNavigate();

//   const handleLogin = useCallback(
//     (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
//       const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
//       dispatch(loginUser({ email, password }));
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       if (user.role === 'admin') {
//         navigate('/admin/dashboard');
//       } else {
//         navigate('/user/dashboard');
//       }
//     }
//     console.log('Login - error:', error, 'User:', user); 
//   }, [dispatch, navigate, isAuthenticated, error, user]);
//   return (
//     <div className="auth-container">
//       <h1>Login</h1>
//       {error && <p className="error">{error}</p>}
//       {loading && <p>Loading...</p>}
//       <form onSubmit={handleLogin}>
//         <input type="email" name="email" placeholder="Enter your email" required />
//         <input type="password" name="password" placeholder="Enter your password" required />
//         <button type="submit" disabled={loading}>Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;





import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/login/userSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleLogin = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
      const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
      dispatch(loginUser({ email, password }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    }
    console.log('Login - error:', error, 'User:', user);
  }, [navigate, isAuthenticated, error, user]);

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleLogin}>
        <input type="email" name="email" placeholder="Enter your email" required />
        <input type="password" name="password" placeholder="Enter your password" required />
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
};

export default Login;





