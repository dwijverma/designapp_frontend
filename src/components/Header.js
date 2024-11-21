import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";

const Header = () => {
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  console.log(user);

  const handleLogin = () => {
    window.location.href = "https://api.designershangout.com/auth/google";
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white shadow">
      <nav className="flex items-center justify-between p-3 lg:px-8">
        <div className="flex lg:flex-1">
          <h1 className="text-3xl font-bold text-gray-900">
            DesignersHangout
          </h1>
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
          {user ? (
            <div
              onClick={handleProfile}
              className="cursor-pointer flex items-center space-x-2"
            >
              <span className="text-sm font-semibold text-gray-900">
                {user.name}
              </span>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login with Google
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
