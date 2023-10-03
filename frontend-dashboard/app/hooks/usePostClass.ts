import { POST } from "../api/add-class/route";
import { useState } from "react";

interface PostClassData {
  grade_name: string;
  class_teacher: string;
}

const usePostClass = () => {
  const [loading, setLoading] = useState(false);

  const postClass = async (classData: PostClassData) => {
    setLoading(true);
    try {
      const response = await POST(classData);
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      throw new Error("Failed to post class: " + error);
    }
  };

  return { postClass, loading };
};

export default usePostClass;
