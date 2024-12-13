"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Get authToken from localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token); // Set the token in state
    }
  }, []);

  // Fetch cart items once the token is set
  useEffect(() => {
    if (authToken) {
      axios
        .get("http://127.0.0.1:3000/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Send authToken in the headers
          },
        })
        .then((response) => {
          // Set cart items directly from the response
          setCartItems(response.data.cartItems || []); // Default to an empty array if no items
        })
        .catch((error) => {
          console.error("Error fetching cart items:", error);
          // You can optionally display an error message here if needed
        });
    }
  }, [authToken]); 

  // Remove item from cart
  const handleRemoveItem = (productID) => {
    if (!authToken) {
      alert("You are not logged in. Please login first.");
      return;
    }
  
    axios
      .delete(`http://127.0.0.1:3000/cart/${productID}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authToken in the headers
        },
      })
      .then(() => {
        // Remove only the clicked instance of the product, not all instances
        setCartItems((prevItems) => {
          const newItems = [...prevItems];
          const index = newItems.findIndex((item) => item.product_id === productID);
          if (index !== -1) {
            newItems.splice(index, 1); // Remove the product at the found index
          }
          return newItems;
        });
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        alert("Failed to remove item from cart. Please try again.");
      });
  };
  
  

  // Update item quantity
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1 || !authToken) return;

    axios
      .put(
        `http://127.0.0.1:3000/cart/${id}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include authToken in the headers
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setCartItems(
          cartItems.map((item) =>
            item.product_id === id ? { ...item, quantity } : item
          )
        );
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        alert("Failed to update quantity. Please try again.");
      });
  };

  // Calculate total price
  const total = cartItems.reduce(
    (sum, item) => sum + item.total_price * item.quantity,
    0
  );

  return (
    <div className="px-[3%]">
      {/* Breadcrumb */}
      <div className="mt-[30px]">
        <div className="flex space-x-[5px] ps-[60px]">
          <Link className="text-[#888888] cursor-pointer" href={"/"}>
            HOME /
          </Link>
          <Link href={"/Shoppingbag"} className="cursor-pointer font-[700]">
            SHOPPING CART
          </Link>
        </div>
      </div>

      {/* Cart Table */}
      <div className="mt-[30px]">
        {/* Table Headers */}
        <div className="grid grid-cols-4 text-left items-center font-[700] text-[20px] mb-[15px] px-[150px]">
          <p>Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
        </div>

        <div className="border-b border-[#EBEBEB] my-[30px]"></div>

        {/* Table Rows */}
        {cartItems.map((item) => (
          <div key={item.product_id} className="grid grid-cols-4 text-left items-center px-[150px] mb-[20px]">
            {/* Product Column */}
            <div className="flex items-center space-x-[15px]">
              <MdOutlineClose
                className="text-[16px] cursor-pointer"
                onClick={() => handleRemoveItem(item.product_id)}
              />
              {/* Product Image */}
              <img
                src={item.product_image}
                alt={item.product_name}
                className="w-[70px] h-[70px] object-cover" // Adjust image size
              />
              <p className="font-[700] text-[16px]">{item.product_name}</p> {/* Display product name */}
            </div>

            {/* Price Column */}
            <p className="font-[700] text-[16px]">₹{item.total_price}</p> {/* Display final price for each item */}

            {/* Quantity Column */}
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.product_id, parseInt(e.target.value, 10))
              }
              className="font-[700] text-[16px] border border-[#EBEBEB] text-center w-[50px] mx-0"
              min="1"
            />

            {/* Total Column */}
            <p className="font-[700] text-[16px]">
              ₹{(item.total_price * item.quantity).toFixed(2)} {/* Display total for this item */}
            </p>
          </div>
        ))}

        <div className="border-b border-[#EBEBEB] my-[30px]"></div>

        {/* Cart Totals */}
        <div className="flex flex-col items-end pr-[150px] space-y-[10px]">
          <h2 className="font-[700] text-[20px]">Cart Totals</h2>
          <div className="flex justify-between w-[300px] border-b border-[#EBEBEB] py-[10px]">
            <span className="font-[500]">Subtotal</span>
            <span className="font-[700]">₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between w-[300px] border-b border-[#EBEBEB] py-[10px]">
            <span className="font-[500]">Shipping Free</span>
            <span className="font-[700] text-[#ff0000]">FREE!!!</span>
          </div>
          <div className="flex justify-between w-[300px] py-[10px] font-[700] text-[20px]">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <Link href="/checkoutpage">
            <button className="bg-[#d3b4fc] text-[#000] px-[30px] py-[10px] font-[700] rounded-md mt-[20px]">
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
