import { useState, useEffect } from 'react';
import { AppState } from 'react-native';

export default function useAppState() {
  const [appState, setAppState] = useState(AppState.currentState);
  const [prevAppState, setPrevAppState] = useState('background');

  useEffect(() => {
    function handleAppStateChange(nextAppState) {
      setPrevAppState(appState);
      setAppState(nextAppState);
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  });

  return { appState, prevAppState };
}