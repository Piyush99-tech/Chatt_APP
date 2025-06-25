import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

    const [authUser,setAuthUser]=useAuth();
  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
        console.log(userInfo);
    try {
      const response = await axios
      .post("/api/users/signup", userInfo,{
  withCredentials: true // ⬅️ Required
})
      toast.success("Signup successful");
       const user = response.data.payload; 
        localStorage.setItem("ChatApp", JSON.stringify(user));
      setAuthUser(user);
    } catch (error) {
      console.log(error)
      if (error.response) {
        toast.error("Error: " + error.response.data.error);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white text-black" data-theme="light">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white text-black border border-gray-300 px-6 py-4 rounded-md space-y-4 w-96 shadow-lg"
      >
        <h1 className="text-2xl text-blue-600 font-bold text-center">Messenger</h1>
        <h2 className="text-xl text-center">
          Create a new <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        {/* Fullname */}
        <label className="input input-bordered flex items-center gap-2 bg-white text-black">
          <input
            type="text"
            className="grow bg-white text-black"
            placeholder="Fullname"
            {...register("fullname", { required: true })}
          />
        </label>
        {errors.fullname && <span className="text-red-500 text-sm">Fullname is required</span>}

        {/* Email */}
        <label className="input input-bordered flex items-center gap-2 bg-white text-black">
          <input
            type="email"
            className="grow bg-white text-black"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && <span className="text-red-500 text-sm">Email is required</span>}

        {/* Password */}
        <label className="input input-bordered flex items-center gap-2 bg-white text-black">
          <input
            type="password"
            className="grow bg-white text-black"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && <span className="text-red-500 text-sm">Password is required</span>}

        {/* Confirm Password */}
        <label className="input input-bordered flex items-center gap-2 bg-white text-black">
          <input
            type="password"
            className="grow bg-white text-black"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
        )}

        {/* Submit */}
        <input
          type="submit"
          value="Signup"
          className="text-white bg-blue-600 hover:bg-blue-700 cursor-pointer w-full rounded-lg py-2 transition"
        />

        {/* Optional Login Link */}
         <p className="text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600 underline ml-1">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
