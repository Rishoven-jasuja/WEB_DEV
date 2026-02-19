import React from "react";

const LeftContent = ({ className }) => {
  return (
    <div
      className={`w-full md:w-[55vw] min-h-screen flex flex-col justify-center px-6 md:px-16 ${className}`}
    >
      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight md:leading-[1.1] tracking-wide text-center md:text-left">
        YOUR FEET DESERVES THE BEST
      </h1>

      {/* Paragraph */}
      <p className="mt-5 text-center md:text-left max-w-xl">
        Your feet deserve the best and we are here to help you with our
        shoes. Experience comfort, performance and style together.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 items-center md:items-start">
        <button
          className="bg-red-600 text-white text-lg px-7 py-3 rounded-xl
          transition-all duration-200 ease-out
          hover:bg-red-700 hover:shadow-lg hover:-translate-y-1
          active:scale-95"
        >
          Shop Now
        </button>

        <button
          className="border-2 border-black text-lg px-7 py-3 rounded-xl
          transition-all duration-200 ease-out
          hover:shadow-lg hover:-translate-y-1
          active:scale-95 bg-gray-300 text-black"
        >
          Category
        </button>
      </div>

      {/* Availability */}
      <div className="mt-10 flex flex-col items-center md:items-start">
        <h3 className="text-lg font-medium text-gray-400">
          Also available on
        </h3>

        <div className="flex mt-4 gap-4">
          <img
            className="h-12 w-12 rounded-full hover:scale-110 transition"
            src="https://static.vecteezy.com/system/resources/previews/073/495/167/non_2x/flipkart-logo-circular-glossy-icon-with-transparent-background-free-png.png"
            alt=""
          />

          <img
            className="h-12 w-12 rounded-full hover:scale-110 transition"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSumBM_xEmVD9DB22Rdy3Xkyy86qFP-kMlXAg&s"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default LeftContent;
