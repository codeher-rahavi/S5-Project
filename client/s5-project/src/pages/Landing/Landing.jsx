import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";


const Landing = () => {


const navigate = useNavigate();



return (


<div className="min-h-screen bg-slate-50">


<Navbar />



<section className="flex flex-col lg:flex-row items-center justify-between px-20 py-24">


<div className="max-w-xl">


<h1 className="text-5xl font-bold leading-tight text-slate-800">


Smart Industrial Monitoring

with 

<span className="text-indigo-600">

 Predictive Maintenance

</span>


</h1>




<p className="mt-6 text-gray-600 text-lg">


An IoT-driven edge computing platform that monitors machine health,
detects failures early and improves industrial productivity.


</p>




<div className="mt-8 flex gap-5">


<button


onClick={()=>navigate("/SignUp")}

className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:scale-105 transition">


Get Started


</button>




<button


onClick={()=>navigate("/SignIn")}


className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg">


Login


</button>



</div>



</div>




<div className="mt-10 lg:mt-0">


<img

src="https://cdn-icons-png.flaticon.com/512/3063/3063176.png"

className="w-[350px]"

/>


</div>



</section>





<section 
id="features"
className="px-20 py-20 bg-white">


<h2 className="text-3xl font-bold text-center">

Platform Features

</h2>



<div className="grid md:grid-cols-3 gap-8 mt-10">



<div className="p-6 shadow rounded-xl">

<h3 className="text-xl font-semibold">

Real Time Monitoring

</h3>

<p className="text-gray-600 mt-3">

Monitor temperature, vibration, RPM and machine parameters instantly.

</p>


</div>





<div className="p-6 shadow rounded-xl">

<h3 className="text-xl font-semibold">

Predictive Maintenance

</h3>


<p className="text-gray-600 mt-3">

AI models predict possible machine failures before breakdown.

</p>


</div>





<div className="p-6 shadow rounded-xl">

<h3 className="text-xl font-semibold">

Edge Computing

</h3>


<p className="text-gray-600 mt-3">

Process sensor data near machines for faster decisions.

</p>


</div>



</div>


</section>





<section
id="about"
className="px-20 py-20 text-center">


<h2 className="text-3xl font-bold">

Industry 4.0 Ready

</h2>


<p className="mt-5 text-gray-600">

Designed for factories with multiple machines,
IoT sensors and large scale monitoring.

</p>


</section>



</div>



)

}


export default Landing;