import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setPhase, retryGame } from 'modules/table';
import Board from 'components/Board';
import { tileSize } from 'utils/constants';
import happyFace from 'assets/happy.png';
import sadFace from 'assets/worry.png';

const propTypes = {
  mines: PropTypes.number.isRequired,
  goBack: PropTypes.func.isRequired,
  phase: PropTypes.string.isRequired,
  columns: PropTypes.number.isRequired,
  retry: PropTypes.func.isRequired,
};

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: ${props => props.width || '100%'};
`;

const Image = styled.img`
  height: auto;
  width: 20px;
`;

const Counter = styled.div`
  background-color: black;
  color: red;
  font-weight: bold;
  padding: 5px 10px;
  text-align: right;
  width: 40px;
`;

const Game = ({
  mines,
  goBack,
  phase,
  columns,
  retry,
}) => (
  <Fragment>
    <Row width={`${columns * tileSize}px`}>
      <Counter>
        {mines}
      </Counter>
      <Image src={phase === 'lose' ? sadFace : happyFace} />
    </Row>
    <Board />
    <Row width={`${columns * tileSize}px`}>
      <button onClick={goBack}>Go Back</button>
      <button onClick={retry}>Retry!</button>
    </Row>
  </Fragment>
);

Game.propTypes = propTypes;

export default connect(
  state => ({
    mines: state.pendingMines,
    phase: state.gamePhase,
    columns: state.columns,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(setPhase('intro'));
    },
    retry: () => {
      dispatch(retryGame());
    },
  }),
)(Game);
