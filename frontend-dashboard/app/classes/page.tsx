'use client'
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetClass from '../hooks/useGetClass';
import usePostClass from '../hooks/usePostClass';
import { PostClassData, getClass } from '../utilities/utils';

interface FormData {
  grade_name: string;
  class_teacher: string;
}

function Classes() {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<PostClassData>({
    grade_name: "",
    class_teacher: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<FormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { classData, loading: getClassLoading } = useGetClass();
  const { postClass, loading: postClassLoading } = usePostClass();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const newClass = await postClass(formData);
      setClasses([...classes, newClass]);  
      setFormData({ grade_name: "", class_teacher: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error posting class: ", error);
    }
  };

  const handleEdit = (index: number) => {
    setFormData(filteredClasses[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedClasses = [...classes];
    updatedClasses.splice(index, 1);
    setClasses(updatedClasses);
  };

  const filterClasses = () => {
    const filtered = classes.filter((classItem) =>
      classItem.grade_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  useEffect(() => {
    filterClasses();
  }, [searchInput, classes]);

  const columns = [
    { key: 'grade_name', label: 'Class Name' },
    { key: 'class_teacher', label: 'Teacher' },
  ];


  return (
    <Layout>
    <section className="m-12">
    <div className="flex justify-between items-center fixed p-4">
          <h1 className="text-3xl font-bold text-mainblue">Classes</h1>
          <button
            className="m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
            onClick={() => setShowForm(!showForm)}
          >
            Add Class
          </button>
        </div>
        <div className="mb-6 pt-24">
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            placeholder="Search for a class ..."
          />
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
              <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Class</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 mb-1">Class Name</label>
                      <input
                        className="border border-gray-300 py-2 px-4 w-full rounded"
                        type="text"
                        value={formData.grade_name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, grade_name: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-1">Teacher</label>
                      <input
                        className="border border-gray-300 py-2 px-4 w-full rounded"
                        type="text"
                        value={formData.class_teacher}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, class_teacher: e.target.value })
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

         {classData.length > 0 ? (
          <DynamicTable
            data={classData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="flex flex-col items-center h-full">
            <img src="media/empty.jpg" alt="empty page" className="ml-96" />
            <div className="text-center text-maingrey ml-96">
              <h2 className="text-2xl pb-4 font-semibold">No Classes at this time</h2>
              <p className="">Classes will appear here after you add them.</p>
            </div>
          </div>
        )}
    </section>
    </Layout>
  );
}

export default Classes;
