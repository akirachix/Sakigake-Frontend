'use client'
import React, { useState, useEffect } from "react";
import { TbX } from "react-icons/tb";
import DynamicTable from "../atoms/dynamictable/dynamictable";
import SearchBar from "../atoms/dynamicsearchbar/dyamicsearchbar";
import useGetSubjects from "../hooks/useGetSubject";
import useGetTeachers from "../hooks/useGetTeacher";
import usePostSubject from "../hooks/usePostSubject";
import Layout from "../components/Layout";

interface Subject {
  subject_name: string;
  description: string;
  teacher: number;
}

const SubjectsPage: React.FC = () => {
  const { subject: initialSubjectData } = useGetSubjects();
  const { teachers } = useGetTeachers();
  const { postSubject } = usePostSubject();

  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] = useState<Subject>({
    subject_name: "",
    description: "",
    teacher: 0,
  });
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const getTeacherFullName = (teacherId: number) => {
    const selectedTeacher = teachers.find((teacher) => teacher.id === teacherId);
    if (selectedTeacher) {
      return `${selectedTeacher.first_name} ${selectedTeacher.last_name}`;
    } else {
      return 'Undefined teacher';
    }
  };

  useEffect(() => {
    setLoading(true);
    const initialSubjects = initialSubjectData.map((data: any) => ({
      subject_name: data.subject_name,
      description: data.description,
      teacher: data.teacher,
    }));
    setSubjects(initialSubjects);
    setLoading(false);
  }, [initialSubjectData]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postSubject(formData);
      if (response.status === 200) {
        setSubjects([...subjects, formData]);
        setFormData({
          subject_name: "",
          description: "",
          teacher: 0,
        });
        setShowForm(false);
      } else {
        console.error("Failed to add subject: ", response.error);
      }
    } catch (error) {
      console.error("Error adding subject: ", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <Layout>
      <section className="m-12">
        <div className="flex justify-between items-center fixed p-4">
          <h1 className="text-3xl font-bold text-mainblue">Subjects</h1>
          <button
            className="m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
            onClick={() => setShowForm(!showForm)}
          >
            Add Subject
          </button>
        </div>
        <div className="mb-6 pt-24">
          <SearchBar searchInput={searchInput}
            setSearchInput={setSearchInput}
            placeholder="Search for a subject ..." />
        </div>
        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
            <div className="bg-white w-3/6 rounded-lg shadow-lg p-10 z-50 relative">
              <button
                className="absolute top-2 right-2 m-4 text-mainblue hover:text-maingrey"
                onClick={() => setShowForm(false)}>
                <TbX />
              </button>
              <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Student</h2>
              <form onSubmit={handleFormSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="first_name">
                      Subject Name
                    </label>
                    <input
                      id="subject_name"
                      name="subject_name"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.subject_name}
                      onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
                      required
                    />
                  </div>

                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-1" htmlFor="teacher">
                    Teacher
                  </label>
                  <select
                    id="teacher"
                    name="teacher"
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: parseInt(e.target.value) })}
                    required
                  >
                    <option value="">Select a teacher</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {`${teacher.first_name} ${teacher.last_name}`}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        {filteredSubjects.length > 0 ? (
          <DynamicTable
          data={filteredSubjects.map((subject) => ({
            ...subject,
            teacher: getTeacherFullName(subject.teacher),
          }))}
          columns={[
            { key: 'subject_name', label: 'Subject Name' },
            { key: 'description', label: 'Description' },
            { key: 'teacher', label: 'Teachers' },
          ]}
        />
        ) : (
          <div className="flex flex-col items-center h-full">
            <img src="media/empty.jpg" alt="empty page" className="ml-96" />
            <div className="text-center text-maingrey ml-96">
              <h2 className="text-2xl pb-4 font-semibold">No student at this time</h2>
              <p className="">Students will appear here after you add them.</p>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};
export default SubjectsPage;