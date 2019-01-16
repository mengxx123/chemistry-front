/* eslint-disable */
import { solveMatrix } from './matrix.js';
import { genTests } from './matrix.js';
import { generateMatrix } from './matrix.js';
import { getMols } from './matrix.js';

// Takes two arrays. E.g. ['CO2', 'H2O'], ['O2', 'C6H12O6']
function balanceEq(reagents, products) {
    var matrix = generateMatrix(reagents, products);
    var solution = solveMatrix(matrix);
    console.log(reagents, products, matrix, solution);
    return solution;
}


const digits = [0, 1, 2, 3, 4, 5,6, 7, 8, 9];

function format(mol) {
  let res = '';
  const digitStrings = digits.map(char => char.toString());
  for (let i=0; i < mol.length; i++) {
    let char = mol[i];
    if (!digitStrings.includes(char)) {
      res += char;
    } else {
      res += `<sub>${char}</sub>`;
    }
  }

  return res;
}

export {balanceEq, format}
