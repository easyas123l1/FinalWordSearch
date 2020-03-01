import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";

const WorldRecordWords = () => {
  const [words, setWords] = useState([]);
  console.log(words);

  useEffect(() => {
    if (words.length === 0) {
      const file1 = require("./words1.txt");
      const file2 = require("./words2.txt");
      const file3 = require("./words3.txt");
      let rawFile1 = new XMLHttpRequest();
      rawFile1.open("GET", file1, false);
      rawFile1.onreadystatechange = () => {
        if (rawFile1.readyState === 4) {
          if (rawFile1.status === 200 || rawFile1.status === 0) {
            let allText = rawFile1.responseText;
            let newText = allText.replace(/(\r\n|\n|\r)/gm, "1").split("1");
            setWords(...words, newText);
          }
        }
      };
      let rawFile2 = new XMLHttpRequest();
      rawFile2.open("GET", file2, false);
      rawFile2.onreadystatechange = () => {
        if (rawFile2.readyState === 4) {
          if (rawFile2.status === 200 || rawFile2.status === 0) {
            let allText = rawFile2.responseText;
            let newText = allText.replace(/(\r\n|\n|\r)/gm, "1").split("1");
            setWords(...words, newText);
          }
        }
      };
      let rawFile3 = new XMLHttpRequest();
      rawFile3.open("GET", file3, false);
      rawFile3.onreadystatechange = () => {
        if (rawFile3.readyState === 4) {
          if (rawFile3.status === 200 || rawFile3.status === 0) {
            let allText = rawFile3.responseText;
            let newText = allText.replace(/(\r\n|\n|\r)/gm, "1").split("1");
            setWords(...words, newText);
          }
        }
      };
    }
  });

  return <div></div>;
};

export default WorldRecordWords;
