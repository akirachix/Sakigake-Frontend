import { useState } from "react";
import { postParent } from "../utilities/utils";

const usePostParent = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addParent = async (parentData: any) => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await postParent(parentData);
      return data;
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
