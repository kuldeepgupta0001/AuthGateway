import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../redux/feature/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:4000/api/v1/login", {
  //       email,
  //       password,
  //     });
  //     const { message } = response.data;
  //     toast.success(message);
  //     setEmail("");
  //     setPassword("");

  //     navigate("/");
  //   } catch (error) {
  //     toast.error(error.response.data.message || "Something Went Wrong");
  //   }
  // };

  const dispatch = useDispatch();
  const { error, isAuthenticated, message } = useSelector(
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

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="w-full max-w-md rounded-lg shadow-lg bg-white p-6">
        <h2 className="text-3xl font-bold text-center">Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="text-lg block font-medium text-gray-500"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              placeholder="abcd@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
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
              value={password}
              id="password"
              placeholder="*******"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-3 block w-full px-3 py-2
               bg-red-100 border border-gray-500
                rounded-lg shadow-sm focus:outline-none
                focus:ring-indigo-500
                focus:border-indigo-500
                sm:text-sm"
            />
          </div>
          <div className="mb-4 text-right">
            <Link to="/register" className=" text-gray-500 hover:text-red-500">
              Register Here
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-red-100 py-2 px-4 text-lg font-semibold
             text-gray-500 rounded-lg focus:outline-none focus:ring-2
                focus:ring-offset-2 hover:bg-red-200 shadow-sm focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
