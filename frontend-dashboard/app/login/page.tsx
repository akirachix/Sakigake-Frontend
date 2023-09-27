'use client'
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  schoolName: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    schoolName: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isRequired = (value: string): boolean => {
    return value.trim() !== "";
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    if (!isRequired(formData.schoolName) || !isRequired(formData.password)) {
      setError("All fields are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful");
      } else {
        const data = await response.json();
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
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
                  id="schoolName"
                  placeholder="School Name"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  className="px-4 py-4 border border-gray-300 rounded text-sm text-black mb-2 placeholder-gray-600 font-medium"
                  required
                />
              </div>
              <div className="mb-6">
              <input
                className="px-4 py-4 border border-gray-300 rounded text-sm text-black mb-2 placeholder-gray-600 font-medium"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
              
            <button
              className="bg-blue-500 text-white text-sm font-bold px-28 py-4 mb-4 mb-10 rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            </form>
            <p className="text-gray-600 text-sm pt-8">Already have an account? <b className="text-blue-500">Sign up</b></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
