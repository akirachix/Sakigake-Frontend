import { useState } from "react";
import { postTeacher } from "../utilities/utils";
const usePostTeacher = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const addTeacher = async (teacherData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await postTeacher(teacherData);
      return data;
    } catch (error: any) {
        setError(error.message);
      } finally {
      setIsLoading(false);
    }
  };
  return {
    addTeacher,
    error,
    isLoading,
  };
};
export default usePostTeacher;