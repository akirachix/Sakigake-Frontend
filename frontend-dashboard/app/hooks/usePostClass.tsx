import { useState } from "react";
import { postClass as postClassAPI } from "../utilities/utils";

interface ClassData {
  grade_name: string;
  class_teacher: string;
}

const usePostClass = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const postClass = async (formData: ClassData) => {
    setLoading(true);
    try {
      const response = await postClassAPI(formData);
      setLoading(false);
      if (response.status === 201) {
        return response;
      } else {
        setError("Failed to add class");
        return response;
      }
    } catch (error) {
      setLoading(false);
      setError("Error adding class");
      return error;
    }
  };

  return { postClass, loading, error };
};

export default usePostClass;
