import React from "react";
import { ClipLoader } from "react-spinners";

const AccountSuccessLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <ClipLoader color="white" size={80} />
      <p>loggin you in please wait</p>
    </div>
  );
};

export default AccountSuccessLoader;
