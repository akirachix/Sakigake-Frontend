import { getClass } from "../utilities/utils";
import { useEffect, useState } from "react";
interface ClassData {
  grade_name: string;
  class_teacher: string;
}
const useGetClass = () => {
  const [classData, setClassData] = useState<ClassData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getClass();
        setClassData(classes);
      } catch (error) {
        console.error("Error fetching teacher data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return { classData, loading };
};
export default useGetClass;