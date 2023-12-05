import { getInput } from "../util/index.js";

async function run() {
  let input = getInput(5, false);
  let blocks = input.split("\n\n");

  let seeds = getSeeds(blocks[0]);
  let mappings = [];
  for (let i = 1; i < blocks.length; i++) {
    mappings.push(getMap(blocks[i], false));
  }

  let part1 = Infinity;
  for (let s = 0; s < seeds.length; s++) {
    let found = seeds[s];
    mappings.forEach((m) => {
      found = findInMap(found, m);
    });
    if (found < part1) {
      part1 = found;
    }
  }

  let part2 = Infinity;
  for (let s = 0; s < seeds.length; s += 2) {
    let start = seeds[s];
    let l = seeds[s + 1];

    for (let i = start; i < start + l; i++) {
      let found = i;
      mappings.forEach((m) => {
        found = findInMap(found, m);
      });
      if (found < part2) {
        part2 = found;
      }
    }
  }

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
}

function findInMap(id, mapping) {
  for (let r = 0; r < mapping.ranges.length; r++) {
    let range = mapping.ranges[r];
    if (id >= range.src && id < range.src + range.l) {
      return range.dest + (id - range.src);
    }
  }
  return id;
}

function getSeeds(line) {
  let nums = line
    .split(":")[1]
    .trim()
    .split(" ")
    .map((s) => parseInt(s, 10));
  return nums;
}

function getMap(block, doLog) {
  let lines = block.split("\n");
  let ids = lines[0].split(" ")[0].split("-");

  let ranges = [];

  for (let i = 1; i < lines.length; i++) {
    let line = lines[i].split(" ");
    ranges.push({
      dest: parseInt(line[0], 10),
      src: parseInt(line[1], 10),
      l: parseInt(line[2], 10)
    });
  }

  if (doLog) {
    console.log(ranges);
  }

  return {
    from: ids[0],
    to: ids[2],
    ranges
  };
}

run();
