/* eslint-disable no-underscore-dangle, no-undef */
import { createStore } from 'redux';
import tableReducer from 'modules/table';

export default createStore(
  tableReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */
