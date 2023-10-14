'use client'
import { useEffect, useState } from "react";
import { getTeacher } from "../utilities/utils";

interface ApiResponse {
    id:number
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
}

interface Teacher {
  id:number
  first_name: string;
  last_name: string;
  email_address: string | null;
  phone_number: string;
}

const useGetTeachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
        const response: ApiResponse[] = await getTeacher();
        const filteredTeachers: Teacher[] = response.map(teacher => {
          return {
            ...teacher
          };
        });
        setTeachers(filteredTeachers);
    };
    fetchData();
  }, []);
  return { teachers, error };
};
export default useGetTeachers;
