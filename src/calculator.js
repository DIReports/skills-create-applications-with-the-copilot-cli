#!/usr/bin/env node
"use strict";

/**
 * Calculator CLI
 *
 * Supported operations:
 *  - add: addition (a + b)
 *  - sub: subtraction (a - b)
 *  - mul: multiplication (a * b)
 *  - div: division (a / b)
 *
 * The CLI accepts the following forms:
 *   node src/calculator.js <operation> <a> <b>
 *   node src/calculator.js --help
 *
 * Examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js div 10 2
 *
 * Exit codes:
 *   0 - success
 *   1 - invalid usage or invalid numbers
 *   2 - division by zero
 */

const args = process.argv.slice(2);

function printHelp() {
  console.log("Usage: node src/calculator.js <operation> <a> <b>\n\nOperations:\n  add    - addition (a + b)\n  sub    - subtraction (a - b)\n  mul    - multiplication (a * b)\n  div    - division (a / b)\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js sub 5 2\n  node src/calculator.js mul 4 3\n  node src/calculator.js div 10 2\n");
}

if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  printHelp();
  process.exit(0);
}

if (args.length < 3) {
  console.error('Error: missing arguments.');
  printHelp();
  process.exit(1);
}

const [opRaw, aStr, bStr] = args;
const op = opRaw.toLowerCase();
const a = Number(aStr);
const b = Number(bStr);

if (!Number.isFinite(a) || !Number.isFinite(b)) {
  console.error('Error: operands must be valid numbers.');
  process.exit(1);
}

function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

let result;
switch (op) {
  case 'add':
  case '+':
    result = add(a, b);
    break;
  case 'sub':
  case '-':
    result = sub(a, b);
    break;
  case 'mul':
  case 'x':
  case '*':
    result = mul(a, b);
    break;
  case 'div':
  case '/':
    if (b === 0) {
      console.error('Error: division by zero');
      process.exit(2);
    }
    result = div(a, b);
    break;
  default:
    console.error(`Error: unknown operation '${opRaw}'.`);
    printHelp();
    process.exit(1);
}

// Print result and exit successfully
if (Number.isFinite(result)) {
  // Use simple formatting: if integer, print without decimal; else print as-is
  if (Number.isInteger(result)) {
    console.log(result);
  } else {
    console.log(result);
  }
  process.exit(0);
} else {
  console.error('Error: computation failed.');
  process.exit(1);
}
