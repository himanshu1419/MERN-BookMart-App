import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Make API call to authenticate admin
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: { "Content-Type": "application/json" },
      });

      const auth = response.data;

      // Store token and navigate if successful
      if (auth.token) {
        localStorage.setItem("token", auth.token);
        Swal.fire({
          title: "Login Successful!",
          text: "Welcome to the Admin Dashboard.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle server errors
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again.";
      setMessage(errorMsg);

      Swal.fire({
        title: "Login Failed",
        text: errorMsg,
        icon: "error",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              {...register("username", { required: "Username is required." })}
              type="text"
              id="username"
              placeholder="Username"
              className="shadow-md rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required." })}
              type="password"
              id="password"
              placeholder="Password"
              className="shadow-md rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>

          {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

          <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminLogin;