'use client'
import { getTeacher } from "../utilities/utils";
import { useEffect, useState } from "react";

interface TeacherData {
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    create_password: string;
}
const useGetTeacher = () => {
    const [teacherData, setTeacherData] = useState<TeacherData[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const teachers = await getTeacher();  
          setTeacherData(teachers);
        } catch (error) {
          console.error("Error fetching teacher data: ", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { teacherData, loading };
  };

  
export default useGetTeacher;
