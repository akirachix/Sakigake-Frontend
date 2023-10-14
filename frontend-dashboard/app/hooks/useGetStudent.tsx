import { getStudent } from "../utilities/utils";
import { useEffect,useState } from "react";
interface StudentData{
    id:number;
    first_name:number;
    last_name:string;
    admission_number:number;
    parent_phone_number:string;
    date_added_at:string;
    date_updated_at:string;
    class_grade:number;
    parent:null

}
const useGetStudents=()=>{
    const [student, setStudent]=useState<StudentData[]>([]);
    useEffect(()=>{
      (async()=>{
        const student=await getStudent();
        setStudent(student);
      })();
    },[])
    return {student}
}
export default useGetStudents



