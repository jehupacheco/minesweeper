import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from 'components/Home';
import Game from 'components/Game';

const propTypes = {
  phase: PropTypes.string.isRequired,
};

const App = ({ phase }) => (
  <Fragment>
    {phase === 'intro'
      ? <Home />
      : <Game />
    }
  </Fragment>
);

App.propTypes = propTypes;

export default connect(
  state => ({
    phase: state.gamePhase,
  }),
  null,
)(App);
