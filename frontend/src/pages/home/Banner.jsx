import React from "react";

import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse py-16 justify-between items-center gap-12">
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="" />
      </div>

      <div className="md:w-1/2 w-full">
        <h1 className="md:text-5xl text-2xl font-medium mb-7 font-serif">
          Welcome to BookMart –  This Week's Hottest New Releases!
        </h1>
        <p className="mb-10 text-xl">
          Explore the latest must-reads across various genres! Whether you're
          diving into a thrilling adventure, sharpening your business skills, or
          escaping into a gripping horror story, we've got something for you.
        </p>
      </div>
    </div>
  );
};

export default Banner;

