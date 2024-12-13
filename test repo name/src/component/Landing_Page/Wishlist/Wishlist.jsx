"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineClose } from "react-icons/md"; // Cross icon for remove
import axios from "axios";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [authToken, setAuthToken] = useState(null);

  // Get the authToken from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token); // Set the token in state
    }
  }, []);

  // Fetch wishlist items once the authToken is set
  useEffect(() => {
    if (authToken) {
      axios
        .get("http://127.0.0.1:3000/wishlist", {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add token in Authorization header
          }
        })
        .then((response) => {
          // Set wishlist items if the response contains them
          if (response.data.wishlistItems) {
            setWishlistItems(response.data.wishlistItems);
          } else {
            alert("No wishlist items found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching wishlist items:", error);
          alert("Failed to load wishlist items. Please try again.");
        });
    }
  }, [authToken]); // Trigger this effect when authToken changes

  // Remove item from wishlist
  const handleRemoveItem = (index) => {
    if (!authToken) {
      alert("You are not logged in. Please login first.");
      return;
    }
  
    const productID = wishlistItems[index].product_id; // Get the productID based on the index
  
    axios
      .delete(`http://127.0.0.1:3000/wishlist/${productID}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include authToken in the headers
        },
      })
      .then(() => {
        // Remove the item from the wishlist based on its index
        setWishlistItems((prevItems) => prevItems.filter((_, i) => i !== index));
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        alert("Failed to remove item from wishlist. Please try again.");
      });
  };
  

  // Add item to cart
  const handleAddToCart = async (productId) => {
    if (!authToken) {
      alert("You are not logged in. Please login first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/cart/add",
        {
          product_id: productId,
          quantity: 1, // Default quantity
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include authToken in the headers
          }
        }
      );

      if (response.data.success) {
        alert("Product added to cart!");
      } else {
        alert("Failed to add product to cart.");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="px-[2%]">  {/* Reduced padding */}
      {/* Wishlist Table */}
      <div className="mt-[30px]">
        {/* Table Headers */}
        <div className="grid grid-cols-3 text-left items-center font-[700] text-[20px] mb-[15px] px-[10px] sm:px-[0px]">
          <p className="text-[18px]">Product</p>
          <p className="text-[18px]">Price</p>
          <p className="text-[18px]">Action</p>
        </div>
  
        <div className="border-b border-[#EBEBEB] my-[30px]"></div>
  
        {/* Table Rows */}
        {wishlistItems.map((item) => (
          <div
            key={item.product_id}
            className="grid grid-cols-3 text-left items-center gap-x-4 px-[10px] sm:px-[0px] mb-[20px] border-b border-[#EBEBEB] py-[10px]"
          >
            {/* Product Column */}
            <div className="flex items-center space-x-[15px]">
              <MdOutlineClose
                className="text-[16px] cursor-pointer"
                onClick={() => handleRemoveItem(item.product_id)}
              />
              {/* Product Image */}
              <img
                src={item.product_image.split("localhost:3000")[1]}  // Strip the "localhost:3000" part from the URL
                alt={item.product_name}
                className="w-[50px] h-[50px] object-cover" // Reduced image size
              />
              <p className="font-[700] text-[16px]">{item.product_name}</p> {/* Display product name */}
            </div>
  
            {/* Price Column */}
            <p className="font-[700] text-[16px] text-left">₹{item.total_price}</p> {/* Display total price for each item */}
  
            {/* Action Column (Add to Cart Button) */}
            <div className="flex items-center justify-center sm:justify-start">
              <button
                onClick={() => handleAddToCart(item.product_id)}
                className="bg-[#d3b4fc] text-[#000] px-[15px] py-[5px] font-[700] rounded-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
  
        {/* Empty Wishlist */}
        {wishlistItems.length === 0 && (
          <p className="text-center text-[18px] text-[#888888]">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
  
};

export default Wishlist;
