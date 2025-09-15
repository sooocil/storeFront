"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { User } from "@/types/users";

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
  const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

  users.push({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  localStorage.setItem("users", JSON.stringify(users));

  const fakeToken = btoa(`${data.email}:${data.password}`);
  localStorage.setItem("authToken", fakeToken);
  localStorage.setItem("userEmail", data.email);

  window.location.href = "/";
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="p-10 m-10">
        <h1 className="text-2xl font-bold mb-4">Admin Signup Page</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} type="text" />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" {...register("email")} type="email" />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" {...register("password")} type="password" />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              {...register("confirmPassword")}
              type="password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <span className="flex justify-between items-center">
            <p>Already have account?</p>
            <Link href="/login" className="underline text-teal-600">
              Sign in
            </Link>
          </span>
        </form>
      </Card>
    </div>
  );
};

export default SignupPage;
