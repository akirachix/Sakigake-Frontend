
'use client'
import React, { useState, useEffect } from "react";
import { TbX } from "react-icons/tb";
import DynamicTable from "../atoms/dynamictable/dynamictable";
import SearchBar from "../atoms/dynamicsearchbar/dyamicsearchbar";
import useGetStudents from "../hooks/useGetStudent";
import useGetParents from "../hooks/useGetParents";
import usePostStudent from "../hooks/usePostStudent";
import Layout from "../components/Layout";

interface Student {
  first_name: string;
  last_name: string;
  admission_number: string;
  parent_phone_number: string;
  class_grade: string;
  parent: string;
}

const StudentsPage: React.FC = () => {
  const { student: initialStudentData } = useGetStudents();
  const { parents } = useGetParents();
  const { postStudent } = usePostStudent();

  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    first_name: "",
    last_name: "",
    admission_number: "",
    parent_phone_number: "",
    class_grade: "",
    parent: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const initialStudents = initialStudentData.map((data: any) => {
      const parent = parents.find((parent: any) => parent.phone_number === data.parent_phone_number);

      return {
        first_name: data.first_name,
        last_name: data.last_name,
        admission_number: data.admission_number,
        parent_phone_number: data.parent_phone_number,
        class_grade: data.class_grade,
        parent: parent ? `${parent.first_name} ${parent.last_name}` : "Unknown Parent",
      };
    });
    setStudents(initialStudents);
    setLoading(false);
  }, [initialStudentData, parents]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postStudent(formData);
      console.log(response);

      if (response.status === 200) {
        setStudents([...students, formData]);
        setFormData({
          first_name: "",
          last_name: "",
          admission_number: "",
          parent_phone_number: "",
          class_grade: "",
          parent: "",
        });
        setShowForm(false);
      } else {
        console.error("Failed to add student: ", response.error);
      }
    } catch (error) {
      console.error("Error adding student: ", error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteStudent = (index: number) => {
    const updatedStudents = students.filter((_, i) => i !== index);
    setStudents(updatedStudents);
  };

  const handleEditStudent = (index: number) => {
    const editedStudent = students[index];
    setFormData(editedStudent);
    handleDeleteStudent(index);
    setShowForm(true);
  };

  const filteredStudents = students.filter((student) =>
    student.first_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Layout>
      <section className="m-12">
        <div className="flex justify-between items-center fixed p-4">
          <h1 className="text-3xl font-bold text-mainblue">Students</h1>
          <button
            className=" m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
            onClick={() => setShowForm(!showForm)}>
            Add student
          </button>
        </div>
        <div className="mb-6 pt-24">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            placeholder="Search for a student ..."
          />
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="first_name">
                      First Name
                    </label>
                    <input
                      id="first_name"
                      name="first_name"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="last_name">
                      Last Name
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="admission_number">
                      Admission Number
                    </label>
                    <input
                      id="admission_number"
                      name="admission_number"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.admission_number}
                      onChange={(e) => setFormData({ ...formData, admission_number: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="parent_phone_number">
                      Parent Phone Number
                    </label>
                    <input
                      id="parent_phone_number"
                      name="parent_phone_number"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.parent_phone_number}
                      onChange={(e) => setFormData({ ...formData, parent_phone_number: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="class_grade">
                      Class Grade
                    </label>
                    <input
                      id="class_grade"
                      name="class_grade"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.class_grade}
                      onChange={(e) => setFormData({ ...formData, class_grade: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-600 mb-1" htmlFor="parent">
                      Parent
                    </label>
                    <select
                      id="parent"
                      name="parent"
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      value={formData.parent}
                      onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                      required
                    >
                      <option value="">Select a parent</option>
                      {parents.map((parent) => (
                        <option key={parent.id} value={parent.id}>
                          {`${parent.first_name} ${parent.last_name}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </form>

            </div>
          </div>
        )}

        {filteredStudents.length > 0 ? (
          <DynamicTable
            data={filteredStudents}
            columns={[
              { key: 'first_name', label: 'First Name' },
              { key: 'last_name', label: 'Last Name' },
              { key: 'admission_number', label: 'Admission Number' },
              { key: 'parent', label: 'Parent Name' },
              { key: 'class_grade', label: 'Grade' },
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

export default StudentsPage;