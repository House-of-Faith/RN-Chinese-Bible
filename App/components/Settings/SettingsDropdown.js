import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Share, SafeAreaView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import styled from '@emotion/native';

import { notify } from 'lib/Tracking';
import { useI18n } from 'lib/hooks';
import { selectors } from 'store';

export default function SettingsDropdown({ navigation }) {
  const { i18n } = useI18n();
  const dispatch = useDispatch();
  const showDropdown = useSelector(selectors.showDropdown);

  const setShowDropdown = () => {
    if (showDropdown) dispatch({ type: 'HIDE_DROPDOWN' });
    else dispatch({ type: 'SHOW_DROPDOWN' });
  };

  async function onShare () {
    try {
      const result = await Share.share({
        url: 'https://github.com/House-of-Faith/RN-Chinese-Bible',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      notify(error);
    }
  }

  async function onFeedback () {
    try {
      const result = await MailComposer.isAvailableAsync();
      console.log(result);

      if (result) {
        MailComposer.composeAsync({
          recipients: ['feedback@houseof.faith'],
          subject: '',
          body: '',
        });
      } else {
        alert('Error');
      }
    } catch (error) {
      notify(error);
    }
  }
  
  function onSettings () {
    setShowDropdown(false);
    navigation.navigate('Settings');
  }

  return (
    <Modal
      visible={showDropdown}
      transparent
      animationType='fade'
      onRequestClose={() => setShowDropdown(false)}
    >
      <SafeAreaView
        style={{ flex: 1, alignItems: 'flex-end', backgroundColor: 'rgba(50, 50, 50, .3)' }}
        onStartShouldSetResponder={() => setShowDropdown(false)}
      >
        <MenuContainer>
          <MenuItem onPress={onShare}>
            <MenuText>{i18n('share')}</MenuText>
          </MenuItem>
          <MenuItem onPress={onSettings}>
            <MenuText>{i18n('settings')}</MenuText>
          </MenuItem>
          <MenuItem onPress={onFeedback}>
            <MenuText>{i18n('feedback')}</MenuText>
          </MenuItem>
        </MenuContainer>
      </SafeAreaView>
    </Modal>
  );
}

SettingsDropdown.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired
};

const MenuContainer = styled.View(({ theme }) => ({
  right: 10,
  top: 0,
  paddingVertical: 10,
  backgroundColor: theme.background.card,
}));

const MenuItem = styled.TouchableOpacity(() => ({
  paddingHorizontal: 20,
  paddingVertical: 10,
}));

const MenuText = styled.Text(({ theme }) => ({
  fontSize: 20,
  color: theme.text.menu,
}));