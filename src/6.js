import { getInput } from "../util/index.js";

async function run() {
  let input = getInput(6, false);

  let [times, distances] = getRaces(input);

  //part 1
  let counts = [];
  for (let t = 0; t < times.length; t++) {
    counts[t] = 0;
    let time = times[t];
    let distance = distances[t];

    for (let ms = 1; ms < time; ms++) {
      let speed = ms;
      let rest = time - ms;

      let mm = speed * rest;
      if (mm > distance) {
        counts[t]++;
      }
    }
  }
  let part1 = counts.reduce((acc, curr) => acc * curr, 1);
  console.log("Part 1:", part1);

  let time = parseInt(
    times.reduce((acc, curr) => `${acc}${curr}`, ""),
    10
  );
  let distance = parseInt(
    distances.reduce((acc, curr) => `${acc}${curr}`, ""),
    10
  );

  let first = 0;
  for (let ms = 1; ms < time; ms++) {
    let speed = ms;
    let rest = time - ms;

    let mm = speed * rest;
    if (mm > distance) {
      first = ms;
      break;
    }
  }

  let last = 0;
  for (let ms = time - 1; ms > 0; ms--) {
    let speed = ms;
    let rest = time - ms;

    let mm = speed * rest;
    if (mm > distance) {
      last = ms;
      break;
    }
  }

  console.log("Part 2:", last - first + 1);
}

function getRaces(input) {
  let lines = input.split("\n");

  let times = lines[0]
    .split(":")[1]
    .split(" ")
    .filter((d) => d !== "")
    .map((d) => parseInt(d));
  let distances = lines[1]
    .split(":")[1]
    .split(" ")
    .filter((d) => d !== "")
    .map((d) => parseInt(d));

  return [times, distances];
}

run();
