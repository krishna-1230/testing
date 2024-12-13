"use client"; // Ensure this file is a client component
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductDetails({ params }) {
  if (!params || !params.id) {
    throw new Error("Params or ID is undefined");
  }

  const { id } = params; // Extract dynamic segment `id`
  const [product, setProduct] = useState(null); // State to hold product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeTab, setActiveTab] = useState("description"); // State to switch tabs

  // Retrieve authToken from localStorage
  

  useEffect(() => {
    // Fetch product details from the API
    axios
      .get(`http://127.0.0.1:3000/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product details");
        setLoading(false);
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  // Hardcoded elements for missing API data
  const hardcoded = {
    reviews: [
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Great product! Highly recommended.",
      },
      {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Good quality but slightly overpriced.",
      },
    ],
    averageRating: 4.5,
    categories: "Women, Polo, Casual",
    tags: "Modern, Design, Cotton",
    discountPercentage: "-24%",
    originalPrice: product.merchant_price + product.margin + product.tax,
  };

  // Add to Cart Functionality
  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage

      const response = await axios.post(
        "http://127.0.0.1:3000/cart/add",
        {
          product_id: productId,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
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

  const addToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage

      const response = await axios.post(
        "http://127.0.0.1:3000/wishlist/add",
        { product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.data.success) {
        alert("Product added to wishlist!");
      } else {
        alert("Failed to add product to wishlist.");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white">
      {/* Main Section */}
      <div className="px-8 py-10 max-w-6xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Product Image */}
          <div className="md:w-1/2 mb-6 md:mb-0 relative">
            <img
              src={product.product_image}
              alt={product.product_name}
              className="rounded-md object-cover w-full h-[600px] object-center" // Fixed height with object-fit
            />
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              {hardcoded.discountPercentage}
            </span>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.product_name}
            </h1>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-yellow-500">
                {"★".repeat(Math.floor(hardcoded.averageRating)) +
                  "☆".repeat(5 - Math.floor(hardcoded.averageRating))}
              </p>
              <span className="text-sm text-gray-500">
                ({hardcoded.reviews.length} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-lg text-gray-400 line-through">
                ₹{hardcoded.originalPrice}
              </p>
              <p className="text-2xl font-semibold text-blue-600">
                ₹{product.finalprice}
              </p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2">
              <label htmlFor="size" className="block text-sm text-gray-700">
                Select Size:
              </label>
              <select
                id="size"
                className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-purple-500 transition"
              >
                <option value={product.size}>{product.size}</option>
              </select>
            </div>

            <div className="flex space-x-4">
              {/* Add to Cart */}
              <button
                onClick={() => addToCart(product.product_id)} // Pass productId to addToCart
                className="w-36 py-3 text-black bg-[#c8bcf6] rounded-lg hover:bg-[#b3a4e6] transition duration-300"
              >
                ADD TO CART
              </button>
              {/* Add to Wishlist */}
              <button
                onClick={() => addToWishlist(product.product_id)} // Pass productId to addToWishlist
                className="w-36 py-3 text-gray-600 bg-[#d9d9d9] border border-gray-300 rounded-lg hover:bg-[#bfbfbf] transition duration-300"
              >
                ADD TO WISHLIST
              </button>
            </div>

            {/* Additional Information */}
            <div className="text-sm text-gray-500">
              <p>Category: {hardcoded.categories}</p>
              <p>Tags: {hardcoded.tags}</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-10">
          <div className="flex space-x-8 border-b border-gray-300">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-2 ${
                activeTab === "description"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-2 ${
                activeTab === "reviews"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              Reviews ({hardcoded.reviews.length})
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            {activeTab === "description" ? (
              <p>{product.additional_info}</p>
            ) : (
              <div className="space-y-4">
                {hardcoded.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border border-gray-300 p-4 rounded-md"
                  >
                    <div className="flex items-center space-x-2">
                      <p className="text-lg font-semibold">{review.name}</p>
                      <p className="text-sm text-yellow-500">
                        {"★".repeat(review.rating) +
                          "☆".repeat(5 - review.rating)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
