"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function CartSummary() {
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
  onClick={() => router.push("/payment")}
>
  Place Order
</button>
       
      </div>
    </>
  );
}
