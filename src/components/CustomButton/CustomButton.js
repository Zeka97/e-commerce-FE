import React from "react";
import classNames from "classnames";

const CustomButton = ({ children, className, type, ...props }) => {
  const buttonClasses = classNames(
    className,
    "flex justify-center items-center w-[250px] py-[10px] px-32 rounded text-base",
    {
      "bg-[#0e1514] text-white hover:bg-[#f8ffff] hover:text-black":
        type === "black",
      "bg-white text-black hover:opacity-70 border border-black":
        type === "light",
    }
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default CustomButton;
