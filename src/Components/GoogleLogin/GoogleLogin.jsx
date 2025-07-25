import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';


const GoogleLogin = ({ onSuccess }) => {
  const { googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Mutation for sending user data to /users
  const addUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post('/users', userData);
      return res.data;
    }
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      // console.log(result)
      const user = result.user;
      // Check if user exists in DB
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      console.log(res)
      if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
        // User does not exist, add to DB
        await addUserMutation.mutateAsync({
          email: user.email,
          role: 'user',
          created_at: new Date().toISOString(),
        });
      }
      Swal.fire({
        icon: 'success',
        title: 'Logged in with Google!',
        showConfirmButton: false,
        timer: 1500
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Google Login Failed',
        text: error.message || 'Something went wrong.'
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-secondary text-secondary-content font-semibold shadow hover:bg-primary hover:text-primary-content transition-colors mt-2"
    >
      <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C33.5 5.1 28.1 3 24 3 15.1 3 7.4 8.7 6.3 14.7z"/><path fill="#FBBC05" d="M24 45c5.8 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 36.1 27 37 24 37c-5.7 0-10.6-3.7-12.3-8.8l-7 5.4C7.4 39.3 15.1 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.2 5.5-7.7 5.5-4.7 0-8.5-3.8-8.5-8.5s3.8-8.5 8.5-8.5c2.1 0 4 .7 5.5 2.1l6.6-6.6C36.7 7.1 30.7 5 24 5c-9.9 0-18 8.1-18 18s8.1 18 18 18c8.7 0 16.1-6.2 17.7-14.5.2-1.3.3-2.7.3-4z"/></g></svg>
      Continue with Google
    </button>
  );
};

export default GoogleLogin; 