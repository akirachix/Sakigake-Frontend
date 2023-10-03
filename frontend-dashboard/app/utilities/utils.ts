

// ------------------  For getting main user

interface UsersData {
  school_name: string;
  email_address: string;
  phonenumber: string;
  create_password: string;
  confirm_password: string;
}

export const createUser = async (userData: UsersData) => {
  const url = `/api/create-user`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


//------------------ For getting our classes

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

// -------------- For posting classes

export interface PostClassData {
  grade_name: string;
  class_teacher: string;
}

export const postClass = async (classData: PostClassData) => {
  const url = '/api/add-class';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(classData),
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    throw new Error('Failed to post class: ' + error.message);
  }
};



// ----------------- For getting subjects

export interface SubjectData{
  subject_name: string;
  description: string;
  teacher: string;
}
export const getSubject= async()=>{
  const url = '/api/get-subject';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


// --------------- For getting teachers

export interface TeacherData{
  subject_name: string;
  description: string;
  teacher: string;
}
export const getTeacher= async()=>{
  const url = '/api/get-teacher';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


// --------------- For getting students

export interface StudentData{
  first_name: string;
  last_name: string;
  parent_phone_number: string;
  class_grade: string;
  parent: string;

}
export const getStudent= async()=>{
  const url = '/api/get-student';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}

// --------------- For getting parents

export interface ParentData{
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  create_password: string;

}
export const getParent= async()=>{
  const url = '/api/get-parent';
  try{
      const response = await fetch(url);
      const result = await response.json();
      return result
  }
  catch(error:any){
      return error.message
  }
}


