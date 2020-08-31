import React from 'react';

import Verse from './Verse';

export default function Chapter({ verses }) {
	return verses?.map((verse, i) => <Verse key={i} number={i + 1} text={verse} />);
}