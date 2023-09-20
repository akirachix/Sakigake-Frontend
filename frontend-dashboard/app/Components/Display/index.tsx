import React from "react";
import { SiGoogleclassroom } from 'react-icons/si';
import { CgNotes } from 'react-icons/cg';
import { PiChalkboardTeacherDuotone } from 'react-icons/pi';
import { PiStudent } from 'react-icons/pi';
import { RiParentLine } from 'react-icons/ri';

let data = [
    { icon: <SiGoogleclassroom />, user: "Classes", number: "58" },
    { icon: <CgNotes />, user: "Subjects", number: "12" },
    { icon: <PiChalkboardTeacherDuotone />, user: "Teachers", number: "120" },
    { icon: <PiStudent />, user: "Student", number: "932" },
    { icon: <RiParentLine />, user: "Parents", number: "932" },
];

const Display = () => {
    return (
        <section className="rounded-full border-black md:mr-6 sm:mx-2">
            <div className="flex flex-col sm:flex-row mx-2 md:mx-20 bg-blue-500 rounded mt-4 md:mt-20 sm:mt-0">
                <div className="w-full sm:w-1/2 p-2 h-auto md:h-44">
                    <h1 className="text-white p-4 md:p-8 text-2xl font-bold ">Welcome to Utawala Primary <br /> School Dashboard</h1>
                    <p className="text-gray-200 p-2 md:pl-8 text-sm">Track your school activities in one place</p>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 md:float-right">
                    <img className="h-300 ml-0 sm:ml-0 md:ml-0 md:mr-60" src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="flex items-center my-4 sm:my-10 ml-2 md:ml-20 ">
                <input className="border border-gray-300 py-2 sm:py-4 w-full md:w-1/2" type="text" placeholder="Search for class/teacher/student..." />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 md:gap-16 mx-2 md:mx-20 ">
                {data.map((item, index) => (
                    <div className="py-6 sm:py-12 px-4 md:px-16 flex bg-gray-200" key={index} >
                        <div className="rounded-full bg-blue-500 p-2 sm:p-12 mr-4 md:mr-4 ">
                            <i className="rounded-full text-2xl md:text-3xl text-white  ">{item.icon}</i>
                        </div>
                        <div>
                            <h2 className="text-gray-400">{item.user}</h2> <br />
                            <p className="font-extrabold text-xl md:text-3xl text-navy">{item.number}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Display;
