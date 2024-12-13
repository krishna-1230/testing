"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use 'next/navigation' for client-side redirection

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
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
      const response = await axios.post("http://127.0.0.1:3000/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Signup successful:", response.data);
  
      // Save the token in localStorage (auto-login after signup)
      localStorage.setItem("authToken", response.data.token);
  
      // Redirect to home page after successful signup and login
      router.push('/'); 
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  

  return (
    <div className="flex h-screen w-screen">
      {/* Left side: Welcome image */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <img
          src="/checkout/signup.svg"
          alt="Welcome illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right side: Signup form */}
      <div className="w-1/2 flex flex-col justify-center px-20 bg-white">
        <h1 className="text-3xl font-bold mb-4">Create your account</h1>
        <p className="text-gray-600 mb-8">Enter your details to sign up</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

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
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-300"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <a href="/terms" className="text-indigo-600 hover:underline">
                terms and conditions
              </a>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center my-4">
            <span className="text-gray-500 text-sm">or</span>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">
              Log In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
