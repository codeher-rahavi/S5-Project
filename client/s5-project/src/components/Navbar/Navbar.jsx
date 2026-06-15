import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");


    const handleLogout = () => {

        sessionStorage.clear();

        navigate("/SignIn");

    };


    return (

        <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">


            <div 
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={()=>navigate("/")}>
                IoT-Guard
            </div>



            <div className="flex gap-8 text-gray-700 font-medium">


                <a href="#features">
                    Features
                </a>


                <a href="#about">
                    About
                </a>


                <a href="#contact">
                    Contact
                </a>


            </div>



            <div>


            {
                token ? (

                    <button

                    onClick={handleLogout}

                    className="bg-red-500 text-white px-5 py-2 rounded-lg">

                    Logout

                    </button>


                ):(


                    <button

                    onClick={()=>navigate("/SignIn")}

                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg">

                    Login

                    </button>


                )
            }


            </div>


        </nav>

    )

}


export default Navbar;