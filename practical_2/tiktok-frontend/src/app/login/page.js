'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    console.log('Login data:', data);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Login successful (demo only)');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Log in to TikTok</h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
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
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-md font-medium hover:bg-red-600 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        
        <div className="text-center mt-4">
          <p className="text-gray-500">
            Don't have an account?{' '}
            <Link href="/signup" className="text-red-500 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}