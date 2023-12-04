import { getInput } from "../util/index.js";

async function run() {
  let input = getInput(3, false);
  let grid = input.split("\n").map((l) => l.split(""));

  let foundParts = [];
  let foundGears = [];

  for (let r = 0; r < grid.length; r++) {
    let num = "";
    let maxCol = grid[r].length - 1;
    for (let c = 0; c < grid[r].length; c++) {
      let char = grid[r][c];
      //part 1
      let check = -1;

      if (!isNaN(char)) {
        num = num + char;
        if (c === maxCol) check = c;
      } else {
        if (num !== "") check = c - 1;
      }

      if (check > -1) {
        if (isPart(grid, num, r, check, false)) {
          foundParts.push(num);
        }
        num = "";
      }

      //part 2

      if (char === "*") {
        let partNumbers = checkGear(grid, r, c);
        if (partNumbers.length === 2) {
          foundGears.push(partNumbers);
        }
      }
    }
  }

  let part1 = foundParts.reduce((acc, curr) => acc + parseInt(curr, 10), 0);
  console.log("Part 1: ", part1);

  // foundGears.forEach((gear) => {
  //   console.log(gear);
  //});

  let part2 = foundGears.reduce((acc, curr) => {
    let [a, b] = curr;
    return acc + parseInt(a, 10) * parseInt(b, 10);
  }, 0);

  console.log("Part 2: ", part2);
}

function isPart(grid, num, rx, cx, doLog) {
  let startRow = Math.max(rx - 1, 0);
  let endRow = Math.min(rx + 1, grid.length - 1);
  let startCol = Math.max(cx - num.length, 0);
  let endCol = Math.min(cx + 1, grid[rx].length - 1);

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      if (isSymbol(grid[r][c])) {
        if (doLog) {
          console.log(`Found ${num}: ${grid[r][c]} at ${r},${c}`);
        }
        return true;
      }
    }
  }

  return false;
}

function checkGear(grid, rx, cx) {
  let startRow = Math.max(rx - 1, 0);
  let endRow = Math.min(rx + 1, grid.length - 1);
  let startCol = Math.max(cx - 1, 0);
  let endCol = Math.min(cx + 1, grid[rx].length - 1);

  let partNumbers = [];

  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      if (!isNaN(grid[r][c])) {
        let [num, delta] = walkNumber(grid, r, c);
        partNumbers.push(num);
        c += delta;
      }
    }
  }

  return partNumbers;
}

function walkNumber(grid, rx, rc) {
  let result = grid[rx][rc];
  let maxCol = grid[rx].length - 1;

  let delta = 0;

  for (let c = rc - 1; c >= 0; c--) {
    if (isNaN(grid[rx][c])) {
      break;
    }
    result = grid[rx][c] + result;
  }

  for (let c = rc + 1; c <= maxCol; c++) {
    if (isNaN(grid[rx][c])) {
      break;
    }
    delta++;
    result = result + grid[rx][c];
  }

  return [result, delta];
}

function isSymbol(c) {
  return isNaN(c) && c !== ".";
}

run();
