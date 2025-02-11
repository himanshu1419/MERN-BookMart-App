import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { registerUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Function to handle Firebase authentication errors
    const getErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                return "This email is already registered. Try logging in!";
            case "auth/invalid-email":
                return "Invalid email format. Please check your email.";
            case "auth/weak-password":
                return "Password is too weak. Use at least 6 characters.";
            case "auth/network-request-failed":
                return "Network error. Check your internet connection.";
            default:
                return "Registration failed. Please try again.";
        }
    };

    // Register user
    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password, data.name);
            toast.success("User registered successfully! Redirecting...", { autoClose: 2000 });
            setTimeout(() => navigate("/login"), 2500);
        } catch (error) {
            toast.error(getErrorMessage(error.code));
            console.error(error);
        }
    };

    // Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            toast.success("Login successful! Redirecting...", { autoClose: 2000 });
            setTimeout(() => navigate("/"), 2500);
        } catch (error) {
            toast.error(getErrorMessage(error.code));
            console.error(error);
        }
    };

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Please Register</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="name">Full Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            id="name"
                            placeholder='Full Name'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.name && <p className='text-red-500 text-xs italic'>Name is required.</p>}
                    </div>

                    {/* Email Field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            id="email"
                            placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.email && <p className='text-red-500 text-xs italic'>Email is required.</p>}
                    </div>

                    {/* Password Field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            id="password"
                            placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                        {errors.password && <p className='text-red-500 text-xs italic'>Password is required.</p>}
                    </div>

                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                            Register
                        </button>
                    </div>
                </form>

                <p className='align-baseline font-medium mt-4 text-sm'>
                    Have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link>
                </p>

                {/* Google sign-in */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'
                    >
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Register;