'use client'
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetSubject from '../hooks/useGetSubject';

interface FormData {
  subject_name: string;
  description: string;
  teacher: string;
}

function Subjects() {
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    subject_name: "",
    description: "",
    teacher: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<FormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { subjectData, loading } = useGetSubject();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedSubjects = [...subjects];
      updatedSubjects[editingIndex] = formData;
      setSubjects(updatedSubjects);
      setEditingIndex(null);
    } else {
      setSubjects([...subjects, formData]);
    }
    setFormData({ subject_name: "", description: "", teacher: "" });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(filteredSubjects[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const filterSubjects = () => {
    const filtered = subjects.filter((classItem) =>
      classItem.subject_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    filterSubjects();
  }, [searchInput, subjects]);

  const columns = [
    { key: 'subject_name', label: 'Subject Name' },
    { key: 'description', label: 'Description' },
    { key: 'teacher', label: 'Teacher' },
  ];

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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder="Search for a subject ..."/>
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
            <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Subject</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Subject Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.subject_name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, subject_name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Description</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.description}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1 mt-4">Teacher</label>
                  <input
                    className="border border-gray-300 py-2 px-4 w-1/2 rounded"
                    type="text"
                    value={formData.teacher}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, teacher: e.target.value })
                    }
                    required
                  />
                </div>
                
                <div className="flex justify-left font-bold text-sm pt-10">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded">
                  Submit
                </button>
              </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {subjectData.length > 0 ? (
        <DynamicTable
          data={subjectData}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="flex flex-col items-center h-full ">
          <img src="media/empty.jpg" alt="empty page" className="ml-96" />
          <div className="text-center text-maingrey ml-96">
            <h2 className="text-2xl pb-4 font-semibold">No Subjects at this time</h2>
            <p className="">Subjects will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
    </Layout>
  );
}

export default Subjects;
