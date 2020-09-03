/*

The purpose of this component is to place any app level logic that needs to happen

*/

import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { usePersistStore } from 'lib/hooks';
import { selectors } from 'store';

export default function RootContainer({ children }) {
  const storeRehydrated = useSelector(selectors.storeRehydrated);
  const showDropdown = useSelector(selectors.showDropdown);

  const dispatch = useDispatch();
  usePersistStore();
  if (!storeRehydrated) return null;
  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponder={() => {
        if (!showDropdown) return;
        dispatch({ type: 'HIDE_DROPDOWN' });
        return false;
      }}
    >
      {children}
    </View>
  );
}

RootContainer.propTypes = {
  children: PropTypes.element.isRequired
};
