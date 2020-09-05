import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useTheme } from 'emotion-theming';
import styled from '@emotion/native';

import TranslatedText from 'components/common/TranslatedText';

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

SettingsOption.defaultProps = {
  onPress: () => {},
  fontSize: 'medium',
};

SettingsOption.propTypes = {
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func,
  fontSize: PropTypes.string,
};

const ButtonContainer = styled.View(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

const Button = styled.TouchableOpacity(() => ({
  marginRight: 20,
}));

// keeps the text in place with change in size
const marginMap = {
  small: 23.5,
  medium: 20,
  large: 14,
};

const Option = styled(TranslatedText)(({ theme, fontSize }) => ({
  fontSize: theme.fontSize[fontSize],
  marginLeft: 20,
  marginBottom: marginMap[fontSize],
  color: theme.text.menu,
}));
