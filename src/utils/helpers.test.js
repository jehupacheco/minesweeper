import { getNumberMinesAround } from './helpers';

test('Test in 4x4 table', () => {
  const table = [
    0, 0, 0, 1,
    0, 0, 0, 0,
    0, 1, 1, 0,
    0, 1, 1, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
  ];

  const result = table.map((value, index) => getNumberMinesAround(table, 4, 6, index));

  const answer = [
    0, 0, 1, 0,
    1, 2, 3, 2,
    2, 3, 3, 2,
    3, 4, 4, 2,
    2, 2, 3, 1,
    1, 1, 1, 0,
  ];

  expect(result).toEqual(answer);
});
