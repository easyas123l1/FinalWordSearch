import React, { useState, useEffect } from "react";
import puzzle from "../../styles/puzzle.module.scss";

const WorldRecordWords = () => {
  const [words, setWords] = useState([]);
  console.log(words);

  useEffect(() => {
    let newWords = [];
    console.log("useEffect");
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
            newWords = [...newWords, ...newText];
          }
        }
      };
      rawFile1.send(null);
      let rawFile2 = new XMLHttpRequest();
      rawFile2.open("GET", file2, false);
      rawFile2.onreadystatechange = () => {
        if (rawFile2.readyState === 4) {
          if (rawFile2.status === 200 || rawFile2.status === 0) {
            let allText = rawFile2.responseText;
            let newText = allText.replace(/(\r\n|\n|\r)/gm, "1").split("1");
            newWords = [...newWords, ...newText];
          }
        }
      };
      rawFile2.send(null);
      let rawFile3 = new XMLHttpRequest();
      rawFile3.open("GET", file3, false);
      rawFile3.onreadystatechange = () => {
        if (rawFile3.readyState === 4) {
          if (rawFile3.status === 200 || rawFile3.status === 0) {
            let allText = rawFile3.responseText;
            let newText = allText.replace(/(\r\n|\n|\r)/gm, "1").split("1");
            newWords = [...newWords, ...newText];
          }
        }
      };
      rawFile3.send(null);
      setWords(newWords);
    }
  });

  return (
    <div className={puzzle.backgroundWorld}>
      <p>World Record Words</p>
      <ul>
        {words.map(word => (
          <li key={word} className={puzzle.worldRecord}>
            <p>{word}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorldRecordWords;
