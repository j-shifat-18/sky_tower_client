import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import Swal from 'sweetalert2';
import GoogleLogin from '../../../Components/GoogleLogin/GoogleLogin';

const Login = () => {
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message || 'Invalid credentials.'
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">Login to your account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <GoogleLogin onSuccess={() => navigate('/')} />
        <p className="mt-4 text-center text-base-content">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;