import { getNumberMinesAround, getBlankArea } from './helpers';

test('Test getNumberMinesAround', () => {
  const table = [
    1, 0, 1, 1, 0, 0, 1, 1, 1, 0,
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
    1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 1, 1, 1, 0,
  ];

  const result = table.map((value, index) => getNumberMinesAround(table, 10, 10, index));

  const answer = [
    0, 3, 2, 2, 1, 2, 2, 4, 2, 2,
    1, 3, 2, 3, 1, 2, 2, 5, 2, 2,
    1, 3, 3, 3, 2, 3, 3, 3, 2, 1,
    1, 1, 1, 3, 3, 4, 4, 1, 1, 0,
    2, 4, 3, 4, 3, 4, 4, 3, 2, 0,
    1, 3, 0, 2, 2, 4, 4, 2, 2, 1,
    1, 3, 1, 1, 0, 1, 1, 3, 3, 1,
    2, 2, 0, 0, 0, 2, 2, 3, 1, 2,
    0, 2, 1, 1, 0, 2, 2, 5, 3, 2,
    1, 2, 0, 1, 0, 2, 2, 3, 1, 1,
  ];

  expect(result).toEqual(answer);
});

test('Test getting blank area', () => {
  const table = [
    1, 0, 1, 1, 0, 0, 1, 1, 1, 0,
    0, 0, 1, 0, 0, 0, 1, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 0, 1, 1, 0, 1, 0, 0,
    0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
    1, 0, 1, 0, 0, 0, 0, 1, 0, 0,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 0, 1, 1, 1, 0,
  ];

  const minesAround = table.map((value, index) => getNumberMinesAround(table, 10, 10, index));

  const answer = [53, 54, 55, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85, 93, 94, 95];

  expect(getBlankArea(minesAround, 10, 10, 72).sort((a, b) => a === b ? 0 : (a < b ? -1: 1))).toEqual(answer);
});
