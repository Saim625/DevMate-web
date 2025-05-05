import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (callback = null) => {
    setIsOpen(false);
    setTimeout(() => {
    if (callback) {
      callback();
    }
  }, 10);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout Error: " + err.message);
      alert("An error occurred during logout. Please try again.");
    }
  };
  
  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link
          to={user ? "/" : "/landing-intro"}
          className="btn btn-ghost text-2xl bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
        >
          DevMate
        </Link>
      </div>

      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end" ref={dropdownRef}>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar cursor-pointer"
              onClick={toggleDropdown}
            >
              <div className="w-10 rounded-full">
                <img 
                  alt="User avatar" 
                  src={user.imageURL || "https://via.placeholder.com/150"} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow absolute right-0">
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                    onClick={() => handleItemClick()}
                  >
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" onClick={() => handleItemClick()}>
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" onClick={() => handleItemClick()}>
                    Requests
                  </Link>
                </li>
                <li>
                  <Link to="/subscriptions" onClick={() => handleItemClick()}>
                    Subscription
                  </Link>
                </li>
                <li>
                <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-base-200 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;