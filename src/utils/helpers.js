export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

export const getNumberMinesAround = (table, columns, rows, index) => {
  let count = 0;
  const y = Math.floor(index / columns);
  const x = index % columns;


  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      if (i !== 0 && j !== 0) {
        const xp = x + i;
        const yp = y + j;

        if (xp >= 0 && yp >= 0 && xp < columns && yp < rows) {
          const realIndex = (yp * columns) + xp;
          count += table[realIndex];
        }
      }
    }
  }

  return count;
};

export default {
  capitalize,
  getNumberMinesAround,
};
