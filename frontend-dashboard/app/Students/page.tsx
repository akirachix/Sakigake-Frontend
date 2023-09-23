'use client'
import React, { useState } from "react";
import { TbX } from "react-icons/tb";


interface Student {
  student: string;
  grade: string;
  parent: string;
  phoneNumber: string;
}
const Student = () => {
  const [showForm, setShowForm] = useState(false);
  const [student, setStudent] = useState<Student[]>([]);
  const [formData, setFormData] = useState<Student>({
    student: "",
    grade: "",
    parent: "",
    phoneNumber: "",
  });
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStudent([...student, formData]);
    setFormData({ student: "", grade: "", parent: "", phoneNumber:"" });
    setShowForm(false);
  };
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
        <input className="border text-maingrey border-bordercolor text-sm font-bold py-3 px-4 ml-48 w-full rounded" type="text" placeholder="Search for student ..."/>
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

      {student.length > 0 ? (
        <div className="">
          <table className="w-full border border-collapse mt-20 mx-48">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">Subject</th>
                <th className="px-2 py-2">Teacher</th>
                <th className="px-2 py-2">Grade</th>
                <th className="px-2 py-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {student.map((student, index) => (
                <tr key={index} className="border-collapse text-center">
                  <td className="px-2 py-2">{student.student}</td>
                  <td className="px-2 py-2">{student.parent}</td>
                  <td className="px-2 py-2">{student.grade}</td>
                  <td className="px-2 py-2">{student.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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