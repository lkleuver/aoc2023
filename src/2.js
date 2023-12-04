import { getInput } from "../util/index.js";

let bag = {
  red: 12,
  green: 13,
  blue: 14
};

async function run() {
  let input = getInput(2);
  let lines = input.split("\n");

  let games = lines.map(getGame);
  let part1 = 0;
  let part2 = 0;
  games.forEach((game) => {
    if (check(game)) {
      part1 += game.id;
    }

    let maxes = maxValues(game);
    let power = Object.values(maxes).reduce((acc, curr) => acc * curr, 1);
    part2 += power;
  });

  console.log("Part 1: ", part1);
  console.log("Part 2: ", part2);
}

function check(game) {
  let entries = Object.entries(bag);
  for (let i = 0; i < entries.length; i++) {
    let [color, count] = entries[i];

    for (let j = 0; j < game.draws.length; j++) {
      let draw = game.draws[j];
      if (draw[color] > count) {
        return false;
      }
    }
  }
  return true;
}

function maxValues(game) {
  let result = {};

  game.draws.forEach((draw) => {
    Object.keys(draw).forEach((color) => {
      if (!result[color]) result[color] = 0;
      result[color] = Math.max(result[color], draw[color]);
    });
  });
  return result;
}

function getGame(s) {
  let bits = s.split(":");
  let id = parseInt(bits[0].split(" ")[1]);
  let draws = [];
  let drawStrings = bits[1].split(";");
  for (let i = 0; i < drawStrings.length; i++) {
    let d = drawStrings[i].split(",");
    let draw = {};
    d.forEach((c) => {
      let x = c.trim().split(" ");
      draw[x[1]] = parseInt(x[0]);
    });
    draws.push(draw);
  }

  return {
    id,
    draws
  };
}

run();
