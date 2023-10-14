import { useState } from "react";
import { postParent } from "../utilities/utils";

const usePostParent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addParent = async (parentData: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await postParent(parentData);
      console.log(response);
      
      if (response && response.error) {
        setError(response.error); 
    
        
        return null;
      }
      
      return response.data; 
    } catch (error: any) {
      
      setError(error.message || "Failed to add parent");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addParent,
    error,
    isLoading,
  };
};

export default usePostParent;
