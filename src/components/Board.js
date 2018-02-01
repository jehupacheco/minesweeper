import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Tile from 'components/Tile';
import { tileSize } from 'utils/constants';

const propTypes = {
  table: PropTypes.arrayOf(PropTypes.number).isRequired,
  columns: PropTypes.number.isRequired,
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${props => props.width || '100%'};
`;

const Board = ({ table, columns }) => (
  <Container width={`${tileSize * columns}px`}>
    {table.map((value, index) => <Tile key={index} value={value} index={index} />)}
  </Container>
);

Board.propTypes = propTypes;

export default connect(
  state => ({
    table: state.table,
    columns: state.columns,
  }),
  null,
)(Board);
