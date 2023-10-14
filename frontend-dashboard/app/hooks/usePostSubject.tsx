import { addSubject } from "../utilities/utils";
export type SubjectData = {
  subject_name: string;
  description:string
  teacher:  number;
};
const usePostSubject = () => {
  const postSubject = async (formData: SubjectData) => {
    console.log(formData);
      const response = await addSubject(formData);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to add subject");
      }
      return response;
  };
  return { postSubject};
};
export default usePostSubject;