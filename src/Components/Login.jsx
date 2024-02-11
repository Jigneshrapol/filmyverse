import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { query, where, getDocs } from "firebase/firestore";
import { UserRef } from "../Firebase/Firebase";
import { context } from "../App";
import swal from "sweetalert";
import { TailSpin } from "react-loader-spinner";

const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const provider = useContext(context);
  const [form, setform] = useState({
    Phone: "",
    Password: "",
  });
  const verifiypass = async () => {
    setloading(true);
    const q = query(UserRef, where("Phone", "==", form.Phone));
    const snapshot = await getDocs(q);
    snapshot.forEach((_doc) => {
      const _data = _doc.data();
      if (form.Password === _data.Password) {
        swal({
          title: "Login Sucess",
          icon: "success",
          buttons: false,
          timer: 2000,
        });
        provider.setusername(_data.Name)
        provider.setuser(true);
        navigate("/");
        console.log(_data.Password);
        console.log(_data.Name);
        setloading(false);
      } else {
        swal({
          title: "Invalid details",
          icon: "error",
          buttons: false,
          timer: 2000,
        });
        provider.setuser(false);
        console.log(_data.Password);
        console.log(_data.Name);
        setloading(false);
      }
    });
  };
  return (
    <div className="flex justify-center bg-black h-[92vh]">
      <div className="mt-32 flex flex-col ">
        <h1 className="text-white text-[35px] font-semibold text-center pb-5">
          Log<span className="text-red-500">in</span>
        </h1>
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
            onChange={(e) => setform({ ...form, Password: e.target.value })}
            className=" text-black px-2 py-3 w-[400px] outline-red-500 h-10 rounded-lg "
          />
        </div>
        <div className="w-[400px] flex justify-center">
          {" "}
          <button
            onClick={verifiypass}
            className="px-8 py2 bg-green-500 h-10 mt-5 rounded-sm text-center text-white font-semibold hover:bg-green-700"
          >
            {loading ? <TailSpin color="white" height={25} /> : "Login"}
          </button>
        </div>
        <div className="text-white flex justify-center mt-5">
          <h1>
            Do Not Have Account?{" "}
            <Link className="text-blue-500" to={"/signup"}>
              Signup
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
