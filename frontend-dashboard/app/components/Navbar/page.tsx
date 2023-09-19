import React from "react";
import { BiSolidDashboard } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { PiChalkboardTeacher,PiGraduationCap, PiHouseLineBold } from "react-icons/pi";
import { TbSettings} from "react-icons/tb";
import { RiGraduationCapLine} from "react-icons/ri";
// RiGraduationCapLine

const Navbar = () =>{
    return(
        <>
       <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-mainblue text-  baloo">
  
       <a href="#" className="ml-20 mb-7">
         <img src="/images/logo.svg" alt="logo"/>
       </a>
    <p className="text-center font-bold text-sl text-white mb-5">Lakewood School</p>

    {/* dashboard */}

    <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
            <a className="flex items-center px-4 py-2 text-sl text-white bg-hoverblue rounded-md text-jost" href="#">
                <BiSolidDashboard className="w-5 h-5"/>
                <span className="mx-4 font-medium">Dashboard</span>
            </a>

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <PiHouseLineBold className="w-5 h-5"/>
                <span className="mx-4 font-medium">Classes</span>
            </a>

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <CgNotes className="w-5 h-5"/>
                <span className="mx-4 font-medium">Subjects</span>
            </a>

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <PiChalkboardTeacher className="w-6 h-6"/>
                <span className="mx-4 font-medium">Teachers</span>
            </a> 

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <PiGraduationCap className="w-5 h-5"/>
                <span className="mx-4 font-medium">Students</span>
            </a> 

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <MdOutlinePersonalInjury className="w-5 h-5"/>
                <span className="mx-4 font-medium">Parents</span>
            </a> 

            <a className="flex items-center px-4 py-2 mt-5 text-white transition-colors duration-300 transform rounded-md dark:textwhite hover:bg-hoverblue dark:hover:bg-hoverblue" href="#">
                <TbSettings className="w-5 h-5"/>
                <span className="mx-4 font-medium">Settings</span>
            </a> 
        </nav>
    </div>
</aside>
        </>
    )
}

export default Navbar;