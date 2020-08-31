import React from 'react';
import styled from "@emotion/native";

export default function Verse({ number, text }) {
	// TODO: Account for italics in english
	return (
		<Text>
			{number} {text}
		</Text>
	);
}

const Text = styled.Text(({ theme }) => ({
	fontSize: 19,
	lineHeight: 27,
	marginBottom: 13,
	color: theme.text.reading,
}));