"use client"; // Required for using useState and rendering client-side
import React, { useState } from "react";
import Wishlist from "@/component/Landing_Page/Wishlist/Wishlist";
import OrderList from "@/component/Landing_Page/YourOrder/YourOrder";
import AddressSection from "@/component/Landing_Page/CheckoutPage/AddressSection";
import ProfileInfo from "./profileinfo"; // Ensure the component is properly imported

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile"); // Initialize activeTab state

  return (
    
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Tab Navigation */}
      <div className="flex w-full max-w-4xl justify-center space-x-6 mt-8">
        {["profile", "address", "orders", "wishlist"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === tab ? "bg-black text-white" : "bg-gray-300 text-black"
            } rounded-md transition-all ease-in-out duration-300`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all ease-in-out duration-300 mt-6 w-full max-w-4xl bg-white p-6 rounded-md shadow-lg">
        {activeTab === "profile" && <ProfileInfo />} {/* Ensure this is the correct component name */}

        {activeTab === "address" && (
          <div>
            <AddressSection />
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <OrderList />
          </div>
        )}

        {activeTab === "wishlist" && (
          <div>
            <Wishlist />
          </div>
        )}
      </div>
    </div>
  );
}
