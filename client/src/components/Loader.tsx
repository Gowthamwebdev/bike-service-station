import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-black rounded-full animate-bounce delay-100"></div>
      <div className="w-4 h-4 bg-black rounded-full animate-bounce delay-200"></div>
      <div className="w-4 h-4 bg-black rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

export default Loader;