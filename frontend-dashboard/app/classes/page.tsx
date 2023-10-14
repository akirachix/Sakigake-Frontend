'use client'
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetClass from '../hooks/useGetClass';
import usePostClass from '../hooks/usePostClass';
import useGetTeachers from '../hooks/useGetTeacher';

interface FormData {
  grade_name: string;
  class_teacher: string;
}

const Classes: React.FC = () => {
  const { classData, loading: getClassLoading } = useGetClass();
  const { postClass, loading: postClassLoading, error } = usePostClass();
  const { teachers, error: teachersError } = useGetTeachers();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    grade_name: '',
    class_teacher: '',
  });
  const [searchInput, setSearchInput] = useState('');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await postClass(formData);
    setFormData({ grade_name: '', class_teacher: '' });
    setShowForm(false);
  };

  const columns = [
    { key: 'grade_name', label: 'Class Name' },
    { key: 'class_teacher', label: 'Teacher' },
  ];


  const modifiedClassData = classData.map((classItem) => {
    const teacherId: string | undefined = classItem.class_teacher;
    const foundTeacher = teacherId !== undefined ? teachers.find((teacher) => teacher.id === +teacherId) : undefined;
    const teacherName = foundTeacher
      ? `${foundTeacher.first_name} ${foundTeacher.last_name}`
      : 'Unknown Teacher';
  
    return {
      ...classItem,
      class_teacher: teacherName,
    };
  });

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
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder="Search for a class ..." />
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
                      <label className="block text-gray-600 mb-1">Grade</label>
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
                      <select
                        className="border border-gray-300 py-2 px-4 w-full rounded"
                        value={formData.class_teacher}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setFormData({ ...formData, class_teacher: e.target.value })
                        }
                        required
                      >
                        <option value="0">Select Teacher</option>
                        {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {`${teacher.first_name} ${teacher.last_name}`}
                          </option>
                        ))}
                      </select>
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
          <DynamicTable data={modifiedClassData} columns={columns} />
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
};

export default Classes;

