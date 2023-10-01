'use client'
import React, { useState } from "react";
import { TbX, TbEdit } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import DynamicTable from "../atoms/dynamictable/dynamictable";
import SearchBar from "../atoms/dynamicsearchbar/dyamicsearchbar";
import Layout from "../components/Layout";

interface Teacher {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Teachers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [teacher, setTeacher] = useState<Teacher[]>([]);
  const [formData, setFormData] = useState<Teacher>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTeacher([...teacher, formData]);
    setFormData({ first_name: "", last_name: "", email: "", password: "" });
    setShowForm(false);
  };

  const handleDeleteTeacher = (index: number) => {
    const updatedTeacherList = [...teacher];
    updatedTeacherList.splice(index, 1);
    setTeacher(updatedTeacherList);
  };

  const handleEditTeacher = (index: number) => {
    const editedTeacher = teacher[index];
    setFormData(editedTeacher);
    handleDeleteTeacher(index);
    setShowForm(true);
  };

  return (
    <Layout>
    <section className="m-12">
      <div className="flex justify-between items-center fixed p-4">
        <h1 className="text-3xl font-bold text-mainblue">Teachers</h1>
        <button
          className=" m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
          onClick={() => setShowForm(!showForm)}
        >
          Add Teacher
        </button>
      </div>
      <div className="mb-6 pt-24">
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder="Search for a teacher ..."/>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-gray-500 opacity-50 z-40"></div>
          <div className="bg-white w-3/6 rounded-lg shadow-lg p-10 z-50 relative">
            <button
              className="absolute top-2 right-2 m-4 text-mainblue hover:text-maingrey"
              onClick={() => setShowForm(false)}
            >
              <TbX />
            </button>
            <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Teacher</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">First Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Last Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      required
                    />
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
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Password</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {teacher.length > 0 ? (
        <DynamicTable
          data={teacher}
          columns={[
            { key: 'first_name', label: 'First name' },
            { key: 'last_name', label: 'Last Name' },
            { key: 'email', label: 'Email' },
            { key: 'password', label: 'Password' },
          ]}
          onEdit={handleEditTeacher}
          onDelete={handleDeleteTeacher}
        />
      ) : (
        <div className="flex flex-col items-center h-full ">
          <img src="media/empty.jpg" alt="empty page" className="ml-96" />
          <div className="text-center text-maingrey ml-96">
            <h2 className="text-2xl pb-4 font-semibold">No Teacher at this time</h2>
            <p className="">Teachers will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
    </Layout>
  );
};

export default Teachers;
