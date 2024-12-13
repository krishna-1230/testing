"use client"; // Ensure this file is a client component
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

export default function ProductDetails({ params }) {
  if (!params || !params.id) {
    throw new Error("Params or ID is undefined");
  }

  const { id } = params; // Extract dynamic segment `id`
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/products/${id}`) // Fetch product details dynamically
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Product not found.
      </div>
    );
  }

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Product Image */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image
            src={product.product_image}
            alt={product.product_name}
            width={800}
            height={800}
            className="rounded-md object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 space-y-4">
          <p className="text-gray-500 uppercase tracking-wider text-xs">Home / Shop</p>
          <h1 className="text-3xl font-bold text-gray-800">{product.product_name}</h1>
          <div className="flex items-center space-x-2">
            <p className="text-lg text-gray-400 line-through">₹{product.original_price}</p>
            <p className="text-2xl font-semibold text-blue-600">₹{product.final_price}</p>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>

          {/* Add to Cart Button */}
          <button className="w-full py-3 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}
