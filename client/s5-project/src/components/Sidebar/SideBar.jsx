import React from "react";
import { useNavigate } from "react-router-dom";


const Sidebar =()=>{


const navigate = useNavigate();


const menu = [

{
name:"Dashboard",
path:"/dashboard"
},

{
name:"Machines",
path:"/machines"
},

{
name:"Alerts",
path:"/alerts"
},

{
name:"Maintenance",
path:"/maintenance"
},

{
name:"Reports",
path:"/reports"
}

];



return(


<div className="w-64 min-h-screen bg-slate-900 text-white p-6">


<h2 className="text-2xl font-bold text-indigo-400 mb-10">

IoT Guard

</h2>



<div className="flex flex-col gap-5">


{
menu.map((item,index)=>(

<button

key={index}

onClick={()=>navigate(item.path)}

className="text-left px-4 py-3 rounded-lg hover:bg-slate-700 transition"

>


{item.name}


</button>


))
}



</div>



</div>


)


}


export default Sidebar;