'use client'
import React, { useState } from "react";
import usePostLogin from "../hooks/usePostLogin";
import Link from 'next/link';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    school_name: "",
    password: "",
  });
  const { login, error, isLoading } = usePostLogin(); 
  

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    login(formData); 
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-pattern bg-no-repeat bg-cover">
          <div className="float-left pt-8 pl-8">
            <img src="/media/mzaziconnect.svg" alt="Logo" />
          </div>
          <div className="text-center w-10/12 ml-12 h-screen">
            <img src="/media/login.png" alt="Image" />
          </div>
        </div>
        <div className="sidebar-div p-5 pt-48 text-center">
          <h1 className="text-mainblue font-baloo font-bold text-4xl mb-9">
            Welcome, Log into your account
          </h1>
          <p className="text-gray-700 text-sm pb-6">
            It is our great pleasure to have you on board!
          </p>
          <form onSubmit={handleSubmit} className="mt-5">
            <div className="mb-4 flex justify-center">
              <input
                type="text"
                placeholder="School Name"
                name="school_name"
                value={formData.school_name}
                onChange={handleInputChange}
                className="px-4 py-4 border border-gray-300 rounded text-sm text-black mb-2 placeholder-gray-600 font-medium" 
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="px-4 py-4 border border-gray-300 rounded text-sm text-black mb-2 placeholder-gray-600 font-medium" 
                required
              />
            </div>

            <Link href="/dashboard">
            <button
              className="bg-blue-500 text-white text-sm font-bold px-28 py-4 mb-4 mb-10 rounded" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            </Link>
          </form>
          {error && <p className="error-message">{error}</p>}
          <Link href="/signup">
          <p className="text-gray-600 text-sm pt-8">
            Already have an account? <b className="text-blue-500">Sign up</b>
          </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;