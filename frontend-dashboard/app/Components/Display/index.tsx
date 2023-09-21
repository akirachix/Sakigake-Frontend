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
        <section className=" border-black my-20 sm:mt-0 my-0 md:mx-0  md:mr-6 mt-0 ">
            <div className="flex flex-col rounded-3xl sm:flex-row mt-0  md:mx-20 bg-blue-500 rounded-0  md:mt-40 mb-20 sm:mt-0 rounded-0">
                <div className="w-full sm:w-1/2 p-2 h-auto ">
                    <h1 className="text-white p-4 leading-relaxed md:p-8 text-4xl font-bold ">Welcome to Utawala Primary <br /> School Dashboard</h1>
                    <p className="text-lightblue text-xl p-2 md:pl-8 ">Track your school activities in one place</p>
                </div>
                <div className="w-full sm:w-1/2 md:w-1/2 md:float-right">
                    <img className="h-300 w-full sm:ml-0 md:ml-0 " src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="flex items-center mt-8 mb-2 sm:my-10 m-10 md:ml-20">
                <input className="border border-gray-300 py-2 px-4 sm:py-4 w-full md:w-1/2" type="text" placeholder=" Search for class/teacher/student..." />
            </div>
            <div className="flex flex-col py-8 px-16 sm:flex-row gap-4 md:gap-16  ">
                {data.map((item, index) => (
                    <div className="py-12 mt-2 text-2xl sm:py-12 md:px-14 flex bg-gray-200" key={index} >
                        <div className="rounded-full mr-8 bg-blue-500 p-6 sm:mr-20 md:mr-20 ">
                            <i className="rounded-full text-6xl text-white md:text-42xl  ">{item.icon}</i>
                        </div>
                        <div>
                            <h2 className="text-textgrey">{item.user}</h2> <br />
                            <p className="font-extrabold  md:text-4xl text-navyblue">{item.number}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Display;
