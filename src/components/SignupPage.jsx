import React from 'react';

function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-white">Sign Up</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-1 text-white bg-gray-800 border border-gray-700 rounded-md focus:ring-orange-500 focus:border-orange-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
