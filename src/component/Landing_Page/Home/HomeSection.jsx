'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HomeSection() {
    const [productList, setProductList] = useState([]);
    const [weeklyPicks, setWeeklyPicks] = useState([]);
    const [topSellers, setTopSellers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            console.log("No token found in localStorage");
            return;
        }
    
        // Fetch the products from the API
        axios.get("http://127.0.0.1:3000/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const products = response.data;
    
                // Categorize products into sections
                setProductList(products.slice(0, 4)); // First 4 products for "New Arrivals"
                setWeeklyPicks(products.slice(4, 8));  // Next 4 for "Weekly Picks"
                setTopSellers(products.slice(8, 12)); // Next 4 for "Top Sellers"
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);
    

    const imageStyles = "h-[400px] object-cover rounded-md"; // Tailwind classes for consistent image styling

    return (
        <>
            {/* Hero Section */}
            <div className="bg-[url('/hero/img_1.svg')] w-full bg-no-repeat bg-cover align-middle h-[90vh]">
                <div className="h-[65vh] flex flex-col justify-end w-[95%] items-end">
                    <div className="px-[20px] text-center">
                        <p className="text-[#ffff] text-[50px] text-center font-[700]">
                            STYLIST PICKS BEAT
                        </p>
                        <p className="text-[#ffff] text-[50px] font-[700] mt-[-30px] mb-[50px] text-center">
                            THE HEAT
                        </p>
                        <Link
                            className="text-[#ffff] text-[25px] font-[700] text-center py-[10px] px-[20px] border-2 border-[#ffff]"
                            href={"/products"}
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>

            {/* Discover New Arrivals Section */}
            <div className="flex flex-col justify-center text-center py-[40px]">
                <p className="text-[40px] font-[700]">Discover NEW Arrivals</p>
                <p className="text-[25px] text-[#d3d3d3]">Recently added Products!</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] px-[5%]">
                {productList.map((product) => (
                    <Link key={product.product_id} href={`/products/${product.product_id}`}>
                        <div className="flex flex-col items-center">
                            <img
                                src={product.product_image.replace(/\.svg$/, ".jpeg")}
                                alt={product.product_name}
                                className={imageStyles}
                            />
                            <div className="flex flex-col mt-[10px] justify-center text-center">
                                <p className="font-[700]">{product.product_name}</p>
                                <p className="text-[#024E82]">
                                    {"₹" + product.final_price.toString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Weekly Picks Section */}
            <div className="flex flex-col justify-center text-center py-[40px]">
                <p className="text-[40px] font-[700]">Weekly Picks</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] px-[5%]">
                {weeklyPicks.map((pick) => (
                    <Link key={pick.product_id} href={`/products/${pick.product_id}`}>
                        <div className="flex flex-col items-center">
                            <img
                                src={pick.product_image.replace(/\.svg$/, ".jpeg")}
                                alt={pick.product_name}
                                className={imageStyles}
                            />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Top Sellers Section */}
            <div className="flex flex-col justify-center text-center py-[40px]">
                <p className="text-[40px] font-[700]">Top Sellers</p>
                <p className="text-[25px] text-[#d3d3d3]">
                    Browse our top-selling products
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] px-[5%]">
                {topSellers.map((seller) => (
                    <Link key={seller.product_id} href={`/products/${seller.product_id}`}>
                        <div className="flex flex-col items-center">
                            <img
                                src={seller.product_image.replace(/\.svg$/, ".jpeg")}
                                alt={seller.product_name}
                                className={imageStyles}
                            />
                            <div className="flex flex-col mt-[10px] justify-center text-center">
                                <p className="font-[700]">{seller.product_name}</p>
                                <p className="text-[#024E82]">
                                    {"₹" + seller.final_price.toString()}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Bottom Button */}
            <div className="flex justify-center my-[50px] text-center">
                <Link
                    href={"/products"}
                    className="text-[18px] bg-[#111113] font-[700] py-[15px] px-[25px] rounded-[7px] cursor-pointer text-[#C8BCF6]"
                >
                    SHOP NOW
                </Link>
            </div>
        </>
    );
}
