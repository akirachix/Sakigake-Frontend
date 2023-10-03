import { getStudent } from "../utilities/utils";
import { useEffect, useState } from "react";

interface StudentData {
    first_name: string;
    last_name: string;
    admission_number: string;
    parent_phone_number: string;
    date_added_at: string;
    date_updated_at: string;
    class_grade: string;
    parent: string;
}

const useGetStudent = () => {
  const [studentData, setStudentData] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getStudent();
        setStudentData(students);
      } catch (error) {
        console.error("Error fetching student data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { studentData, loading };
};

export default useGetStudent;