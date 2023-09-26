'use client'
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Sidebar from '../Components/Sidebar';
import DynamicTable from '../atoms/dynamictable/dynamictable';
import SearchBar from '../atoms/dynamicsearchbar/dyamicsearchbar';

interface Subject {
  subject: string;
  teacher: string;
  grade: string;
}

function Subjects() {
  const [showForm, setShowForm] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [formData, setFormData] = useState<Subject>({
    subject: "",
    teacher: "",
    grade: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
    setFormData({ subject: "", teacher: "", grade: "" });
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
    const filtered = subjects.filter((subject) =>
      subject.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredSubjects(filtered);
  };

  useEffect(() => {
    filterSubjects();
  }, [searchInput, subjects]);

  const columns = [
    { key: 'subject', label: 'Subject Name' },
    { key: 'teacher', label: 'Subject Teacher' },
    { key: 'grade', label: 'Grade' },
  ];

  return (
    <section className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 ml-10 mr-40 mt-20">
        <div className="flex justify-between mb-6 text-bgblue items-end">
          <h1 className="text-4xl font-bold">Subjects</h1>
          <button
            className="bg-bgblue text-white font-bold py-3 px-6 rounded mt-2"
            onClick={() => setShowForm(!showForm)}
          >
            Add Subject
          </button>
        </div>
        <div className="mb-6">

          <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        </div>

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
                Subjects
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <div className="flex mb-6">
                    <div className="w-1/2 mb-6 mr-4">
                      <label className="block text-inputgrey mb-1">
                        Subject Name
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.subject}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-inputgrey mb-1">
                        Subject Teacher
                      </label>
                      <input
                        className="border border-grey py-2 px-4 w-2/3 rounded"
                        type="text"
                        value={formData.teacher}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setFormData({ ...formData, teacher: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-inputgrey mb-1">Grade</label>
                    <input
                      className="border border-grey mb-16 py-2 px-4 w-1/2"
                      type="text"
                      value={formData.grade}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setFormData({ ...formData, grade: e.target.value })
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
                </div>
              </form>
            </div>
          </div>
        )}
        {filteredSubjects.length > 0 ? (
          <div className="w-1/2 h-1/2 mt-10 mx-40">
            <DynamicTable
              data={filteredSubjects}
              columns={columns}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center mr-10 h-1/2">
            <img
              src="media/empty.png"
              alt="empty page"
              className="mb-8 w-5/12"
            />
            <div className="text-center">
              <h2 className="text-3xl text-darkgrey pb-4 font-semibold">
                No subjects at this time
              </h2>
              <p className="text-darkgrey text-sm">
                Subjects will appear here after you add them.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Subjects;
