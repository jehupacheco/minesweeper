const getCoords = (index, columns) => ({
  x: index - (Math.floor(index / columns) * columns),
  y: Math.floor(index / columns),
});

const getRealIndex = (x, y, columns) => (y * columns) + x;

const getVicinity = (index, columns, rows) => {
  const { x, y } = getCoords(index, columns);
  const vicinity = [];

  for (let i = -1; i <= 1; i += 1) {
    for (let j = -1; j <= 1; j += 1) {
      const xp = x + i;
      const yp = y + j;

      if (!(i === 0 && j === 0) && xp >= 0 && yp >= 0 && xp < columns && yp < rows) {
        vicinity.push([xp, yp]);
      }
    }
  }

  return vicinity.map(([xp, yp]) => getRealIndex(xp, yp, columns));
};

const widenArea = (area, columns, rows) => (
  Array.from(area.reduce((widerArea, currentIndex) => {
    getVicinity(currentIndex, columns, rows).forEach((neighbourd) => {
      widerArea.add(neighbourd);
    });

    return widerArea;
  }, new Set()))
);

export const capitalize = str => `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}`;

export const getNumberMinesAround = (table, columns, rows, index) => {
  let count = 0;

  getVicinity(index, columns, rows).forEach((neighbourdIndex) => {
    count += table[neighbourdIndex];
  });

  return count;
};

export const getBlankArea = (minesAround, columns, rows, index) => {
  const area = [];
  const visited = minesAround.map(() => 0);
  const queue = [index];

  while (queue.length) {
    const currentIndex = queue.shift();

    if (!visited[currentIndex]) {
      area.push(currentIndex);
      visited[currentIndex] = 1;

      getVicinity(currentIndex, columns, rows).forEach((neighbourdIndex) => {
        if (!visited[neighbourdIndex] && !minesAround[neighbourdIndex]) {
          queue.push(neighbourdIndex);
        }
      });
    }
  }

  return widenArea(area, columns, rows);
};

export default {
  capitalize,
  getNumberMinesAround,
};
