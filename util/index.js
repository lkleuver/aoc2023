import fs from "fs";
import path from "path";

export function getInput(n) {
  let input = fs.readFileSync(`./input/${n}.txt`, "utf8");
  return input;
}
