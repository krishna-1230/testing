import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { TbMenu2, TbUser } from "react-icons/tb";
import { FiShoppingBag } from "react-icons/fi";
import NavLink from "./Navlink";

export default function Navigation() {
    const router = useRouter(); // Correctly initialize useRouter here
    const [menu, setMenu] = useState(false);

    const handleProfileClick = async () => {
        try {
            const token = localStorage.getItem("authToken");
    
            if (!token) {
                console.error("No token found in localStorage.");
                router.push("/login");
                return;
            }
    
            console.log("Token retrieved from localStorage:", token);
    
            const response = await axios.get("http://127.0.0.1:3000/checkLogin", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log("CheckLogin response:", response.data);
    
            if (response.data.isLoggedIn) {
                router.push("/account");
            } else {
                router.push("/login");
            }
        } catch (error) {
            console.error("Error checking login status:", error);
            router.push("/login");
        }
    };
    
    

    return (
        <div className="px-[3%] py-[20px] bg-[#FFFFFF] shadow sticky top-0 z-50">
            <div className="w-full flex items-center justify-between">
                <div className="flex space-x-[40px]">
                    <Link href={"/"} className="flex z-[500] space-x-[5px] items-center">
                        <Image
                            width={30}
                            className="h-auto"
                            height={30}
                            src="/navbar/LOGO_OUTFIT.svg"
                            alt="logo"
                        />
                        <span className="text-[30px] font-[600]">Outfit Fashions</span>
                    </Link>
                    <ul className="flex space-x-[35px] pt-[18px] z-[500]">
                        <NavLink className="cursor-pointer font-arimo" href={"/"}>
                            HOME
                        </NavLink>
                        <NavLink className="cursor-pointer" href={"/about"}>
                            ABOUT
                        </NavLink>
                        <NavLink className="cursor-pointer" href={"/contact"}>
                            CONTACT US
                        </NavLink>
                        <NavLink className="cursor-pointer" href={"/join"}>
                            JOIN US
                        </NavLink>
                        <NavLink className="cursor-pointer" href={"/products"}>
                            SHOP NOW
                        </NavLink>
                    </ul>
                </div>
                <div className="flex space-x-[15px] z-[500]">
                    <div onClick={handleProfileClick}>
                        <TbUser className="text-[20px] cursor-pointer" />
                    </div>
                    <Link href={"/Shoppingbag"} className="relative">
                        <FiShoppingBag className="text-[20px] cursor-pointer" />
                        <p className="absolute bg-[#024E82] text-[#ffff] top-[-2px] rounded-[100%] p-[2px] right-[-2px] text-[8px]">
                            10
                        </p>
                    </Link>
                    <TbMenu2 className="text-[20px] cursor-pointer" />
                </div>
            </div>
        </div>
    );
}
