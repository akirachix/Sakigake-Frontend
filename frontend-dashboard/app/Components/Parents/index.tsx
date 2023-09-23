'use client'
import React, { useState } from "react";




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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParents([...parents, formData]);
    setFormData({ parentName: "", phoneNumber: "", email: "" });
    setShowForm(false);
  };


  const filterParents = () => {
    const filtered = parents.filter((parent) =>
      parent.parentName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredParents(filtered);
  };

  React.useEffect(() => {
    filterParents();
  }, [searchInput, parents]);

  return (
    <section className="flex ">
        <div className="w-1/4">
          
        </div>
        <div className="w-3/4 ml-10 mr-40  mt-20">
      <div className="flex justify-between mb-6 text-bgblue items-end">
        <h1 className="text-4xl font-bold">Parents</h1>
        <button
          className="bg-bgblue text-white font-bold py-3 px-6 rounded mt-2"
          onClick={() => setShowForm(!showForm)}
        >
          Add parent
        </button>
      </div>
      <div className=" mr-6">
        <input
          className="border border-greygrey ml-32 py-4 px-4 w-4/5 rounded"
          type="text"
          placeholder="Search for parent by name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {parents.length === 0 ? (
        <div className="flex flex-col items-center mr-10 h-1/2">
          <img src="media/empty.png" alt="empty page" className="mb-8 w-5/12" />
          <div className="text-center">
            <h2 className="text-3xl text-3xl text-darkgrey pb-4 font-semiboldpb-4 font-semibold">No parents at this time</h2>
            <p className="text-darkgrey text-sm">Parents will appear here after you add them.</p>
          </div>
        </div>
      ) : (
        <div className="w-1/2 h-1/2">
          <table className="w-full border border-collapse mt-20 mx-40">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">Parent Name</th>
                <th className="px-2 py-2">Phone Number</th>
                <th className="px-2 py-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredParents.map((parent, index) => (
                <tr key={index} className="border-collapse text-center">
                  <td className="px-2 py-2">{parent.parentName}</td>
                  <td className="px-2 py-2">{parent.phoneNumber}</td>
                  <td className="px-2 py-2">{parent.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0  bg-gray-500 opacity-50 z-40"></div>
          <div className="bg-white w-5/6 left-52 bottom-10 sm:w-3/5 rounded-lg shadow-lg pt-28 pb-60 px-40 right-10  z-50 relative">
            <button
              className="absolute top-8 right-8 text-blue"
              onClick={() => setShowForm(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-x"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <h2 className="text-4xl mb-20 font-semibold text-darkgrey">Add Parents</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <div className="flex mb-6">
                  <div className="w-1/2 mb-6 mr-4">
                    <label className="block text-gray-600 mb-1">Parent Name</label>
                    <input
                      className="border border-grey py-2 px-4 w-2/3 rounded"
                      type="text"
                      value={formData.parentName}
                      onChange={(e) =>
                        setFormData({ ...formData, parentName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-grey-600 mb-1">Phone Number</label>
                    <input
                      className="border border-grey py-2 px-4 w-2/3 rounded"
                      type="text"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, phoneNumber: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <label className="block text-grey-600 mb-1">Email</label>
                <input
                  className="border border-grey mb-16 py-2 px-4 w-1/2"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex justify-left">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add parent
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
