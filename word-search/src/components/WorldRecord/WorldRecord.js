import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";

const WorldRecord = () => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    if (letters.length === 0) {
      const file = require("./letters.txt");
      let rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = () => {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
            let allText = rawFile.responseText;
            let splitLetters = allText.split(" ");
            let bigArray = [];
            let littleArray = [];
            for (let i = 0; i < splitLetters.length; i++) {
              littleArray.push(splitLetters[i]);
              if (littleArray.length === 500) {
                bigArray.push(littleArray);
                littleArray = [];
              }
            }
            console.log(bigArray);
            setLetters(bigArray);
          }
        }
      };
      rawFile.send(null);
    }
  });
  return (
    <div className={puzzle.background}>
      <p>World Record</p>
    </div>
  );
};

export default WorldRecord;
