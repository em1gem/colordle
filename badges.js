// ---------- Rarity levels ----------
const RARITIES = {
  common:    { label: "Common",    color: "#6c7086" },
  uncommon:  { label: "Uncommon",  color: "#a6e3a1" },
  rare:      { label: "Rare",      color: "#89b4fa" },
  epic:      { label: "Epic",      color: "#cba6f7" },
  legendary: { label: "Legendary", color: "#fab387" },
};

// ---------- Finder helpers ----------
// A finder takes the text and returns an array of { start, end, match }.
// start is 0-based, end is exclusive.

// Turn any regex into a finder (finds ALL matches, adds the g flag for you)
const regexFinder = (regex) => (text) => {
  const flags = regex.flags.includes("g") ? regex.flags : regex.flags + "g";
  return [...text.matchAll(new RegExp(regex.source, flags))].map((m) => ({
    start: m.index,
    end: m.index + m[0].length,
    match: m[0],
  }));
};

const firstLastFinder = (test) => (text) =>
  regexFinder(/#[0-9a-f]{2,}\b/i)(text).flatMap(({ start, end, match }) => {
    const first = parseInt(match[1], 16);
    const last = parseInt(match[match.length - 1], 16);
    if (!test(first, last)) return [];
    return [
      { start: start + 1, end: start + 2, match: match[1] },
      { start: end - 1,   end,            match: match[match.length - 1] },
    ];
  });

const isPowerOf3 = (n) => {
  if (n < 1) return false;
  while (n % 3 === 0) n /= 3;
  return n === 1;
};

const isFactorial = (n) => {
  let f = 1;
  for (let k = 2; f < n; k++) f *= k;
  return n >= 1 && f === n;
};

// ---------- The badges: add new ones here ----------
const BADGES = [
  // Contains  
  {
    id: "hasZero",
    title: "Zero",
    emoji: "0️⃣",
    description: "Contains a 0",
    rarity: "common",
    points: 333,
    find: regexFinder(/0/),
  },
  {
    id: "hasOne",
    title: "One",
    emoji: "1️⃣",
    description: "Contains a 1",
    rarity: "common",
    points: 333,
    find: regexFinder(/1/),
  },
  {
    id: "hasTwo",
    title: "Two",
    emoji: "2️⃣",
    description: "Contains a 2",
    rarity: "common",
    points: 333,
    find: regexFinder(/2/),
  },
  {
    id: "hasThree",
    title: "Three",
    emoji: "3️⃣",
    description: "Contains a 3",
    rarity: "common",
    points: 333,
    find: regexFinder(/3/),
  },
  {
    id: "hasFour",
    title: "Four",
    emoji: "4️⃣",
    description: "Contains a 4",
    rarity: "common",
    points: 333,
    find: regexFinder(/4/),
  },
  {
    id: "hasFive",
    title: "Five",
    emoji: "5️⃣",
    description: "Contains a 5",
    rarity: "common",
    points: 333,
    find: regexFinder(/5/),
  },
  {
    id: "hasSix",
    title: "Six",
    emoji: "6️⃣",
    description: "Contains a 6",
    rarity: "common",
    points: 333,
    find: regexFinder(/6/),
  },
  {
    id: "hasSeven",
    title: "Seven",
    emoji: "7️⃣",
    description: "Contains a 7",
    rarity: "common",
    points: 333,
    find: regexFinder(/7/),
  },
  {
    id: "hasEight",
    title: "Eight",
    emoji: "8️⃣",
    description: "Contains an 8",
    rarity: "common",
    points: 333,
    find: regexFinder(/8/),
  },
  {
    id: "hasNine",
    title: "Nine",
    emoji: "9️⃣",
    description: "Contains a 9",
    rarity: "common",
    points: 333,
    find: regexFinder(/9/),
  },
  {
    id: "hasA",
    title: "A",
    emoji: "🅰️",
    description: "Contains an A",
    rarity: "common",
    points: 333,
    find: regexFinder(/A/),
  },
  {
    id: "hasB",
    title: "B",
    emoji: "🅱️",
    description: "Contains a B",
    rarity: "common",
    points: 333,
    find: regexFinder(/B/),
  },
  {
    id: "hasC",
    title: "C",
    emoji: "🇨",
    description: "Contains a C",
    rarity: "common",
    points: 333,
    find: regexFinder(/C/),
  },
  {
    id: "hasD",
    title: "D",
    emoji: "🇩",
    description: "Contains a D",
    rarity: "common",
    points: 333,
    find: regexFinder(/D/),
  },
  {
    id: "hasE",
    title: "E",
    emoji: "🇪",
    description: "Contains an E",
    rarity: "common",
    points: 333,
    find: regexFinder(/E/),
  },
  {
    id: "hasF",
    title: "F",
    emoji: "🇫",
    description: "Contains an F",
    rarity: "common",
    points: 333,
    find: regexFinder(/F/),
  },
  {
    id: "has67",
    title: "Six Seven",
    emoji: "🫩",
    description: "Contains 67",
    rarity: "uncommon",
    points: 5000,
    find: regexFinder(/67/),
  },
  {
    id: "has69",
    title: "Sixty-Nine",
    emoji: "🏅",
    description: "Contains 69",
    rarity: "uncommon",
    points: 5000,
    find: regexFinder(/69/),
  },
  {
    id: "has365",
    title: "Year",
    emoji: "🗓️",
    description: "Contains 365",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/365/),
  },
  {
    id: "has404",
    title: "Not Found",
    emoji: "🚫",
    description: "Contains 404",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/404/),
  },
  {
    id: "has420",
    title: "High",
    emoji: "🌿",
    description: "Contains 420",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/420/),
  },
  {
    id: "devil",
    title: "Devil",
    emoji: "😈",
    description: "Contains 666",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/666/),
  },
  {
    id: "sleeping",
    title: "Sleeping",
    emoji: "🛌",
    description: "Contains BED",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/BED/),
  },
  {
    id: "scared",
    title: "Scared",
    emoji: "👻",
    description: "Contains B00",
    rarity: "epic",
    points: 100000,
    find: regexFinder(/B00/),
  },
  {
    id: "has1337",
    title: "Leet",
    emoji: "⌨️",
    description: "Contains 1337",
    rarity: "legendary",
    points: 2000000,
    find: regexFinder(/1337/),
  },
  {
    id: "has1984",
    title: "Big Brother",
    emoji: "👁️",
    description: "Contains 1984",
    rarity: "legendary",
    points: 2000000,
    find: regexFinder(/1984/),
  },
  
  // String traits
  {
    id: "heterogeneous",
    title: "Heterogeneous",
    emoji: "🌈",
    description: "Contains no repeating characters",
    rarity: "common",
    points: 300,
    find: regexFinder(/^#(?:([A-F0-9])(?!.*\1))*$/),
  },
  {
    id: "balanced",
    title: "Balanced",
    emoji: "↔️",
    description: "Starts and ends with the same character",
    rarity: "uncommon",
    points: 1500,
    find: (text) => {
     const m = text.match(/^#([A-F0-9])[A-F0-9]*([A-F0-9])$/i);
     if (!m || m[1].toLowerCase() !== m[2].toLowerCase()) return [];
     const last = text.length - 1;
     return [
        { start: 1,    end: 2,        match: m[1] },
        { start: last, end: last + 1, match: m[2] },
     ];
    },
  },
  {
    id: "sandwich",
    title: "Sandwich",
    emoji: "🥪",
    description: "Starts and ends with the same character and doesn't have it anywhere inbetween",
    rarity: "uncommon",
    points: 2000,
    find: (text) =>
    regexFinder(/#[0-9a-f]{2,}\b/i)(text)
      .filter(({ match }) => {
        const d = [...match.slice(1)].map((h) => parseInt(h, 16));
        const first = d[0];
        const last = d[d.length - 1];
        return first === last && !d.slice(1, -1).includes(first);
      })
      .flatMap(({ start, end, match }) => [
        { start: start + 1, end: start + 2, match: match[1] },
        { start: end - 1, end, match: match[match.length - 1] },
      ]),
  },
  {
    id: "maxSubpixel",
    title: "Bright Subpixel",
    emoji: "☀️",
    description: "Contains FF in a color pair",
    rarity: "rare",
    points: 9000,
    find: regexFinder(/(?<=^(?:.|.{3}|.{5}))FF/),
  },
  {
    id: "minSubpixel",
    title: "Dim Subpixel",
    emoji: "🌑",
    description: "Contains 00 in a color pair",
    rarity: "rare",
    points: 9000,
    find: regexFinder(/(?<=^(?:.|.{3}|.{5}))00/),
  },
  {
    id: "eyes",
    title: "Eyes",
    emoji: "👀",
    description: "Contains two 0s seperated by two characters",
    rarity: "rare",
    points: 9000,
    find: regexFinder(/0.{2}0/),
  },
  {
    id: "decimal",
    title: "Decimal",
    emoji: "🧍",
    description: "Contains only numbers",
    rarity: "uncommon",
    points: 17000,
    find: regexFinder(/#[0-9]{6}/),
  },
  {
    id: "alphabet",
    title: "Alphabet",
    emoji: "📚",
    description: "Contains only letters",
    rarity: "epic",
    points: 35000,
    find: regexFinder(/#[A-F]{6}/),
  },
  {
    id: "binary",
    title: "Binary",
    emoji: "🤖",
    description: "Contains only 0s and 1s",
    rarity: "legendary",
    points: 33333333,
    find: regexFinder(/#[0-1]{6}/),
  },
  {
    id: "palindrome",
    title: "Palindrome",
    emoji: "📏",
    description: "Grants the same color if you reverse the code",
    rarity: "epic",
    points: 400000,
    find: regexFinder(/^.(.)(.)(.)\3\2\1$/),
  },
  {
    id: "zipper",
    title: "Zipper",
    emoji: "🤐",
    description: "Consists of 2 characters alternating",
    rarity: "legendary",
    points: 10000000,
    find: regexFinder(/^#(([A-F0-9])(?!\2)([A-F0-9]))(\1)*\2?$/),
  },
  {
    id: "echo",
    title: "Echo",
    emoji: "📢",
    description: "The second half repeats the first half",
    rarity: "epic",
    points: 400000,
    find: regexFinder(/^#(.{3})\1/),
  },
  // Number Traits
  {
    id: "odd",
    title: "Odd",
    emoji: "🤨",
    description: "Not divisible by 2",
    rarity: "common",
    points: 200,
    find: regexFinder(/#.{5}[^02468ACE]/),
  },
  {
    id: "even",
    title: "Even",
    emoji: "⚖️",
    description: "Divisible by 2",
    rarity: "common",
    points: 200,
    find: regexFinder(/#.{5}[^13579BDF]/),
  },
  {
    id: "ascending",
    title: "Ascending",
    emoji: "↗️",
    description: "Last hexadecimal is larger than the first",
    rarity: "common",
    points: 250,
    find: firstLastFinder((first, last) => first < last),
  },
  {
    id: "descending",
    title: "Descending",
    emoji: "↙️",
    description: "Last hexadecimal is smaller than the first",
    rarity: "common",
    points: 250,
    find: firstLastFinder((first, last) => first > last),
  },
  {
    id: "neighbors",
    title: "Neighbors",
    emoji: "🏘️",
    description: "Contains 2 neighboring digits that are adjacent in value",
    rarity: "uncommon",
    points: 400,
    find: (text) => {
      const isHex = (c) => /[0-9a-f]/i.test(c);
      const results = [];
      for (let i = 0; i + 1 < text.length; i++) {
        const a = text[i];
        const b = text[i + 1];
        if (isHex(a) && isHex(b) && parseInt(b, 16) === parseInt(a, 16) + 1)
          results.push({ start: i, end: i + 2, match: a + b });
      }
      return results;
    },
  },
  {
    id: "downhill",
    title: "Downhill",
    emoji: "📉",
    description: "The digits in the hex code keep going down",
    rarity: "epic",
    points: 250000,
    find: (text) =>
      regexFinder(/#[0-9a-f]{6}\b/i)(text).filter(({ match }) => {
        const d = [...match.slice(1)].map((h) => parseInt(h, 16));
        return d.every((v, i) => i === 0 || d[i - 1] > v);
      }),
  },
  {
    id: "uphill",
    title: "Uphill",
    emoji: "📈",
    description: "The digits in the hex code keep going up",
    rarity: "epic",
    points: 250000,
    find: (text) =>
      regexFinder(/#[0-9a-f]{6}\b/i)(text).filter(({ match }) => {
        const d = [...match.slice(1)].map((h) => parseInt(h, 16));
        return d.every((v, i) => i === 0 || d[i - 1] < v);
      }),
  },
  {
    id: "cubed",
    title: "Cubed",
    emoji: "🧊",
    description: "Hexadecimal value translates to a power of 3",
    rarity: "legendary",
    points: 100000000,
    find: (text) =>
    regexFinder(/#[0-9a-f]{6}\b/i)(text).filter(({ match }) =>
      isPowerOf3(parseInt(match.slice(1), 16))
    ),
  },
  {
    id: "factorial",
    title: "Factorial",
    emoji: "🏭",
    description: "Hexadecimal value translates to a factorial",
    rarity: "legendary",
    points: 20000000000,
    find: (text) =>
    regexFinder(/#[0-9a-f]{6}\b/i)(text).filter(({ match }) =>
      isFactorial(parseInt(match.slice(1), 16))
    ),
  },
  // Color Traits
  {
    id: "dim",
    title: "Dim",
    emoji: "🔅",
    description: "Every color pair is lesser than 40",
    rarity: "rare",
    points: 10000,
    find: (text) =>
    regexFinder(/#[0-9A-F]{6}\b/i)(text).filter(({ match }) => {
      const [r, g, b] = match.slice(1).match(/../g).map((h) => parseInt(h, 16));
      return r < 0x40 && g < 0x40 && b < 0x40;
    }),
  },
  {
    id: "bright",
    title: "Bright",
    emoji: "🔦",
    description: "Every color pair is greater than C0",
    rarity: "rare",
    points: 10000,
    find: (text) =>
    regexFinder(/#[0-9A-F]{6}\b/i)(text).filter(({ match }) => {
      const [r, g, b] = match.slice(1).match(/../g).map((h) => parseInt(h, 16));
      return r > 0xC0 && g > 0xC0 && b > 0xC0;
    }),
  },
  // Pairs
  {
    id: "pair",
    title: "Pair",
    emoji: "🫂",
    description: "The same character two times in a row",
    rarity: "common",
    points: 400,
    find: regexFinder(/(.)\1{1}/),
  },
  {
    id: "three",
    title: "Triplet",
    emoji: "🔱",
    description: "The same character three times in a row",
    rarity: "rare",
    points: 6000,
    find: regexFinder(/(.)\1{2}/),
  },
  {
    id: "four",
    title: "Quartet",
    emoji: "💠",
    description: "The same character four times in a row",
    rarity: "epic",
    points: 150000,
    find: regexFinder(/(.)\1{3}/),
  },
  {
    id: "five",
    title: "Star",
    emoji: "⭐",
    description: "The same character five times in a row",
    rarity: "legendary",
    points: 4000000,
    find: regexFinder(/(.)\1{4}/),
  },
  {
    id: "six",
    title: "Fractal",
    emoji: "🌀",
    description: "The same character six times in a row",
    rarity: "legendary",
    points: 100000000,
    find: regexFinder(/(.)\1{5}/),
  },
  {
    id: "triplepair",
    title: "Triple Pair",
    emoji: "🖌️",
    description: "Every color pair is a different pair of 2 characters",
    rarity: "epic",
    points: 600000,
    find: regexFinder(/^#(.)\1(?!\1)(.)\2(?!\1)(?!\2)(.)\3$/),
  },
  {
    id: "jackpot",
    title: "Jackpot",
    emoji: "🎰",
    description: "Contains a 7 three times in a row",
    rarity: "epic",
    points: 10000,
    find: regexFinder(/(7)\1{2}/),
  },
  // Specific colors
  {
    id: "black",
    title: "Pitch Black",
    emoji: "⬛",
    description: "Exactly 000000",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/000000/),
  },
  {
    id: "white",
    title: "Blinding White",
    emoji: "⬜",
    description: "Exactly FFFFFF",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/FFFFFF/),
  },
  {
    id: "red",
    title: "Pure Red",
    emoji: "🟥",
    description: "Exactly FF0000",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/FF0000/),
  },
  {
    id: "blue",
    title: "Pure Blue",
    emoji: "🟦",
    description: "Exactly 0000FF",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/0000FF/),
  },
  {
    id: "green",
    title: "Pure Green",
    emoji: "🟩",
    description: "Exactly 00FF00",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/00FF00/),
  },
  {
    id: "doublejackpot",
    title: "Double Jackpot",
    emoji: "🤑",
    description: "Exactly 777777",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/(7)\1{5}/),
  },
  {
    id: "pi",
    title: "Pi",
    emoji: "🧮",
    description: "Exactly 314159",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/314159/),
  },
  {
    id: "evil",
    title: "Pure Evil",
    emoji: "🔥",
    description: "Exactly 666666",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/666666/),
  },
  {
    id: "access",
    title: "Granted",
    emoji: "✅",
    description: "Exactly ACCE55",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/ACCE55/),
  },
  {
    id: "delete",
    title: "Delete",
    emoji: "❌",
    description: "Exactly DE1E7E",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/DE1E7E/),
  },
  {
    id: "coffee",
    title: "Caffeinated",
    emoji: "☕",
    description: "Exactly C0FFEE",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/C0FFEE/),
  },
  {
    id: "office",
    title: "Workaholic",
    emoji: "🏢",
    description: "Exactly 0FF1CE",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/0FF1CE/),
  },
  {
    id: "decade",
    title: "10 Years",
    emoji: "📅",
    description: "Exactly DECADE",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/DECADE/),
  },
  {
    id: "ugly",
    title: "Ugly",
    emoji: "🤮",
    description: "Exactly 4A412A",
    rarity: "legendary",
    points: 200000000000,
    find: regexFinder(/4A412A/),
  },
];

// ---------- Engine ----------
function evaluateBadges(text) {
  return BADGES.map((badge) => ({ badge, matches: badge.find(text) }))
    .filter((r) => r.matches.length > 0)
    .sort((a, b) => b.badge.points - a.badge.points);
}

let STRING_RARITY_THRESHOLDS = [
  { min: 250000, rarity: "legendary" },
  { min: 25000, rarity: "epic" },
  { min: 7500,  rarity: "rare" },
  { min: 3000,  rarity: "uncommon" },
  { min: 0,    rarity: "common" },
];
 
function getStringRarity(total) {
  const tier = STRING_RARITY_THRESHOLDS.find((t) => total >= t.min);
  return { total, rarity: tier.rarity };
}
 
// Makes rarity mean what it says: scores a big batch of random strings and
// puts each tier at a percentile of the results.
// generate: a function that returns one random string, same as your real generator.
// Default cutoffs: top 50% uncommon, top 20% rare, top 5% epic, top 1% legendary.
function calibrateThresholds(
  generate,
  samples = 100000,
  percentiles = { uncommon: 75, rare: 85, epic: 97.5, legendary: 99.9 }
) {
  const scores = Array.from({ length: samples }, () =>
    evaluateBadges(generate()).reduce((sum, r) => sum + r.badge.points, 0)
  ).sort((a, b) => a - b);
 
  const at = (p) => scores[Math.min(scores.length - 1, Math.floor((p / 100) * scores.length))];
  const tiers = Object.entries(percentiles)
    .map(([rarity, p]) => ({ min: at(p), rarity }))
    .sort((a, b) => b.min - a.min);
  tiers.push({ min: 0, rarity: "common" });
 
  console.table(tiers); // copy these into STRING_RARITY_THRESHOLDS, or assign the result directly
  return tiers;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function highlightText(text, matches) {
  // Merge overlapping/adjacent ranges so custom finders can't break the output
  const ranges = matches.map((m) => [m.start, m.end]).sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [s, e] of ranges) {
    const last = merged[merged.length - 1];
    if (last && s <= last[1]) last[1] = Math.max(last[1], e);
    else merged.push([s, e]);
  }
 
  const box = el("div", "badge-where");
  let pos = 0;
  for (const [s, e] of merged) {
    if (s > pos) box.append(text.slice(pos, s)); // plain text node, no innerHTML
    box.append(el("mark", "badge-mark", text.slice(s, e)));
    pos = e;
  }
  if (pos < text.length) box.append(text.slice(pos));
  return box;
}

function renderBadges(text, container, pointsEl) {
  container.innerHTML = "";
  const earned = evaluateBadges(text);
  let total = 0;
 
  for (const { badge, matches } of earned) {
    const rarity = RARITIES[badge.rarity];
    total += badge.points;
 
    const card = el("div", `badge badge-${badge.rarity}`);
    card.style.borderColor = rarity.color;
    card.style.setProperty("--badge-color", rarity.color);
 
    card.append(
      el("div", "badge-emoji", badge.emoji),
      el("div", "badge-title", badge.title),
      el("div", "badge-desc", badge.description),
      highlightText(text, matches),
      el("div", "badge-rarity", rarity.label),
      el("div", "badge-points", `+${badge.points} pts`)
    );
    card.querySelector(".badge-rarity").style.color = rarity.color;
    container.append(card);
  }
 
  const result = getStringRarity(total);
 
  if (pointsEl) {
    if (total) {
      const r = RARITIES[result.rarity];
      pointsEl.textContent = `${total} pts · ${r.label}`;
      pointsEl.style.color = r.color;
      pointsEl.dataset.rarity = result.rarity;
    } else {
      pointsEl.textContent = "";
      delete pointsEl.dataset.rarity;
    }
  }
 
  return result; // { total, rarity }
}

// ---------- Dev tools: measure badge rarity & suggest points ----------
// Rarity depends on how your strings are generated, so pass in your real generator.
// pointsPerBit: every time a badge is 2x rarer, it earns this many more points.
function measureBadges(generate, samples = 100000, pointsPerBit = 10) {
  const hits = Object.fromEntries(BADGES.map((b) => [b.id, 0]));
  for (let i = 0; i < samples; i++) {
    const text = generate();
    for (const b of BADGES) if (b.find(text).length > 0) hits[b.id]++;
  }
 
  const suggestRarity = (p) =>
    p < 0.0001 ? "legendary" : p < 0.01 ? "epic" : p < 0.015 ? "rare" : p < 0.3 ? "uncommon" : "common";
 
  const rows = BADGES.map((b) => {
    const p = hits[b.id] / samples;
    const pEff = p || 1 / samples; // 0 hits: treat as "at least this rare"
    return {
      badge: b.id,
      hits: hits[b.id],
      chance: p ? (p * 100).toPrecision(3) + "%" : "0%",
      oneIn: (p ? "" : ">") + Math.round(1 / pEff).toLocaleString(),
      currentPts: b.points,
      suggestedPts: Math.round(pointsPerBit * Math.log2(1 / pEff)),
      suggestedRarity: suggestRarity(pEff),
    };
  });
  console.table(rows);
  return rows;
}
 
// Exact odds for a badge that tests ONE six-digit hex color (checks all 16,777,216).
// Slow (seconds to minutes), so use it for the badges that got 0 hits above.
function exactHexChance(badge) {
  let hits = 0;
  for (let i = 0; i <= 0xffffff; i++) {
    if (badge.find("#" + i.toString(16).padStart(6, "0")).length) hits++;
  }
  return { hits, chance: hits / 0x1000000, oneIn: hits ? Math.round(0x1000000 / hits) : Infinity };
}