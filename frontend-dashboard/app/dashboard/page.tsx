'use client'
import React, { useEffect, useState } from "react";
import { SiGoogleclassroom } from 'react-icons/si';
import { CgNotes } from 'react-icons/cg';
import { PiChalkboardTeacherDuotone } from 'react-icons/pi';
import { PiStudent } from 'react-icons/pi';
import { RiParentLine } from 'react-icons/ri';
import Layout from "../components/Layout";
import { getSubject, SubjectData } from "../utilities/utils";
import { getClass, ClassData } from "../utilities/utils";
import { getTeacher, TeacherData } from "../utilities/utils";
import { getStudent, StudentData } from "../utilities/utils";
import { getParent, ParentData } from "../utilities/utils";



const Display = () => {

    // ---------------- For getting dashboard sujects

    const [subjectCount, setSubjectCount] = useState<number>(0);
   
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const subjectsData: SubjectData[] = await getSubject();
                setSubjectCount(subjectsData.length);
            } catch (error) {
                console.error("Error fetching subjects: ", error);
            }
        };

        fetchSubjects();
    }, []);

       // ---------------- For getting dashboard classes

     const [classCount, setClassCount] = useState<number>(0);
   
       useEffect(() => {
           const fetchClasses = async () => {
               try {
                   const classesData: ClassData[] = await getClass();
                   setClassCount(classesData.length);
               } catch (error) {
                   console.error("Error fetching classes: ", error);
               }
           };
   
           fetchClasses();
       }, []);


       // ---------------- For getting dashboard teachers

    const [studentCount, setStudentCount] = useState<number>(0);
   
       useEffect(() => {
           const fetchStudents = async () => {
               try {
                   const studentData: StudentData[] = await getStudent();
                   setStudentCount(studentData.length);
               } catch (error) {
                   console.error("Error fetching student: ", error);
               }
           };
           fetchStudents();
       }, []);


       // ---------------- For getting dashboard students
      
    const [teacherCount, setTeacherCount] = useState<number>(0);
   
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const teacherData: TeacherData[] = await getTeacher();
                setTeacherCount(teacherData.length);
            } catch (error) {
                console.error("Error fetching teacher: ", error);
            }
        };

        fetchTeachers();
    }, []);

       // ---------------- For getting dashboard parents

       const [parentCount, setParentCount] = useState<number>(0);
   
       useEffect(() => {
           const fetchParents = async () => {
               try {
                   const parentData: ParentData[] = await getParent();
                   setParentCount(parentData.length);
               } catch (error) {
                   console.error("Error fetching parent: ", error);
               }
           };
   
           fetchParents();
       }, []);

       


    let data = [
        { icon: <SiGoogleclassroom className=" bg-bgblue rounded-full text-6xl py-2.5 mt-4 text-white"/>, user: "Classes", number: classCount.toString() },
        { icon: <CgNotes className=" bg-bgblue rounded-full text-6xl py-2.5 text-white  mt-4" />, user: "Subjects", number: subjectCount.toString() },
        { icon: <PiChalkboardTeacherDuotone className=" bg-bgblue rounded-full text-6xl mt-4 py-2.5 text-white"/>, user: "Teachers", number: teacherCount.toString() },
        { icon: <PiStudent className=" bg-bgblue rounded-full text-6xl py-2.5  mt-4 text-white"/>, user: "Students", number: studentCount.toString() },
        { icon: <RiParentLine className=" bg-bgblue rounded-full text-6xl py-2.5  mt-4 text-white" />, user: "Parents", number: parentCount.toString() },
    ];


    return (
        <Layout>

        <section className="flex ml-14">
            <div >
            <div className="flex flex-col mr-10 rounded-2xl sm:flex-row mt-0  bg-bgblue rounded-0  md:mt-24 mb-10 sm:mt-0">
                <div className="w-full sm:w-3/6 ">
                    <h1 className="text-white p-8 leading-relaxed text-3xl font-bold ">Welcome to Utawala Primary <br /> School Dashboard</h1>
                    <p className="text-lightblue text-large px-8 -mt-4 ">Track your school activities in one place</p>
                </div>
                <div className="w-1/2 sm:w-full md:w-1/2 md:float-right">
                    <img className="h-200 w-full sm:ml-0 md:ml-0 " src="media/dashboard.png" alt="" />
                </div>
            </div>
            <div className="pt-8 ">
                <input className="border border-grey py-2 px-4 sm:py-4 w-full md:w-1/2" type="text" placeholder=" Search for class/teacher/student..." />
            </div>
            <div className="flex flex-col py-16 sm:flex-row md:gap-4">
                {data.map((item, index) => (
                    <div className="text-2xl px-5 sm:py-4 gap-10 flex bg-grey" key={index} >
                        {item.icon}
                        <div>
                            <h2 className="text-textgrey text-xl">{item.user}</h2> <br />
                            <p className="font-extrabold  md:text-3xl text-navyblue">{item.number}</p>
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
