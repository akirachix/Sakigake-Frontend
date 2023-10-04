import { addStudent } from "../utilities/utils";

export type StudentData = {
  first_name: string;
  last_name: string;
  admission_number: string;
  parent_phone_number: string;
  class_grade: string;
  parent: string;
};

const usePostStudent = () => {

  const postStudent = async (formData: StudentData) => {
    console.log(formData);
    
    
      const response = await addStudent(formData); 
      console.log(response);
      

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      return response;
  };

  return { postStudent}; 
};

export default usePostStudent;



