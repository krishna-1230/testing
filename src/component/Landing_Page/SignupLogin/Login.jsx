"use client";

import React, { useState } from "react";
import axios from "axios"; // Use axios for consistency
import { useRouter } from "next/navigation"; // Use 'next/navigation' for client-side redirection

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter(); // Initialize useRouter for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send login request using axios
      const response = await axios.post("http://127.0.0.1:3000/login", formData, {
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Login successful:", response.data);
  
      // Save the token in localStorage
      localStorage.setItem("authToken", response.data.token);
  
      // Redirect to the homepage on successful login
      router.push("/"); // Adjust redirection path if needed
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };
  

  return (
    <div className="flex h-screen w-screen">
      {/* Left side: Login form */}
      <div className="flex flex-col justify-center w-1/2 px-20 bg-white">
        <h1 className="text-3xl font-bold mb-4">Welcome back!</h1>
        <p className="text-gray-600 mb-8">
          Enter your credentials to access your account
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex justify-between items-center">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
                value={formData.password}
                onChange={handleChange}
              />
              <a
                href="/forgot-password"
                className="text-sm text-indigo-600 hover:underline ml-4"
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-600">
              Remember for 30 days
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500 text-sm">or</span>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>

      {/* Right side: Welcome image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/checkout/login.svg"
          alt="Welcome illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
