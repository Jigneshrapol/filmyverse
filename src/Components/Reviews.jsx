import { addDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ReviewsRef, db } from "../Firebase/Firebase";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { context } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id ,userrated,prevrating}) => {
  const navigate = useNavigate();
  const provider = useContext(context);
  const [loading, setloading] = useState(false);
  const [form, setform] = useState({
    name:provider.username,
    rating: "",
    description: "",
    timestamp: new Date().getTime(),
    movieid: id,
  });
  const [data, setdata] = useState([]);

  const sendreview = async () => {
    try {
      if (provider.user) {
        setloading(true);
        await addDoc(ReviewsRef, form);
        const ref = doc(db, "Movies", id);
        await updateDoc(ref, {
            rating: prevrating + form.rating,
            rated: userrated + 1
        })
        swal({
          title: "Reviwe Sent Sucessfully",
          icon: "success",
          timer: 3000,
          buttons: false,
        });
        

        setform({
          name: "",
          rating: "",
          description: "",
          timestamp: new Date().getTime(),
          movieid: id,
        });
      } else {
        navigate("/Login");
      }
    } catch (error) {
      console.log(error);
    }
    setloading(false);
  };
  useEffect(() => {
    async function getdata() {
      setloading(true);
      try {
        const q = query(ReviewsRef, where("movieid", "==", id));
        const _data = await getDocs(q);
        _data.forEach((_doc) => {
          setdata((prev) => [...prev, _doc.data()]);
        });
      } catch (error) {
        console.log(error);
      }
      setloading(false);
    }
    getdata();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="">
        <ReactStars
          value={form.rating}
          size={45}
          onChange={(e) => setform({ ...form, rating: e })}
          edit={true}
        />
      </div>
      <div>
        <input
          type="text"
          className="outline-none w-full md:w-[50vw] h-10 p-1 rounded-sm bg-white/[0.12]"
          onChange={(e) => setform({ ...form, description: e.target.value })}
          placeholder="Enter your thoughts.. "
        />
      </div>
      <button
        type="submit"
        onClick={sendreview}
        className="w-full md:w-[50vw] h-10 bg-green-500 hover:bg-green-700"
      >
        {loading ? <TailSpin height={25} /> : "Share"}
      </button>
      {data.map((e, i) => {
        return (
          <div
            key={i}
            className="flex flex-col w-full p-2 md:w-[50vw] bg-black h-18 border-b-2 border-white/[0.12]"
          >
            <div className="text-xs">
              <span className="text-[18px] mr-2 text-blue-600">{e.name}</span>(
              {new Date(e.timestamp).toLocaleString()})
            </div>
            <span className="-mb-2">
              <ReactStars value={e.rating} edit={false}/>
            </span>
            <div>{e.description}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
