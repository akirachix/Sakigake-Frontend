'use client'
import React, { useState, FormEvent, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetStudent from '../hooks/useGetStudent';

interface FormData {
  first_name: string;
  last_name: string;
  admission_number: string;
  parent_phone_number: string;
  date_added_at: string;
  date_updated_at: string;
  class_grade: string;
  parent: string;
}

const Student = () => { 
  const [showForm, setShowForm] = useState(false);
  const [students, setStudents] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    admission_number: "",
    parent_phone_number: "",
    date_added_at: "",
    date_updated_at: "",
    class_grade: "",
    parent: "",
  });


  const [searchInput, setSearchInput] = useState("");
  const [filteredStudents, setFilteredStudents] = useState<FormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { studentData, loading } = useGetStudent();
  

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = formData;
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      setStudents([...students, formData]);
    }
    setFormData({ first_name: "", last_name: "" , admission_number: "", parent_phone_number: "" , date_added_at: "" , date_updated_at: "" ,  class_grade: "", parent: "" });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(filteredStudents[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);
  };

  const filterStudents = () => {
    const filtered = students.filter((classItem) =>
      classItem.first_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  useEffect(() => {
    filterStudents();
  }, [searchInput, students]);

  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'parent', label: 'Parent' },
    { key: 'parent_phone_number', label: 'Parent Phone Number' },
    { key: 'class_grade', label: 'Grade' },
  ];

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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder="Search for a student ..."/>
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
                    <label className="block text-gray-600 mb-1">First Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.first_name}
                      onChange={(e) =>
                        setFormData({ ...formData, first_name: e.target.value })
                      }
                      required />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Second Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.last_name}
                      onChange={(e) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      required />
                  </div>
        
                </div>
               
                <div className="grid grid-cols-2 gap-4 mt-5">
                
                  <div>
                    <label className="block text-gray-600 mb-1">Parent/Guardian</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.parent}
                      onChange={(e) =>
                        setFormData({ ...formData, parent: e.target.value })
                      }
                      required />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Parents Phone Nubmer</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.parent_phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, parent_phone_number: e.target.value })
                      }
                      required />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Grade</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.class_grade}
                      onChange={(e) =>
                        setFormData({ ...formData, class_grade: e.target.value })
                      }
                      required />
                  </div>
                </div> 
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {studentData.length > 0 ? (
          <DynamicTable
          data={studentData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="flex flex-col items-center h-full ">
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
}

export default Student;
