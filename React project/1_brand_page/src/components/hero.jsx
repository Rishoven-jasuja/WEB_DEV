import React from "react";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";

const hero = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8">
      
      <LeftContent className="order-2 md:order-1" />
      <RightContent className='order-1 md:order-2'/>
    </div>
  );
};

export default hero;
