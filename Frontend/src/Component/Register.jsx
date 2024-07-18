import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import toast from "react-hot-toast";
import { clearErrors, register } from "../redux/feature/userSlice";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, message } = useSelector(
    (state) => state.user
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      toast.success(message);
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate, message]);

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { name, email, password } = userData;
  //     const response = await axios.post(
  //       "http://localhost:4000/api/v1/register",
  //       {
  //         name,
  //         email,
  //         password,
  //       }
  //     );
  //     const { message } = response.data;
  //     toast.success(message);

  //     navigate("/login");
  //   } catch (error) {
  //     toast.error(error.response.data.message || "Something went Wrong");
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(register(userData));
  };
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="w-full max-w-md rounded-lg shadow-lg bg-white p-6">
          <h2 className="text-3xl font-bold text-center">Sign Up</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-lg block font-medium text-gray-500"
              >
                Name
              </label>
              <input
                onChange={handleChange}
                // onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                value={userData.name}
                id="name"
                placeholder="Username"
                className="mt-3 block w-full px-3 py-2
               bg-red-100 border border-gray-500
                rounded-lg shadow-sm focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="text-lg block font-medium text-gray-500"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                // onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={userData.email}
                id="email"
                placeholder="abcd@gmail.com"
                className="mt-3 block w-full px-3 py-2
               bg-red-100 border border-gray-500
                rounded-lg shadow-sm focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-lg block font-medium text-gray-500"
              >
                Password
              </label>
              <input
                type="password"
                value={userData.password}
                id="password"
                placeholder="*******"
                name="password"
                // onChange={(e) => setPassword(e.target.value)}
                onChange={handleChange}
                className="mt-3 block w-full px-3 py-2
               bg-red-100 border border-gray-500
                rounded-lg shadow-sm focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm"
              />
            </div>
            <div className="mb-4 text-right">
              <Link to="/login" className=" text-gray-500 hover:text-red-500">
                Sign In Here
              </Link>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-100 py-2 px-4 text-lg font-semibold
             text-gray-500 rounded-lg focus:outline-none focus:ring-2
                focus:ring-offset-2 hover:bg-red-200 shadow-sm focus:ring-indigo-500"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
