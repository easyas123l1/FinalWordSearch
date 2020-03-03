import React from "react";
import puzzle from "../../styles/puzzle.module.scss";

const LandingPage = () => {
  return (
    <div className={puzzle.background}>
      <p>
        Hello, my name is Andrew Wilson and this is my word search
        generator/puzzle. I have also generated a static puzzle that currently
        holds the world record 500x500 with 14,995 words! Currently i'm a full
        stack web developer student. I have a huge passion for coding!
      </p>
      <p>
        This website is still under construction. In the mean time feel free to
        create an account to gain access to creating puzzles! Also view the
        world record puzzle! Thank you for viewing my website!
      </p>
      <img
        src="https://www.nicepng.com/png/detail/66-667631_website-under-construction-website-still-under-construction.png"
        alt="Website Under Construction - Website Still Under Construction@nicepng.com"
      ></img>
      <p>
        email andrew.wilson90@hotmail.com for any advice or if you're looking to
        hire a full stack web developer!
      </p>
    </div>
  );
};

export default LandingPage;
