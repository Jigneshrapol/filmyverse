import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import {  UserRef, app } from "../Firebase/Firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";


const auth = getAuth(app);

const Signup = () => {
  const [loading,setloading]=useState(false)
  
  const navigate=useNavigate();
  
  const [form, setform] = useState({
    Name: "",
    Phone: "",
    Password:"",
  });
  const [r,setr]=useState()
  const [reqotp, setreqotp] = useState(false);
  const [otp, setotp] = useState("");

  const verifiyotp= async()=>{
    try {
      setloading(true)
      await addDoc(UserRef,form)
    } catch (error) {
      console.log(error)
      swal({
        timer:"2000",
        icon:"error",
        title:"techinical error found",
        buttons:false
      })
    }
   
    const code = otp;
  
    r.confirm(code).then((result) => {
    const user = result.user;
  swal({
    timer:2000,
    title:"Verified Sucessfully",
    icon:"success",
    buttons:false
  }) 
 setloading(false)
   navigate("/Login")
  setreqotp(false)
  
}).catch((error) => {
  console.log(error)
});
  }

  const sendotp = () => {
    setreqotp(false);
    setloading(true)
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "a", {});
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.Phone}`, appVerifier)
      .then((confirmationResult) => {
        setr(confirmationResult)
        window.confirmationResult = confirmationResult;
        swal({
          timer: 2000,
          title: "OTP Sent Succesfully",
          icon: "success",
          buttons: false,
        });
        setloading(false)
        setreqotp(true);
       
      })
      .catch((error) => {
        console.log(error);
        setloading(false)
        setreqotp(false);
      });
  };
  return (
    <div className="flex justify-center bg-black h-[92vh]">
      {reqotp ? (
        <div className="">
          <h1 className="text-white mt-32 text-[35px] font-semibold text-center pb-5">
            Sign<span className="text-red-500">up</span>
          </h1>
          <div className="mb-3 text-red-500">
            <label>OTP</label>
            <br />
            <input
              type="number"
              placeholder="Enter valid otp..."
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              className=" text-black px-2 py-3 w-[400px] outline-red-500 h-10 rounded-lg "
            />
          </div>
          <div className=" w-[400px] text-center mt-3">
            
            <button onClick={verifiyotp} className="text-white px-8 py-2 bg-green-500 text-center hover:bg-green-700 rounded-sm">
             {loading?<TailSpin height={25} color="white"/>  :"Confirm Otp" }
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-32 flex flex-col ">
          <h1 className="text-white text-[35px] font-semibold text-center pb-5">
            Sign<span className="text-red-500">up</span>
          </h1>
          <div className="mb-3 text-red-500">
            <label>Name</label>
            <br />
            <input
              type="text"
              placeholder="Enter Mobile No.."
              value={form.Name}
              onChange={(e) => setform({ ...form, Name: e.target.value })}
              className=" text-black px-2 py-3 w-[400px] outline-red-500 h-10 rounded-lg "
            />
          </div>
          <div className="mb-3 text-red-500">
            <label>Mobile No</label>
            <br />
            <input
              type="number"
              placeholder="Enter Mobile No.."
              value={form.Phone}
              onChange={(e) => setform({ ...form, Phone: e.target.value })}
              className=" text-black px-2 py-3 w-[400px] outline-red-500 h-10 rounded-lg "
            />
          </div>
          <div className="mb-3 text-red-500">
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              value={form.Password}
              onChange={(e) => setform({...form,Password:e.target.value})}
              className=" text-black px-2 py-3 w-[400px] outline-red-500 h-10 rounded-lg "
            />
          </div>
          <div className="a" id="a"></div>
          <div className="w-[400px] flex justify-center">
            {" "}
            <button
              onClick={sendotp}
              className="px-8 py2 bg-green-500 h-10 mt-5 rounded-sm text-white font-semibold hover:bg-green-700"
            >
              {loading?<TailSpin height={25} color="white"/>  :"Request OTP" }
            </button>
          </div>
          <div className="text-white flex justify-center mt-5">
            <h1>
              Do Not Have Account?{" "}
              <Link className="text-blue-500" to={"/Login"}>
                Login
              </Link>{" "}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
