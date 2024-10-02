"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  ContentContainer,
  OverlayContainer,
} from "./styled/containers.styled.component";
import { Overlay } from "./styled/overlay.styled.component";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  authLoading,
  fetchUser,
  getUser,
  loggedOut,
} from "@/features/auth/auth.slice";
import { Button } from "./styled/button.styled.component";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AccountProfile = () => {
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useAppDispatch();
  const accessToken = Cookies.get("chatUIAuthToken");
  const router = useRouter();
  const logout = () => {
    dispatch(loggedOut());
  };

  useEffect(() => {
    dispatch(fetchUser(accessToken || ""));
  }, []);

  const user = useAppSelector((state) => getUser(state, accessToken || ""));
  const loading = useAppSelector(authLoading);

  useEffect(() => {
    loading === "idle" && router.push("/auth/sign-in");
    console.log(Cookies.get("chatUIAuthToken"));
  }, [loading]);

  if (loading === "failed") {
    logout();
    return null;
  }

  if (loading === "success") {
    if (!user) {
      logout();
      return null;
    }

    console.log(showProfile);
    return (
      <>
        <div onClick={() => setShowProfile(true)} className="cursor-pointer">
          {user?.profile ? (
            <div className="cursor-pointer relative overflow-hidden rounded-full bg-[#f5feac] text-black w-[50px] h-[50px] flex items-center justify-center font-light">
              <Image
                fill
                src={user?.profile}
                alt="profile"
                className="object-cover object-center"
              />
            </div>
          ) : (
            <div className="rounded-full bg-[#f5feac] text-black min-w-[50px] h-[50px] flex items-center justify-center font-light">
              {user?.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>
          )}
        </div>
        {showProfile && (
          <OverlayContainer>
            <Overlay onClick={() => setShowProfile(false)} />
            <ContentContainer className="absolute right-3 top-[100px] items-center">
              {user?.profile ? (
                <div className="relative overflow-hidden rounded-full bg-[#f5feac] text-black w-[100px] h-[100px] flex items-center justify-center font-light">
                  <Image
                    fill
                    src={user?.profile}
                    alt="profile"
                    className="object-cover object-center"
                  />
                </div>
              ) : (
                <div className="rounded-full bg-[#f5feac] text-black min-w-[100px] h-[100px] flex items-center justify-center font-light">
                  {user?.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </div>
              )}

              <div className="text-center">
                <h2 className="text-lg font-bold">
                  {user?.name ?? "annonymous"}
                </h2>
                <p className="text-gray-500">
                  {user?.email ?? "example@gmail.com"}
                </p>
              </div>
              <Button variant="destructive" className="w-full" onClick={logout}>
                Logout
              </Button>
            </ContentContainer>
          </OverlayContainer>
        )}
      </>
    );
  }
};

export default AccountProfile;
