'use client'
import React, { useState } from "react";
import { TbX, TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import DynamicTable from "../atoms/DynamicTable";
import SearchBar from "../atoms/DynamicSearch";

interface Student {
  student: string;
  grade: string;
  parent: string;
  phoneNumber: string;
}

const formFields = [
  { label: "Student Name", name: "student" },
  { label: "Parent/Guardian", name: "parent" },
  { label: "Phone Number", name: "phoneNumber" },
  { label: "Grade", name: "grade" },
];

const Student: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    student: "",
    grade: "",
    parent: "",
    phoneNumber: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent([...student, formData]);
    setFormData({ student: "", grade: "", parent: "", phoneNumber: "" });
    setShowForm(false);
  };

  const handleDeleteStudent = (index: number) => {
    const updatedStudentList = [...student];
    updatedStudentList.splice(index, 1);
    setStudent(updatedStudentList);
  };

  const handleEditStudent = (index: number) => {
    const editedStudent = student[index];
    setFormData(editedStudent);
    handleDeleteStudent(index);
    setShowForm(true);
  };

  const filteredStudents = student.filter((student) =>
    student.student.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
          <div className="bg-white w-3/6 rounded-lg shadow-lg p-10 z-50 relative">
            <button
              className="absolute top-2 right-2 m-4 text-mainblue hover:text-maingrey"
              onClick={() => setShowForm(false)}>
              <TbX/>
            </button>
            <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Student</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4 text-">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Student Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.student}
                      onChange={(e) =>
                        setFormData({ ...formData, student: e.target.value })
                      }
                      required />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Parent/Guadian</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.parent}
                      onChange={(e) =>
                        setFormData({ ...formData, parent: e.target.value })
                      }
                      required />
                  </div>
        
                </div>
               
                <div className="grid grid-cols-2 gap-4 mt-5">
                
                  <div>
                    <label className="block text-gray-600 mb-1">Phone Number</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Grade</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                      required />
                  </div>
                </div> 
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {filteredStudents.length > 0 ? (
        <DynamicTable
          data={filteredStudents}
          columns={[
            { key: 'student', label: 'Student' },
            { key: 'parent', label: 'Parent' },
            { key: 'grade', label: 'Grade' },
            { key: 'phoneNumber', label: 'Phone Number' },
          ]}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
        />
      ) : (
        <div className="flex flex-col items-center h-full ">
          <img src="images/empty.jpg" alt="empty page" className="ml-96" />
          <div className="text-center text-maingrey ml-96">
            <h2 className="text-2xl pb-4 font-semibold">No student at this time</h2>
            <p className="">Students will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Student;
