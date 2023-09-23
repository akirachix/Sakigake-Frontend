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
    <section className="lg:flex lg:h-screen overflow-hidden">
      <div className="lg:w-1/2 bg-contain bg-center h-full" style={{ backgroundImage: 'url("/media/Background.png")' }}>
        <img className="lg:ml-10 lg:pt-10 " src="/media/mzaziconnect.svg" alt="mzaziconnect logo" />
      </div>
      <div className="lg:w-1/2  pt-40 text-center">
        <h1 className="text-textblue font-baloo font-bold text-4xl mb-4 lg:mb-6">Welcome, Log into your account</h1>
        <div className="lg:px-20 lg:py-10">
          <p className="text-lightgrey font-semibold text-base pb-4 lg:pb-6">It is our great pleasure to have you on board!</p>
          <form className="py-5 lg:py-10 text-sm" onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                className="lg:px-4 lg:py-4 border border-gray-300 rounded text-sm text-black w-248 h-42 mb-2 placeholder-gray-600 font-medium"
                type="text"
                name="schoolName"
                placeholder="School Name"
                value={formData.schoolName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="lg:px-4 lg:py-4 border border-gray-300 rounded text-sm text-black w-248 h-42 mb-2 placeholder-gray-600 font-medium"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              className="bg-blue-500 text-white text-sm font-bold px-24 py-4 w-248 h-42 mb-4 lg:mb-10 rounded"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p className="text-mildgrey text-xs">Already have an account? <b className="text-blue-500">Sign up</b></p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
