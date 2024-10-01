/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions";
// import { Menu, Transition } from "@headlessui/react";
// import { BiChevronDown } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { AiOutlineLogout } from "react-icons/ai";

// function MenuList({ user, onClick }) {
//   const dispatch = useDispatch();
//   const socket = useSocket();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     dispatch(Logout());
//     navigate("/");
//     toastSuccess("Logged out successfully!");

//     if (user?.accountType == "seeker") {
//       socket.emit("logout", { userId: user?._id });
//     } else {
//       socket.emit("logout", { companyId: user?._id });
//     }
//   };

//   return (
//     <div>
//       <Menu as="div" className="inline-block text-left">
//         <div className="flex">
//           <Menu.Button className="inline-flex items-center gap-1 w-full rounded-md bg-white md:px-3 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 ">
//             <img
//               src={user?.profileUrl}
//               alt="user profile"
//               className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-primary border-[3px] object-cover "
//             />
//             <div className="leading[80px] flex flex-col items-start capitalize ml-1">
//               <p className="text-sm font-semibold ">
//                 {user?.firstName ?? user?.name}
//               </p>
//             </div>

//             <BiChevronDown
//               className="h-8 w-8 text-slate-600"
//               aria-hidden="true"
//             />
//           </Menu.Button>
//         </div>

//         <Transition
//           as={Fragment}
//           enter="transition ease-out duration-100"
//           enterFrom="transform opacity-0 scale-95"
//           enterTo="transform opacity-100 scale-100"
//           leave="transition ease-in duration-75"
//           leaveFrom="transform opacity-100 scale-100"
//           leaveTo="transform opacity-0 scale-95"
//         >
//           <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none ">
//             <div className="p-1 ">
//               <Menu.Item>
//                 {({ active }) => (
//                   <Link
//                     to={`${
//                       user?.accountType ? "user-profile" : "company-profile"
//                     }`}
//                     className={`${
//                       active ? "bg-primary text-white" : "text-gray-900"
//                     } group flex w-full items-center rounded-md p-2 text-sm`}
//                     onClick={onClick}
//                   >
//                     <CgProfile
//                       className={`${
//                         active ? "text-white" : "text-gray-600"
//                       } mr-2 h-5 w-5  `}
//                       aria-hidden="true"
//                     />
//                     {user?.accountType ? "User Profile" : "Company Profile"}
//                   </Link>
//                 )}
//               </Menu.Item>

//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => handleLogout()}
//                     className={`${
//                       active ? "bg-primary text-white" : "text-gray-900"
//                     } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
//                   >
//                     <AiOutlineLogout
//                       className={`${
//                         active ? "text-white" : "text-gray-600"
//                       } mr-2 h-5 w-5  `}
//                       aria-hidden="true"
//                     />
//                     Sign Out
//                   </button>
//                 )}
//               </Menu.Item>
//             </div>
//           </Menu.Items>
//         </Transition>
//       </Menu>
//     </div>
//   );
// }

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  const { user } = useSelector((state) => state.user);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDropdownToggler = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      const windowWidth = window.innerWidth;
      setWidth(windowWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        const windowWidth = window.innerWidth;
        setWidth(windowWidth);
      });
    };
  }, []);

  const handleMobileMenu = () => {
    if (width > 768) setIsMenuOpen(false);
  };

  useEffect(() => {
    handleMobileMenu();
  }, [width]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    // toastSuccess("Logged out successfully!");
  };

  const navItems = [
    {
      path: "/doctors",
      title: "Doctors",
      hasDropdown: false,
    },
    { path: "/hospitals", title: "hospitals" },
    { path: "/health-packages", title: "Health packages" },
    { path: "/contact-us", title: "Contact Us" },
  ];

  return (
    <header className="padding mx-auto bg-white sticky top-0 z-20 drop-shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
      <nav className="flex justify-between items-center shrink-0 py-4">
        <a href="/">
          <img className="w-[160px]" src="/Logo.png" alt="Logo" />
        </a>
        {/* nav items for a large devices */}
        <ul className="hidden lg:flex gap-5 xl:gap-7 justify-between  pl-3">
          {navItems.map(({ path, title, hasDropdown }) => (
            <li
              key={path}
              className={`text-tertiary relative ${hasDropdown ? "group" : ""}`}
              onMouseEnter={hasDropdown ? handleDropdownToggler : undefined}
              onMouseLeave={hasDropdown ? closeDropdown : undefined}
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span
                  className=" px-3
                 py-2"
                >
                  {title}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        {/* sign Up and Login Button */}
        <div className="text-base text-primary font-medium space-x-2 hidden lg:block">
          <Link to="/login" className="py-2 px-5 border rounded-md">
            Log In
          </Link>
          <Link
            to="/sign-up"
            className="py-2 px-5 rounded-md bg-primary text-white"
          >
            Register
          </Link>
        </div>
        {/* 
        <div className="hidden md:block">
          {!user?.token ? (
            <Link to="/user-auth">
              <CustomButton
                title="Sign In"
                containerStyles="text-primary py-1.5 px-5 focus:outline-none hover:bg-primary hover:text-white rounded-lg text-base border border-primary"
              />
            </Link>
          ) : (
            <div>
              <MenuList user={user} closeDropdown={closeDropdown} />
            </div>
          )}
        </div> */}

        {/* mobile menu hamburger */}
        <div className="lg:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>
      {/* nav items for mobile */}
      <div
        className={`px-4 bg-tertiary py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        } `}
      >
        {isMenuOpen && (
          <ul>
            {navItems.map(({ path, title, hasDropdown }) => (
              <li
                key={path}
                className={`text-base text-white first:text-white py-1 ${
                  hasDropdown ? "group" : ""
                }`}
                onMouseEnter={hasDropdown ? handleDropdownToggler : undefined}
                onMouseLeave={hasDropdown ? closeDropdown : undefined}
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                  onClick={closeMobileMenu}
                >
                  {title}
                </NavLink>
              </li>
            ))}
            {/* <li className='text-white py-1 '>
              <Link to='/user- auth'>Signin</Link>
            </li> */}

            <li className="text-white py-1 cursor-pointer ">
              {user?.token && (
                <Link
                  to={`${
                    user?.accountType ? "user-profile" : "company-profile"
                  }`}
                  className=" flex items-center"
                  onClick={closeMobileMenu}
                >
                  {user?.accountType ? "User Profile" : "Company Profile"}
                </Link>
              )}
            </li>

            <li className="text-white py-1 cursor-pointer ">
              {!user?.token ? (
                <Link to="/user-auth" onClick={closeMobileMenu}>
                  Sign in
                </Link>
              ) : (
                <span
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                >
                  Sign out
                </span>
              )}
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default Navbar;
