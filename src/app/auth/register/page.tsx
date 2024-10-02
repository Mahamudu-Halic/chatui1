"use client";

import { Button } from "@/components/styled/button.styled.component";
import {
  authLoading,
  getUsers,
  userRegistered,
} from "@/features/auth/auth.slice";
import {
  convertBase64,
  getDate,
  useAppDispatch,
  useAppSelector,
} from "@/lib/hooks";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsEye, BsImageAlt } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { RegisterType } from "../../../../types";
import toast, { Toaster } from "react-hot-toast";
import { ClipLoader, HashLoader } from "react-spinners";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import AccountSuccessLoader from "@/components/AccountSuccessLoader";

interface FormField extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  name: HTMLInputElement;
}

interface FormFieldElements extends HTMLFormElement {
  readonly elements: FormField;
}

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profile, setProfile] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const loading = useAppSelector(authLoading);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  const handleImageUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64: string = await convertBase64(file);
      setProfile(base64);
    }
  };

  // submit function
  const handleSubmit = (e: React.FormEvent<FormFieldElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const email = elements.email.value;
    const name = elements.name.value;
    const password = elements.password.value;
    const confirmPassword = elements.confirmPassword.value;

    const details: RegisterType = {
      email,
      password,
      name,
      confirmPassword,
      uid: nanoid(),
      createdAt: getDate(),
      profile,
    };

    dispatch(userRegistered(details));
  };

  useEffect(() => {
    if (loading === "success") {
      router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    }
  }, [loading]);

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-3 ">
      <Toaster />
      {loading !== "success" ? (
        <>
          <h3 className="text-xl font-bold">Create New Account</h3>
          <form
            onSubmit={handleSubmit}
            className=" bg-white rounded-xl p-3 w-[350px] flex flex-col gap-5"
          >
            <label
              className="bg-[#b4b5b4] border rounded-full p-3 h-[150px] w-[150px] mx-auto flex flex-col items-center justify-center cursor-pointer"
              htmlFor="profile"
            >
              {profile ? (
                <div className="relative w-full h-full">
                  <Image
                    fill
                    src={profile}
                    alt="profile"
                    className="object-cover object-center rounded-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-3">
                  <BsImageAlt size={50} />
                  <p className="text-xs text-center">
                    Upload Profile (optional)
                  </p>
                </div>
              )}
            </label>
            <div className="flex flex-col gap-2">
              <label className="text-[#000] text-sm" htmlFor="name">
                Username<span className="ml-1 text-red-600">*</span>
              </label>
              <input
                disabled={loading === "pending" ? true : false}
                className="text-[#000] p-2 rounded-xl w-full bg-transparent border"
                type="text"
                id="name"
                name="name"
                placeholder="@example"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#000] text-sm" htmlFor="email">
                Email<span className="ml-1 text-red-600">*</span>
              </label>
              <input
                disabled={loading === "pending" ? true : false}
                className="text-[#000] p-2 rounded-xl w-full bg-transparent border"
                type="email"
                id="email"
                name="email"
                placeholder="example@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#000] text-sm" htmlFor="password">
                Password<span className="ml-1 text-red-600">*</span>
              </label>
              <div className="w-full border rounded-xl flex items-center gap-2 p-1 pr-2 focus-within:border-blue-600 focus-within:border-[2px]">
                <input
                  disabled={loading === "pending" ? true : false}
                  className="text-[#000] p-2 w-full h-full bg-transparent outline-none"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="test123"
                />
                {showPassword ? (
                  <FaEyeSlash
                    color="black"
                    size={20}
                    onClick={toggleShowPassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <BsEye
                    color="black"
                    size={20}
                    onClick={toggleShowPassword}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[#000] text-sm" htmlFor="confirmPassword">
                Confirm Password<span className="ml-1 text-red-600">*</span>
              </label>
              <div className="w-full border rounded-xl flex items-center gap-2 p-1 pr-2 focus-within:border-blue-600 focus-within:border-[2px]">
                <input
                  disabled={loading === "pending" ? true : false}
                  className="text-[#000] p-2 w-full h-full bg-transparent outline-none"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="test123"
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    color="black"
                    size={20}
                    onClick={toggleShowConfirmPassword}
                    className="cursor-pointer"
                  />
                ) : (
                  <BsEye
                    color="black"
                    size={20}
                    onClick={toggleShowConfirmPassword}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>

            <input
              type="file"
              onChange={(e) => handleImageUpload(e)}
              accept="image/*"
              id="profile"
              className="hidden"
            />

            <Button
              variant="standard"
              type="submit"
              disabled={loading === "pending" ? true : false}
            >
              {loading === "pending" ? (
                <HashLoader size={20} color="white" />
              ) : (
                "Register"
              )}
            </Button>

            <span className="ml-1 text-black text-sm text-center">
              Already have an account?{" "}
              <Link
                href={loading === "pending" ? "" : "/auth/sign-in"}
                className="text-violet-500"
              >
                Sign in
              </Link>
            </span>
          </form>
        </>
      ) : (
        <AccountSuccessLoader />
      )}
    </div>
  );
};

export default RegisterPage;
