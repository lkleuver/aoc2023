import fs from "fs";
import path from "path";

export function getInput(n, test) {
  if (test) {
    let input = fs.readFileSync(`./input/${n}.test.txt`, "utf8");
    return input;
  }
  let input = fs.readFileSync(`./input/${n}.txt`, "utf8");
  return input;
}
