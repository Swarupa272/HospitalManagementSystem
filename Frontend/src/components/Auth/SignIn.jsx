import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  loginFailure,
  loginProgress,
  loginSuccess,
} from "../../redux/UserSlice.js";
import { Link } from "react-router-dom";

function SignIn() {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);

  const [isPassVisible, setIsPassVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginProgress());
    axios
      .post("http://localhost:3000/auth/login", data)
      .then((res) => {
        if (res.data.role === "patient") {
          const user = res.data.user;
          dispatch(login(user));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", res.data.role);
          navigate("/user-profile");
          dispatch(loginSuccess());
        } else if (res.data.role === "admin") {
          const user = res.data.user;
          dispatch(login(user));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("role", res.data.role);
          navigate("/admin-dashboard");
          dispatch(loginSuccess());
        } else if (res.data.role === "doctor" || res.data.role === "nurse") {
          dispatch(loginFailure());
          Swal.fire({
            title: "Invalid Role!",
            icon: "error",
            confirmButtonText: "Ok",
            text: "Login Through Your Respective Page!",
          });
        } else {
          dispatch(loginFailure());
          Swal.fire({
            title: "Invalid Access!",
            icon: "error",
            confirmButtonText: "Ok",
            text: "You are not authorized to access this page!",
          });
        }
      })
      .catch((err) => {
        dispatch(loginFailure());
        Swal.fire({
          title: "Invalid Credentials!",
          icon: "error",
          confirmButtonText: "Ok",
          text: "Please Check Your Credentials and Try Again!",
        });
      });
  };

  const handleDoctor = () => {
    navigate("/doctor-sign-in");
  };

  const handleNurse = () => {
    navigate("/nurse-sign-in");
  };

  const handleVisible = () => {
    setIsPassVisible(!isPassVisible);
  };

  return (
    <section className="bg-[#FEFAE0] h-screen w-screen">
      <div
        className="flex items-center justify-center h-full max-w-7xl m-auto md:w-[60%] rounded-xl lg:w-[40%]  "
      >
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-[#CCD5AE] shadow-xl shadow-black p-4 rounded-lg">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-black">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2 border-black border-2 rounded-lg">
                  <input
                    className="flex h-10 w-full rounded-md border  outline-none border-none bg-transparent px-3 py-2 text-sm placeholder:text-black  disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2 flex justify-evenly items-center border-black border-2 rounded-lg ">
                  <input
                    className="flex h-10 w-full rounded-md border  outline-none border-none bg-transparent px-3 py-2 text-sm placeholder:text-black  disabled:cursor-not-allowed disabled:opacity-50"
                    type={!isPassVisible ? "password" : "text"}
                    placeholder="Password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                  ></input>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={handleDoctor}
            >
              SignIn As Doctor
            </button>
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={handleNurse}
            >
              SignIn As Nurse
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignIn;