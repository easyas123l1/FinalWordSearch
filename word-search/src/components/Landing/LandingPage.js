import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

const LandingPage = () => {
  return (
    <div className={puzzle.background}>
      <p>Landing Page</p>
      <p>
        This website is still under construction. In the mean time feel free to
        create an account to gain access to creating puzzles! Also view the
        world record puzzle! Thank you for viewing my website!{" "}
      </p>
      <img
        src="https://www.nicepng.com/png/detail/66-667631_website-under-construction-website-still-under-construction.png"
        alt="Website Under Construction - Website Still Under Construction@nicepng.com"
      ></img>
    </div>
  );
};

export default LandingPage;
