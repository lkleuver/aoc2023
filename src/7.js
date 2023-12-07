import { getInput } from "../util/index.js";

const cardVal = {
  A: 14,
  K: 13,
  Q: 12,
  J: 1,
  T: 10
};

async function run() {
  let input = getInput(7, false);

  let hands = input.split("\n").map(getHand);

  hands.sort(compareHands((h) => h.handType));

  let part1 = 0;
  hands.forEach((h, i) => {
    part1 += h.bid * (i + 1);
  });

  console.log("Part 1:", part1);

  hands.sort(compareHands((h) => h.handTypePart2));

  let part2 = 0;
  hands.forEach((h, i) => {
    part2 += h.bid * (i + 1);
  });

  console.log("Part 2:", part2);
}

function compareHands(g) {
  return (a, b) => {
    if (g(a) > g(b)) {
      return 1;
    } else if (g(a) < g(b)) {
      return -1;
    } else {
      return compareSecondOrder(a, b);
    }
  };
}

function compareSecondOrder(a, b) {
  for (let i = 0; i < a.hand.length; i++) {
    if (a.hand[i] > b.hand[i]) {
      return 1;
    } else if (a.hand[i] < b.hand[i]) {
      return -1;
    }
  }
}

function getHand(line) {
  //naive method
  let [handString, bidString] = line.split(" ");

  let hand = handString.split("").map((c) => {
    if (c in cardVal) {
      return cardVal[c];
    } else {
      return parseInt(c, 10);
    }
  });

  let countMap = {};
  let jokerCount = 0;
  hand.forEach((v) => {
    if (v === 1) {
      jokerCount++;
    } else {
      if (!countMap[v]) {
        countMap[v] = 1;
      } else {
        countMap[v]++;
      }
    }
  });

  let counts = Object.values(countMap).filter((v) => v > 1);

  let handType = getHandType(counts);

  let counts2 = Object.values(countMap);
  counts2.sort();
  counts2.reverse()[0] += jokerCount;
  counts2 = counts2.filter((v) => v > 1);
  let handTypePart2 = jokerCount === 5 ? 7 : getHandType(counts2);

  return {
    hand,
    bid: parseInt(bidString, 10),
    counts,
    counts2,
    handType,
    handTypePart2,
    jokerCount
  };
}

function getHandType(counts) {
  let handType = 1;
  if (counts.includes(5)) {
    handType = 7;
  } else if (counts.includes(4)) {
    handType = 6;
  } else if (counts.includes(3) && counts.includes(2)) {
    handType = 5;
  } else if (counts.includes(3)) {
    handType = 4;
  } else if (counts.includes(2) && counts.length === 2) {
    handType = 3;
  } else if (counts.length === 1) {
    handType = 2;
  }

  return handType;
}

run();
