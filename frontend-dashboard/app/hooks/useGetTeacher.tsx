'use client'
import { useEffect, useState } from "react";
import { getTeacher } from "../utilities/utils";
interface ApiResponse {
    id:number
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    create_password: string;
}
interface Teacher {
  id:number
  first_name: string;
  last_name: string;
  email_address: string | null;
  phone_number: string;
  create_password: string | null;
  confirm_password: string;
}
const useGetTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ApiResponse[] = await getTeacher();
        const filteredTeachers: Teacher[] = response.map(teacher => {
          return {
            ...teacher,
            confirm_password: ""
          };
        });
        setTeachers(filteredTeachers);
        setError(null);
      } catch (error) {
        setError("Failed to fetch teachers. Please try again later.");
      }
    };
    fetchData();
  }, []);
  return { teachers, error };
};
export default useGetTeachers;
