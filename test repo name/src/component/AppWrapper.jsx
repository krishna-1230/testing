"use client"; // Ensures this component is treated as a client-side component

import React from "react";
import { usePathname } from "next/navigation"; // To get the current pathname
import dynamic from "next/dynamic"; // Dynamic import to disable SSR for Navigation

// Dynamically import the Navigation component with ssr: false
const Navigation = dynamic(() => import("./Landing_Page/Navbar/Navigation"), {
  ssr: false, // Disable server-side rendering for the Navigation component
});

import Footer from "./Landing_Page/Footer/Footer"; // Import Footer directly

export function AppWrapper({ children }) {
  const pathname = usePathname(); // Get the current path

  return (
    <section>
      {pathname === "/" 
        || pathname === "/about" 
        || pathname === "/" 
        || pathname === "/contact" 
        || pathname === "/join" 
        || pathname === "/homeimage" 
        || pathname === "/Shoppingbag" 
        || pathname === "/checkout" 
        || pathname === "/payment" 
        || pathname === "/account" 
        || pathname === "/wishlist" 
        || pathname === "/yourorder" 
        || pathname === "/login"
        || pathname === "/signup" 
        || pathname === "/shipadd" 
        || pathname === "/products"
        || pathname === "/checkoutpage"
        || pathname.startsWith("/products/")
        || pathname.startsWith("/merchant/")
        || pathname === "/paysuccess" 
        ? ( <Navigation />) 
        : ("")
      }

      <main>
        <div>{children}</div> {/* Render children (the content of the page) */}
      </main>

      {pathname === "/" 
        || pathname === "/about" 
        || pathname === "/" 
        || pathname === "/contact" 
        || pathname === "/join" 
        || pathname === "/homeimage" 
        || pathname === "/Shoppingbag" 
        || pathname === "/wishlist"  
        || pathname === "/products"
        || pathname.startsWith("/products/")
        || pathname.startsWith("/merchant/")
        || pathname === "/yourorder" 
        ? ( <> <Footer /> </> ) 
        : ("")
      }
    </section>
  );
}
