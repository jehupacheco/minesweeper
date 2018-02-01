import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDimension, setPhase, setLevel } from 'modules/table';
import { levels } from 'utils/constants';
import { capitalize } from 'utils/helpers';

const propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  updateColumns: PropTypes.func.isRequired,
  updateRows: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
  selectLevel: PropTypes.func.isRequired,
};

const Home = ({
  columns,
  rows,
  updateColumns,
  updateRows,
  startGame,
  selectLevel,
}) => (
  <Fragment>
    <div>
      <label htmlFor="">Columns:</label>
      <input type="text" value={columns || ''} onChange={updateColumns} />
    </div>
    <div>
      <label htmlFor="">Rows:</label>
      <input type="text" value={rows || ''} onChange={updateRows} />
    </div>
    <div>
      <label htmlFor="">Level:</label>
      <select onChange={selectLevel}>
        {Object.keys(levels).map(level => (
          <option value={level} key={level}>{capitalize(level)}</option>
        ))}
      </select>
    </div>
    <button onClick={startGame}>Start!</button>
  </Fragment>
);

Home.propTypes = propTypes;

export default connect(
  state => ({
    columns: state.columns,
    rows: state.rows,
  }),
  dispatch => ({
    updateColumns: (e) => {
      dispatch(setDimension('columns', Number(e.target.value)));
    },
    updateRows: (e) => {
      dispatch(setDimension('rows', Number(e.target.value)));
    },
    startGame: () => {
      dispatch(setPhase('play'));
    },
    selectLevel: (e) => {
      dispatch(setLevel(e.target.value));
    },
  }),
)(Home);
