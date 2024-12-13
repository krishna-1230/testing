"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function ProductListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Categories list
  const categoriesList = [
    "Tops", "Bottoms", "Formal", "Casual", "Jackets", "Dresses",
    "Sportswear", "Footwear", "Accessories", "Outerwear"
  ];

  // Initialize filters from URL parameters
  const [filters, setFilters] = useState({
    category: searchParams.get("category") ? searchParams.get("category").split(",") : [],
    minPrice: parseInt(searchParams.get("minPrice") || 0),
    maxPrice: parseInt(searchParams.get("maxPrice") || 10000),
    rating: parseInt(searchParams.get("rating") || 0),
    size: searchParams.get("size") || "",
    color: searchParams.get("color") || "",
    gender: searchParams.get("gender") || "",
  });

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filters.category.length > 0) queryParams.set("category", filters.category.join(","));
    if (filters.minPrice > 0) queryParams.set("minPrice", filters.minPrice);
    if (filters.maxPrice < 10000) queryParams.set("maxPrice", filters.maxPrice);
    if (filters.rating > 0) queryParams.set("rating", filters.rating);
    if (filters.size) queryParams.set("size", filters.size);
    if (filters.color) queryParams.set("color", filters.color);
    if (filters.gender) queryParams.set("gender", filters.gender);

    router.replace(`/products?${queryParams.toString()}`, { scroll: false });
  }, [filters, router]);

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the JWT token from localStorage

        const queryParams = new URLSearchParams({
          ...(filters.category.length > 0 && { category: filters.category.join(",") }),
          minPrice: filters.minPrice.toString(),
          maxPrice: filters.maxPrice.toString(),
          ...(filters.rating > 0 && { rating: filters.rating.toString() }),
          ...(filters.size && { size: filters.size }),
          ...(filters.color && { color: filters.color }),
          ...(filters.gender && { gender: filters.gender }),
        }).toString();

        const response = await axios.get(`http://127.0.0.1:3000/products?${queryParams}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });

        const transformedProducts = response.data.map((product) => ({
          ...product,
          product_image: `/CoverImages/${product.product_image.split("/").pop()}`,
        }));

        setProducts(transformedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const toggleSidebar = () => {
    setSidebarVisible((prevState) => !prevState);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedCategories = checked
        ? [...filters.category, value]
        : filters.category.filter((category) => category !== value);

      setFilters((prevFilters) => ({ ...prevFilters, category: updatedCategories }));
    } else if (type === "number") {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: parseInt(value) || 0 }));
    } else {
      setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    }
  };

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
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading products...
      </div>
    );
  }

  return (
    <div className="flex">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-5 left-5 z-50 bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition-all"
      >
        Filters
      </button>

      <aside
        className={`lg:block lg:w-1/5 bg-white border-r border-gray-200 min-h-screen p-6 transition-all duration-300 ease-in-out ${
          sidebarVisible ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h3>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <div className="space-y-2 mt-2">
            {categoriesList.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  name="category"
                  value={category}
                  onChange={handleFilterChange}
                  checked={filters.category.includes(category)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label className="ml-2 text-sm text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex gap-4">
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="Min"
              className="w-full p-3 mt-2 border rounded-md"
            />
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="Max"
              className="w-full p-3 mt-2 border rounded-md"
            />
          </div>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full p-3 mt-2 border rounded-md"
          >
            <option value={0}>All Ratings</option>
            <option value={1}>1 Star & Above</option>
            <option value={2}>2 Stars & Above</option>
            <option value={3}>3 Stars & Above</option>
            <option value={4}>4 Stars & Above</option>
            <option value={5}>5 Stars</option>
          </select>
        </div>

        {/* Other Filters */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select
            name="size"
            value={filters.size}
            onChange={handleFilterChange}
            className="w-full p-3 mt-2 border rounded-md"
          >
            <option value="">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>


        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full p-3 mt-2 border rounded-md"
          >
            <option value="">All Genders</option>
            <option value="Male">Men</option>
            <option value="Female">Women</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <input
            type="text"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            placeholder="Color"
            
            className="w-full p-3 mt-2 border rounded-md"
          />
        </div>
      </aside>

      <main className="lg:col-span-4 p-6 ml-0 lg:ml-1/5 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.product_id}
              className="flex-shrink-0 w-full h-[400px] border rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-200"
            >
              <Link href={`/products/${product.product_id}`}>
                <img
                  src={product.product_image}
                  alt={product.product_name}
                  className="w-full h-48 object-contain rounded-md mb-4"
                />
              </Link>
              <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
              <p className="text-sm text-gray-600">{product.short_description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-lg font-bold">₹ {product.final_price}</span>
                <span className="text-yellow-500">⭐⭐⭐⭐☆</span>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  className="w-1/2 bg-blue-600 text-white py-2 rounded-md"
                  onClick={() => addToCart(product.product_id)}
                >
                  Add To Cart
                </button>
                <button
                  className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-md"
                  onClick={() => addToWishlist(product.product_id)}
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
