import { MdAdd } from "react-icons/md";
import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { context } from "../App";




const Header = () => {
  const provider=useContext(context);
  return (
      
    <div className='w-full h-14 flex flex-row items-center justify-between sticky top-0 z-10 left-0 bg-black/[0.9] border-b-2 border-gray-700'>
    <Link to={"/"}> <div className='p-2 cursor-pointer'>
            <span className='text-3xl text-red-500 font-semibold'>Filmy</span>
            <span className='text-3xl text-white font-semibold'>Verse</span>
               </div>  </Link> 
       
     {provider.user ?  <Link to={"/AddMovie"}> <div className='text-red-500 items-center text-xl flex flex-row p-2 mr-2 cursor-pointer'><MdAdd size={25} />Add New</div></Link>: 
       <Link to={"/Login"}><div className='text-white bg-green-500 items-center text-xl flex flex-row px-4 hover:bg-green-700 py-1 mr-5 rounded-sm cursor-pointer'>Login</div></Link>} 
    </div>
   
  )
}

export default Header;