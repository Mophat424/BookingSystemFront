// import { useDispatch, useSelector } from 'react-redux';
// import { registerUser, clearError } from '../../features/login/userSlice';
// import type { RootState, AppDispatch } from '../../app/store'; // Import AppDispatch
// import { useEffect } from 'react';
// import './auth.css';

// const Register = () => {
//   const dispatch: AppDispatch = useDispatch(); // Typed dispatch
//   const { error, loading } = useSelector((state: RootState) => state.user);

//   const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = {
//       first_name: (e.currentTarget.elements.namedItem('first_name') as HTMLInputElement).value,
//       last_name: (e.currentTarget.elements.namedItem('last_name') as HTMLInputElement).value,
//       email: (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value,
//       password: (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value,
//       contact_phone: (e.currentTarget.elements.namedItem('contact_phone') as HTMLInputElement).value || undefined,
//       address: (e.currentTarget.elements.namedItem('address') as HTMLInputElement).value || undefined,
//     };
//     dispatch(registerUser(formData));
//   };

//   useEffect(() => {
//     return () => {
//       dispatch(clearError());
//     };
//   }, [dispatch]);

//   return (
//     <div className="auth-container">
//       <h1>Register</h1>
//       {error && <p className="error">{error}</p>}
//       {loading && <p>Loading...</p>}
//       <form onSubmit={handleRegister}>
//         <input type="text" name="first_name" placeholder="First Name" required />
//         <input type="text" name="last_name" placeholder="Last Name" required />
//         <input type="email" name="email" placeholder="Email" required />
//         <input type="password" name="password" placeholder="Password" required />
//         <input type="text" name="contact_phone" placeholder="Contact Phone (optional)" />
//         <input type="text" name="address" placeholder="Address (optional)" />
//         <button type="submit" disabled={loading}>Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;






// src/pages/auth/Register.tsx
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/login/userSlice';
import type { RootState, AppDispatch } from '../../app/store';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const dispatch: AppDispatch = useDispatch();
  const { error, loading, needsVerification } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const handleRegister = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const first_name = (e.currentTarget.elements.namedItem('first_name') as HTMLInputElement).value;
      const last_name = (e.currentTarget.elements.namedItem('last_name') as HTMLInputElement).value;
      const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
      const password = (e.currentTarget.elements.namedItem('password') as HTMLInputElement).value;
      const contact_phone = (e.currentTarget.elements.namedItem('contact_phone') as HTMLInputElement).value || undefined;
      const address = (e.currentTarget.elements.namedItem('address') as HTMLInputElement).value || undefined;
      dispatch(registerUser({ first_name, last_name, email, password, contact_phone, address }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (needsVerification) {
      navigate('/verify'); // Redirect to verify page when needsVerification is true
    }
  }, [dispatch, navigate, needsVerification]);

  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      <form onSubmit={handleRegister}>
        <input type="text" name="first_name" placeholder="First Name" required />
        <input type="text" name="last_name" placeholder="Last Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="text" name="contact_phone" placeholder="Contact Phone" />
        <input type="text" name="address" placeholder="Address" />
        <button type="submit" disabled={loading}>Register</button>
      </form>
    </div>
  );
};

export default Register;