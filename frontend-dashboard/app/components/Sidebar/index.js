'use client'
import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiSettings4Line } from "react-icons/ri";
import { BiSolidDashboard } from "react-icons/bi";
import { CgNotes } from "react-icons/cg";
import { MdOutlinePersonalInjury } from "react-icons/md";
import { PiChalkboardTeacher,PiGraduationCap, PiHouseLineBold } from "react-icons/pi";

const Sidebar = () => {
  const icons = [
    { name: "Dashboard", icon: BiSolidDashboard },
    { name: "Classes", icon: PiHouseLineBold  },
    { name: "Subjects", icon: CgNotes },
    { name: "Teachers", icon: PiChalkboardTeacher, margin: true },
    { name: "Student", icon: PiGraduationCap },
    { name: "Parents", icon: MdOutlinePersonalInjury },
    { name: "Settings and profile", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);

  return (
    <section className="flex gap-6">
        
      <div
        className={`bg-mainblue min-h-screen  ${
          open ? "w-72" : "w-16"
        } duration-500 text-white px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}/>
        </div>
        <a href="#" className="ml-20 mb-8">
         <img src="/images/logo.svg" alt="logo"/>
       </a>
        <div className="mt-4 flex flex-col gap-4 relative pt-8">
          {icons.map((icon, i) => (
            <div
              key={i}
              className={` ${
                icon.margin && ""
              } group flex items-center text-ml  gap-3.5 font-medium p-2 hover:bg-hoverblue rounded-md`}
            >
              <div>{React.createElement(icon.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {icon.name}
              </h2>
              <h2 className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-mainblue rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
                {icon.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;