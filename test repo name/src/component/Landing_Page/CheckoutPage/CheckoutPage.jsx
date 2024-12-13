"use client";
import React from "react";
import Link from "next/link";
import AddressSection from "./AddressSection";
import CartSummary from "./CartSummary";

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-start px-8 py-12">
      <div className="flex w-full max-w-5xl space-x-8">

        {/* Left Section - Return to Cart and Address List */}
        <div className="w-2/3 space-y-8 bg-white p-6 rounded-md shadow-md">
          <div className="mb-4 text-left">
            <Link href="/Shoppingbag" className="text-purple-600 hover:text-purple-800 font-semibold transition-colors">
              ← Return to Cart
            </Link>
          </div>
          <AddressSection />
        </div>

        {/* Right Section - Cart Summary */}
        <div className="w-1/3 bg-gray-100 p-6 rounded-md">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
