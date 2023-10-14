'use client'
import { useState } from "react";

interface FormData {
  school_name: string;
  email_address: string;
  phonenumber: string;
  create_password: string;
  confirm_password: string;
}

interface ServerError {
  email_address?: string[];
  phonenumber?: string[];
}

const useCreateUsers = () => {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<ServerError | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleRegister = async (formData: FormData) => {
    try {
      const createdUser = await registerUser(formData);
      setUser(createdUser);
      setError(null);
      setMessage('Registration successful.');
    } catch (error: any) {
      setUser(null);
      const typedError = error.response?.data || {};
      setError(typedError);
    }
  };

  return { handleRegister, error, message };
};

export default useCreateUsers;

function registerUser(formData: FormData) {
  throw new Error("Function not implemented.");
}
