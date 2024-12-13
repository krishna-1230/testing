import React from "react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-50 p-6 lg:p-16">
      {/* Left Side - Login Form */}
      <div className="bg-white shadow-lg rounded-lg p-10 lg:w-1/3 w-full mx-6">
        <div className="text-center mb-6">
          <img
            src="/your-logo.png"
            alt="Logo"
            className="w-14 h-14 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome back!
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access your account
        </p>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            <a
              href="/forgot-password"
              className="text-sm text-indigo-500 float-right mt-1"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
              Remember for 30 days
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">or</p>
            <a href="/merchant/register" className="text-blue-500 text-sm hover:underline">
              New Merchant? Register
            </a>
          </div>
        </form>
      </div>

      {/* Right Side - Illustrations */}
      <div className="flex flex-col items-center justify-center lg:w-1/2 mt-10 lg:mt-0 lg:ml-12">
        <div className="w-80 lg:w-96 mb-8">
          <img
            src="/merchant/mer_login1.jpg"
            alt="Illustration 1"
            className="w-full"
          />
        </div>
        <div className="w-80 lg:w-96">
          <img
            src="/merchant/mer_login2.jpg"
            alt="Illustration 2"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
