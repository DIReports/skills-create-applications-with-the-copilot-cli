#!/usr/bin/env node
"use strict";

/**
 * Calculator module + CLI
 *
 * Supported operations:
 *  - add: addition (a + b)
 *  - sub: subtraction (a - b)
 *  - mul: multiplication (a * b)
 *  - div: division (a / b) -- throws on divide by zero
 *  - mod: modulo (a % b) -- throws on modulo by zero
 *  - pow: exponentiation (base ** exponent)
 *  - sqrt: square root (sqrt(n)) -- throws on negative input
 *
 * The CLI accepts the following forms:
 *   node src/calculator.js <operation> <a> <b>
 *   node src/calculator.js sqrt <n>
 *   node src/calculator.js --help
 *
 * Examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js div 10 2
 *   node src/calculator.js mod 10 3
 *   node src/calculator.js pow 2 8
 *   node src/calculator.js sqrt 9
 *
 * Exit codes:
 *   0 - success
 *   1 - invalid usage or invalid numbers
 *   2 - division/modulo by zero or domain errors (e.g., sqrt negative)
 */

// Arithmetic functions (exported for tests)
function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { if (y === 0) throw new Error('Division by zero'); return x / y; }
function mod(x, y) { if (y === 0) throw new Error('Modulo by zero'); return x % y; }
function power(base, exponent) { return Math.pow(base, exponent); }
function squareRoot(n) { if (n < 0) throw new Error('Square root of negative number'); return Math.sqrt(n); }

// Export functions for tests and external use
module.exports = { add, sub, mul, div, mod, power, squareRoot };

// CLI runner
if (require.main === module) {
  const args = process.argv.slice(2);

  function printHelp() {
    console.log("Usage: node src/calculator.js <operation> <a> <b>\n\nOperations:\n  add    - addition (a + b)\n  sub    - subtraction (a - b)\n  mul    - multiplication (a * b)\n  div    - division (a / b)\n  mod    - modulo (a % b)\n  pow    - exponentiation (base ** exponent)\n  sqrt   - square root (sqrt(n))\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js sub 5 2\n  node src/calculator.js mul 4 3\n  node src/calculator.js div 10 2\n  node src/calculator.js mod 10 3\n  node src/calculator.js pow 2 8\n  node src/calculator.js sqrt 9\n");
  }

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printHelp();
    process.exit(0);
  }

  const [opRaw, aStr, bStr] = args;
  const op = opRaw.toLowerCase();

  // Validate operand counts: sqrt expects 1 operand, others expect 2
  if (op === 'sqrt') {
    if (args.length < 2) {
      console.error('Error: missing argument for sqrt.');
      printHelp();
      process.exit(1);
    }
  } else {
    if (args.length < 3) {
      console.error('Error: missing arguments.');
      printHelp();
      process.exit(1);
    }
  }

  const a = Number(aStr);
  const b = bStr !== undefined ? Number(bStr) : undefined;

  if (!Number.isFinite(a) || (bStr !== undefined && !Number.isFinite(b))) {
    console.error('Error: operands must be valid numbers.');
    process.exit(1);
  }

  let result;
  try {
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
      case 'mod':
      case '%':
        if (b === 0) {
          console.error('Error: modulo by zero');
          process.exit(2);
        }
        result = mod(a, b);
        break;
      case 'pow':
      case '^':
      case 'power':
        result = power(a, b);
        break;
      case 'sqrt':
      case 'root':
        try {
          result = squareRoot(a);
        } catch (err) {
          console.error('Error:', err.message);
          process.exit(2);
        }
        break;
      default:
        console.error(`Error: unknown operation '${opRaw}'.`);
        printHelp();
        process.exit(1);
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }

  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  } else {
    console.error('Error: computation failed.');
    process.exit(1);
  }
}
