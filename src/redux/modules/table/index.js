import { Record, List } from 'immutable';
import Tile from 'models/Tile';
import _ from 'lodash';
import { levels } from 'utils/constants';

const InitialState = new Record({
  rows: 0,
  columns: 0,
  level: 'easy',
  gamePhase: 'intro',
  table: [],
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

  return _.shuffle(_.range(numMines).map(() => 1).concat(_.range(numSafeTiles).map(() => 0)));
};

const updatePhaseHelper = (state, action) => {
  if (action.value === 'play') {
    const table = shuffleTable(state);
    const tiles = List(table.map(() => new Tile()));

    return (
      state
        .set('gamePhase', action.value)
        .set('table', table)
        .set('pendingMines', table.filter(m => m).length)
        .set('tiles', tiles)
    );
  }

  return state.set('gamePhase', action.value);
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
      return state.update('tiles', tiles => tiles.update(action.index, tile => tile.set(action.key, action.value)));
    case RETRY_GAME: {
      const table = shuffleTable(state);

      return state.set('table', table).set('tiles', List(table.map(() => new Tile()))).set('gamePhase', 'play');
    }
    default:
      return state;
  }
}
