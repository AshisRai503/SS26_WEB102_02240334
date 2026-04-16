'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('Signup data:', data);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration successful (demo only)');
    }, 1500);
  };
  
  const password = watch('password');
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign up for TikTok</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create a profile, follow other accounts, make your own videos, and more
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                {...register('username', { 
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: 'Username can only contain letters, numbers and underscores'
                  }
                })}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            
            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$!%*?&])[A-Za-z\d$!%*?&]{8,}$/,
                    message: 'Password must contain uppercase, lowercase, number, and special character'
                  }
                })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            
            {/* Confirm Password */}
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            {/* Terms */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                {...register('terms', { required: 'You must agree to the terms and conditions' })}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            {errors.terms && <p className="text-red-500 text-xs">{errors.terms.message}</p>}
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md font-medium hover:bg-red-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-red-600 hover:text-red-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}