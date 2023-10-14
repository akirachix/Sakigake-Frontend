import React from "react";
import { SiGoogleclassroom } from 'react-icons/si';
import { CgNotes } from 'react-icons/cg';
import { PiChalkboardTeacherDuotone } from 'react-icons/pi';
import { PiStudent } from 'react-icons/pi';
import { RiParentLine } from 'react-icons/ri';
import Layout from "../layout";

let data = [
    { icon: <SiGoogleclassroom className=" bg-bgblue rounded-full text-6xl py-2.5 mt-6 text-white"/>, user: "Classes", number: "58" },
    { icon: <CgNotes className=" bg-bgblue rounded-full text-6xl py-2.5 text-white  mt-6" />, user: "Subjects", number: "12" },
    { icon: <PiChalkboardTeacherDuotone className=" bg-bgblue rounded-full text-6xl mt-6 py-2.5 text-white"/>, user: "Teachers", number: "120" },
    { icon: <PiStudent className=" bg-bgblue rounded-full text-6xl py-2.5  mt-6 text-white"/>, user: "Students", number: "932" },
    { icon: <RiParentLine className=" bg-bgblue rounded-full text-6xl py-2.5  mt-6 text-white" />, user: "Parents", number: "932" },
];

const Display = () => {
    return (
        <Layout>
        <section className="flex ml-14 ">
            <div >
            <div className="flex flex-col rounded-2xl sm:flex-row mt-0  bg-bgblue rounded-0 mt-40">
                <div className="w-full sm:w-3/6">
                    <h1 className="text-white p-10 leading-relaxed text-4xl font-bold ">Welcome to Utawala Primary <br /> School Dashboard</h1>
                    <p className="text-lightblue text-large px-8 -mt-4 ">Track your school activities in one place</p>
                </div>
                <div className="w-1/2 sm:w-full md:w-1/2 md:float-right">
                    < img className="w-full sm:ml-0 md:ml-0 rounded-tr-2xl rounded-br-2xl" src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="pt-8 ">
                <input className="border border-grey py-2 px-4 sm:py-4 w-full md:w-1/2" type="text" placeholder=" Search for class/teacher/student..." />
            </div>
            <div className="flex flex-col mr-10 mt-4 py-20 sm:flex-row md:gap-6">
                {data.map((item, index) => (
                    <div className="text-2xl px-8 sm:py-4 gap-16 flex bg-grey" key={index} >
                        {item.icon}
                        <div className="">
                            <h2 className="text-textgrey text-xl ml-5">{item.user}</h2> <br />
                            <p className="font-extrabold  md:text-3xl text-navyblue ml-5">{item.number}</p>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </section>
        </Layout>
    );
};
export default Display;