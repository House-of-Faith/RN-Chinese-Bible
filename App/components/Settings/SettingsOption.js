import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTheme } from 'emotion-theming';
import styled from '@emotion/native';

export default function SettingsOption({ label, selected, onPress, fontSize }) {
  const { text } = useTheme();

  return (
    <ButtonContainer>
      <Button onPress={onPress}>
        <Option fontSize={fontSize}>{label}</Option>
      </Button>
      {selected && (
        <Icon
          name="md-checkmark-circle"
          size={20}
          color={text.reading}
        />
      )}
    </ButtonContainer>
  );
}

SettingsOption.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  fontSize: PropTypes.string.isRequired,
};

const ButtonContainer = styled.View(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

const Button = styled.TouchableOpacity(() => ({
  marginRight: 20,
}));

const Option = styled.Text(({ theme, fontSize }) => ({
  fontSize: theme.fontSize[fontSize] || 17,
  marginLeft: 20,
  marginBottom: 20,
  color: theme.text.menu,
}));
