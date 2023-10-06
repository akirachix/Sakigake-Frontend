'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { createUser } from "../utilities/utils";
interface FormData {
  schoolName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    schoolName?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      confirmPassword: value,
    });
    if (value !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: undefined,
      }));
    }
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = {} as {
      schoolName?: string;
      phoneNumber?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    };
    if (formData.password.trim() === "") {
      newErrors.password = "Password is required.";
    }
    if (formData.confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = { status: 201 };
        if (response) {
          const response = createUser({
            school_name: formData.schoolName,
            phonenumber: formData.phoneNumber,
            email_address: formData.email,
            create_password: formData.password,
            confirm_password: formData.confirmPassword,
          });
          // Show a pop-up for successful registration
          setShowSuccessMessage(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
          }, 3000);
          window.location.href = "/login";
        } else {
          console.error('Response:', response);
        }
      } catch (error) {
        console.error('Error during user registration:', error);
      }
    }
  };
  const handleTogglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-pattern bg-no-repeat bg-cover">
            <div className="float-left pt-8 pl-8">
              <img src="/media/mzaziconnect.svg" alt="Logo" />
            </div>
            <div className="text-center w-10/12 ml-12 pb-[6.5em]">
              <img src="/media/people.png" alt="Image" />
            </div>
          </div>
          <div className="sidebar-div p-5 pt-24 text-center">
            <h1 className="text-mainblue font-baloo font-bold text-4xl mb-9">
              New here? Create your school account
            </h1>
            <p className="text-gray-700 text-sm pb-6">
              It is our great pleasure to have you on board!
            </p>
            <form onSubmit={handleSubmit} className="mt-5">
              <div className="mb-4 flex justify-center">
                <input
                  type="text"
                  id="schoolName"
                  placeholder="School Name"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                  required
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                  required
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                  required
                />
              </div>
              <div className="mb-4 flex justify-center">
                <input
                  type={showPassword1 ? "text" : "password"}
                  id="password"
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                  required
                />
                <span
                  onClick={handleTogglePasswordVisibility1}
                  className="password-icon text-gray-500 absolute ml-64 text-xl mt-3"
                >
                  {showPassword1 ? <TbEye /> : <TbEyeOff />}
                </span>
              </div>
              <div className="mb-4 flex justify-center">
                <input
                  type={showPassword2 ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="w-5/12 py-3 px-3 border border-gray-300 rounded text-sm text-maingrey"
                  required
                />
                <span
                  onClick={handleTogglePasswordVisibility2}
                  className="password-icon text-gray-500 absolute ml-64 text-xl mt-3"
                >
                  {showPassword2 ? <TbEye /> : <TbEyeOff />}
                </span>
              </div>
              {errors.schoolName && (
                <p className="text-red-500 text-xs">{errors.schoolName}</p>
              )}
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs">{errors.phoneNumber}</p>
              )}
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
              <button type="submit"
                  className="w-5/12 bg-mainblue hover:bg-opacity-75 text-white font-bold py-3 px-3 rounded mt-6"
                  onClick={handleSubmit} >Create Account</button>
            </form>
          {showSuccessMessage && (
           <div className="success-modal fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
           <div className="bg-white p-5 rounded shadow-lg">
           <div className="flex justify-center mb-3">
               <img src="media/tick.png" alt="tick" className="w-8" />
           </div>
             <div className="text-green-700 font-bold mb-2">
               Successfully registered!
             </div>
           </div>
         </div>
        )}
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
export default Signup;