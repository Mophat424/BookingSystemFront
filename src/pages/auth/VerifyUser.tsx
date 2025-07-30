// // src/pages/auth/VerifyUser.tsx
// import './auth.css';

// const VerifyUser = () => {
//   return (
//     <div className="auth-container">
//       <h1>Verify User</h1>
//       <p>Verification is not implemented yet. Check your email for a link.</p>
//       <form>
//         <input type="text" placeholder="Verification Code" disabled />
//         <button type="submit" disabled>Verify</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyUser;




// src/pages/auth/VerifyUser.tsx
// import { useDispatch, useSelector } from 'react-redux';
// import { verifyUser, clearError } from '../../features/login/userSlice';
// import type { RootState, AppDispatch } from '../../app/store';
// import { useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './auth.css';

// const VerifyUser = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { error, loading, needsVerification } = useSelector((state: RootState) => state.user);
//   const navigate = useNavigate();

//   const handleVerify = useCallback(
//     (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       const otp = (e.currentTarget.elements.namedItem('otp') as HTMLInputElement).value;
//       dispatch(verifyUser(otp));
//     },
//     [dispatch]
//   );

//   useEffect(() => {
//     if (!needsVerification) {
//       navigate('/login');
//     }
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch, navigate, needsVerification]);

//   return (
//     <div className="auth-container">
//       <h1>Verify Your Email</h1>
//       {error && <p className="error">{error}</p>}
//       {loading && <p>Loading...</p>}
//       <p>Check your email for the OTP sent by Eventify.</p>
//       <form onSubmit={handleVerify}>
//         <input type="text" name="otp" placeholder="Enter OTP" required />
//         <button type="submit" disabled={loading}>Verify</button>
//       </form>
//     </div>
//   );
// };

// export default VerifyUser;










// src/pages/auth/VerifyUser.tsx
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser, clearError } from '../../features/login/userSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const VerifyUser = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, loading, needsVerification, user } = useSelector((state: RootState) => state.user); // Include user for email
  const navigate = useNavigate();

  const handleVerify = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
      const otp = (e.currentTarget.elements.namedItem('otp') as HTMLInputElement).value;
      dispatch(verifyUser({ email, otp }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!needsVerification) {
      navigate('/login');
    }
    return () => {
      dispatch(clearError());
    };
  }, [dispatch, navigate, needsVerification]);

  return (
    <div className="auth-container">
      <h1>Verify Your Email</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <p>Check your email for the OTP sent by Eventify.</p>
      <form onSubmit={handleVerify}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          defaultValue={user?.email || ''} 
          required
        />
        <input type="text" name="otp" placeholder="Enter OTP" required />
        <button type="submit" disabled={loading}>Verify</button>
      </form>
    </div>
  );
};

export default VerifyUser;