''
import React from "react"
import {SiGoogleclassroom} from 'react-icons/si';
import {CgNotes} from 'react-icons/cg';
import {PiChalkboardTeacherDuotone} from 'react-icons/pi';
import {PiStudent} from 'react-icons/pi';
import {RiParentLine} from 'react-icons/ri';






let data =[
    {icon:<SiGoogleclassroom/>,user:"Classes",
     number:"58"},
     {icon:<CgNotes/>,user:"Subjects",
     number:"12"},
     {icon:<PiChalkboardTeacherDuotone/>,user:"Teachers",
     number:"120"},
     {icon:<PiStudent/>,user:"Student",
     number:"932"},
     {icon:<RiParentLine/>,user:"Parents",
     number:"932"},
]
const Display =()=>{
    return(
       <section className="rounded-full border-black ">
            <div className="flex mx-20 bg-blue-400 rounded mt-40">
                <div className="w-1/2 p-2 h-44">
                    <h1 className="text-white m-2 text-2xl font-bold ">Welcome to Utawala Primary School <br /> School Dashboard</h1>
                    <p className="text-gray-200 text-sm">Track your school activities in one place</p>
                </div>
                <div className="w-1/2">
                    <img className="h-300 ml-60" src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="flex items-center my-10 ml-20 ">
                <input className=" border border-gray-300 py-4 w-1/2" type="text" placeholder="    search for class/teacher/student..." />
            </div>
            <div className="flex gap-14 mx-20 ">
                {data.map((item, index) => (
                    <div className="py-12 px-16 flex bg-gray-200" key={index} >
                        <div className="rounded-full bg-blue-500 p-6 mr-4 ">
                            <i className="rounded-full text-3xl text-white">{item.icon}</i>
                        </div>
                        <div>
                            <h2 className="text-gray-400">{item.user}</h2> <br />
                            <p className="font-extrabold text-3xl text-navy">{item.number}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Display;