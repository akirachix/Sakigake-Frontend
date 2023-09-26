'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Sidebar from '../Components/Sidebar';
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
    <section className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 ml-10 mr-40 mt-20">
        <div className="flex justify-between mb-6 text-bgblue items-end">
          <h1 className="text-4xl font-bold">Parents</h1>
          <button
            className="bg-bgblue text-white font-bold py-3 px-6 rounded mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            Add Parent
          </button>
        </div>
        <div className="mr-6">
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>

        {parents.length === 0 ? (
          <div className="flex flex-col items-center mr-10 h-1/2">
            <img src="media/empty.png" alt="empty page" className="mb-8 w-5/12" />
            <div className="text-center">
              <h2 className="text-3xl text-darkgrey pb-4 font-semibold">
                No parents at this time
              </h2>
              <p className="text-darkgrey text-sm">
                Parents will appear here after you add them.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1/2 h-1/2">
            <DynamicTable
              data={filteredParents}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {showForm && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0  bg-gray-500 opacity-50 z-40"></div>
            <div className="bg-white w-5/6 left-52 bottom-10 sm:w-3/5 rounded-lg shadow-lg pt-28 pb-60 px-40 right-10  z-50 relative">
              <button
                className="absolute top-8 right-8 text-x"
                onClick={() => setShowForm(false)}
              >
                <AiOutlineClose />
              </button>
              <h2 className="text-4xl mb-20 font-semibold text-darkgrey">
                Add Parent
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <div className="flex mb-6">
                    <div className="w-1/2 mb-6 mr-4">
                      <label className="block text-inputgrey mb-1">
                        Parent Name
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.parentName}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({
                            ...formData,
                            parentName: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="w-1/2 mb-6">
                      <label className="block text-inputgrey mb-1">
                        Phone Number
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.phoneNumber}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({
                            ...formData,
                            phoneNumber: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <label className="block text-inputgrey mb-1">Email</label>
                  <input
                    className="border border-grey mb-16 py-2 px-4 w-1/2"
                    type="email"
                    value={formData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex justify-left">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Parents;
