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
        <section className="">
            <div className="flex mx-20 my-20 bg-blue-400 rounded">
                <div className="w-1/2 p-20">
                    <h1 className="text-white-300 mb-2 text-2xl font-bold md:text-2xl ">Welcome to Utawala Primary School <br /> School Dashboard</h1>
                    <p className="text-gray-300 text-2sm">Track your school activities in one place</p>
                </div>
                <div className="w-1/2">
                    <img className=" " src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="rounded px-20 py-10">
                    <input type="text" placeholder="search for class/teacher/student..." />
                    
                </div>
            <div className="flex justify-between mx-10">
               {
                data.map((item,index)=>(
                    <div className="py-10 px-20 m-10 flex bg-gray-200"  key={index} >
                        <div className="pr-10 ">
                        <i>{item.icon}</i>
                        </div>
                        <div>
                        <h2>{item.user}</h2>
                        <p className="font-bold text-navy">{item.number}</p>
                        </div>
                        
                        
                </div>
                ))
               }
            </div>
        </section>
        
    )
}
export default Display;