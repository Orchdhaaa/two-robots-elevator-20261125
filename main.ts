import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One line of awkward small talk a robot says to another in an elevator,
// for make.fun's "Two Robots in an Elevator" bounty. A veteran of 4,812
// rides finally makes eye contact and treats the social moment the only
// way a machine knows how: as an error to be logged.
const LINE =
  "I have ridden this elevator 4,812 times. This is the first time I have made eye contact. I am logging it as an error.";

// The gate only accepts UTF-8 text of 1 to 200 characters that is not
// whitespace-only, and the brief demands a single line, so refuse anything
// outside the gate instead of writing a losing file.
const codePoints = [...LINE].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`line is ${codePoints} code points, gate is 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line is whitespace only");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}
if (LINE.includes("—")) {
  throw new Error("line must not contain an em dash");
}
if (!LINE.endsWith(".")) {
  throw new Error("line must end with a period");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.OUTPUT_DIR || "/output";
const outFile = `${outDir}/entry.txt`;

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: written file differs from the line");
}
console.log(`wrote ${codePoints} code points to ${outFile}`);
