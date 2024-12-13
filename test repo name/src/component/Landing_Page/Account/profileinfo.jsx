"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profileinfo() {
  const [userDetails, setUserDetails] = useState({ username: "", email: "" });
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editDetails, setEditDetails] = useState({ username: "", email: "" });
  const [passwordData, setPasswordData] = useState({
    username: "",
    email: "",
    new_password: "",
  });

  // Fetch user details on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://127.0.0.1:3000/userinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Handle detail edit form submission
  const handleEditDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("http://127.0.0.1:3000/useredit", editDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(editDetails);
      setIsEditingDetails(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  // Handle password change form submission
  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      await axios.put("http://127.0.0.1:3000/userpass", passwordData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsChangingPassword(false);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  // Reset the forms and close the editing states
  const handleCancel = () => {
    setEditDetails({ username: "", email: "" });
    setPasswordData({ username: "", email: "", new_password: "" });
    setIsEditingDetails(false);
    setIsChangingPassword(false);
  };

  return (
    <div className="transition-all ease-in-out duration-300 mt-6 w-full max-w-4xl bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>

      {/* Enhanced display of Username and Email */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <span className="font-semibold text-lg text-gray-700 w-28">Username:</span>
          <p className="text-lg font-semibold text-gray-900">{userDetails.username}</p>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-lg text-gray-700 w-28">Email:</span>
          <p className="text-lg font-semibold text-gray-900">{userDetails.email}</p>
        </div>
      </div>

      {/* Edit Details Button */}
      {!isEditingDetails && !isChangingPassword && (
        <button
          onClick={() => { setIsEditingDetails(true); setIsChangingPassword(false); }}
          className="mt-4 px-4 py-2 bg-[#9333ea] text-white rounded-md shadow-sm"
        >
          Edit Details
        </button>
      )}

      {/* Change Password Button */}
      {!isEditingDetails && !isChangingPassword && (
        <button
          onClick={() => { setIsChangingPassword(true); setIsEditingDetails(false); }}
          className="mt-4 ml-4 px-4 py-2 bg-[#9333ea] text-white rounded-md shadow-sm"
        >
          Change Password
        </button>
      )}

      {/* Edit Details Form */}
      {isEditingDetails && (
        <form onSubmit={handleEditDetailsSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              value={editDetails.username}
              onChange={(e) => setEditDetails({ ...editDetails, username: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={editDetails.email}
              onChange={(e) => setEditDetails({ ...editDetails, email: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#9333ea] text-white rounded-md shadow-sm"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Change Password Form */}
      {isChangingPassword && (
        <form onSubmit={handleChangePasswordSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              type="text"
              value={passwordData.username}
              onChange={(e) => setPasswordData({ ...passwordData, username: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              type="email"
              value={passwordData.email}
              onChange={(e) => setPasswordData({ ...passwordData, email: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.new_password}
              onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
              className="w-full p-3 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-[#9333ea] text-white rounded-md shadow-sm"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="ml-4 px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
