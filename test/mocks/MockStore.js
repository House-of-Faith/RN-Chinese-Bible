import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import { initialState } from 'store/reducers';

export default function MockStore({ children, state }) {
  const reducers = () => ({ ...initialState, ...state });

  const store = createStore(reducers);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

MockStore.propTypes = {
  children: PropTypes.node,
  state: PropTypes.object
};
