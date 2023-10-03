'use client'
import { getSubject } from "../utilities/utils";
import { useEffect, useState } from "react";

interface SujectData {
    subject_name: string;
    description: string;
    teacher: string;
}
const useGetSubject = () => {
    const [subjectData, setSubjectData] = useState<SujectData[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const classes = await getSubject();  
          setSubjectData(classes);
        } catch (error) {
          console.error("Error fetching suject data: ", error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return { subjectData, loading };
  };

  
export default useGetSubject;
