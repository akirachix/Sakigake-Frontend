import { getParent} from "../utilities/utils";
import { useEffect, useState } from "react";

interface ParentData {
   first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  create_password: string;
}

const useGetParent = () => {
  const [parentData, setParentData] = useState<ParentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parents = await getParent();
        setParentData(parents);
      } catch (error) {
        console.error("Error fetching parent data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {parentData, loading };
};

export default useGetParent;
