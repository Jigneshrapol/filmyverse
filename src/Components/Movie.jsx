import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import ReactStars from "react-stars";
import Reviews from "./Reviews";

const Movie = () => {
  
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    Name: "",
    url: "",
    Description: "",
    Year: "",
    rating:0,
    rated:0
  });
  const { id } = useParams();
  useEffect(() => {
    const getdata = async () => {
      try {
        setloading(true);
        const _doc = doc(db, "Movies", id);
        const _data = await getDoc(_doc);
        setform(_data.data());

      } catch (error) {
        console.log(error);
      }
      setloading(false);
    };
    getdata();
  }, []);
  return (
    <div className="flex flex-col  md:flex-row min-h-[93vh] bg-black  text-white">
      <div className="w-full md:w-[45vw] flex justify-center md:justify-end pr-10 pt-10 ">
        <img
          src={form.url}
          className="md:w-[30vw] sm:w-full  w-full h-[70vh] sticky top-24 pl-3 left-0 "
          alt=""
        />
      </div>
      <div className="flex flex-col w-full md:pl-0 pl-6 md:w-[60vw]">
        <div className="text-[7vh] -mb-2  text-white/[0.50] pt-8">
          {form.Name}
          <span className="text-xl ml-3">({form.Year})</span>
        </div>
        <div className="">
          <ReactStars value={form.rating/form.rated} size={25} edit={false} />
        </div>
        <div className="w-full border-b-2 border-white/[0.20] pb-3 mr-1">
          {form.Description}
        </div>
        <div>
          <Reviews id={id} prevrating={form.rating} userrated={form.rated} />
        </div>
      </div>
    </div>
  );
};

export default Movie;
