'use client'
import React, { useState } from "react";
import { TbX } from "react-icons/tb";

interface Teacher {
  teacher: string;
  grade: string;
  email: string;
  phoneNumber: string;
}
const Teachers = () => {
  const [showForm, setShowForm] = useState(false);
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [formData, setFormData] = useState<Teacher>({
    teacher: "",
    grade: "",
    email: "",
    phoneNumber: "",
  });
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacher([...teacher, formData]);
    setFormData({ teacher: "", grade: "", email: "", phoneNumber:"" });
    setShowForm(false);
  };
  return (
    <section className="m-12">

<div className="flex justify-between items-center fixed p-4">
  <h1 className="text-3xl font-bold text-mainblue">Teachers</h1>
  <button
    className=" m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
    onClick={() => setShowForm(!showForm)}>
    Add Teacher
  </button>
</div>
      <div className="mb-6 pt-24">
        <input className="border text-maingrey border-bordercolor text-sm py-3 px-4 ml-44 w-full rounded" type="text" placeholder="Search for student ..."/>
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
            <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Teacher</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Teacher Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.teacher}
                      onChange={(e) =>
                        setFormData({ ...formData, teacher: e.target.value })
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
               
                <div className="grid grid-cols-2 gap-4 mt-5">
                
                  <div>
                    <label className="block text-gray-600 mb-1">Email</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required />
                  </div>
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
                </div> 
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {teacher.length > 0 ? (
        <div className="">
          <table className="w-full border border-collapse mt-20 mx-44">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">Teacher</th>
                <th className="px-2 py-2">Grade</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {teacher.map((teacher, index) => (
                <tr key={index} className="border-collapse text-center text-maingrey">
                  <td className="px-2 py-2">{teacher.teacher}</td>
                  <td className="px-2 py-2">{teacher.grade}</td>
                  <td className="px-2 py-2">{teacher.email}</td>
                  <td className="px-2 py-2">{teacher.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center h-full ">
          <img src="images/empty.jpg" alt="empty page" className="ml-96" />
          <div className="text-center text-maingrey ml-96">
            <h2 className="text-2xl pb-4 font-semibold">No Teacher at this time</h2>
            <p className="">Teachers will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
  );
}
export default Teachers;