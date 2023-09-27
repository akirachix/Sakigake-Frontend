'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { TbX } from 'react-icons/tb'; // Assuming TbX is your close icon
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';

interface Parent {
  parentName: string;
  phoneNumber: string;
  email: string;
}

function Parents() {
  const [showForm, setShowForm] = useState(false);
  const [parents, setParents] = useState<Parent[]>([]);
  const [formData, setFormData] = useState<Parent>({
    parentName: "",
    phoneNumber: "",
    email: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredParents, setFilteredParents] = useState<Parent[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedParents = [...parents];
      updatedParents[editingIndex] = formData;
      setParents(updatedParents);
      setEditingIndex(null);
    } else {
      setParents([...parents, formData]);
    }
    setFormData({ parentName: "", phoneNumber: "", email: "" });
    setShowForm(false);
  };

  const handleEdit = (index: number) => {
    setFormData(filteredParents[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index: number) => {
    const updatedParents = [...parents];
    updatedParents.splice(index, 1);
    setParents(updatedParents);
  };

  const filterParents = () => {
    const filtered = parents.filter((parent) =>
      parent.parentName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredParents(filtered);
  };

  useEffect(() => {
    filterParents();
  }, [searchInput, parents]);

  const columns = [
    { key: 'parentName', label: 'Parent Name' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'email', label: 'Email' },
  ];

  return (
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
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
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
            <h2 className="text-2xl mb-4 font-semibold mb-10 pb-8">Add Parent</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Parent Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.parentName}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-600 mb-1">Phone Number</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    className="border border-gray-300 py-2 px-4 w-full rounded"
                    type="email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-left font-bold text-sm pt-10">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  Add Parent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {parents.length > 0 ? (
        <DynamicTable
          data={filteredParents}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <div className="flex flex-col items-center h-full ">
          <img src="media/empty.png" alt="empty page" className="ml-96" />
          <div className="text-center text-maingrey ml-96">
            <h2 className="text-2xl pb-4 font-semibold">No Parents at this time</h2>
            <p className="">Parents will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Parents;
