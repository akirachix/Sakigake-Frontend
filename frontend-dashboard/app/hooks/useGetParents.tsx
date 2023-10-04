import { useEffect, useState } from "react";
import { getParent } from "../utilities/utils";

interface ApiResponse {
  id:number;
  first_name: string;
  last_name: string;
  email_address: string | null;
  phone_number: string;
  create_password: string | null;
}

interface Parent {
  id:number;
  first_name: string;
  last_name: string;
  email_address: string | null;
  phone_number: string;
  create_password: string | null;
  confirm_password: string;
}

const useGetParents = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ApiResponse[] = await getParent();
        const filteredParents: Parent[] = response.map(parent => {
          return {
            ...parent,
            confirm_password: "" 
          };
        });
        setParents(filteredParents);
        setError(null);
      } catch (error) {
        setError("Failed to fetch parents. Please try again later.");
      }
    };
    fetchData();
  }, []);

  return { parents, error };
};

export default useGetParents;
