
'use client'
import React, { useState } from "react";

import { TbEye, TbEyeOff } from "react-icons/tb";
import useCreateUsers from "../hooks/useCreateUser";
import Link from "next/link";


const SignupPage = () => {
  const { handleRegister, error} = useCreateUsers();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    school_name: "",
    email_address: "",
    phonenumber: "",
    create_password: "",
    confirm_password: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "confirm_password") {
      if (formData.create_password !== value) {
        setPasswordMatchError(true);
      } else {
        setPasswordMatchError(false);
      }
    }
  };

  const togglePasswordVisibility = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirm_password") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.create_password !== formData.confirm_password) {
      setPasswordMatchError(true);
      return;
    }
    await handleRegister(formData);
  };

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">

          <div className="bg-pattern bg-no-repeat bg-cover">
            <div className="float-left pt-8 pl-8">
              <img src="/media/mzaziconnect.svg" alt="Logo" />
            </div>
            <div className="text-center w-10/12 ml-12 pb-[3.5em]">
              <img src="/media/people.png" alt="Image" />
            </div>
          </div>

          <div className="sidebar-div p-5 pt-24 text-center mt-20">
            <h1 className="text-mainblue font-baloo font-bold text-4xl mb-9">
              New here? Create your school account
            </h1>
            <p className="text-gray-700 text-sm pb-6">
              It is our great pleasure to have you on board!
            </p>
    
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-4 flex justify-center">
              <input
                type="text"
                name="school_name"
                placeholder="School Name"
                value={formData.school_name}
                onChange={handleInputChange}
                className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
              />
              </div>

              <div className="mb-4 flex justify-center">
              <input
                type="email"
                name="email_address"
                placeholder="E-mail"
                value={formData.email_address}
                onChange={handleInputChange}
                className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
              />
              </div>

              <div className=" flex justify-center">
              <input
                type="tel"
                name="phonenumber"
                placeholder="Phone Number"
                value={formData.phonenumber}
                onChange={handleInputChange}
                className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
              />
              </div>

              <div className="mb-4 flex justify-center">

              </div>

              <div className="mb-4 flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="create_password"
                  placeholder="Password"
                  value={formData.create_password}
                  onChange={handleInputChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                />

                <span
                  onClick={() => togglePasswordVisibility("password")}
                  className="password-icon text-gray-500 absolute ml-80 text-xl mt-3">
                  {showPassword ? <TbEye /> : <TbEyeOff />}
                </span>
              </div>


              
              <div className="mb-4 flex justify-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm Password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  className={`w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey ${
                    passwordMatchError
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-primary text-gray-600 pr-12 `}
                />

                  <span
                  onClick={() => togglePasswordVisibility("password")}
                  className="password-icon text-gray-500 absolute ml-80 text-xl mt-3">
                  {showPassword ? <TbEye /> : <TbEyeOff />}
                </span>

              </div>
              {passwordMatchError && (
                <div className="text-red-500 mb-10">
                  Passwords do not match.
                </div>
              )}
              {error && (
                <>
                {error.email_address && error.email_address.length > 0 && (
                   <div className="text-red-500 ml-16 mt-2">
                     {error.email_address[0]}
                   </div>
              )}

                {error.phonenumber && error.phonenumber.length > 0 && (
                   <div className="text-red-500 ml-16 mt-2">
                     {error.phonenumber[0]}
                   </div>
              )}
               </>
               )}
          <button type="submit"
                  className="w-5/12 bg-mainblue hover:bg-opacity-75 text-white font-bold py-3 px-3 rounded mt-6"
                  onClick={handleSubmit} >Create Account
          </button>
      </form>
            <p className="g-mainblue text-sm pt-10">
              Already have an account?{" "}
              <a href="/login" className="text-mainblue font-bold">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
