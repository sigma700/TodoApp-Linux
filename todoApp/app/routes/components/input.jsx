import React from "react";

export default function Input({ type, name, hasError }) {
  return (
    <input
      className={`border ${
        hasError ? "border-red-600" : ""
      } p-[10px] bg-[#242834] w-full`}
      name={name}
      type={type}
    />
  );
}
