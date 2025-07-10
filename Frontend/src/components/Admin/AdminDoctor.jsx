import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Shared/Loader";
import AdminSidebar from "./AdminSidebar";

function AdminDoctor() {
  const [doctors, setDoctors] = useState([]);
  const userString = localStorage.getItem("user");
  const [docname, setDocName] = useState("");
  const [docemail, setDocEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/doctor/get-doctors"
        );
        setDoctors(response.data);
      } catch (error) {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Fetching Data!",
        });
      }
    };
    fetchData();
  }, []); 

  if (!doctors) {
    return <Loader />;
  }

const handleAddDoctor = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/doctor/add-doctor",{
        userName:docname,
        email:docemail
      }).then((res)=>{
        if(res.data.message === "Success"){
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Doctor Added Successfully!",
          });
        }

      }).catch((e)=>{
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Adding Doctor!",
        });
      })
  };

  const [isCreate, setIsCreate] = useState(false);
  const editPatient = async (id) => {
    await axios
      .put(`http://localhost:3000/doctor/update-doctor/${id}`, {})
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Doctor Updated Successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "warning",
          text: "Could not update Doctor!",
        });
      });
  };

  const deleteDoctor = async (id) => {
    await axios
      .delete(`http://localhost:3000/doctor/delete-doctor/${id}`,)
      .then((res) => {
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Patient Deleted Successfully!",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Error Deleting Patient!",
        });
      });
  };

  const handleCreate = () => {
    setIsCreate(!isCreate);
  };

  const handleGoBack = () => {
    setIsCreate(!isCreate);
  };
  return (
    <section className="bg-slate-300 flex justify-center items-center min-h-screen">
      <div className="h-[80%] w-[80%] bg-white shadow-xl p-2 flex">
      <AdminSidebar  userName={"Admin"}/>
        <div className=" w-[70%] ms-24 p-4 flex flex-col justify-start gap-5 ">
          <p className="font-semibold text-3xl">Doctors</p>
          <div className="w-full">
            <div className="relative overflow-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Doctor Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctors &&
                    doctors.map((item, index) => (
                      <tr key={item._id} className="text-black">
                        <td scope="col" className="px-6 py-3">
                          {index + 1}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.userName}
                        </td>
                        <td scope="col" className="px-6 py-3">
                          {item.email}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            onClick={handleCreate}
            className="bg-slate-900 p-2 w-[10%] rounded-full hover:scale-110 duration-200 active:scale-90  text-white"
          >
            Create
          </button>
        </div>
        {isCreate && (
          <div className="absolute h-[50%] w-[79%] z-50 bg-white">
            <form className="flex flex-col w-full h-full justify-center gap-4 items-center">
              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Doctors Name:</p>
                <input
                  onChange={(e) => setDocName(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Doctor Name"
                ></input>
              </div>

              <div className="flex flex-col w-[40%] items-center ">
                <p className="">Enter Doctors Email:</p>
                <input
                  onChange={(e) => setDocEmail(e.target.value)}
                  className="flex h-10  w-[90%] rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  placeholder="Email"
                ></input>
              </div>
              <button onClick={ handleAddDoctor} className=" w-[35%] bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-110 duration-200 active:scale-90">
                Add Doctor
              </button>

              <button
                onClick={handleGoBack}
                className="bg-black text-white rounded-full text-md font-medium p-2 cursor-pointer hover:scale-105 duration-200 active:scale-90"
              >
                {"<- Go back"}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDoctor;