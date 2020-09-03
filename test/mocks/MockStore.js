import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { initialState } from 'store/reducers';

const reducers = () => initialState;

const store = createStore(reducers);

export default function MockStore({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

MockStore.propTypes = {
  children: PropTypes.node
};
