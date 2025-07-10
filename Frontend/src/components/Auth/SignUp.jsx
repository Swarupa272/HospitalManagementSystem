import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function SignUp() {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/register", data)
      .then((res) => {
        if (res.data.message === "Success") {
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Registering User! Please Try Again!",
          button: "Ok",
        });
      });
  };

  return (
    <section className="bg-[#FEFAE0] p-3">
      <div className="flex items-center  justify-center px-8 py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md bg-[#CCD5AE] shadow-xl shadow-black p-5 rounded-lg mt-6">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Full Name{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="name"
                    onChange={(e) =>
                      setData({ ...data, userName: e.target.value })
                    }
                    value={data.userName}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Password{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                  />
                </div>
                <div>
                  <label
                    htmlFor="role"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Role{" "}
                  </label>

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Role (e.g., admin, doctor, nurse, receptionist, patient)"
                      id="role"
                      onChange={(e) =>
                        setData({ ...data, role: e.target.value })
                      }
                      value={data.role}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Phone Number{" "}
                  </label>

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Phone Number"
                      id="phoneNumber"
                      onChange={(e) =>
                        setData({ ...data, phoneNumber: e.target.value })
                      }
                      value={data.phoneNumber}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Date of Birth{" "}
                  </label>

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="date"
                      placeholder="Date of Birth"
                      id="dateOfBirth"
                      onChange={(e) =>
                        setData({ ...data, dateOfBirth: e.target.value })
                      }
                      value={data.dateOfBirth}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Gender{" "}
                  </label>
                  <select
                    id="gender"
                    className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    value={data.gender}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="street"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Address{" "}
                  </label>

                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm placeholder:text-black focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Address"
                      id="address"
                      onChange={(e) =>
                        setData({
                          ...data,
                          address: { ...data, address: e.target.value },
                        })
                      }
                      value={data.address}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              onClick={handleSubmit}
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-black px-3.5 py-2.5 font-semibold text-white transition-all duration-200 hover:bg-slate-900 "
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;