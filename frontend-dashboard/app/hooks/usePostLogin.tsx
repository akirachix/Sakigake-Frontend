import { useState } from 'react';
import { postLogin } from '../utilities/utils';

interface FormData {
  school_name: string;
  password: string;
}

const usePostLogin = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

 const login = async (formData: FormData) => {
  setError("");
  setIsLoading(true);

  try {
    const response = await postLogin(formData);

    if (response.ok) {
      const data = await response.json(); 
      console.log("Login successful:", data);
    } else {
      const errorData = await response.json(); 
      setError(errorData.message || "Login failed");
    }
  } catch (error) {
    console.error("An error occurred during login:", error);
    setError("An error occurred");
  } finally {
    setIsLoading(false);
  }
};


  return { login, error, isLoading };
};

export default usePostLogin;
