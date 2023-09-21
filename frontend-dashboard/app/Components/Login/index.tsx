'use client'
import React from "react";

const Login = () => {
  return (
    <section className="lg:flex " >
      <div className="lg:w-1/2 bg-contain bg-center h-screen sm:mt-0 h-1/2 md:mt-0 h-1/2" style={{ backgroundImage: 'url("/media/background.png")' }}>
        <img className="lg:ml-10 lg:mt-10 "  src="/media/mzaziconnect.svg" alt="mzaziconnect logo" />
        <img src="/media/login.png" alt="mzaziconnect login image" />
      </div>
      <div className="lg:w-1/2 text-center lg:mt-40 ">
        <h1 className="text-textblue font-baloo font-bold text-4xl mb-4 lg:mb-9">Welcome, Log into your account</h1>
        <div className="lg:px-20 lg:py-10">
          <p className="text-lightgrey text-lg pb-4 lg:pb-6">It is our great pleasure to have you on board!</p>
          <form className="my-4 lg:my-6 text-sm">
            <input className="lg:px-8 lg:py-2 border border-gray-300 rounded text-sm text-mildgrey mb-2" placeholder="School Name" /> <br /><br />
            <input className="lg:px-8 lg:py-2 border border-gray-300 rounded text-sm text-mildgrey mb-2" placeholder="School Code" /><br /> <br />
            <input className="lg:px-8 lg:py-2 border border-gray-300 rounded text-sm text-mildgrey mb-2" placeholder="Password" /> <br /> <br />
            <button className="bg-blue-500 text-white text-base font-bold px-6 py-2 w-6/12 lg:w-4/12 mb-4 lg:mb-10 rounded">Login</button>
            <p className="text-gray-400">Already have an account? <b className="text-blue-500">Sign up</b></p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
