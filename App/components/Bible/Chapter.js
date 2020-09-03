import React from 'react';
import PropTypes from 'prop-types';

import Verse from './Verse';

export default function Chapter({ verses }) {
  return verses?.map((verse, i) => <Verse key={`${i} ${verse}`} number={i + 1} text={verse} />);
}

Chapter.propTypes = {
  verses: PropTypes.arrayOf(PropTypes.string).isRequired
};
