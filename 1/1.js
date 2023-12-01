import { getInput } from "../util/index.js";

const digits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

async function run() {
  let input = getInput(1);
  let lines = input.split("\n");

  let part1 = lines.reduce((acc, curr) => {
    let s = curr.replace(/\D/g, "");
    let g = s.substring(0, 1) + s.substring(s.length - 1, s.length);
    return acc + parseInt(g, 10);
  }, 0);

  let part2 = lines.reduce((acc, curr, index) => {
    let s = curr;

    let first = "";
    let last = "";

    for (let i = 0; i < s.length; i++) {
      let found = "";

      let t = s.substring(i);
      if (isNaN(t.charAt(0))) {
        for (let j = 0; j < digits.length; j++) {
          if (t.startsWith(digits[j])) {
            found = `${j + 1}`;
            break;
          }
        }
      } else {
        found = t.charAt(0);
      }
      if (found) {
        if (!first) first = found;
        last = found;
      }
    }

    console.log(`${index + 1}: ${first}${last}`);

    return acc + parseInt(`${first}${last}`, 10);
  }, 0);

  console.log("PART1:", part1);
  console.log("PART2:", part2);
}

run();
