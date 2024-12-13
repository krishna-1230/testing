"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiChevronLeft, FiCreditCard } from "react-icons/fi";
import { FaRegCheckCircle } from "react-icons/fa";

export default function PaymentPage() {
  const [selectedCard, setSelectedCard] = useState("HDFC");
const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const router = useRouter();
  const authToken = localStorage.getItem("authToken");

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/cart", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const { cartItems } = response.data;

      setCartItems(cartItems);
      const calculatedSubtotal = cartItems.reduce((acc, item) => acc + item.total_price, 0);
      setSubtotal(calculatedSubtotal);
      const calculatedShipping = calculatedSubtotal < 1000 ? 40 : 0;
      setShipping(calculatedShipping);
      setCartTotal(calculatedSubtotal + calculatedShipping);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="flex justify-center items-start px-8 py-12">
      <div className="flex w-full max-w-5xl space-x-8">
        
        {/* Left Section - Payment Methods */}
        <div className="w-2/3 space-y-6">
          <Link href="/checkoutpage" className="flex items-center space-x-2 mb-4">
            <FiChevronLeft />
            <span className="text-lg font-semibold">Addresses</span>
          </Link>

          <div className="border rounded-lg p-4">
            <h2 className="flex items-center space-x-2 text-lg font-semibold mb-4">
              <FiCreditCard />
              <span>Registered cards</span>
            </h2>

            <div className="space-y-4">
              {/* Card Options */}
              {[
                { bank: "HDFC", name: "Hamesh R", lastDigits: "1234", expiry: "12/34" },
                { bank: "SBI", name: "Abiram R", lastDigits: "1234", expiry: "12/34" }
              ].map((card, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between border rounded-lg p-3 cursor-pointer ${
                    selectedCard === card.bank ? "border-purple-600 bg-gray-100" : "border-gray-300"
                  }`}
                  onClick={() => setSelectedCard(card.bank)}
                >
                  <div className="flex items-center space-x-3">
                    {selectedCard === card.bank ? (
                      <FaRegCheckCircle className="text-purple-600" />
                    ) : (
                      <div className="w-5 h-5 border border-gray-300 rounded-full" />
                    )}
                    <div>
                      <p className="font-semibold">{card.bank}</p>
                      <p className="text-sm text-gray-500">Last four digits: {card.lastDigits}</p>
                      <p className="text-sm text-gray-500">Name on card: {card.name}</p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">{card.expiry}</p>
                </div>
              ))}
            </div>

            {/* Add new card and UPI */}
            <div className="border-t border-gray-300 mt-4 pt-4 space-y-4">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-5 h-5 border border-gray-300 rounded-full" />
                <p>Add new card</p>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-5 h-5 border border-gray-300 rounded-full" />
                <p>UPI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Invoice and Payment Button */}
        <div className="w-1/3 bg-gray-100 p-6 rounded-md">
    <>
      <h2 className="text-lg font-semibold mb-6">YOUR CART</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-4 items-center mb-6">
            <div className="col-span-3 h-16 relative">
              <Image
                src={item.product_image.split("localhost:3000")[1]}
                alt={item.product_name}
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <p className="col-span-6 font-semibold">{item.product_name}</p>
            <p className="col-span-3 text-right font-semibold">₹ {item.total_price}</p>
          </div>
        ))
      ) : (
        <p>No items in your cart.</p>
      )}
      <div className="border-b border-gray-300 my-4"></div>
      <div className="flex justify-between text-gray-600">
        <p>Item Subtotal</p>
        <p>₹ {subtotal.toFixed(2)}</p>
      </div>
      <div className="flex justify-between text-gray-600">
        <p>Shipping</p>
        <p>₹ {shipping.toFixed(2)}</p>
      </div>
      <div className="border-b border-gray-300 my-4"></div>
      <div className="flex justify-between text-lg font-semibold">
        <p>Total</p>
        <p>₹ {cartTotal.toFixed(2)}</p>
      </div>
      <div className="flex space-x-4 mt-8">
        
      <button
  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-md"
  onClick={() => router.push("/paysuccess")}
>
  Pay 
</button>
       
      </div>
    </>
        </div>
      </div>
    </div>
  );
}
