import { Record, List } from 'immutable';
import _ from 'lodash';
import Tile from 'models/Tile';
import { levels } from 'utils/constants';
import { getNumberMinesAround, getBlankArea } from 'utils/helpers';

const InitialState = new Record({
  rows: 0,
  columns: 0,
  level: 'easy',
  gamePhase: 'intro',
  table: [],
  minesAround: [],
  pendingMines: 0,
  tiles: List(),
});

const SET_DIMENSION = 'minesweeper/table/SET_DIMENSION';
const SET_LEVEL = 'minesweeper/table/SET_LEVEL';
const SET_PHASE = 'minesweeper/table/SET_PHASE';
const ADD_PENDING_MINES = 'minesweeper/table/ADD_PENDING_MINES';
const UPDATE_TILE = 'minesweeper/table/UPDATE_TILE';
const RETRY_GAME = 'minesweeper/table/RETRY_GAME';

export const setDimension = (dimension, value) => ({
  dimension,
  value,
  type: SET_DIMENSION,
});

export const setLevel = value => ({
  value,
  type: SET_LEVEL,
});

export const setPhase = value => ({
  value,
  type: SET_PHASE,
});

export const addPendingMines = value => ({
  value,
  type: ADD_PENDING_MINES,
});

export const updateTile = (index, key, value) => ({
  value,
  key,
  index,
  type: UPDATE_TILE,
});

export const retryGame = () => ({
  type: RETRY_GAME,
});

const shuffleTable = (state) => {
  const columns = state.get('columns');
  const rows = state.get('rows');
  const level = state.get('level');
  const numMines = Math.floor(columns * rows * levels[level]);
  const numSafeTiles = (columns * rows) - numMines;
  const table = (
    _.shuffle(_.range(numMines).map(() => 1)
      .concat(_.range(numSafeTiles).map(() => 0)))
  );

  return {
    table,
    tiles: List(table.map(() => new Tile())),
    minesAround: table.map((value, index) => getNumberMinesAround(table, columns, rows, index)),
    numMines,
  };
};

const updatePhaseHelper = (state, action) => {
  if (action.value === 'play') {
    const {
      table,
      tiles,
      minesAround,
      numMines,
    } = shuffleTable(state);

    return (
      state
        .set('gamePhase', action.value)
        .set('table', table)
        .set('pendingMines', numMines)
        .set('tiles', tiles)
        .set('minesAround', minesAround)
    );
  }

  return state.set('gamePhase', action.value);
};

const updateTileHelper = (state, { key, index, value }) => {
  const minesAround = state.get('minesAround');
  const table = state.get('table');
  const columns = state.get('columns');
  const rows = state.get('rows');

  if (key === 'opened' && value && minesAround[index] === 0 && !table[index]) {
    const area = getBlankArea(minesAround, columns, rows, index);

    return area.reduce((currentState, areaIndex) => (
      currentState.update('tiles', tiles => tiles.update(areaIndex, tile => tile.set('opened', true)))
    ), state);
  }

  return state.update('tiles', tiles => tiles.update(index, tile => tile.set(key, value)));
};

export default function tableReducer(state = new InitialState(), action) {
  switch (action.type) {
    case SET_DIMENSION:
      return state.set(action.dimension, action.value);
    case SET_LEVEL:
      return state.set('level', action.value);
    case SET_PHASE:
      return updatePhaseHelper(state, action);
    case ADD_PENDING_MINES:
      return state.update('pendingMines', mines => mines + action.value);
    case UPDATE_TILE:
      return updateTileHelper(state, action);
    case RETRY_GAME: {
      const {
        table,
        tiles,
        minesAround,
        numMines,
      } = shuffleTable(state);

      return (
        state
          .set('table', table)
          .set('tiles', tiles)
          .set('gamePhase', 'play')
          .set('minesAround', minesAround)
          .set('pendingMines', numMines)
      );
    }
    default:
      return state;
  }
}
