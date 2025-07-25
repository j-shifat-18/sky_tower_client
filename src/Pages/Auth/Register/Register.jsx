import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleLogin from '../../../Components/GoogleLogin/GoogleLogin';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [uploading, setUploading] = useState(false);

  // Mutation for sending user data to /users
  const addUserMutation = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosSecure.post('/users', userData);
      return res.data;
    }
  });

  const onSubmit = async (data) => {
    let photoURL = '';
    if (data.photo && data.photo[0]) {
      setUploading(true);
      const formData = new FormData();
      formData.append('image', data.photo[0]);
      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData,
        });
        const imgData = await res.json();
        if (imgData.success) {
          photoURL = imgData.data.url;
        } else {
          throw new Error('Image upload failed');
        }
      } catch (err) {
        setUploading(false);
        Swal.fire({ icon: 'error', title: 'Image Upload Failed', text: err.message });
        return;
      }
      setUploading(false);
    }
    // Password validation
    const password = data.password;
    if (!/(?=.*[a-z])/.test(password) || !/(?=.*[A-Z])/.test(password) || password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Password Error',
        text: 'Password must have at least 6 characters, one uppercase and one lowercase letter.'
      });
      return;
    }
    try {
      const userCredential = await createUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL || undefined,
      });
      // Send user data to /users
      await addUserMutation.mutateAsync({
        name:data.name,
        email: data.email,
        role: 'user',
        created_at: new Date().toISOString(),
      });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Could not register.'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Create an account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-base-content">Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-base-200"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-base-content">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-200"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1 font-medium text-base-content">Photo</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-base-200"
              {...register('photo')}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-base-content">Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-base-200"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <p className="text-error text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-primary text-primary-content font-semibold shadow hover:bg-secondary hover:text-secondary-content transition-colors mt-2"
            disabled={isSubmitting || uploading}
          >
            {isSubmitting || uploading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <GoogleLogin onSuccess={() => navigate('/')} />
        <p className="mt-4 text-center text-base-content">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;