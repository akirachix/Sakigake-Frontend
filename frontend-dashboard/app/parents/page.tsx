
'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { TbX } from 'react-icons/tb';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';
import Layout from '../components/Layout';
import useGetParents from '../hooks/useGetParents';
import usePostParent from '../hooks/usePostParent';

interface Parent {
  id?: number;
  first_name: string;
  last_name: string;
  email_address: string;
  phone_number: string;
}

function Parents() {
  const { parents: initialParents, error: apiError, isLoading } = useGetParents();
  const { addParent, error: postError, isLoading: isPosting } = usePostParent();
  const [showForm, setShowForm] = useState(false);
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [formData, setFormData] = useState<Parent>({
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
      setParents(initialParents);
      setError(null);
    }
  }, [apiError, initialParents]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.first_name || !formData.last_name || !formData.email_address || !formData.phone_number) {
        throw new Error("All fields are required.");
      }
  
      if (editingIndex !== null) {
        setEditingIndex(null)
      } else {
        const response = await addParent(formData);
        if (response) {
          if (response.error) {
            setError(response.error); 
          } else {
            setParents([...parents, formData]);
            setFormData({
              first_name: '',
              last_name: '',
              email_address: '',
              phone_number: '',
            });
            setShowForm(false);
            setError(null);
          }
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to add parent.");
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

  const filteredParents = parents.filter((parent) =>
    parent.first_name.toLowerCase().includes(searchInput.toLowerCase()) ||
    parent.last_name.toLowerCase().includes(searchInput.toLowerCase()) ||
    parent.email_address?.toLowerCase().includes(searchInput.toLowerCase()) ||
    parent.phone_number.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <Layout>
      <section className="m-12">
        <div className="flex justify-between items-center fixed p-4">
          <h1 className="text-3xl font-bold text-mainblue">Parents</h1>
          <button
            className="m-14 bg-mainblue text-white py-3 px-6 text-sm font-bold rounded fixed top-0 right-0"
            onClick={() => setShowForm(!showForm)}
          >
            Add Parent
          </button>
        </div>
        <div className="mb-6 pt-24">
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} placeholder="Search for a parent ..." />
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
              <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">
                {editingIndex !== null ? 'Edit' : 'Add'} Parent
              </h2>
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
                        onChange={handlePhoneNumberChange}
                        required
                      />
                    </div>
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

        {filteredParents.length > 0 ? (
          <DynamicTable data={filteredParents} columns={columns} />
        ) : (
          <div className="flex flex-col items-center h-full">
            <img src="media/empty.jpg" alt="empty page" className="ml-96" />
            <div className="text-center text-maingrey ml-96">
              <h2 className="text-2xl pb-4 font-semibold">No Parents at this time</h2>
              <p className="">Parents will appear here after you add them.</p>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
export default Parents;