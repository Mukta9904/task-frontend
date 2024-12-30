"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/react";
const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, data);
     if(response.status === 200){
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
         router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          errorMessage={errors.email?.message?.toString()}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          errorMessage={errors.password?.message?.toString()}
        />
        <Spacer y={1} />
        <Button disabled={loading} type="submit">{loading? "Loading..": "Log In"}</Button>
        <Spacer y={0.5} />
        <p>Don&apos;t have an account?  
        <a href="/signup" className="text-blue-500"> Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
