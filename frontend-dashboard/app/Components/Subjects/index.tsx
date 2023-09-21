'use client'
import React, { useState } from "react";

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubjects([...subjects, formData]);
    setFormData({ subject: "", teacher: "", grade: "" });
    setShowForm(false);
  };

  return (
    <section className="p-8 m-20">
      <div className="flex justify-between mb-6 text-blue-500">
        <h1 className="text-4xl font-bold">Subjects</h1>
        <button
          className="bg-blue-500 text-white py-4 px-8 rounded mt-2"
          onClick={() => setShowForm(!showForm)}
        >
          Add subject
        </button>
      </div>
      <div className="mb-6">
        <input
          className="border border-gray-300 py-2 px-4 ml-48 w-4/5 rounded"
          type="text"
          placeholder="Search for subject..."
        />
      </div>

      {showForm && (
        <div className="fixed inset-0  p-48 flex items-center justify-center z-50">
          <div className="fixed inset-0 p-48 bg-gray-500 opacity-50 z-40"></div>
          <div className="bg-white w-4/5 sm:w-1/2 md:w-1/3 rounded-lg shadow-lg p-8 z-50 relative">
            <button
              className="absolute top-2 right-2 text-lg text-gray-900 "
              onClick={() => setShowForm(false)}
            >
              X
            </button>
            <h2 className="text-2xl mb-4 font-semibold">Add Subject</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-1">Subject Name</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-1">Subject Teacher</label>
                    <input
                      className="border border-gray-300 py-2 px-4 w-full rounded"
                      type="text"
                      value={formData.teacher}
                      onChange={(e) =>
                        setFormData({ ...formData, teacher: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 mb-1 mr-20">Grade</label>
                  <input
                    className="border border-gray-300 py-2 px-4 w-1/2 rounded"
                    type="text"
                    value={formData.grade}
                    onChange={(e) =>
                      setFormData({ ...formData, grade: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {subjects.length > 0 ? (
        <div className="w-1/2 h-1/2">
          <table className="w-full border border-collapse mt-20 mx-40">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">Subject Name</th>
                <th className="px-2 py-2">Subject Teacher</th>
                <th className="px-2 py-2">Classes</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className="border-collapse text-center">
                  <td className="px-2 py-2">{subject.subject}</td>
                  <td className="px-2 py-2">{subject.teacher}</td>
                  <td className="px-2 py-2">{subject.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <img src="media/empty.png" alt="empty page" className="mb-4" />
          <div className="text-center">
            <h2 className="text-3xl pb-4 font-semibold">No subjects at this time</h2>
            <p>Subjects will appear here after you add them.</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Subjects;
