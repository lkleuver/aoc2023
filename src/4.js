import { getInput } from "../util/index.js";

async function run() {
  let input = getInput(4, false);

  let lines = input.split("\n");
  let cards = [];

  lines.forEach((line) => {
    cards.push(readCard(line));
  });

  let part1 = 0;
  cards.forEach((card) => (part1 += card.bla));

  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    for (let c = 0; c < card.count; c++) {
      for (let j = 1; j <= card.winning; j++) {
        if (j + i < cards.length) {
          cards[i + j].count++;
        }
      }
    }
  }

  let part2 = 0;
  cards.forEach((card) => {
    part2 += card.count;
  });

  console.log("Part 1: ", part1);
  console.log("Part 2: ", part2);
}

function readCard(line) {
  let bits = line.split(":");

  let [winningString, mineString] = bits[1].split("|").map((s) => s.trim());

  let winning = getNumbers(winningString);
  let mine = getNumbers(mineString);

  let count = 0;
  winning.forEach((w) => {
    if (mine.includes(w)) count++;
  });

  let result = 0;
  if (count !== 0) {
    result = 1;
    for (let i = 0; i < count - 1; i++) {
      result *= 2;
    }
  }

  //yeah yeah very confusing naming
  return {
    count: 1,
    bla: result,
    winning: count
  };
}

function getNumbers(s) {
  return s
    .split(" ")
    .filter((s) => s !== "")
    .map((s) => parseInt(s, 10));
}

run();
