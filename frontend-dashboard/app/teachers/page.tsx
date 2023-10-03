'use client'
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetTeacher from '../hooks/useGetTeacher';

interface FormData {
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
  create_password: string;
}

const Teachers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [teachers, setTeachers] = useState<FormData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email_address: "",
    phone_number: "",
    create_password: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState<FormData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const { teacherData, loading } = useGetTeacher();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedTeachers = [...teachers];
      updatedTeachers[editingIndex] = formData;
      setTeachers(updatedTeachers);
      setEditingIndex(null);
    } else {
      setTeachers([...teachers, formData]);
    }
    setFormData({ first_name: "", last_name: "", email_address: "", phone_number: "", create_password: "", });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(filteredTeachers[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedTeachers = [...teachers];
    updatedTeachers.splice(index, 1);
    setTeachers(updatedTeachers);
  };

  const filterTeachers = () => {
    const filtered = teachers.filter((classItem) =>
      classItem.first_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredTeachers(filtered);
  };

  useEffect(() => {
    filterTeachers();
  }, [searchInput, teachers]);

  const columns = [
    { key: 'first_name', label: 'First Name' },
    { key: 'last_name', label: 'Last Name' },
    { key: 'email_address', label: 'Email' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'create_password:', label: 'Password' },
  ];

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
                    <label className="block text-gray-600 mb-1">Create Password</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.create_password}
                      onChange={(e) =>
                        setFormData({ ...formData, create_password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Phone Number</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, phone_number: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1"></label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, phone_number: e.target.value })
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

      {teacherData.length > 0 ? (
            <DynamicTable
            data={teacherData}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
