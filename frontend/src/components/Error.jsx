import React from "react";

const Error = ({ children }) => {
  return (
    <div className=" border-l-2 border-red-700 text-red-600 font-bold text-center my-4 py-1 uppercase ">
      {children}
    </div>
  );
};

export default Error;
