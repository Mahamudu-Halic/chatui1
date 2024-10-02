"use client";

import AccountSuccessLoader from "@/components/AccountSuccessLoader";
import { Button } from "@/components/styled/button.styled.component";
import { authLoading, userSignedIn } from "@/features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsEye } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";
import { HashLoader } from "react-spinners";

interface FormField extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface FormFieldElements extends HTMLFormElement {
  readonly elements: FormField;
}

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  const loading = useAppSelector(authLoading);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const dispatch = useAppDispatch();

  // submit function
  const handleSubmit = (e: React.FormEvent<FormFieldElements>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;

    const email = elements.email.value;
    const password = elements.password.value;

    const details = {
      email,
      password,
    };

    dispatch(userSignedIn(details));
  };

  useEffect(() => {
    if (loading === "success") {
      router.push(callbackUrl || DEFAULT_LOGIN_REDIRECT);
    }
  });
  return (
    <div className="h-[100vh] flex flex-col justify-center items-center gap-3">
      <Toaster />
      {loading === "success" ? (
        <AccountSuccessLoader />
      ) : (
        <>
          <h3 className="text-xl font-bold">Welcome Back</h3>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-3 w-[350px] flex flex-col gap-5"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[#000] text-sm" htmlFor="email">
                Email
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
                Password
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

            <Button
              variant="standard"
              type="submit"
              disabled={loading === "pending" ? true : false}
            >
              {loading === "pending" ? (
                <HashLoader size={20} color="white" />
              ) : (
                "Sign in"
              )}
            </Button>

            <span className="text-black text-sm text-center">
              Don&apos;t have an account?{" "}
              <Link
                href={loading !== "pending" ? "/auth/register" : ""}
                className="text-violet-500"
              >
                Create account
              </Link>
            </span>
          </form>
        </>
      )}
    </div>
  );
};

export default SignInPage;
