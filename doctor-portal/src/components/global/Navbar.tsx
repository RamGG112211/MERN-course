import React, { useCallback, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import {
  IoLocationOutline,
  IoCallOutline,
  IoHomeOutline,
  IoFilter,
} from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import {
  FaHamburger,
  FaCheck,
  FaCaretDown,
  FaPlus,
  FaStar,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaRegCalendarAlt,
  FaWpforms,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { RiExpandUpDownLine, RiSearchLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { TbBed } from "react-icons/tb";
import { MdOutlineBathtub, MdOutlineContactPhone } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import { GiStarsStack } from "react-icons/gi";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { CgQuote } from "react-icons/cg";
import { TbRulerMeasure } from "react-icons/tb";
import {
  IoPricetagsOutline,
  IoCloudUploadOutline,
  IoArrowRedo,
} from "react-icons/io5";
import { GrStatusUnknown } from "react-icons/gr";
import { FiType } from "react-icons/fi";
import { FaSignInAlt } from "react-icons/fa";
import { FiUserPlus } from "react-icons/fi";
import { TiUploadOutline } from "react-icons/ti";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        setWidth(windowWidth);
      });
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {
          const windowWidth = window.innerWidth;
          setWidth(windowWidth);
        });
      }
    };
  }, []);

  const handleMobileMenu = useCallback(() => {
    if (width > 768) setIsMenuOpen(false);
  }, [width]);

  useEffect(() => {
    handleMobileMenu();
  }, [handleMobileMenu]);

  const menuItems = [
    {
      path: "/",
      itemName: "Home",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    // {
    //   path: "/sale",
    //   itemName: "Sale",
    //   clickFn: () => {
    //     closeMobileMenu();
    //     console.log("Sale");
    //   },
    // },
    // {
    //   path: "/rent",
    //   itemName: "Rent",
    //   clickFn: () => {
    //     closeMobileMenu();
    //     console.log("rent");
    //   },
    // },
    {
      path: "/properties",
      itemName: "Properties",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/blogs",
      itemName: "Blogs",
      clickFn: () => {
        closeMobileMenu();
      },
    },
  ];

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-1 justify-between py-2 bg-primary text-white text-sm_paragraph">
        <span className=" flex items-center gap-1">
          <IoLocationOutline />
          <span>Pokhara-13, Nepal</span>
        </span>

        <div className="flex items-center gap-5 md:gap-7">
          <span className="flex items-center gap-1">
            <IoCallOutline />
            <span>+977 9879797097</span>
          </span>

          <span className="flex items-center gap-1">
            <AiOutlineMail />
            <span>gharjagga@gmail.com</span>
          </span>
        </div>
      </div>

      <div className=" sticky z-50 top-0 bg-white py-3 flex justify-between items-center gap-2 shadow-md">
        {/* <nav className=""> */}
        <Link to={"/"} className="flex items-center xl:w-[30%]  gap-2">
          <div className=" p-3 bg-primary w-max rounded-full">
            <img
              src="/images/logo.png"
              alt="Logo"
              width={1024}
              height={1024}
              className=" object-center object-cover w-[35px] h-[35px]"
            />
          </div>

          <span className="font-semibold lg:text-xl">GharJagga</span>
        </Link>

        <div
          className={`absolute lg:static w-full lg:w-max xl:w-[70%] top-full left-0 px-6 sm:px-8 md:px-12 lg:pb-0 lg:px-0 bg-white grid shadow-md lg:shadow-none ${
            isMenuOpen ? "grid-rows-[1fr] pb-3 md:pb-5" : "grid-rows-[0fr] pb-0"
          } transition-all duration-300 lg:block`}
        >
          <div className=" overflow-hidden lg:flex gap-2 xl:justify-between">
            <ul className=" lg:flex divide-y-[4px] divide-transparent gap-1 items-center">
              {menuItems.map((item, i) => {
                const { path, itemName, clickFn } = item;

                return (
                  <li key={i}>
                    <Link
                      to={path}
                      onClick={clickFn}
                      className={`${
                        pathname == path ? " bg-secondary/20 text-primary" : ""
                      } p-2 px-5 rounded-full block hover:bg-secondary/20 hover:text-primary transition-all duration-200`}
                    >
                      {itemName}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              className={`lg:absolute xl:static lg:w-max lg:top-full lg:right-16 lg:px-6 xl:px-0 xl:pb-0 bg-white grid shadow-md xl:shadow-none ${
                isMenuOpen
                  ? "grid-rows-[1fr] pb-3 md:pb-5"
                  : "grid-rows-[0fr] pb-0"
              } transition-all duration-300 xl:block`}
            >
              <div className=" lg:overflow-hidden">
                <div className="py-2 px-2 flex flex-col xl:flex-row gap-2 items-start lg:items-end">
                  <Link to={"/auth"} onClick={closeMobileMenu}>
                    <button className="flex items-center gap-2 whitespace-nowrap">
                      <FaRegCircleUser className="text-lg" />
                      <span>Login/Register</span>
                    </button>
                  </Link>

                  <Link to={"/sell"} onClick={closeMobileMenu}>
                    <button className="flex items-center gap-2 bg-primary whitespace-nowrap">
                      <IoHomeOutline className="text-lg" />
                      <span>Sell Property</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="p-2 hover:scale-105 transition duration-200 xl:hidden text-lg md:text-xl"
          onClick={handleMenuToggler}
        >
          {!isMenuOpen ? <FaHamburger /> : <ImCross />}
        </button>
        {/* </nav> */}
      </div>
    </>
  );
}
