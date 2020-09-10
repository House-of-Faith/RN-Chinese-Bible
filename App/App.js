import React from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

import store from 'store';
import AppTheme from 'theme/AppTheme';
import RootNavigation from 'navigation/RootNavigation';
import RootContainer from './RootContainer';
import Bugsnag from 'lib/Bugsnag';
Bugsnag;

// Use this with caution!!
// Please try to resolve the warning before ignoring it here
YellowBox.ignoreWarnings([
  // Warning displays only when debugger is running
  'Remote debugger is in a background tab',
  // Bugsnag warning displays only when debugger is running
  'This call to Bugsnag',
]);

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
