import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addPendingMines, setPhase, updateTile } from 'modules/table';
import { tileSize } from 'utils/constants';
import { getNumberMinesAround } from 'utils/helpers';

const StyledTile = styled.div`
  align-items: center;
  border: 1px solid black;
  box-sizing: border-box;
  display: flex;
  font-size: 15px;
  height: ${tileSize}px;
  justify-content: center;
  text-align: center;
  width: ${tileSize}px;
`;

const Button = styled.button`
  align-items: center;
  display: flex;
  height: ${tileSize}px;
  justify-content: center;
  width: ${tileSize}px;
`;

class Tile extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired,
    table: PropTypes.arrayOf(PropTypes.number).isRequired,
    lostGame: PropTypes.bool.isRequired,
    marked: PropTypes.bool.isRequired,
    opened: PropTypes.bool.isRequired,
    incrementMines: PropTypes.func.isRequired,
    decrementMines: PropTypes.func.isRequired,
    lose: PropTypes.func.isRequired,
    toggleTile: PropTypes.func.isRequired,
    markTile: PropTypes.func.isRequired,
  }

  mouseDownHandler = (e) => {
    const {
      marked,
      value,
      toggleTile,
      markTile,
      lose,
      decrementMines,
      incrementMines,
    } = this.props;

    if (e.button === 0) {
      toggleTile(!marked);

      if (value) {
        lose();
      }
    } else if (e.button === 2) {
      if (!marked) {
        decrementMines();
      } else {
        incrementMines();
      }

      markTile(!marked);
    }
  }

  renderValue = () => {
    const {
      value,
      table,
      columns,
      rows,
      index,
      lostGame,
      opened,
      marked,
    } = this.props;

    return (
      opened ?
        <span>
          {value ? '*' : getNumberMinesAround(table, columns, rows, index)}
        </span>
        :
        <Button
          onMouseDown={this.mouseDownHandler}
          onContextMenu={(e) => { e.preventDefault(); }}
          disabled={lostGame}
        >
          {marked && 'B'}
        </Button>
    );
  }

  renderTile = () => {
    const {
      lostGame,
      value,
      marked,
    } = this.props;

    return (
      lostGame && value
        ? <span>{marked ? '/' : '*'}</span>
        : this.renderValue()
    );
  }

  render() {
    return (
      <StyledTile>
        {this.renderTile()}
      </StyledTile>
    );
  }
}

export default connect(
  (state, props) => ({
    columns: state.get('columns'),
    rows: state.get('rows'),
    table: state.get('table'),
    lostGame: state.get('gamePhase') === 'lose',
    marked: state.get('tiles').get(props.index).get('marked'),
    opened: state.get('tiles').get(props.index).get('opened'),
  }),
  (dispatch, props) => ({
    incrementMines: () => {
      dispatch(addPendingMines(1));
    },
    decrementMines: () => {
      dispatch(addPendingMines(-1));
    },
    lose: () => {
      dispatch(setPhase('lose'));
    },
    toggleTile: (value) => {
      dispatch(updateTile(props.index, 'opened', value));
    },
    markTile: (value) => {
      dispatch(updateTile(props.index, 'marked', value));
    },
  }),
)(Tile);
