'use client'
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetTeacher from '../hooks/useGetTeacher';
import usePostTeacher from '../hooks/usePostTeacher';
interface Teacher {
  first_name: string;
  last_name: string;
  email_address: string | null;
  phone_number: string;
}
const Teachers = () => {
  const { teachers: initialTeachers, error: apiError } = useGetTeacher();
  const { addTeacher, error: postError, isLoading: isPosting } = usePostTeacher();
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [formData, setFormData] = useState<Teacher>({
    first_name: '',
    last_name: '',
    email_address: '',
    phone_number: '',
  });
  const [searchInput, setSearchInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(apiError || null);
  useEffect(() => {
    if (apiError) {
      setError(apiError);
    } else {
      setTeachers(initialTeachers);
      setError(null);
    }
  }, [apiError, initialTeachers]);
const handleFormSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    if (
      teachers.some(
        (teacher) =>
        teacher.email_address?.toLowerCase() ===
        formData.email_address?.toLowerCase() ||
        teacher.phone_number.toLowerCase() ===
        formData.phone_number.toLowerCase()
      )
    ) {
      throw new Error('phone number arleady exists');
    }
   if (editingIndex !== null) {
      const updatedTeachers = [...teachers];
      updatedTeachers[editingIndex] = formData;
      setTeachers(updatedTeachers);
      setEditingIndex(null);setEditingIndex
    } else {
      await addTeacher(formData);
      setTeachers([...teachers, formData]);
    }
       setFormData({
      first_name: '',
      last_name: '',
      email_address: '',
      phone_number: '',
    });
    setShowForm(false);
    setError(null);
  } catch (error: any) {
    setError(error.message)
  }
};
const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
  setError(null);
  setFormData({ ...formData, phone_number: e.target.value });
};
  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email_address', label: 'Email Address' },
    { key: 'phone_number', label: 'Phone Number' },
  ];
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      teacher.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
      teacher.email_address?.toLowerCase().includes(searchInput.toLowerCase()) ||
      teacher.phone_number.toLowerCase().includes(searchInput.toLowerCase())
  );
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, last_name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className="block text-gray-600 mb-1 mt-4">Email</label>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="email"
                    value={formData.email_address || ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, email_address: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1 mt-4">Phone Number</label>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="text"
                    value={formData.phone_number}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    required
                  />
                </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                {error && (
                <div className="error-message mb-4 text-red-400">
                  {error}
                </div>
              )}
                </div>
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {editingIndex !== null ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
       {filteredTeachers.length > 0 ? (
          <DynamicTable
          data={filteredTeachers}
          columns={columns}
          />
        ):(
    <div className="flex flex-col items-center h-full">
      <img src="media/empty.jpg" alt="empty page" className="ml-96" />
      <div className="text-center text-maingrey ml-96">
       <h2 className="text-2xl pb-4 font-semibold">No Teacher at this time</h2>
       <p className="">Teacher will appear here after you add them.</p>
      </div>
    </div>
)}
    </section>
    </Layout>
  );
};
export default Teachers;