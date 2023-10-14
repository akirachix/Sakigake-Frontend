import { addSubject } from "../utilities/utils";
export type SubjectData = {
  subject_name: string;
  description:string
  teacher:  number;
};
const usePostSubject = () => {
  const postSubject = async (formData: SubjectData) => {
      const response = await addSubject(formData);
      if (!response.ok) {
        throw new Error("Failed to add subject");
      }
      return response;
  };
  return { postSubject};
};
export default usePostSubject;