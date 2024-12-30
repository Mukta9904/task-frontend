"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/react";

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: any) => {
    try {
      setLoading(true)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`, data);
     if(response.status === 200 && typeof window !== "undefined"){
        localStorage.setItem("token", response?.data?.token)
        router.push("/dashboard");
      }
     if(response.status === 400){
        errors.email = { type: "manual", message: "Email already exists" };
     }
    } catch (error) {
      errors.email = { type: "manual", message: "Email already exists" };
      console.log("Signup failed", error);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 rounded-md shadow-md space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Signup</h1>
        <Input
      className="max-w-xs"
      defaultValue="example@mail.com"
      errorMessage={errors?.email?.message?.toString()}
      isInvalid={errors?.email ? true : false}
      {...register("email", { required: "Email is required" })}
      label="Email"
      type="email"
      variant="bordered"
    />
        <Spacer y={1} />
        <Input
      className="max-w-xs"
      defaultValue="password"
      errorMessage="Please enter a valid password"
      isInvalid={errors?.password ? true : false}
      {...register("password", { required: "Password is required" })}
      label="Password"
      type="password"
      variant="bordered"
    />
        <Spacer y={1} />
        <Button disabled={loading} type="submit">{loading? "Loading..": "Sign Up"}</Button>
        <Spacer y={0.5} />
        <p>Already have an account?
        <a href="/login" className="text-blue-500"> Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
