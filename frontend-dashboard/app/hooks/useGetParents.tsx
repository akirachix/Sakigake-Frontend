import { useState, useEffect } from "react";
import { getParent } from "../utilities/utils";

interface Parent {
  id: number;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
}

const useGetParents = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getParent();
        setParents(data);
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch parents data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); 

  return {
    parents,
    error,
    isLoading,
  };
};

export default useGetParents;