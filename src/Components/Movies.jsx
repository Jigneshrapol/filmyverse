import ReactStars from "react-stars";
import { TailSpin } from "react-loader-spinner";
import React, { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { MoviesRef } from "../Firebase/Firebase";
import { Link } from "react-router-dom";

const Movies = () => {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  useEffect(() => {
    async function getdata() {
      setloading(true);
      try {
        const _data = await getDocs(MoviesRef);
        _data.forEach((doc) => {
          setdata((prev) => [...prev, { ...doc.data(), id: doc.id }]);
        });
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    }
    getdata();
  }, []);
  return (
    <div className="flex flex-wrap md:justify-between sm:justify-between lg:justify-between  px-3 w-full bg-black min-h-[100vh] pt-5">
      {loading ? (
        <span className="flex w-full p-52 justify-center ">
          <TailSpin height={50} />
        </span>
      ) : (
        <div className="flex flex-wrap justify-between  w-full">
          {data.map((e, i) => {
            return (
              <Link to={`/Movie/${e.id}`}>
                <div
                  key={i}
                  className="w-52 h-[320px] p-2 bg-white/[0.12]  flex flex-col mb-3 hover:-translate-y-2 transition-all duration-[.3s]"
                >
                  <img className="w-48 h-56" src={e.url} alt="Not Found" />
                  <span className="text-[15px] text-white mt-2">{e.Name}</span>
                  <span className="text-[15px] text-white">Year:{e.Year}</span>
                  <span className="flex items-center text-white">
                    Ratings:
                    <ReactStars edit={false} size={20} value={e.rating/e.rated} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Movies;
