import { BASE_URL } from "@/config";
import { StudentData } from "../hooks/usePostStudent";
import { SubjectData } from "../hooks/usePostSubject";

interface FormData {
  school_name: string;
  email_address: string;
  phonenumber: string;
  create_password: string;
  confirm_password: string;
}

export const registerUser = async (formData: FormData) => {
  const url = `${BASE_URL}/account/schools/signup/registered`;
  try {
    console.log('Request payload:', JSON.stringify(formData)); 
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log('Response:', result); 
  } catch (error: any) {
    console.error('Error:', error.message);
    throw new Error(error.message);
  }
};



export interface ClassData{
  grade_name: string;
  class_teacher: string;
}
export const getClass= async()=>{
  const url = '/api/get-class';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


export const getSubject= async()=>{
  const url = `${BASE_URL}/subjects/subjectsList/`;
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}

export const addSubject = async (subjectData: SubjectData): Promise<any> => {
  const url = '/api/add-subject';
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subjectData),
    });
    if (!response.ok) {
      throw new Error("Failed to add subject");
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error("Failed to add subject: " + error.message);
  }
};




export const getTeacher= async()=>{
  const url = `${BASE_URL}/account/schools/2/teachers/signup/`;
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}



export const postTeacher = async (TeacherData:any) => {
  const url = '/api/add-teacher';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TeacherData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add teacher");
    }
  } catch (error:any) {
    throw new Error(error.message || "Failed to add teacher");
  }
}



export const getStudent= async()=>{
  const url = `${BASE_URL}/students/students/`;
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


export const addStudent = async (studentData: StudentData): Promise<any> => {
  const url = '/api/add-student';
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) {
      throw new Error("Failed to add student");
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error("Failed to add student: " + error.message);
  }
};



export const getParent= async()=>{
  const url = `${BASE_URL}/account/schools/1/parents/register/`;
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


export async function postParent(parentData: any) {
  const url = '/api/add-parent';
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parentData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add parent");
    }
  } catch (error:any) {
    throw new Error(error.message || "Failed to add parent");
  }
}
export type { SubjectData, StudentData };

