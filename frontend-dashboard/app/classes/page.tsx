'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { AiOutlineClose} from 'react-icons/ai';
import Sidebar from '../Components/Sidebar';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';

interface ClassData {
  grade: string;
  teacher: string;
}

function Classes() {
  const [showForm, setShowForm] = useState(false);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [formData, setFormData] = useState<ClassData>({
    grade: "",
    teacher: ""
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredClasses, setFilteredClasses] = useState<ClassData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {

      const updatedClasses = [...classes];
      updatedClasses[editingIndex] = formData;
      setClasses(updatedClasses);
      setEditingIndex(null);
    } else {
      setClasses([...classes, formData]);
    }
    setFormData({ grade: "", teacher: "" });
    setShowForm(false);
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
      classItem.grade.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredClasses(filtered);
  };

  useEffect(() => {
    filterClasses();
  }, [searchInput, classes]);

  const columns = [
    { key: 'grade', label: 'Class Name' },
    { key: 'teacher', label: 'Teacher' },
  ];

  return (
    <section className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 ml-10 mr-40 mt-20">
        <div className="flex justify-between mb-6 text-bgblue items-end">
          <h1 className="text-4xl font-bold">Classes</h1>
          <button
            className="bg-bgblue text-white font-bold py-3 px-6 rounded mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            Add Class
          </button>
        </div>
        <div className="mr-6">
          
          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>

        {classes.length === 0 ? (
          <div className="flex flex-col items-center mr-10 h-1/2">
            <img src="media/empty.png" alt="empty page" className="mb-8 w-5/12" />
            <div className="text-center">
              <h2 className="text-3xl text-darkgrey pb-4 font-semibold">
                No classes at this time
              </h2>
              <p className="text-darkgrey text-sm">
                Classes will appear here after you add them.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-1/2 h-1/2">
            <DynamicTable
              data={filteredClasses}
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
                Add Class
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <div className="flex mb-6">
                    <div className="w-1/2 mb-6 mr-4">
                      <label className="block text-inputgrey mb-1">
                        Grade
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.grade}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({
                            ...formData,
                            grade: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="w-1/2 mb-6">
                      <label className="block text-inputgrey mb-1">
                        Teacher
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.teacher}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({
                            ...formData,
                            teacher: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-left">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Classes;
