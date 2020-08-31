import { useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';

import useAppState from './useAppState';
import useIsMounted from './useIsMounted';

export default function usePersistStore() {
  const dispatch = useDispatch();
  const isMounted = useIsMounted();
  const { appState } = useAppState();
  const state = useSelector((state) => state);

  useEffect(() => {
    retrieveStore();

    return () => {
      saveStore();
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if ('active' === appState) return;
    
    // 'background' || 'inactive
    saveStore();
  }, [appState]);
  
  function saveStore() {
    debugger
    const jsonValue = JSON.stringify(state)
    AsyncStorage.setItem('@storage_Key', jsonValue).catch(err => {
      console.log(err);
    })
  }

  function retrieveStore() {
    debugger
    AsyncStorage.getItem('@storage_Key').then(jsonValue => {
      const newState = jsonValue != null ? JSON.parse(jsonValue) : initialState;
      dispatch({
        type: "REHYDRATE_STORE",
        payload: newState,
      });
    }).catch(err => {
      console.log(err);
    })
  }
}