import { getSubject } from "../utilities/utils";
import { useEffect,useState } from "react";
interface SubjectData{
  id: number,
  subject_name: string,
  description: string,
  teacher: number
}
const useGetSubjects=()=>{
    const [subject, setSubject]=useState<SubjectData[]>([]);
    useEffect(()=>{
      (async()=>{
        const subject=await getSubject();
        setSubject(subject);
      })();
    },[])
    return {subject}
}
export default useGetSubjects;