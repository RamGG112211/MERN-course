import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar2() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  const menuItems = [
    {
      path: "/",
      itemName: "Home",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/doctors",
      itemName: "Doctors",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/hospitals",
      itemName: "Hospitals",
      clickFn: () => {
        closeMobileMenu();
      },
    },
    {
      path: "/contact",
      itemName: "Contact",
      clickFn: () => {
        closeMobileMenu();
      },
    },
  ];
  return (
    <div>
      <img src="kl" alt="doctor hub" width={300} height={300} />

      <ul>
        {Array.isArray(menuItems) &&
          menuItems.length > 0 &&
          menuItems.map((menuItem, index) => {
            const { path, itemName, clickFn } = menuItem;

            return (
              <li key={index} onClick={clickFn}>
                <Link to={path}>{itemName}</Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
