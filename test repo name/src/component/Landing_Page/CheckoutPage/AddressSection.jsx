"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddressSection() {
  const [showForm, setShowForm] = useState(false);
  const [shippingInfo, setShippingInfo] = useState([]);
  const [editAddress, setEditAddress] = useState(null);
  const [currentForm, setCurrentForm] = useState({
    receiver_name: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    pincode: "",
    landmark: "",
  });

  const authToken = localStorage.getItem("authToken");

  const clearForm = () => {
    setCurrentForm({
      receiver_name: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      pincode: "",
      landmark: "",
    });
    setEditAddress(null);
  };

  const fetchUserAddress = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/useraddress", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setShippingInfo(response.data.shipping_info || []);
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };
  
  useEffect(() => {
    fetchUserAddress();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) clearForm();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editAddress) {
        const { id, ...updateData } = currentForm;
        const response = await axios.put(
          `http://127.0.0.1:3000/userupdate`,
          { ...updateData },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        alert(response.status === 200 ? "Address updated successfully!" : "Failed to update the address.");
      } else {
        const response = await axios.post(
          "http://127.0.0.1:3000/user",
          currentForm,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        alert(response.status === 201 ? "Address saved successfully!" : "Failed to save the address.");
      }
      setShowForm(false);
      fetchUserAddress();
    } catch (error) {
      console.error("Error saving address:", error);
      alert("Failed to save or update the address. Please try again.");
    }
  };

  const handleEdit = (address) => {
    setEditAddress(address);
    const { id, ...editableData } = address;
    setCurrentForm(editableData);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        "http://127.0.0.1:3000/userdelete",
        {
          data: { address_id: id },
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert(response.status === 200 ? "Address deleted successfully!" : "Failed to delete the address.");
      fetchUserAddress();
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete the address. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={toggleForm}
        className="bg-purple-600 text-white px-4 py-2 rounded-md mb-6"
      >
        + Add A New Address
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="p-6 bg-white border border-gray-300 rounded-md shadow-md space-y-4"
        >
          <h3 className="font-semibold text-lg">{editAddress ? "Edit Address" : "New Address"}</h3>
          {Object.keys(currentForm) .filter(key => key !== "address_id").map((key) => (
            <div key={key}>
              <label className="block text-sm text-gray-700">{key.replace("_", " ")}</label>
              <input
                type="text"
                name={key}
                value={currentForm[key]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder={`Enter ${key.replace("_", " ")}`}
                required={key !== "landmark"}
              />
            </div>
          ))}
          <div className="flex justify-end space-x-4">
            <button onClick={toggleForm} className="bg-purple-600 text-white px-10 py-2 rounded-md">Cancel</button>
            <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded-md">
              {editAddress ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      )}

      {shippingInfo.length > 0 ? (
        shippingInfo.map((address, idx) => (
          <div key={idx} className="flex justify-between items-center border p-4 rounded-md mb-4">
            <div>
              <h4 className="font-semibold">{address.receiver_name}</h4>
              <p>{`${address.address}, ${address.city}, ${address.country} - ${address.pincode}`}</p>
              {address.landmark && <p>Landmark: {address.landmark}</p>}
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(address)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(address.address_id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No addresses found.</p>
      )}
    </>
  );
}
