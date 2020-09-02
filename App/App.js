import React from 'react';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import store from 'store';
import AppTheme from 'theme/AppTheme';
import RootNavigation from 'navigation/RootNavigation';
import RootContainer from './RootContainer';

const App = () => {
  return (
    <Provider store={store}>
      <AppTheme>
        <RootContainer>
          <RootNavigation />
        </RootContainer>
      </AppTheme>
    </Provider>
  );
};

export default registerRootComponent(App);
