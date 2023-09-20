import React from "react";

const Verification=()=>{
    return(
        <section className="h-screen flex items-center justify-center" style={{ backgroundImage: 'url("/media/background.png")', backgroundSize: 'contain' }}>
    <div className="bg-white p-24 rounded-lg shadow-lg z-10 border border-blue-600">
        <h1 className="mb-4 text-sm font-extrabold text-blue-500 md:text-2xl ">School verification</h1>
        <form className="text-xs">
            <input className="border-2 px-4 py-2 mb-4 w-full" placeholder="School Address" /> <br />
            <input className="border-2 px-4 py-2 mb-4 w-full" placeholder="School Website" /> <br />
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full">Next</button>
        </form>
    </div>
</section>

    )    
}

export default Verification;