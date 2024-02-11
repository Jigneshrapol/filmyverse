import { addDoc} from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import {  MoviesRef, db } from '../Firebase/Firebase'
import { TailSpin } from 'react-loader-spinner'
import swal from 'sweetalert'
import { context } from '../App'
import { useNavigate } from 'react-router-dom'



const Addmovie = () => {
  const navigate =useNavigate();
  const provider=useContext(context);
  const [loading,setloading]=useState(false)
  const [form,setform]=useState({
    Name:"",
    url:"",
    Description:"",
    Year:""
  })
  const add=async()=>{
    
    try {
     if(provider.user)
     {
      setloading(true)
      await  addDoc(MoviesRef,form);
      swal({
        title:"Added Sucessfully",
        icon:"success",
        timer:3000,
        buttons:false
      })
    }
    else{
      navigate("/Login")
    }
    } catch (error) {
      console.log(error)
    }
    setform({
      Name:"",
      url:"",
      Description:"",
      Year:""
    })
    setloading(false)
  }
 
  return (
    <div className='flex pt-20 items-center flex-col bg-black h-[92vh] text-white'>
      <div><h1 className='text-3xl font-semibold'>Add <span className='text-red-500'>Movie</span></h1></div>
      <form>
        <div className='mb-3'><label>Name</label><br/><input type='text' placeholder='Enter Movie Name..' value={form.Name} onChange={(e)=>setform({...form,Name:e.target.value})} className=' text-black px-2 py-3 w-full md:w-[400px] outline-red-500 h-10 rounded-lg '/></div>
       <div className='mb-3'><label>Image Url</label><br/><input type='text' value={form.url} onChange={(e)=>setform({...form,url:e.target.value})} placeholder='Enter Movie Name..' className=' text-black px-2 py-3 w-full md:w-[400px] outline-red-500 h-10 rounded-lg '/></div>
        <div className='mb-3'><label>Year</label><br/><input type='text' value={form.Year} onChange={(e)=>setform({...form,Year:e.target.value})} placeholder='Enter Movie Name..' className=' text-black px-2 py-3 w-full md:w-[400px] outline-red-500 h-10 rounded-lg '/></div>
        <div className='mb-3'><label>Description</label><br/><input type='text' value={form.Description} onChange={(e)=>setform({...form,Description:e.target.value})} placeholder='Enter Movie Name..' className=' text-black w-full md:w-[400px] outline-red-500 h-24 rounded-lg '/></div>
        
        </form>
        <button type='button' onClick={add} className='bg-green-500 hover:bg-green-700 py-3 w-full md:w-[400px] flex justify-center rounded-lg'>{loading?  <TailSpin height={25}/> :"Submit"}</button>
    </div>
  )
}

export default Addmovie;